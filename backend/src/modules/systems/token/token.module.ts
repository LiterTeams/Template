import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "../redis/redis.service";

@Module({
    providers: [TokenService, JwtService, RedisService],
    exports: [TokenService, JwtService, RedisService],
})
export class TokenModule {}
