// import { HttpException } from "@nestjs/common";
import { diskStorage } from "multer";
import { randomUUID } from "crypto";
import config from 'src/const/files';
import fileDestructurization from "src/lib/fileDestructurization";
import { FileIF } from "src/interfaces/system/file.interfaces";

const _rootDestination = config.rootFolder;
const rootDirImageUpload = `${_rootDestination}/${config.image.folder}`;
const rootDirVideoUpload = `${_rootDestination}/${config.video.folder}`;
const rootDirNoteUpload = `${_rootDestination}/${config.note.folder}`;
const rootDirAudioUpload = `${_rootDestination}/${config.audio.folder}`;
const rootDirArchiveUpload = `${_rootDestination}/${config.archive.folder}`;

const _getRootDirUpload = (extension: string) => {
    switch(true){
        case config.image.extensions.includes(extension): return rootDirImageUpload;
        case config.video.extensions.includes(extension): return rootDirVideoUpload;
        case config.audio.extensions.includes(extension): return rootDirAudioUpload;
        case config.archive.extensions.includes(extension): return rootDirArchiveUpload;
        default: return rootDirNoteUpload;
    }
}

const normalizeFileName = (req: any, file:FileIF, callback: any) => {
    const fileExtName = file.originalname.split(".").pop();
    callback(null, `${randomUUID()}.${fileExtName}`);
}

const generateDestination = (req: any, file:FileIF, callback: any) => {
    const { extension } = fileDestructurization(file);
    
    // if (!config.extensions.includes(extension)) return callback(new HttpException(`File Extension Not Supported! - [${file.originalname}]`, 400), false);

    return callback(null, _getRootDirUpload(extension));
}

const Storage = diskStorage({
    filename: normalizeFileName,
    destination: generateDestination,
});

export default Storage;