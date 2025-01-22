import { Controller, Post, UseInterceptors, UploadedFiles, HttpCode } from "@nestjs/common";
import { ImagesService } from "./images.service";

@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
}
