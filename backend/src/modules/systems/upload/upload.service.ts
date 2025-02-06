import { Injectable } from "@nestjs/common";
import { existsSync, mkdirSync, unlinkSync } from "fs";
import { join } from "path";
import { DatabaseService } from "../database/database.service";
import config from "src/const/files";
import fileDestructurization from "src/lib/fileDestructurization";
import { FileProps } from "src/types/system/file.interfaces";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";

@Injectable()
export class UploadService {

    private readonly rootDir = process.cwd();
    private readonly uploadDir = join(this.rootDir, config.rootFolder);
    private readonly uploadImageDir = join(this.uploadDir, config.image.folder);
    private readonly uploadVideoDir = join(this.uploadDir, config.video.folder);
    private readonly uploadAudioDir = join(this.uploadDir, config.audio.folder);
    private readonly uploadNoteDir = join(this.uploadDir, config.note.folder);
    private readonly uploadArchiveDir = join(this.uploadDir, config.archive.folder);
    private allowedFolders = ["notes", "images", "videos", "archives", "audio"];
    private baseURL = this.CfgService.get("SERVER_URL");

    constructor(
        private readonly DBService: DatabaseService,
        private readonly CfgService: ConfigService,
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

    private generateFileType(extension: string, original_name) {
        switch(true){
            case config.image.extensions.includes(extension): return "image";
            case config.video.extensions.includes(extension): return "video";
            case config.audio.extensions.includes(extension): return "audio";
            case config.note.extensions.includes(extension): return "note";
            default: return "archive";
        }
    }

    async saveFiles(files: FileProps[]) {
        const filteredFiles = files.filter((file) => config.extensions.includes(file.originalname.split(".").pop()));
        const results = await Promise.allSettled(
            filteredFiles.map(async (file) => {
                try {
                    const { name, original_name, path, size, extension } = fileDestructurization(file);
                    const data: Prisma.FileStorageCreateInput = {
                        name,
                        type: this.generateFileType(extension, original_name),
                        original_name,
                        size,
                        extension,
                        url: `${this.baseURL}/${path}`,
                    };
                    return await this.DBService.fileStorage.create({ data });
                } catch (error) {
                    console.error(`Ошибка при обработке файла ${file.originalname}:`, error);
                    return null;
                }
            })
        );
        
        const newFiles = results
            .filter(result => result.status === "fulfilled")
            .map(result => (result as PromiseFulfilledResult<any>).value);
        
        console.log("Файлы, успешно сохранённые в БД:", newFiles);
        return newFiles;
    }

    async removeFiles(files: string | string[]): Promise<void> {
        if (!files) return;

        const filesArray = Array.isArray(files) ? files : [files];

        try {
            await Promise.all(
                filesArray.map(async (file) => {
                    const possiblePaths = this.allowedFolders.map(folder =>
                        join(this.uploadDir, folder, file)
                    );

                    let fileDeleted = false;

                    for (const filePath of possiblePaths) {
                        try {
                            unlinkSync(filePath);
                            console.log(`✅ Файл удалён: ${filePath}`);
                            fileDeleted = true;
                            break;
                        } catch (err: any) {
                            if (err.code === "ENOENT") {
                                continue;
                            } else {
                                console.error(`🚨 Ошибка при удалении файла: ${filePath}`, err);
                                throw new Error("Ошибка удаления файлов");
                            }
                        }
                    }

                    if (!fileDeleted) {
                        console.warn(`⚠️ Файл не найден в папках: ${file}`);
                    }
                })
            );
        } catch (error) {
            console.error("🚨 Ошибка при удалении файлов:", error);
            throw new Error("Ошибка удаления файлов");
        }
    }
}