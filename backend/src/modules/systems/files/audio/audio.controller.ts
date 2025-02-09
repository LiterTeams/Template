import { Controller, Delete, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { AudioService } from "./audio.service";

import Auth from "src/decorators/auth.decorator";
import Roles from "src/decorators/roles.decorator";

@Auth("root","admin","moderator")
@Controller("audio")
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.audioService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  @Roles("root")
  async remove(@Param("id") id: string) {
    return this.audioService.remove(+id);
  }
}
