import { PrismaClient, ArchiveStorage } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const uploadPath = `${process.env.UPLOAD_PATH}/archives`;

const archiveStorageSeeder = async () => {
    const data: Omit<ArchiveStorage, "created_at"|"folder_id"|"updated_at">[] = [
        {id: 1, name: "archive", original_name: "archive", url:`${uploadPath}/archive.rar`, extension:"rar", size:15120},
    ];
    await prisma.archiveStorage.createMany({data, skipDuplicates: true});
    console.log(`Created ${data.length} archives storage`);
}

export default archiveStorageSeeder;