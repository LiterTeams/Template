import { Prisma } from "@prisma/client";

export const returnUserObj:Prisma.UserSelect = {
    id: true,
    nickname: true,
    email: true,
    privilege: { select: { project: true, role: true } },
    blocking: true,
    created_at: true,
}