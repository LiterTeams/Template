import { Module } from "@nestjs/common";
import { ArchivesService } from "./archives.service";
import { ArchivesController } from "./archives.controller";
import { UploadService } from "../../upload/upload.service";

@Module({
  controllers: [ArchivesController],
  providers: [ArchivesService, UploadService],
})
export class ArchivesModule {}
