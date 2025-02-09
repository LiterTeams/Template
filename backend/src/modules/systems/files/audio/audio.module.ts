import { Module } from "@nestjs/common";
import { AudioService } from "./audio.service";
import { AudioController } from "./audio.controller";
import { UploadService } from "../../upload/upload.service";

@Module({
  controllers: [AudioController],
  providers: [AudioService, UploadService],
})
export class AudioModule {}
