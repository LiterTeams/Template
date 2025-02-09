import { Module } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NotesController } from "./notes.controller";
import { UploadService } from "../../upload/upload.service";

@Module({
  controllers: [NotesController],
  providers: [NotesService, UploadService],
})
export class NotesModule {}
