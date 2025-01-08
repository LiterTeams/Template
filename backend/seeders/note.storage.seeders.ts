import { PrismaClient, NoteStorage } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const uploadPath = `${process.env.UPLOAD_PATH}/notes`;

const noteStorageSeeder = async () => {
    const data: Omit<NoteStorage, "created_at"|"folder_id"|"updated_at">[] = [
        {id: 1, name: "note", original_name: "note", url:`${uploadPath}/note.txt`, extension:"txt", size:15120},
    ];
    await prisma.noteStorage.createMany({data, skipDuplicates: true});
    console.log(`Created ${data.length} notes storage`);
}

export default noteStorageSeeder;