import { Controller, Get, Post, HttpCode, UseGuards, UseInterceptors, UploadedFiles, Param, BadRequestException } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import Storage from "./storage";
import Filter from "./filter";
import { FileValidationPipe } from "src/pipes/FileValidationPipe";

import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";
import { Auth } from "src/decorators/auth.decorator";
import { FileIF } from "src/interfaces/system/file.interfaces";

@Controller("upload")
export class UploadController {

    constructor(private readonly uploadService: UploadService) {}

    @HttpCode(200)
    @Post()
    // @Auth()
    // @Roles(Role.admin,Role.moderator,Role.user)
    // @UseGuards(RolesGuard)
    @UseInterceptors(FilesInterceptor("file",32,{storage:Storage, fileFilter:Filter}))
    async uploadFile(@UploadedFiles(FileValidationPipe) files: FileIF[]) {
        return this.uploadService.saveFiles(files);
    }

}
