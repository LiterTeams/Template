import config from "src/configs/file.config";

const fileConfig = {
    rootFolder: config.uploads.root,
    image:{
        extensions: config.allowedExtensions.image,
        min: config.allowedSizes.image.min,
        max: config.allowedSizes.image.max,
        folder: config.uploads.image,
    },
    video:{
        extensions: config.allowedExtensions.video,
        min: config.allowedSizes.video.min,
        max: config.allowedSizes.video.max,
        folder: config.uploads.video,
    },
    note:{
        extensions: config.allowedExtensions.note,
        min: config.allowedSizes.note.min,
        max: config.allowedSizes.note.max,
        folder: config.uploads.note,
    },
    audio:{
        extensions: config.allowedExtensions.audio,
        min: config.allowedSizes.audio.min,
        max: config.allowedSizes.audio.max,
        folder: config.uploads.audio,
    },
    archive:{
        extensions: config.allowedExtensions.archive,
        min: config.allowedSizes.archive.min,
        max: config.allowedSizes.archive.max,
        folder: config.uploads.archive,
    },
    extensions: [
        ...config.allowedExtensions.image,
        ...config.allowedExtensions.video,
        ...config.allowedExtensions.note,
        ...config.allowedExtensions.audio,
        ...config.allowedExtensions.archive,
    ],
    units: config.units,
}
export default fileConfig;