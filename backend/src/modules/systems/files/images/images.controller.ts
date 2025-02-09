import { Controller, Get, HttpCode, HttpStatus, Delete, Param } from "@nestjs/common";
import { ImagesService } from "./images.service";

import Auth from "src/decorators/auth.decorator";
import Roles from "src/decorators/roles.decorator";

@Auth("root","admin","moderator")
@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.imagesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  @Roles("root")
  async remove(@Param("id") id: string) {
    return this.imagesService.remove(+id);
  }

}
