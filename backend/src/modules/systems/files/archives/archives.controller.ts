import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ArchivesService } from "./archives.service";

@Controller('archives')
export class ArchivesController {
  constructor(private readonly archivesService: ArchivesService) {}
}
