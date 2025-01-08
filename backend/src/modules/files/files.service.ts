import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { ProjectsService } from '../project/projects.service';
import { FilesPagination } from 'src/interfaces/file.interfaces';

import { returnImageObj, returnVideoObj, returnAudioObj, returnNoteObj, returnArchiveObj } from './return.file.obj';

import { getDate } from 'src/lib/getDate';
import fileConfig from 'src/const/fileConfig';
import { ArchiveExtensionEnumT, AudioExtensionEnumT, ImageExtensionEnumT, NoteExtensionEnumT, VideoExtensionEnumT } from 'src/types/enum.types';
import { MetaIF } from 'src/interfaces/system.interfaces';

@Injectable()
export class FilesService {
    constructor(
        private readonly DBService: DatabaseService,
        private readonly ProjectService: ProjectsService,
        private readonly CfgService: ConfigService,
    ){}
    
    private project = this.ProjectService.getActiveProject();

    private baseURL = this.CfgService.get<string>("UPLOAD_PATH");
    private imageExtensions = fileConfig.file.images.extensions;
    private videoExtensions = fileConfig.file.videos.extensions;
    private noteExtentions = fileConfig.file.notes.extensions;
    private audioExtentions = fileConfig.file.audio.extensions;
    private archiveExtentions = fileConfig.file.archive.extensions;
    private extensions = fileConfig.file.extensions;

    public async create(files: Express.Multer.File[]){
        const uplodaFiles = [];

        files.forEach(async file => {
            const path = file.path.replaceAll("\\", "/");
            const size = file.size;
            const extension = file.originalname.split(".").pop();
            const name = file.filename.split(`.${extension}`)[0];
            const original_name = file.originalname.split(`.${extension}`)[0];

            if (!this.extensions.includes(extension)){
                throw new NotAcceptableException(`File Extension Not Supported! - File: ${original_name} | Extension: ${extension}`);
            }

            const data = {project_id: (await this.project).id, name: name, original_name: original_name, url: `${this.baseURL}/${path}`, size: size, extension:extension}
            uplodaFiles.push(data);

            if (this.imageExtensions.includes(extension)){
                uplodaFiles.push(await this.DBService.imageStorage.create({data:{...data, extension: data.extension as ImageExtensionEnumT}}));
            }
            if (this.videoExtensions.includes(extension)){
                uplodaFiles.push(await this.DBService.videoStorage.create({data:{...data, extension: data.extension as VideoExtensionEnumT}}))
            }
            if (this.noteExtentions.includes(extension)){
                uplodaFiles.push(await this.DBService.noteStorage.create({data:{...data, extension: data.extension as NoteExtensionEnumT}}));
            }
            if (this.audioExtentions.includes(extension)){
                uplodaFiles.push(await this.DBService.audioStorage.create({data:{...data, extension: data.extension as AudioExtensionEnumT}}));
            }
            if (this.archiveExtentions.includes(extension)){
                uplodaFiles.push(await this.DBService.archiveStorage.create({data:{...data, extension: data.extension as ArchiveExtensionEnumT}}));
            }
        });
        return uplodaFiles;
    }
    public async getFilesRecently(type: "images"|"videos"|"notes"|"audio"|"archives"){
        switch(type){
            case "images": return await this.getImagesRecently();
            case "videos": return await this.getVideosRecently();
            case "notes": return await this.getNotesRecently();
            case "audio": return await this.getAudioRecently();
            case "archives": return await this.getArchivesRecently();
            default: throw new NotFoundException("File Type Undefined!");
        }
    }
    public async getFiles(type: "images"|"videos"|"notes"|"audio"|"archives", options: FilesPagination){

        const page = +options.page || 1;
        const skip = +options.skip || 24;
        const take = +options.take || 24;
        const query = options.query || "";

        switch(type){
            case "images": return await this.getImages({page,skip,take,query});
            case "videos": return await this.getVideos({page,skip,take,query});
            case "notes": return await this.getNotes({page,skip,take,query});
            case "audio": return await this.getAudio({page,skip,take,query});
            case "archives": return await this.getArchives({page,skip,take,query});
            default: throw new NotFoundException("File Type Undefined!");
        }
    }
    public async getFileById(type: "images"|"videos"|"notes"|"audio"|"archives", id: number){
        switch(type){
            case "images": return await this.getImageById(id);
            case "videos": return await this.getVideoById(id);
            case "notes": return await this.getNoteById(id);
            case "audio": return await this.getAudioById(id);
            case "archives": return await this.getArchiveById(id);
            default: throw new NotFoundException("File Type Undefined!");
        }
    }
    public async removeFile(type:"images"|"videos"|"notes"|"audio"|"archives", id: number){
        switch(type){
            case "images": return await this.removeImage(id);
            case "videos": return await this.removeVideo(id);
            case "notes": return await this.removeNote(id);
            case "audio": return await this.removeAudio(id);
            case "archives": return await this.removeArchive(id);
            default: throw new NotFoundException("File Type Undefined!");
        }
    }
    private async findFile(type:"images"|"videos"|"notes"|"audio"|"archives", id: number){
        let file = null;
        switch(type){
            case "images": file = this.DBService.imageStorage.findUnique({where:{id}}); break;
            case "videos": file = this.DBService.videoStorage.findUnique({where:{id}}); break;
            case "notes": file = this.DBService.noteStorage.findUnique({where:{id}}); break;
            case "audio": file = this.DBService.audioStorage.findUnique({where:{id}}); break;
            case "archives": file = this.DBService.archiveStorage.findUnique({where:{id}}); break;
            default: throw new NotFoundException("File Type Undefined!");
        }
        if (!file) throw new NotFoundException("File Not Found!");
        return file;
    }

    private async getImagesRecently(){
        const date = getDate("two-week");
        const meta: MetaIF = {pages:0};
        const data = await this.DBService.imageStorage.findMany({
            take: 20,
            where:{
                created_at: {
                    gte: new Date(date.last),
                    lte: new Date(date.first),
                }
            }
        });
        return {data, meta};
    }
    private async getVideosRecently(){
        const date = getDate("two-week");
        const meta: MetaIF = {pages:0};
        const data = await this.DBService.videoStorage.findMany({
            take: 20,
            where:{
                created_at: {
                    gte: new Date(date.last),
                    lte: new Date(date.first),
                }
            }
        });
        return {data, meta};
    }
    private async getNotesRecently(){
        const date = getDate("two-week");
        const meta: MetaIF = {pages:0};
        const data = await this.DBService.noteStorage.findMany({
            take: 20,
            where:{
                created_at: {
                    gte: new Date(date.last),
                    lte: new Date(date.first),
                }
            }
        });
        return {data, meta};
    }
    private async getAudioRecently(){
        const date = getDate("two-week");
        const meta: MetaIF = {pages:0};
        const data = await this.DBService.audioStorage.findMany({
            take: 6,
            where:{
                created_at: {
                    gte: new Date(date.last),
                    lte: new Date(date.first),
                }
            }
        });
        return {data, meta};
    }
    private async getArchivesRecently(){
        const date = getDate("two-week");
        const meta: MetaIF = {pages:0};
        const data = await this.DBService.archiveStorage.findMany({
            take: 20,
            where:{
                created_at: {
                    gte: new Date(date.last),
                    lte: new Date(date.first),
                }
            }
        });
        return {data, meta};
    }

    // Images
    private async getImages(options: FilesPagination){
        const slice = options.page === 1 ? 0 : options.skip * (options.page - 1);
        const query  = options.query;

        const meta: MetaIF = {pages:0};

        const data = await this.DBService.imageStorage.findMany({
            where:{
                project_id: (await this.project).id,
                original_name: {startsWith:query}
            },
            skip: slice,
            take: +options.take,
            orderBy: {created_at: "desc"},
        });

        const items = await this.DBService.imageStorage.aggregate({
            where:{original_name: {startsWith:query}},
            _count: true
        });
        meta.pages = Math.round(items._count / +options.skip);
        return {data, meta};
    }
    private async getImageById(id: number){
        return await this.DBService.imageStorage.findFirst({where: {id}, select: returnImageObj});
    }

    // Videos
    private async getVideos(options: FilesPagination){
        const slice = options.page === 1 ? 0 : options.skip * (options.page - 1);
        const query  = options.query;

        const meta: MetaIF = {pages:0};

        const data = await this.DBService.videoStorage.findMany({
            where:{original_name: {contains:query}},
            skip: slice,
            take: +options.take,
            orderBy: {created_at: "desc"},
        });

        const items = await this.DBService.videoStorage.aggregate({
            where:{original_name: {contains:query}},
            _count: true
        });
        meta.pages = Math.round(items._count / +options.skip);
        return {data, meta};
    }
    private async getVideoById(id: number){
        return await this.DBService.videoStorage.findFirst({where: {id}, select: returnVideoObj});
    }

    // Notes
    private async getNotes(options: FilesPagination){
        const slice = options.page === 1 ? 0 : options.skip * (options.page - 1);
        const query  = options.query;

        const meta: MetaIF = {pages:0};

        const data = await this.DBService.noteStorage.findMany({
            where:{original_name: {startsWith:query}},
            skip: slice,
            take: +options.take,
            orderBy: {created_at: "desc"},
        });

        const items = await this.DBService.noteStorage.aggregate({
            where:{original_name: {startsWith:query}},
            _count: true
        });
        meta.pages = Math.round(items._count / +options.skip);
        return {data, meta};
    }
    private async getNoteById(id: number){
        return await this.DBService.noteStorage.findFirst({where: {id}, select: returnNoteObj});
    }

    // Audio
    private async getAudio(options: FilesPagination){
        const slice = options.page === 1 ? 0 : options.skip * (options.page - 1);
        const query  = options.query;

        const meta: MetaIF = {pages:0};

        const data = await this.DBService.audioStorage.findMany({
            where:{original_name: {startsWith:query}},
            skip: slice,
            take: +options.take,
            orderBy: {created_at: "desc"},
        });

        const items = await this.DBService.audioStorage.aggregate({
            where:{original_name: {startsWith:query}},
            _count: true
        });
        meta.pages = Math.round(items._count / +options.skip);
        return {data, meta};
    }
    private async getAudioById(id: number){
        return await this.DBService.audioStorage.findFirst({where: {id}, select: returnAudioObj});
    }

    // Archives
    private async getArchives(options: FilesPagination){
        const slice = options.page === 1 ? 0 : options.skip * (options.page - 1);
        const query  = options.query;

        const meta: MetaIF = {pages:0};

        const data = await this.DBService.archiveStorage.findMany({
            where:{original_name: {startsWith:query}},
            skip: slice,
            take: +options.take,
            orderBy: {created_at: "desc"},
        });

        const items = await this.DBService.archiveStorage.aggregate({
            where:{original_name: {startsWith:query}},
            _count: true
        });
        meta.pages = Math.round(items._count / +options.skip);
        return {data, meta};
    }
    private async getArchiveById(id: number){
        return await this.DBService.archiveStorage.findFirst({where: {id}, select: returnArchiveObj});
    }

    private async removeImage(id: number){
        await this.findFile("images",id);
        return await this.DBService.imageStorage.delete({where:{id}});
    }
    private async removeVideo(id: number){
        await this.findFile("videos",id);
        return await this.DBService.videoStorage.delete({where:{id}});
    }
    private async removeNote(id: number){
        await this.findFile("notes",id);
        return await this.DBService.noteStorage.delete({where:{id}});
    }
    private async removeAudio(id: number){
        await this.findFile("audio",id);
        return await this.DBService.audioStorage.delete({where:{id}});
    }
    private async removeArchive(id: number){
        await this.findFile("archives",id);
        return await this.DBService.archiveStorage.delete({where:{id}});
    }
}
