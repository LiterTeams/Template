import { Injectable, NotAcceptableException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { MFile } from "./mfile.class";
import fileConfig from "src/const/fileConfig";
import { ImageExtensionEnumT, NoteExtensionEnumT, VideoExtensionEnumT, ArchiveExtensionEnumT, AudioExtensionEnumT } from "src/types/enum.types";

@Injectable()
export class UploadService {

    constructor(private readonly DBService: DatabaseService){}

    private protocol = "http";
    private host = "localhost";
    private port = "5000";
    private folder = "uploads";
    private baseURL = `${this.protocol}://${this.host}:${this.port}/${this.folder}`;
    private imageExtensions = fileConfig.file.images.extensions;
    private videoExtensions = fileConfig.file.videos.extensions;
    private noteExtentions = fileConfig.file.notes.extensions;
    private audioExtentions = fileConfig.file.audio.extensions;
    private archiveExtentions = fileConfig.file.archive.extensions;
    private extensions = fileConfig.file.extensions;

    async saveFiles(files: MFile[]) {
        files.forEach(async file => {
            const path = file.path.replaceAll("\\", "/");
            const size = file.size || 0;
            const extension = file.originalname.split(".").pop();
            const name = file.filename.split(`.${extension}`)[0];
            const original_name = file.originalname.split(`.${extension}`)[0];

            if (!this.extensions.includes(extension)){
                throw new NotAcceptableException(`File Extension Not Supported! - File: ${original_name} | Extension: ${extension}`);
            }

            const data = {name: name, original_name: original_name, url: `${this.baseURL}/${path}`, size: size, extension:extension}

            if (this.imageExtensions.includes(extension)){
                await this.DBService.imageStorage.create({data:{...data, extension: data.extension as ImageExtensionEnumT}});
            }
            if (this.videoExtensions.includes(extension)){
                await this.DBService.videoStorage.create({data:{...data, extension: data.extension as VideoExtensionEnumT}});
            }
            if (this.noteExtentions.includes(extension)){
                await this.DBService.noteStorage.create({data:{...data, extension: data.extension as NoteExtensionEnumT}});
            }
            if (this.audioExtentions.includes(extension)){
                await this.DBService.audioStorage.create({data:{...data, extension: data.extension as AudioExtensionEnumT}});
            }
            if (this.archiveExtentions.includes(extension)){
                await this.DBService.archiveStorage.create({data:{...data, extension: data.extension as ArchiveExtensionEnumT}});
            }
        });

        return files;
    }
}