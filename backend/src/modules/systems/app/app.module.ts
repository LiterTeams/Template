import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule as Config } from "@nestjs/config";
import { DatabaseModule as Database } from "../database/database.module";
import { UsersModule } from "src/modules/users/users.module";
import { TokenModule } from "src/modules/token/token.module";
import { UploadModule as Upload } from "../upload/upload.module";

import config from "src/configs/app.config";

@Module({
    imports: [
        Config.forRoot({isGlobal: true, load: [config]}),
        Database,
        TokenModule,
        UsersModule,
        Upload,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
