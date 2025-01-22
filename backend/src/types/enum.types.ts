type UserRoleEnumT = "root" | "admin" | "moderator" | "user";
type OrderStatusEnumT = "new" | "accept" | "reject" | "done";
type ContentStatusEnumT = "draft" | "published" | "archived";

type ImageExtensionEnumT = "png" | "jpg" | "jpeg" | "webp" | "avif";
type VideoExtensionEnumT = "mp4" | "webm" | "avi";
type NoteExtensionEnumT = "doc" | "docx" | "pdf" | "txt" | "word" | "js" | "md" | "php" | "py" | "ts";
type AudioExtensionEnumT = "ogg" | "mp3" | "acc";
type ArchiveExtensionEnumT = "rar" | "zip" | "7zip";
type ExtensionsEnumT = ImageExtensionEnumT | VideoExtensionEnumT | NoteExtensionEnumT | AudioExtensionEnumT | ArchiveExtensionEnumT;

type UnitEnumT = "B" | "BT" | "KB" | "MB" | "GB" | "TB";
type UnitEndWithPrefix = `${number} ${UnitEnumT}`;

export type {
    UserRoleEnumT,
    OrderStatusEnumT,
    ContentStatusEnumT,
    UnitEnumT, UnitEndWithPrefix,
    ImageExtensionEnumT, VideoExtensionEnumT, NoteExtensionEnumT, AudioExtensionEnumT, ArchiveExtensionEnumT, ExtensionsEnumT,
}