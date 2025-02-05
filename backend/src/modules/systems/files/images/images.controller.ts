import { Controller, Get, HttpCode } from "@nestjs/common";
import { ImagesService } from "./images.service";

@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async findImages() {
    return await this.imagesService.findImages();
  }

}
