import { Module } from "@nestjs/common";
import { VideosService } from "./videos.service";
import { VideosController } from "./videos.controller";
import { UploadService } from "../../upload/upload.service";

@Module({
  controllers: [VideosController],
  providers: [VideosService, UploadService],
})
export class VideosModule {}
