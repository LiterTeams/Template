import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { MFile } from "src/modules/upload/mfile.class";
import fileConfig from "../const/fileConfig";

@Injectable()
export class FileValidatePipe implements PipeTransform {

    private extensionError = {message: "Неподдерживаемое расширение файла", error: "extension", status: 400};
    private sizeError = {message: "Файл слишком большой или маленький", error: "size", status: 400};

    private minFileSize = 1024; // 1 KB
    private maxImageSize = 1024**2 * 64; // 64 MB
    private maxVideoSize = 1024**3 * 8; // 8 GB
    private maxNoteSize = 1024**2 * 24 // 24 MB
    private maxAudioSize = 1024**2 * 20 // 20 MB
    private maxArchiveSize = 1024**3 // 1 GB

    private allowedImageExtensions = fileConfig.file.images.extensions;
    private allowedVideoExtensions = fileConfig.file.videos.extensions;
    private allowedNotesExtensions = fileConfig.file.notes.extensions;
    private allowedAudioExtensions = fileConfig.file.audio.extensions;
    private allowedArchiveExtensions = fileConfig.file.archive.extensions;
    private allowedExtensions = fileConfig.file.extensions;

    private checkExtension = (extension:string) => this.allowedExtensions.includes(extension);
    
    private checkSize = (size:number,extension:string) => {
        if (this.allowedImageExtensions.includes(extension))
            return size >= this.minFileSize && size <= this.maxImageSize;
        
        if (this.allowedVideoExtensions.includes(extension))
            return size >= this.minFileSize && size <= this.maxVideoSize;
        
        if (this.allowedNotesExtensions.includes(extension))
            return size >= this.minFileSize && size <= this.maxNoteSize;

        if (this.allowedAudioExtensions.includes(extension))
            return size >= this.minFileSize && size <= this.maxAudioSize;

        if (this.allowedArchiveExtensions.includes(extension))
            return size >= this.minFileSize && size <= this.maxArchiveSize;
        
        return false;
    }

    transform(files: MFile[]) {
        const validFiles: MFile[] = [];
        console.log(files);
        files.forEach(file => {
            // let extension = file.mimetype.split("/")[1];
            let extension = file.filename.split(".")[1];
            let size = file.size;
            if (!this.checkExtension(extension)) return new BadRequestException(this.extensionError);
            if (!this.checkSize(size,extension)) return new BadRequestException(this.sizeError)
            validFiles.push(file);
        });
        return validFiles;
    }
}