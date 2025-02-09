import { Prisma } from "@prisma/client";

const returnFileStorageObj:Prisma.FileStorageSelect = {
    id: true,
    name: true,
    original_name: true,
    type: true,
    url: true,
    extension: true,
    size: true,
    created_at: true,
    updated_at: true,
}

export default returnFileStorageObj;