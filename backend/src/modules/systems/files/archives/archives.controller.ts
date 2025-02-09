import { Controller, Delete, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { ArchivesService } from "./archives.service";

import Auth from "src/decorators/auth.decorator";
import Roles from "src/decorators/roles.decorator";

@Auth("root","admin","moderator")
@Controller("archives")
export class ArchivesController {
  constructor(private readonly archivesService: ArchivesService) {}
  
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.archivesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  @Roles("root")
  async remove(@Param("id") id: string) {
    return this.archivesService.remove(+id);
  }

}
