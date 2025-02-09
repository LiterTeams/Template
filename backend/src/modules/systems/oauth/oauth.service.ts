import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { TokenService } from "../token/token.service";
import { SessionService } from "../session/session.service";
import { DatabaseService } from "../database/database.service";
import { Prisma, User } from "@prisma/client";

import bcryptCompare from "src/lib/bcryptCompare";
import bcryptHash from "src/lib/bcryptHash";
import generateUAK from "src/lib/generateUAK";

import { SignInProps } from "src/types/system/oauth.interfaces";

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
        private readonly sessionService: SessionService,
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

    async signInUAK(UAK: string, origin: string, res: Response) {
        await this.checkOrigin(origin);

        if (!UAK) throw new UnauthorizedException(errors.UAK.message);
        const user = await this.usersService.findByUAK(UAK);

        await this.checkUserStatus(user, origin);
        return this.generateAuthResponse(user, res);
    }

    async signIn(DTO: SignInProps, origin: string, res: Response) {
        await this.checkOrigin(origin);

        if (!DTO) throw new UnauthorizedException(errors.empty.message);
        const user = await this.usersService.findByEmailWithPassword(DTO.email);

        await this.handleInvalidCredentials(user, DTO);
        await this.checkUserStatus(user, origin);

        return this.generateAuthResponse(user, res);
    }

    async signUp(DTO: Prisma.UserCreateInput, res: Response) {
        const existingUser = await this.usersService.findByEmail(DTO.email).catch(() => null);
        if (existingUser) throw new BadRequestException(this.unauthorizedErrors.exists);

        const existenceRootUser = await this.usersService.existenceRootUser();

        DTO.password = await bcryptHash(DTO.password, Number(this.configService.get("salt")));
        DTO.UAK = await generateUAK();
        DTO.method = "credentials";
        DTO.role = existenceRootUser ? "user" : "root";

        const user = await this.DBService.user.create({ data: DTO });
        return this.generateAuthResponse(user, res);
    }

    async logout(req: Request, res: Response): Promise<void> {
        if (!req.session) throw new InternalServerErrorException(errors.sessionEmpty.message);
        const accessToken = req.cookies.accessToken;
        const session = JSON.parse(req.cookies.session);

        if (!session) throw new UnauthorizedException("Session Undefinde");

        await this.tokenService.logout(session["sessionId"], accessToken);
        res.clearCookie("session");
    }

    async refreshAccessToken(req: Request, res: Response) {
        const session = req.session;
        const accessToken = req.cookies.accessToken;
        if (!session || !session.sessionId) throw new UnauthorizedException("Пользователь не найден");

        const newAccessToken = await this.tokenService.refreshAccessToken(+session.sessionId, accessToken);
        await this.tokenService.saveAcceesToken(newAccessToken, res);
        return res.json({ success: true });
    }

    private async generateAuthResponse(user: Prisma.UserCreateInput | any, res: Response) {
        const payload = { id: user.id, role: user.role };
        const { accessToken } = await this.tokenService.generateTokens(payload);

        const { password, login, UAK, ...props } = user;
        const authUser = { ...props };
        await this.sessionService.saveSession(user.id, authUser, res);
        await this.tokenService.saveAcceesToken(accessToken, res);
        res.json(authUser);
    }
}
