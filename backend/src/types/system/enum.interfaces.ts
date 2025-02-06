type UserRoleT = "root" | "admin" | "moderator" | "user";
type ContentStatusT = "draft" | "published" | "archived";

type ImageExtensionT = "png" | "jpg" | "jpeg" | "webp" | "avif";
type VideoExtensionT = "mp4" | "webm" | "avi";
type NoteExtensionT = "doc" | "docx" | "pdf" | "txt" | "word" | "js" | "md" | "php" | "py" | "ts";
type AudioExtensionT = "ogg" | "mp3" | "acc";
type ArchiveExtensionT = "rar" | "zip" | "7zip";
type ExtensionsT = ImageExtensionT | VideoExtensionT | NoteExtensionT | AudioExtensionT | ArchiveExtensionT;

type UnitT = "B" | "BT" | "KB" | "MB" | "GB" | "TB";
type UnitEndWithPrefixT = `${number} ${UnitT}`;

export type {
    UserRoleT,
    ContentStatusT,
    UnitT, UnitEndWithPrefixT,
    ExtensionsT, ImageExtensionT, VideoExtensionT, NoteExtensionT, AudioExtensionT, ArchiveExtensionT,
}