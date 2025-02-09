import { ImageExtension, VideoExtension, NoteExtension, AudioExtension, ArchiveExtension } from "../types/system/enum";

const extensionsMap: Record<string, string[]> = {
    image: [
        ImageExtension.Png,
        ImageExtension.Jpg,
        ImageExtension.Jpeg,
        ImageExtension.Webp,
        ImageExtension.Avif
    ],
    video: [
        VideoExtension.Mp4,
        VideoExtension.Webm,
        VideoExtension.Avi
    ],
    note: [
        NoteExtension.Doc,
        NoteExtension.Docx,
        NoteExtension.Pdf,
        NoteExtension.Txt,
        NoteExtension.Word,
        NoteExtension.Js
    ],
    audio: [
        AudioExtension.Ogg,
        AudioExtension.Mp3,
        AudioExtension.Acc
    ],
    archive: [
        ArchiveExtension.Rar,
        ArchiveExtension.Zip,
        ArchiveExtension.SevenZip
    ]
};

const getExtensions = (type: "image" | "video" | "note" | "audio" | "archive"): string[] => extensionsMap[type] || [];

const imageExtensions = getExtensions("image");
const videoExtensions = getExtensions("video");
const noteExtensions = getExtensions("video");
const audioExtensions = getExtensions("video");
const archiveExtensions = getExtensions("video");
const extensions = imageExtensions.concat(videoExtensions,noteExtensions,audioExtensions,archiveExtensions);

const config = {
    file: {
        images:{
            extensions: imageExtensions,
            min:"50 KB",
            max:"12 MB",
        },
        videos:{
            extensions: videoExtensions,
            min:"100 KB",
            max:"2 GB",
        },
        notes:{
            extensions: noteExtensions,
            min:"100 KB",
            max:"20 MB",
        },
        audio:{
            extensions: audioExtensions,
            min:"100 KB",
            max:"20 MB",
        },
        archive:{
            extensions: archiveExtensions,
            min:"5 MB",
            max:"1 GB",
        },
        extensions: extensions,
    },
    sizes: {"B": 1/8, "BT": 1, "KB": 1024, "MB": 1024 ** 2, "GB": 1024 ** 3, "TB": 1024 ** 4},
}

export default config;