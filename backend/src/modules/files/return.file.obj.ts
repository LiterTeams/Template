import { Prisma } from "@prisma/client";

export const returnImageObj:Prisma.ImageStorageSelect = {
    id: true,
    name: true,
    original_name: true,
    url: true,
    extension: true,
    size: true,
    tags: {select:{tag:{select:{name: true}}}},
    created_at: true,
}

export const returnVideoObj:Prisma.VideoStorageSelect = {
    id: true,
    name: true,
    original_name: true,
    url: true,
    extension: true,
    size: true,
    tags: {select:{tag:{select:{name: true}}}},
    created_at: true,
}

export const returnAudioObj:Prisma.AudioStorageSelect = {
    id: true,
    name: true,
    original_name: true,
    url: true,
    extension: true,
    size: true,
    tags: {select:{tag:{select:{name: true}}}},
    created_at: true,
}

export const returnNoteObj:Prisma.NoteStorageSelect = {
    id: true,
    name: true,
    original_name: true,
    url: true,
    extension: true,
    size: true,
    tags: {select:{tag:{select:{name: true}}}},
    created_at: true,
}

export const returnArchiveObj:Prisma.ArchiveStorageSelect = {
    id: true,
    name: true,
    original_name: true,
    url: true,
    extension: true,
    size: true,
    tags: {select:{tag:{select:{name: true}}}},
    created_at: true,
}