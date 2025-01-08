import { PrismaClient, Tag } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const tagSeeders = async () => {
    const data: Pick<Tag, "name">[] = [
        {name: "tag_name"},
    ];
    await prisma.tag.createMany({data, skipDuplicates: true});
    console.log(`Created ${data.length} tags`);
}

export { tagSeeders };