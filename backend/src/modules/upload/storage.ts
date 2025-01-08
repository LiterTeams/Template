import { diskStorage } from "multer";
import { randomUUID } from "crypto";
import { MFile } from "./mfile.class";
import fileConfig from "src/const/fileConfig";
import { NotAcceptableException } from "@nestjs/common";

const rootDestination = "./uploads";
const rootDestinationImages = `${rootDestination}/images`;
const rootDestinationVideos = `${rootDestination}/videos`;
const rootDestinationNotes = `${rootDestination}/notes`;
const rootDestinationAudio = `${rootDestination}/audio`;
const rootDestinationArchives = `${rootDestination}/archives`;

const imageExtensions = fileConfig.file.images.extensions;
const videoExtensions = fileConfig.file.videos.extensions;
const noteExtentions = fileConfig.file.notes.extensions;
const audioExtentions = fileConfig.file.audio.extensions;
const archiveExtentions = fileConfig.file.archive.extensions;
const extensions = imageExtensions.concat(videoExtensions, noteExtentions, audioExtentions, archiveExtentions);

const generateId = (): string => randomUUID();

const generateFileName = (request, file:MFile, callback) => {
    const fileExtension = file.originalname.split(".").pop();
    callback(null, `${generateId()}.${fileExtension}`);
}

const generateDestination = (request, file:MFile, callback) => {
    const extension = file.originalname.split(".").pop();
    const original_name = file.originalname.split(`.${extension}`)[0];

    if (!extensions.includes(extension)){
        console.log(`File Extension Not Supported! - File: ${original_name} | Extension: ${extension}`)
        return null;
    }

    if (imageExtensions.includes(extension)) callback(null, rootDestinationImages);
    
    if (videoExtensions.includes(extension)) callback(null, rootDestinationVideos);
    
    if (noteExtentions.includes(extension)) callback(null, rootDestinationNotes);
    
    if (audioExtentions.includes(extension)) callback(null, rootDestinationAudio);
    
    if (archiveExtentions.includes(extension)) callback(null, rootDestinationArchives);
}

export const fileStorage = diskStorage({
    filename: generateFileName,
    destination: generateDestination,
});