import { ExtensionsPropsT as EPT } from "@app/shared/types/system/types";
import { ImageExtension, VideoExtension, NoteExtension, AudioExtension, ArchiveExtension, ExtensionsPropsT } from "@shared/types/system/enum";

const allExtensions = {
    ...ImageExtension,
    ...VideoExtension,
    ...NoteExtension,
    ...AudioExtension,
    ...ArchiveExtension,
};

const checkFileFormat = (fileFormat: string, checkFormat: EPT | EPT[]): boolean => {
    if (checkFormat.length == 0) return true;
    const formatEnum = mapToEnum(fileFormat);
    
    if (!formatEnum) return false;

    return Array.isArray(checkFormat) ? checkFormat.includes(formatEnum) : formatEnum === checkFormat;
}

const mapToEnum = (fileFormat: string): ExtensionsPropsT | null => {
    if (Object.values(allExtensions).includes(fileFormat)) return fileFormat as ExtensionsPropsT;
    return null;
}

export default checkFileFormat;
