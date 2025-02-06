import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { ResendModule } from "nestjs-resend";
import { SessionModule } from "./modules/systems/session/session.module";
import { DatabaseModule as Database } from "./modules/systems/database/database.module";
import { RedisModule } from "./modules/systems/redis/redis.module";
import { OauthModule } from "./modules/systems/oauth/oauth.module";
import { UsersModule } from "./modules/systems/users/users.module";
import { TokenModule } from "./modules/systems/token/token.module";
import { CoreModule } from "./core.module";
import { UploadModule } from "./modules/systems/upload/upload.module";
import { MailModule } from './modules/systems/mail/mail.module';
import { HttpExceptionFilter } from "./filters/http-exception.filter";

import config from "src/configs/app.config";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, load: [config]}),
        ResendModule.forRoot({apiKey: "re_7icyT6w4_2GFrCfswXcQCbtskHa5bTLme"}),
        CoreModule,
        RedisModule,
        SessionModule,
        Database,
        OauthModule,
        TokenModule,
        UsersModule,
        UploadModule,
        MailModule,
    ],
    providers: [
        { provide: APP_FILTER, useClass: HttpExceptionFilter},
    ],
})
export class AppModule {}
