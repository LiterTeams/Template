import { Controller, Get, Post, UseInterceptors, UploadedFiles, HttpCode, UseGuards, Param, Query, Delete } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { fileFilterHelper } from './fille.helper';
import { FilesPagination } from 'src/interfaces/file.interfaces';

@Controller("files")
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Get("recently/:recently")
    async getFileRecently(@Param("recently") recently: "images" | "videos" | "notes" | "audio" | "archives"){
        return await this.filesService.getFilesRecently(recently);
    }

    @Get("/images")
    async getImages(@Query() paginationDTO: FilesPagination){
        return await this.filesService.getFiles("images",paginationDTO);
    }
    @Get("/images/:id")
    async getImageById(@Param("id") id: string){
        return await this.filesService.getFileById("images", +id);
    }

    @Get("/videos")
    async getVideos(@Query() paginationDTO: FilesPagination){
        return await this.filesService.getFiles("videos",paginationDTO);
    }
    @Get("/videos/:id")
    async getVideoById(@Param("id") id: string){
        return await this.filesService.getFileById("videos", +id);
    }

    @Get("/notes")
    async getNotes(@Query() paginationDTO: FilesPagination){
        return await this.filesService.getFiles("notes",paginationDTO);
    }
    @Get("/notes/:id")
    async getNoteById(@Param("id") id: string){
        return await this.filesService.getFileById("notes", +id);
    }

    @Get("/audio")
    async getAudio(@Query() paginationDTO: FilesPagination){
        return await this.filesService.getFiles("audio",paginationDTO);
    }
    @Get("/audio/:id")
    async getAudioById(@Param("id") id: string){
        return await this.filesService.getFileById("audio", +id);
    }

    @Get("/archives")
    async getArchives(@Query() paginationDTO: FilesPagination){
        return await this.filesService.getFiles("archives",paginationDTO);
    }
    @Get("/archives/:id")
    async getArchiveById(@Param("id") id: string){
        return await this.filesService.getFileById("archives", +id);
    }

    @HttpCode(200)
    @Post()
    @UseInterceptors(FilesInterceptor("file", 32, {storage: fileStorage, fileFilter: fileFilterHelper}))
    async publicUpload(@UploadedFiles() files: Express.Multer.File[]){
        return files;
    }

    @HttpCode(200)
    @Post("/storage")
    @UseInterceptors(FilesInterceptor("file", 32, {storage: fileStorage, fileFilter: fileFilterHelper}))
    async storageUpload(@UploadedFiles() files: Express.Multer.File[]){
        return await this.filesService.create(files);
    }

    @HttpCode(200)
    @Delete("/images/:id")
    async removeImage(@Param("id") id: string){
        return await this.filesService.removeFile("images", +id);
    }

    @HttpCode(200)
    @Delete("/videos/:id")
    async removeVideo(@Param("id") id: string){
        return await this.filesService.removeFile("videos", +id);
    }

    @HttpCode(200)
    @Delete("/notes/:id")
    async removeNote(@Param("id") id: string){
        return await this.filesService.removeFile("notes", +id);
    }

    @HttpCode(200)
    @Delete("/audio/:id")
    async removeAudio(@Param("id") id: string){
        return await this.filesService.removeFile("audio", +id);
    }

    @HttpCode(200)
    @Delete("/archives/:id")
    async removeArchive(@Param("id") id: string){
        return await this.filesService.removeFile("archives", +id);
    }
}
