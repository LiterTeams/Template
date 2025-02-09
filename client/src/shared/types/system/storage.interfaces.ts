import { BaseProps, MetaProps } from "./system.interfaces";
import { FileStorageT } from "./types";

interface FolderStorageProps extends BaseProps {
    title: string;
    description?: string;
    files: FileStorageProps[];
}

interface FileStorageProps extends BaseProps {
    name: string;
    original_name: string;
    extension: string;
    size: number;
    type: FileStorageT;
    url: string;
    folder?: FolderStorageProps[];
}

interface FileStorageResponseProps {
    data: FileStorageProps[];
    meta: MetaProps;
}

interface FolderStorageResponseProps {
    data: FolderStorageProps[];
    meta: MetaProps;
}

export type { FileStorageProps, FolderStorageProps, FileStorageResponseProps, FolderStorageResponseProps }