import bcryptCompare from "src/lib/bcryptCompare";
import bcryptHash from "src/lib/bcryptHash";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { TokenService } from "../token/token.service";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";

import { SignInProps, SignInResponseProps } from "src/interfaces/system/oauth.interfaces";

@Injectable()
export class OauthService {
    private readonly adminRoles = new Set(["admin", "moderator"]);
    private readonly unauthorizedErrors = {
        "invalid": "Неверный логин или пароль!",
        "block": "Аккаунт заблокирован!",
        "token": "Недействительный токен обновления!",
        "exists":"Пользователь уже существует",
        "domen": "Домен не соответствует разрешённым!",
        "data": "Отсутствует данные для проверки",
        "role": "Авторизация доступна только администраторам и модераторам!",
    };
    constructor(
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService,
        private readonly usersService: UsersService,
        private readonly DBService: DatabaseService,

    ) {}

    async signIn(DTO: SignInProps, origin: string) {
        if (!this.configService.get("allowed_origins").has(origin)) {
            throw new UnauthorizedException(this.unauthorizedErrors.domen);
        }
        if (!DTO) throw new UnauthorizedException(this.unauthorizedErrors.data);

        const user = await this.usersService.findByEmailWithPassword(DTO.email);
        
        if (!user || !(await bcryptCompare(DTO.password, user.password))) throw new UnauthorizedException(this.unauthorizedErrors.invalid);

        if (user.blocking)  throw new UnauthorizedException(this.unauthorizedErrors.block);

        if (origin.startsWith("http://localhost:4000") && !this.adminRoles.has(user.role)) throw new UnauthorizedException(this.unauthorizedErrors.role);

        return this.generateAuthResponse(user);
    }

    async regenerateTokens(refreshToken: string) {
        const result = await this.tokenService.regenerateJwtToken(refreshToken);
        if (!result) throw new UnauthorizedException(this.unauthorizedErrors.token);

        const user = await this.usersService.findById(result.id);
        return this.generateAuthResponse(user);
    }

    async signUp(DTO: Prisma.UserCreateInput): Promise<SignInResponseProps> {
        if (await this.usersService.findByEmail(DTO.email)) {
            throw new BadRequestException(this.unauthorizedErrors.exists);
        }

        DTO.password = await bcryptHash(DTO.password, Number(this.configService.get("salt")));
        const user = await this.DBService.user.create({ data: DTO });

        return this.generateAuthResponse(user);
    }

    private async generateAuthResponse(user: Prisma.UserCreateInput | any): Promise<SignInResponseProps> {
        const payload = { id: user.id, role: user.role };
        const tokens = await this.tokenService.generateJwtTokens(payload);
        const { password, ...props } = user;
        return { ...props, ...tokens };
    }
}

