import { Controller, Get, HttpStatus, HttpCode, Delete, Param } from '@nestjs/common';
import { NotesService } from './notes.service';

import Auth from "src/decorators/auth.decorator";
import Roles from "src/decorators/roles.decorator";

@Auth("root","admin","moderator")
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
      return this.notesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  @Roles("root")
  async remove(@Param("id") id: string) {
    return this.notesService.remove(+id);
  }
}
