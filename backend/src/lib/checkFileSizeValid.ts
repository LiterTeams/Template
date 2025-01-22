import config from "src/const/files";
import checkFileExtension from "./checkFileExtension";
import checkFileSize from "./checkFileSize";
const checkFileSizeValid = (size:number, extension:string): boolean => {
    switch(true){
        case checkFileExtension(config.image.extensions,extension): return checkFileSize(size, config.image.min, config.image.max);
        case checkFileExtension(config.video.extensions,extension): return checkFileSize(size, config.video.min, config.video.max);
        case checkFileExtension(config.note.extensions,extension): return checkFileSize(size, config.note.min, config.note.max);
        case checkFileExtension(config.archive.extensions,extension): return checkFileSize(size, config.archive.min, config.archive.max);
        case checkFileExtension(config.audio.extensions,extension): return checkFileSize(size, config.audio.min, config.audio.max);
        default: return false;
    }
}
export default checkFileSizeValid;