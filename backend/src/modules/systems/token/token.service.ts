import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "../redis/redis.service";
import { SessionService } from "../session/session.service";
import { Response } from "express";

import { TokenProps, PayloadProps } from "src/types/system/tokens.interfaces";

import timeToSeconds from "src/lib/timeToSeconds";
import timeToMs from "src/lib/timeToMs";

@Injectable()
export class TokenService {
    
    private readonly secretJWT = this.configService.get<string>("secretJWT", "defaultSecret");
    private readonly httpOnly = this.configService.get<boolean>("sessionHTTPOnly", true);
    private readonly secure = this.configService.get<boolean>("sessionSecure", true);
    private readonly sameSite = this.configService.get<string>("sessionSameSite", "lax") as "lax" | "strict" | "none";

    private readonly accessTokenTTL = this.configService.get<string>("expireAccessJWT", "15m");
    private readonly refreshTokenTTL = this.configService.get<string>("expireRefreshJWT", "7d");

    private readonly accessTokenTTLS = timeToSeconds(this.accessTokenTTL); // Time To Life Seconds;
    private readonly accessTokenTTLMS = timeToMs(this.accessTokenTTL); // Time To Life Mile Seconds;

    private readonly accessTokenJWTOptions = {
        secret: this.secretJWT,
        expiresIn: this.accessTokenTTL,
    }
    private readonly refreshTokenJWTOptions = {
        secret: this.secretJWT,
        expiresIn: this.refreshTokenTTL,
    }

    private readonly cookieOptions = {
        httpOnly: this.httpOnly,
        secure: this.secure,
        maxAge: this.accessTokenTTLMS,
        sameSite: this.sameSite,
    };
    
    constructor(
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
        private readonly configService: ConfigService,
        private readonly sessionService: SessionService,
    ) {}

    public async generateTokens(payload:PayloadProps): Promise<TokenProps> {
        const accessToken = await this.generateAccessToken(payload);
        const refreshToken = await this.generateRefreshToken(payload);
        await this.redisService.setRefreshToken(payload.id, refreshToken);
        return { accessToken, refreshToken }
    }

    private async generateAccessToken(payload:PayloadProps) {
        return this.jwtService.sign(payload, this.accessTokenJWTOptions);
    }

    private async generateRefreshToken(payload:PayloadProps) {
        return this.jwtService.sign(payload, this.refreshTokenJWTOptions);
    }

    private async getRefreshToken(userId: string | number) {
        const token = await this.redisService.getRefreshToken(userId);
        const TTL = await this.redisService.getRefreshTokenTTL(userId);
        return { token, TTL };
    }

    public async refreshAccessToken(userId: number, accessToken?: string) {
        try {
            const { token: storedRefreshToken, TTL: refreshTokenTTL } = await this.getRefreshToken(userId);
            const { role } = await this.jwtService.verifyAsync(storedRefreshToken, { secret: this.secretJWT });
            
            const payload = {id: userId, role: role}
            const newAccessToken = await this.generateAccessToken(payload);
            
            if (refreshTokenTTL === -2){
                await this.logout(userId, accessToken);
                await this.sessionService.destroySession(userId);
                throw new UnauthorizedException("Refresh token expired");
            }

            if (refreshTokenTTL < timeToSeconds("1h")) {
                await this.redisService.setRefreshToken(userId, await this.generateRefreshToken(payload));
            }

            return newAccessToken;
        } catch( error ) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }
    }

    public async validateRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
        const { token, TTL } = await this.getRefreshToken(userId);
        return token === refreshToken && TTL > 0;
    }

    public async validateAccessToken(accessToken: string) {
        if (await this.redisService.isTokenBlacklisted(accessToken)) 
            throw new UnauthorizedException("Token is blacklisted");
        try {
            return this.jwtService.verify(accessToken, { secret: this.secretJWT });
        } catch (error) {
            if (error.name === "TokenExpiredError") 
                throw new UnauthorizedException("Access token expired");
            if (error.name === "JsonWebTokenError") 
                throw new UnauthorizedException("Invalid access token");
            throw new UnauthorizedException("Access token is invalid or expired");
        }
    }

    public async logout(userId: string | number, accessToken: string) {
        await this.getRefreshToken(userId);
        await this.redisService.removeRefreshToken(userId);
        await this.sessionService.destroySession(userId);
        await this.moveToBlacklistToken(accessToken);
    }
    
    public async moveToBlacklistToken(accessToken: string) {
        if (!accessToken) return;
        await this.redisService.blacklistToken(accessToken, this.accessTokenTTLS);
    }
    
    public async isTokenBlacklisted(token: string): Promise<boolean> {
        return await this.redisService.isTokenBlacklisted(token);
    }

    public async saveAcceesToken(accessToken: string, res: Response) {
        return res.cookie("accessToken", accessToken, this.cookieOptions);
    }
}
