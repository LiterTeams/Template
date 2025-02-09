import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { UsersService } from "src/modules/systems/users/users.service";
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
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();
        const session = JSON.parse(req.cookies.session);
        const userId = session["sessionId"];
        const accessToken = req.cookies.accessToken;

        if (!session){
            throw new UnauthorizedException("Доступ запрещён. Войдите чтобы получить доступ к ресурсу!");
        }

        const user = await this.userService.findById(+userId || -1);

        try {
            await this.tokenService.validateAccessToken(accessToken);
            req.user = user;
            return true;
        } catch (error) {
            const refreshToken = await this.redisService.getRefreshToken(userId);
            if (!refreshToken) throw new UnauthorizedException("Refresh token is required");
            try {
                const newAccessToken = await this.tokenService.refreshAccessToken(user.id);
                await this.tokenService.saveAcceesToken(newAccessToken, res);
                req.user = await this.tokenService.validateAccessToken(newAccessToken);
                return true;
            } catch (refreshError) {
                throw new UnauthorizedException("Invalid refresh token");
            }
        }
    }
}

export default AuthGuard;