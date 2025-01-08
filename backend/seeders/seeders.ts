// <------ Imports ------> //
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

import privilegeSeeder from "./privilege.seeders";
import userSeeder from "./user.seeders";

import { tagSeeders, imageStorageTagsSeeders } from "./tag.seeders"

import imageStorageSeeder from "./image.storage.seeders"; 
import videoStorageSeeder from "./videos.storage.seeders";
import noteStorageSeeder from "./note.storage.seeders";
import audioStorageSeeder from "./audio.storage.seeders";
import archiveStorageSeeder from "./archive.storage.seeders";

// <------ Init ------> //

const prisma = new PrismaClient();
dotenv.config();

// <------ Sedders ------> //

const contentSeeder = async () => {
    await userSeeder();
    await privilegeSeeder();
}

const storageSeeder = async () => {
    await tagSeeders();
    
    await imageStorageSeeder();
    // await imageStorageTagsSeeders();

    await videoStorageSeeder();
    // await videoStorageTagsSeeders();

    await noteStorageSeeder();
    // await noteStorageTagsSeeders();

    await audioStorageSeeder();
    // await audioStorageTagsSeeders();

    await archiveStorageSeeder();
    // await archiveStorageTagsSeeders();
}

const seeders = async () => {
    console.log("Start Seeding...");

    await contentSeeder();
    await storageSeeder();

    console.log("End Seeding");
}

// <------ Void ------> //

seeders()
    .catch(error => console.log(error))
    .finally(async () => {await prisma.$disconnect()});