import { Controller, Get, Post, HttpCode, UseGuards, UseInterceptors, UploadedFiles, Param, BadRequestException } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { fileStorage } from "./storage";
import { FileValidatePipe } from "src/pipes/FileValidate.pipe";

import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";
import { Auth } from "src/decorators/auth.decorator";

@Controller("upload")
export class UploadController {

    constructor(private readonly uploadService: UploadService) {}

    @HttpCode(200)
    @Post()
    // @Auth()
    // @Roles(Role.admin,Role.moderator,Role.user)
    // @UseGuards(RolesGuard)
    @UseInterceptors(FilesInterceptor("file",32,{storage:fileStorage}))
    async uploadFile(@UploadedFiles(new FileValidatePipe()) files: Express.Multer.File[]) {
        return this.uploadService.saveFiles(files);
    }

}
