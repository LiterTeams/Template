import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";
import { UploadService } from "../../upload/upload.service";

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, UploadService],
})
export class ImagesModule {}
