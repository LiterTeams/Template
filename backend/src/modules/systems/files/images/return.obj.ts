import { Prisma } from "@prisma/client";

const returnObj:Prisma.ImageSelect = {
    id: true,
    name: true,
    original_name: true,
    url: true,
    extension: true,
    size: true,
}

export default returnObj;