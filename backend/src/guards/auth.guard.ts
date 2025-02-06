import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/modules/systems/users/users.service";
import { Request, Response } from "express";
import { TokenService } from "src/modules/systems/token/token.service";
import { RedisService } from "src/modules/systems/redis/redis.service";

@Injectable()
class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UsersService,
        private readonly tokenService: TokenService,
        private readonly redisService: RedisService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const authHeader = request.headers["authorization"];
        const accessToken = authHeader?.split(" ")[1];

        if (!accessToken || !request.session.user_id){
            throw new UnauthorizedException("Доступ запрещён. Войдите чтобы получить доступ к ресурсу!");
        }

        const user = await this.userService.findById(+request.session.user_id || -1);

        try {
            await this.tokenService.validateAccessToken(accessToken);
            request.user = user;
            return true;
        } catch (error) {
            const refreshToken = await this.redisService.get(`refresh:${user.id}`); // Или достаём из заголовков
            if (!refreshToken) throw new UnauthorizedException("Refresh token is required");

            try {
                const { accessToken: newAccessToken } = await this.tokenService.refreshAccessToken(user.id, request, response);

                response.setHeader("Authorization", `Bearer ${newAccessToken}`);
                request.user = await this.tokenService.validateAccessToken(newAccessToken);

                return true;
            } catch (refreshError) {
                throw new UnauthorizedException("Invalid refresh token");
            }
        }
    }
}

export default AuthGuard;