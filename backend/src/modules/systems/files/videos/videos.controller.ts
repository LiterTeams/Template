import { Controller, Get, HttpStatus, HttpCode, Delete, Param } from "@nestjs/common";
import { VideosService } from "./videos.service";

import Auth from "src/decorators/auth.decorator";
import Roles from "src/decorators/roles.decorator";

@Auth("root","admin","moderator")
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}
    
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
        return this.videosService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  @Roles("root")
  async remove(@Param("id") id: string) {
    return this.videosService.remove(+id);
  }
}
