import { 
    Controller, 
    Post, 
    HttpCode, 
    UseInterceptors, 
    UploadedFiles, 
    UseGuards, 
    UseFilters,
    HttpStatus
} from "@nestjs/common";
import { CustomFilesInterceptor } from "./custon.files.interceptor";
import { UploadService } from "./upload.service";
import { FileValidationPipe } from "src/pipes/FileValidationPipe";

import AuthGuard from "src/guards/AuthGuard";
import RolesGuard from "src/guards/RolesGuard";
import Roles from "src/decorators/Roles";
import { FileIF } from "src/interfaces/system/file.interfaces";
import { MulterExceptionFilter } from "./multer.exception.filter";

@UseFilters(MulterExceptionFilter)
@Controller("upload")
@UseGuards(AuthGuard, RolesGuard)
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    @Roles("root")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(CustomFilesInterceptor)
    async uploadFile(@UploadedFiles(FileValidationPipe) files: FileIF[]) {
        return this.uploadService.saveFiles(files);
    }
}