type UserRolePropsT = "user" | "moderator" | "admin" | "root";
type ContentStatusPropsT = "draft" | "published" | "archived";

type UnitEnumT = "B" | "BT" | "KB" | "MB" | "GB" | "TB";

type ProjectStatusPropsT = "dev" | "completed";
type LocalePropsT = "ru" | "pl" | "ua" | "us" | "de" | "fr" | "jp";
type ImageExtensionPropsT = "png" | "jpg" | "jpeg" | "webp" | "avif";
type VideoExtensionPropsT = "mp4" | "webm" | "avi";
type NoteExtensionPropsT = "doc" | "docx" | "pdf" | "txt" | "word" | "js";
type AudioExtensionPropsT = "ogg" | "mp3" | "acc";
type ArchiveExtensionPropsT = "rar" | "zip" | "7zip";
type ExtensionsPropsT = ImageExtensionPropsT | VideoExtensionPropsT | NoteExtensionPropsT | AudioExtensionPropsT | ArchiveExtensionPropsT;

type FileStorageT = "image" | "video" | "audio" | "note" | "archive";

type ButtonVariantPropsT = "primary" | "secondary" | "ghost" | "additional";
type ButtonFontPropsT = "mono";
type LinkRoutePropsT = "home";

export type {
    UserRolePropsT,
    FileStorageT,
    ButtonVariantPropsT,
    ButtonFontPropsT,
    LinkRoutePropsT,
    LocalePropsT,
    ContentStatusPropsT,
    UnitEnumT,
    ProjectStatusPropsT,
    ExtensionsPropsT,
    ImageExtensionPropsT,
    VideoExtensionPropsT,
    NoteExtensionPropsT,
    AudioExtensionPropsT,
    ArchiveExtensionPropsT,
}