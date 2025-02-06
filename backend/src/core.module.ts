import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "./modules/systems/token/token.service";
import { RedisService } from "./modules/systems/redis/redis.service";
import { UsersService } from "./modules/systems/users/users.service";

@Global()
@Module({
  providers: [JwtService, TokenService, RedisService, UsersService],
  exports: [JwtService, TokenService, RedisService, UsersService],
})
export class CoreModule {}
