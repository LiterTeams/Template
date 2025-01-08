import { PrismaClient, AudioStorage } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const uploadPath = `${process.env.UPLOAD_PATH}/audio`;

const audioStorageSeeder = async () => {
    const data: Omit<AudioStorage, "created_at"|"folder_id"|"updated_at">[] = [
        {id: 1, name: "audio", original_name: "audio", url:`${uploadPath}/audio.mp3`, extension:"mp3", size:15120},
    ];
    await prisma.audioStorage.createMany({data, skipDuplicates: true});
    console.log(`Created ${data.length} audio storage`);
}

export default audioStorageSeeder;