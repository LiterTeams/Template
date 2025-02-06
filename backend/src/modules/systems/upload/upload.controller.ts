import { 
    Controller, 
    Post, 
    HttpCode, 
    UseInterceptors, 
    UploadedFiles,
    UseFilters,
    HttpStatus,
    UseGuards,
    Delete,
    Body,
} from "@nestjs/common";
import { CustomFilesInterceptor } from "./custon.files.interceptor";
import { UploadService } from "./upload.service";
import { FileValidationPipe } from "src/pipes/FileValidationPipe";

import { FileProps } from "src/types/system/file.interfaces";
import { MulterExceptionFilter } from "./multer.exception.filter";

import AuthGuard from "src/guards/auth.guard";
import RolesGuard from "src/guards/roles.guard";

import Roles from "src/decorators/roles.decorator";

// @UseGuards(AuthGuard, RolesGuard)
@UseFilters(MulterExceptionFilter)
@Controller("upload")
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    // @Roles("moderator")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(CustomFilesInterceptor)
    async uploadFile(@UploadedFiles(FileValidationPipe) files: FileProps[]) {
        return this.uploadService.saveFiles(files);
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    async removeFiles(@Body() files: string[] | string) {
        return this.uploadService.removeFiles(files);
    }
}