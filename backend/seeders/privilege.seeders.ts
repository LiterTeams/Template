import { PrismaClient, Privilege } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const privilegeSeeder = async () => {
    const data: Pick<Privilege, "user_id"|"role">[] = [
        {user_id: 1, role: "root"},
        {user_id: 2, role: "admin"},
        {user_id: 3, role: "moderator"},
        {user_id: 4, role: "user"},
    ];
    await prisma.privilege.createMany({data, skipDuplicates: true});
    console.log(`Created ${data.length} privileges`);
}

export default privilegeSeeder;