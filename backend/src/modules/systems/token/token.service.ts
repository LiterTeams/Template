import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "../redis/redis.service";
import { Request, Response } from "express";

import errors from "src/const/errors";

import { TokenProps } from "src/types/system/tokens.interfaces";

import timeToSeconds from "src/lib/timeToSeconds";

interface PayloadIF {
    id:number;
    role:string;
}

@Injectable()
export class TokenService {
    
    private readonly jwtOptions = {
        secret: this.configService.get<string>("secretJWT", "defaultSecret"),
        expireAccessToken: this.configService.get<string>("expireAccessJWT", "15m"),
        expireRefreshToken: this.configService.get<string>("expireRefreshJWT", "7d"),
    };
    
    constructor(
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
        private readonly configService: ConfigService,
    ) {}

    public async generateTokens(payload:PayloadIF): Promise<TokenProps> {
        const accessToken = await this.generateAccessToken(payload);
        const refreshToken = await this.generateRefreshToken(payload);
        await this.redisService.set(`refresh:${payload.id}`, refreshToken, timeToSeconds(this.jwtOptions.expireRefreshToken));
        return { accessToken, refreshToken }
    }

    private async generateAccessToken(payload:PayloadIF) {
        const options = { secret: this.jwtOptions.secret, expiresIn: this.jwtOptions.expireAccessToken}
        return this.jwtService.sign(payload, options);
    }

    private async generateRefreshToken(payload:PayloadIF) {
        const options = { secret: this.jwtOptions.secret, expiresIn: this.jwtOptions.expireRefreshToken}
        return this.jwtService.sign(payload, options);
    }

    private getRefreshToken(user_id: string | number) {
        return this.redisService.get(`refresh:${user_id}`);
    }

    private async getRefreshTokenTTL(user_id: string | number) {
        return await this.redisService.timeToLife(`refresh:${user_id}`);
    }

    public async refreshAccessToken(user_id: number, req: Request, res: Response) {
        const options = { secret: this.jwtOptions.secret }
        try {

            const storedRefreshToken = await this.getRefreshToken(user_id);
            if (!storedRefreshToken) throw new UnauthorizedException("Invalid refresh token");

            const decoded = await this.jwtService.verifyAsync(storedRefreshToken, options);

            const payload = {id: user_id, role: decoded.role}
            const newAccessToken = await this.generateAccessToken(payload);
            
            const refreshTokenTTL = await this.getRefreshTokenTTL(user_id);
            if (refreshTokenTTL === -2){
                const authHeader = req.headers["authorization"];
                const accessToken = authHeader?.split(" ")[1];
                await this.logout(user_id, accessToken);
                if (req.session){
                    req.session.destroy((error) => {
                        if (error) throw new InternalServerErrorException(errors.sessionDestroy.message);
                        res.clearCookie(this.configService.get<string>("sessionName", "session"));
                    });
                }
                throw new UnauthorizedException("Invalid refresh token");
            }
            let newRefreshToken: string | undefined;

            if (refreshTokenTTL < 60 * 60) {
                newRefreshToken = await this.generateRefreshToken(payload);
                await this.redisService.set(`refresh:${user_id}`, newRefreshToken, timeToSeconds(this.jwtOptions.expireRefreshToken));
            }

            return { accessToken: newAccessToken };
        } catch( error ) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }
    }

    public async validateRefreshToken(user_id: string, token: string): Promise<boolean> {
        const storedToken = await this.redisService.get(`refresh:${user_id}`);
        return storedToken === token;
    }

    public async validateAccessToken(accessToken: string) {
        if (await this.redisService.isTokenBlacklisted(accessToken)) {
            throw new UnauthorizedException("Access token is invalid or expired");
        }
        try {
            return this.jwtService.verify(accessToken, { secret: this.jwtOptions.secret });
        } catch {
            throw new UnauthorizedException("Access token is invalid or expired");
        }
    }

    public async logout(user_id: string | number, accessToken: string) {
        if (!(await this.redisService.del(`refresh:${user_id}`))) {
            throw new InternalServerErrorException("Не удалось выйти из системы. Возможно ошибка на сервере");
        }
        await this.blacklistToken(accessToken, timeToSeconds(this.jwtOptions.expireAccessToken));
    }
    
    public async blacklistToken(token: string, TTL: number) {
        return await this.redisService.blacklistToken(token, TTL);
    }
    
    public async isTokenBlacklisted(token: string): Promise<boolean> {
        return await this.redisService.isTokenBlacklisted(token);
    }
}
