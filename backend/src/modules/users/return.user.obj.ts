import { Prisma } from "@prisma/client";

export const returnUserObj:Prisma.UserSelect = {
    id: true,
    nickname: true,
    email: true,
    blocking: true,
    created_at: true,
}