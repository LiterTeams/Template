import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule as Config } from "@nestjs/config";
import { DatabaseModule as Database } from "../database/database.module";
import { UsersModule as User } from "../users/users.module";
import { TokenModule as Token } from "../token/token.module";
import { UploadModule as Upload } from "../upload/upload.module";
import { FilesModule as Files } from "../files/files.module";

import config from "../../configs/config";

@Module({
    imports: [
        Config.forRoot({isGlobal: true, load: [config]}),
        Database,
        Token,
        Files,
        User,
        Upload,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
