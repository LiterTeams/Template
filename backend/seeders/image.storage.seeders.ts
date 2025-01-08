import { PrismaClient, ImageStorage } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const uploadPath = `${process.env.UPLOAD_PATH}/images`;

const imageStorageSeeder = async () => {
    const data: Pick<ImageStorage, "id"|"project_id"|"name"|"original_name"|"url"|"extension"|"size">[] = [
        {id: 1, name:"image",original_name:"image",url:`${uploadPath}/image.webp`,extension:"webp",size:15120},
    ];
    await prisma.imageStorage.createMany({data, skipDuplicates: true});
    console.log(`Created ${data.length} images storage`);
}

export default imageStorageSeeder;