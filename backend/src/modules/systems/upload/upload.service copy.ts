import { Injectable, NotAcceptableException } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { DatabaseService } from "../database/database.service";
import config from "src/const/files";
import fileDestructurization from "src/lib/fileDestructurization";
import { FileIF } from "src/interfaces/system/file.interfaces";
import { ConfigService } from "@nestjs/config";
import Storage from "./storage";

@Injectable()
export class UploadService {

    private readonly rootDir = process.cwd();
    private readonly uploadDir = join(this.rootDir, config.rootFolder);
    private readonly uploadImageDir = join(this.uploadDir, config.image.folder);
    private readonly uploadVideoDir = join(this.uploadDir, config.video.folder);
    private readonly uploadAudioDir = join(this.uploadDir, config.audio.folder);
    private readonly uploadNoteDir = join(this.uploadDir, config.note.folder);
    private readonly uploadArchiveDir = join(this.uploadDir, config.archive.folder);
    private baseURL = this.CfgService.get("SERVER_URL");

    constructor(
        private readonly DBService: DatabaseService,
        private readonly CfgService: ConfigService,
        public readonly storage: Storage,
    ){
        this.ensureDirectoryExists([this.uploadDir,this.uploadImageDir,this.uploadVideoDir,this.uploadAudioDir,this.uploadNoteDir,this.uploadArchiveDir]);
    }

    private ensureDirectoryExists(dirs: string[]): void {
        dirs.forEach((dir) => {
            if (!existsSync(dir)) {
                console.log(`Directory does not exist. Creating: ${dir}`);
                mkdirSync(dir, { recursive: true });
            }
        });
    }

    async saveFiles(files: FileIF[]) {
        const newFiles = await Promise.all(
            files.map(async (file) => {
                const { name, original_name, path, size, extension } = fileDestructurization(file);
                const data = { name, original_name, size, extension, url: `${this.baseURL}/${path}`};
    
                switch(true) {
                    case config.image.extensions.includes(extension):
                        return this.DBService.image.create({ data });
                    case config.video.extensions.includes(extension):
                        return this.DBService.video.create({ data });
                    case config.audio.extensions.includes(extension):
                        return this.DBService.audio.create({ data });
                    case config.note.extensions.includes(extension):
                        return this.DBService.note.create({ data });
                    case config.archive.extensions.includes(extension):
                        return this.DBService.archive.create({ data });
                    default:
                        throw new NotAcceptableException(`File Extension Not Supported! - File: ${original_name} | Extension: ${extension}`);
                }
            })
        );
        return newFiles;
    }
}