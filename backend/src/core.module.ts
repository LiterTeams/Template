import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "./modules/systems/token/token.service";
import { RedisService } from "./modules/systems/redis/redis.service";
import { UsersService } from "./modules/systems/users/users.service";
import { SessionService } from "./modules/systems/session/session.service";

@Global()
@Module({
  providers: [JwtService, TokenService, RedisService, SessionService, UsersService],
  exports: [JwtService, TokenService, RedisService, SessionService, UsersService],
})
export class CoreModule {}
