import { Module } from "@nestjs/common";
import { OauthService } from "./oauth.service";
import { OauthController } from "./oauth.controller";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [UsersModule],
    controllers: [OauthController],
    providers: [OauthService, JwtStrategy],
    exports: [OauthService],
})
export class OauthModule {}
