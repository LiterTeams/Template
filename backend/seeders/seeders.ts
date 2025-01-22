// <------ Imports ------> //
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

import privilegeSeeder from "./privilege.seeders";
import userSeeder from "./user.seeders";

// <------ Init ------> //

const prisma = new PrismaClient();
dotenv.config();

// <------ Sedders ------> //

const contentSeeder = async () => {
    await userSeeder();
    await privilegeSeeder();
}

const seeders = async () => {
    console.log("Start Seeding...");

    await contentSeeder();

    console.log("End Seeding");
}

// <------ Void ------> //

seeders()
    .catch(error => console.log(error))
    .finally(async () => {await prisma.$disconnect()});