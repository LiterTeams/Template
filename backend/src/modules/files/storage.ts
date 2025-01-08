import { HttpException } from "@nestjs/common";
import { diskStorage } from "multer";
import { randomUUID } from "crypto";
import fileConfig from 'src/const/fileConfig';

const rootDestination = "./uploads";

const imageExtensions = fileConfig.file.images.extensions;
const videoExtensions = fileConfig.file.videos.extensions;
const audioExtentions = fileConfig.file.audio.extensions;
const archiveExtentions = fileConfig.file.archive.extensions;
const extensions = fileConfig.file.extensions;

const rootDirImageUpload = `${rootDestination}/images`;
const rootDirVideoUpload = `${rootDestination}/videos`;
const rootDirNoteUpload = `${rootDestination}/notes`;
const rootDirAudioUpload = `${rootDestination}/audio`;
const rootDirArchiveUpload = `${rootDestination}/archives`;

const _getRootDirUpload = (extension: string) => {
    if (imageExtensions.includes(extension)) return rootDirImageUpload;
    if (videoExtensions.includes(extension)) return rootDirVideoUpload;
    if (audioExtentions.includes(extension)) return rootDirAudioUpload;
    if (archiveExtentions.includes(extension)) return rootDirArchiveUpload;
    return rootDirNoteUpload;
}

const normalizeFileName = (req: any, file:Express.Multer.File, callback: any) => {
    const fileExtName = file.originalname.split(".").pop();
    callback(null, `${randomUUID()}.${fileExtName}`);
}

const generateDestination = (req: any, file:Express.Multer.File, callback: any) => {
    const extension = file.originalname.split(".").pop();

    if (extensions.includes(extension)) return callback(new HttpException(`File Extension Not Supported! - [${file.originalname}]`, 400), false);

    const rootDirUpload =  _getRootDirUpload(extension);
    
    return callback(null, rootDirUpload);
}

export const fileStorage = diskStorage({
    filename: normalizeFileName,
    destination: generateDestination,
});