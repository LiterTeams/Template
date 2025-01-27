type UserRoleEnumT = "user" | "moderator" | "admin" | "root";
type NewsStatusEnumT = "draft" | "published" | "archived";

type UnitEnumT = "B" | "BT" | "KB" | "MB" | "GB" | "TB";

type ProjectStatusEnumT = "in development" | "completed";
type LocaleEnumT = "ru" | "pl" | "ua" | "us" | "de" | "fr" | "jp";
type ImageExtensionEnumT = "png" | "jpg" | "jpeg" | "webp" | "avif";
type VideoExtensionEnumT = "mp4" | "webm" | "avi";
type NoteExtensionEnumT = "doc" | "docx" | "pdf" | "txt" | "word" | "js";
type AudioExtensionEnumT = "ogg" | "mp3";
type ArchiveExtensionEnumT = "rar" | "zip";
type ExtensionsEnumT = ImageExtensionEnumT | VideoExtensionEnumT | NoteExtensionEnumT | AudioExtensionEnumT | ArchiveExtensionEnumT;

export type {
    UserRoleEnumT,
    LocaleEnumT,
    NewsStatusEnumT,
    UnitEnumT,
    ProjectStatusEnumT,
    ImageExtensionEnumT, VideoExtensionEnumT, NoteExtensionEnumT, AudioExtensionEnumT, ArchiveExtensionEnumT, ExtensionsEnumT
}