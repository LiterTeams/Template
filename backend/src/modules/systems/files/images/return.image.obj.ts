import { Prisma } from "@prisma/client";

const returnImageObj:Prisma.FileStorageSelect = {
    id: true,
    name: true,
    original_name: true,
    type: true,
    url: true,
    extension: true,
    size: true,
}

export default returnImageObj;