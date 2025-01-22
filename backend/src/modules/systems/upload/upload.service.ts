import { Injectable, NotAcceptableException } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { DatabaseService } from "../database/database.service";
import config from "src/const/files";
import fileDestructurization from "src/lib/fileDestructurization";
import { FileIF } from "src/interfaces/system/file.interfaces";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UploadService {

    private readonly rootDir = process.cwd();
    private readonly uploadDir = join(this.rootDir, config.rootFolder);
    private readonly uploadImageDir = `${this.uploadDir}\\${config.image.folder}`;
    private readonly uploadVideoDir = `${this.uploadDir}\\${config.video.folder}`;
    private readonly uploadAudioDir = `${this.uploadDir}\\${config.audio.folder}`;
    private readonly uploadNoteDir = `${this.uploadDir}\\${config.note.folder}`;
    private readonly uploadArchiveDir = `${this.uploadDir}\\${config.archive.folder}`;
    private baseURL = this.CfgService.get("SERVER_URL");

    constructor(
        private readonly DBService: DatabaseService,
        private readonly CfgService: ConfigService,
    ){
        this.ensureDirectoryExists([this.uploadDir,this.uploadImageDir,this.uploadVideoDir,this.uploadAudioDir,this.uploadNoteDir,this.uploadArchiveDir]);
    }

    private ensureDirectoryExists(dirs: string[]): void {
        for ( const dir of dirs ){
            if (!existsSync(dir)) {
                console.log("No FILES")
                mkdirSync(dir, { recursive: true });
            }
        }
    }

    async saveFiles(files: FileIF[]) {
        const newFiles = [];
        for (const file of files) {
            const { name, original_name, path, size, extension } = fileDestructurization(file)

            const data = {name: name, original_name: original_name, url: `${this.baseURL}/${path}`, size: size, extension:extension}

            switch(true){
                case config.image.extensions.includes(extension): newFiles.push(await this.DBService.image.create({data:data})); break;
                case config.video.extensions.includes(extension): newFiles.push(await this.DBService.video.create({data:data})); break;
                case config.audio.extensions.includes(extension): newFiles.push(await this.DBService.audio.create({data:data})); break;
                case config.note.extensions.includes(extension): newFiles.push(await this.DBService.note.create({data:data})); break;
                case config.archive.extensions.includes(extension): newFiles.push(await this.DBService.archive.create({data:data})); break;
                default: throw new NotAcceptableException(`File Extension Not Supported! - File: ${original_name} | Extension: ${extension}`);
            }
        };
        return newFiles;
    }
}