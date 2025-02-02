export enum ImageExtension {
    Png = "png",
    Jpg = "jpg",
    Jpeg = "jpeg",
    Webp = "webp",
    Avif = "avif"
}

export enum VideoExtension {
    Mp4 = "mp4",
    Webm = "webm",
    Avi = "avi"
}

export enum NoteExtension {
    Doc = "doc",
    Docx = "docx",
    Pdf = "pdf",
    Txt = "txt",
    Word = "word",
    Js = "js"
}

export enum AudioExtension {
    Ogg = "ogg",
    Mp3 = "mp3",
    Acc = "acc"
}

export enum ArchiveExtension {
    Rar = "rar",
    Zip = "zip",
    SevenZip = "7zip"
}

export type ExtensionsPropsT = ImageExtension | VideoExtension | NoteExtension | AudioExtension | ArchiveExtension;