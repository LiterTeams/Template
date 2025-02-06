import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { TokenService } from "../token/token.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [UploadController],
  providers: [UploadService, TokenService, JwtService],
  exports: [UploadService],
})
export class UploadModule {}
