import { diskStorage } from "multer";
import { randomUUID } from "crypto";
import path from "path";
import config from "src/const/files";
import fileDestructurization from "src/lib/fileDestructurization";
import { FileIF } from "src/interfaces/system/file.interfaces";

const { rootFolder, image, video, audio, archive, note } = config;

const directories = {
    image: `${rootFolder}/${image.folder}`,
    video: `${rootFolder}/${video.folder}`,
    audio: `${rootFolder}/${audio.folder}`,
    archive: `${rootFolder}/${archive.folder}`,
    note: `${rootFolder}/${note.folder}`
};

const getUploadDir = (extension: string): string => {
    if (image.extensions.includes(extension)) return directories.image;
    if (video.extensions.includes(extension)) return directories.video;
    if (audio.extensions.includes(extension)) return directories.audio;
    if (archive.extensions.includes(extension)) return directories.archive;
    return directories.note;
};

const normalizeFileName = (_: any, file: FileIF, callback: (error: Error | null, filename: string) => void) => {
    const fileExt = path.extname(file.originalname);
    callback(null, `${randomUUID()}${fileExt}`);
};

const generateDestination = (_: any, file: FileIF, callback: (error: Error | null, destination: string) => void) => {
    const { extension } = fileDestructurization(file);
    callback(null, getUploadDir(extension));
};

const Storage = diskStorage({
    filename: normalizeFileName,
    destination: generateDestination
});

export default Storage;
