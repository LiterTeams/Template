import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { TokenService } from "../token/token.service";
import { DatabaseService } from "../database/database.service";
import { Prisma, User } from "@prisma/client";

import bcryptCompare from "src/lib/bcryptCompare";
import bcryptHash from "src/lib/bcryptHash";
import generateUAK from "src/lib/generateUAK";

import { SignInProps, SignInResponseProps } from "src/types/system/oauth.interfaces";

import errors from "src/const/errors";

@Injectable()
export class OauthService {
    private readonly adminRoles = new Set(["root", "admin", "moderator"]);
    private readonly unauthorizedErrors = {
        "exists":"Пользователь уже существует!",
    };
    constructor(
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService,
        private readonly usersService: UsersService,
        private readonly DBService: DatabaseService,
    ) {}

    private async checkOrigin(origin: string) {
        const allowedOrigins = this.configService.get<string>("allowedOrigins").split(",");
        if (!allowedOrigins.includes(origin)) throw new UnauthorizedException(errors.origin.message);
    }

    private async checkUserStatus(user: User, origin: string) {
        if (user.blocking) throw new UnauthorizedException(errors.blocking.message);
        if (origin.startsWith("http://localhost:4000") && !this.adminRoles.has(user.role)) throw new UnauthorizedException(errors.role.message);
    }

    private async handleInvalidCredentials(user: User, DTO: SignInProps) {
        if (!user || !(await bcryptCompare(DTO.password, user.password))) throw new UnauthorizedException(errors.login.message);
    }

    async signInUAK(UAK: string, origin: string, req: Request) {
        await this.checkOrigin(origin);

        if (!UAK) throw new UnauthorizedException(errors.UAK.message);
        const user = await this.usersService.findByUAK(UAK);

        await this.checkUserStatus(user, origin);
        return this.generateAuthResponse(user, req);
    }

    async signIn(DTO: SignInProps, origin: string, req: Request) {
        await this.checkOrigin(origin);

        if (!DTO) throw new UnauthorizedException(errors.empty.message);
        const user = await this.usersService.findByEmailWithPassword(DTO.email);

        await this.handleInvalidCredentials(user, DTO);
        await this.checkUserStatus(user, origin);

        return this.generateAuthResponse(user, req);
    }

    async signUp(DTO: Prisma.UserCreateInput, req: Request): Promise<SignInResponseProps> {
        const existingUser = await this.usersService.findByEmail(DTO.email).catch(() => null);
        if (existingUser) throw new BadRequestException(this.unauthorizedErrors.exists);

        DTO.password = await bcryptHash(DTO.password, Number(this.configService.get("salt")));
        DTO.UAK = await generateUAK();
        DTO.method = "credentials";

        const user = await this.DBService.user.create({ data: DTO });
        return this.generateAuthResponse(user, req);
    }

    async logout(req: Request, res: Response): Promise<void> {
        if (!req.session) throw new InternalServerErrorException(errors.sessionEmpty.message);

        const authHeader = req.headers["authorization"];
        const accessToken = authHeader?.split(" ")[1];
        const user_id = req.session.user_id;

        if (!user_id) throw new UnauthorizedException("Unknown User ID");
        if (!accessToken) throw new UnauthorizedException("Access token is required");

        await this.tokenService.logout(user_id, accessToken);

        req.session.destroy((error) => {
            if (error) throw new InternalServerErrorException(errors.sessionDestroy.message);
            res.clearCookie(this.configService.get<string>("sessionName", "session"));
        });
    }

    async refreshAccessToken(req: Request, res: Response) {
        const session = req.session;
        if (!session || !session.user_id) throw new UnauthorizedException("Пользователь не найден");

        const { accessToken } = await this.tokenService.refreshAccessToken(+session.user_id, req, res);
        return res.json({ accessToken });
    }

    private async generateAuthResponse(user: Prisma.UserCreateInput | any, req: Request): Promise<SignInResponseProps> {
        const payload = { id: user.id, role: user.role };
        const tokens = await this.tokenService.generateTokens(payload);

        const { password, UAK, ...props } = user;
        const authUser = { ...props, ...tokens };
        await this.saveSession(authUser, req);
        return authUser;
    }

    private async saveSession(user: SignInResponseProps, req: Request) {
        return new Promise((resolve, reject) => {
            req.session.user_id = user.id;
            req.session.save((error) => {
                if (error) reject(new InternalServerErrorException(errors.sessionSave.message));
                resolve({ user });
            });
        });
    }
}
