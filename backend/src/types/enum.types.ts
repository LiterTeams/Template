type UserRoleEnumT = "root" | "admin" | "moderator" | "user";
type OrderStatusEnumT = "new" | "accept" | "reject" | "done";
type ContentStatusEnumT = "draft" | "published" | "archived";

type ImageExtensionEnumT = "png" | "jpg" | "jpeg" | "webp" | "avif";
type VideoExtensionEnumT = "mp4" | "webm" | "avi";
type NoteExtensionEnumT = "doc" | "docx" | "pdf" | "txt" | "word" | "js";
type AudioExtensionEnumT = "ogg" | "mp3";
type ArchiveExtensionEnumT = "rar" | "zip";
type ExtensionsEnumT = ImageExtensionEnumT | VideoExtensionEnumT | NoteExtensionEnumT | AudioExtensionEnumT | ArchiveExtensionEnumT;

type UnitEnumT = "B" | "BT" | "KB" | "MB" | "GB" | "TB";

export type {
    UserRoleEnumT,
    OrderStatusEnumT,
    ContentStatusEnumT,
    ImageExtensionEnumT, VideoExtensionEnumT, NoteExtensionEnumT, AudioExtensionEnumT, ArchiveExtensionEnumT, ExtensionsEnumT,
    UnitEnumT
}