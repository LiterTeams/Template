import { Prisma } from "@prisma/client";

export const returnUserObj:Prisma.UserSelect = {
    id: true,
    nickname: true,
    email: true,
    role: true,
    blocking: true,
    password: true,
    created_at: true,
}