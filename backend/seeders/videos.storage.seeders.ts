import { PrismaClient, VideoStorage } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const uploadPath = `${process.env.UPLOAD_PATH}/videos`;

const videoStorageSeeder = async () => {
    const data: Omit<VideoStorage, "created_at"|"folder_id"|"updated_at">[] = [
        {id: 1, name: "video", original_name: "video", url:`${uploadPath}/video.mp4`, extension:"mp4", size:15120},
    ];
    await prisma.videoStorage.createMany({data, skipDuplicates: true});
    console.log(`Created ${data.length} videos storage`);
}

export default videoStorageSeeder;