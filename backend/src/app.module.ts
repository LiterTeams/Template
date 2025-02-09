import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import { ConfigModule } from "@nestjs/config";
import { CoreModule } from "./core.module";
import { RedisModule } from "./modules/systems/redis/redis.module";
import { SessionModule } from "./modules/systems/session/session.module";
import { DatabaseModule } from "./modules/systems/database/database.module";

import { OauthModule } from "./modules/systems/oauth/oauth.module";
import { TokenModule } from "./modules/systems/token/token.module";
import { UsersModule } from "./modules/systems/users/users.module";

import { UploadModule } from "./modules/systems/upload/upload.module";
import { ImagesModule } from "./modules/systems/files/images/images.module";
import { VideosModule } from "./modules/systems/files/videos/videos.module";
import { AudioModule } from "./modules/systems/files/audio/audio.module";
import { NotesModule } from "./modules/systems/files/notes/notes.module";
import { ArchivesModule } from "./modules/systems/files/archives/archives.module";

import { HttpExceptionFilter } from "./filters/http-exception.filter";

import config from "src/configs/app.config";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, load: [config]}),
        CoreModule,
        RedisModule,
        SessionModule,
        DatabaseModule,
        OauthModule,
        TokenModule,
        UsersModule,
        UploadModule,
        ImagesModule,
        VideosModule,
        AudioModule,
        NotesModule,
        ArchivesModule,
    ],
    providers: [
        { provide: APP_FILTER, useClass: HttpExceptionFilter},
    ],
})
export class AppModule {}
