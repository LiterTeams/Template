import { hashSync } from "bcrypt";
import { PrismaClient, User } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const userSeeder = async () => {
    const password = hashSync("password",10);
    const data: Pick<User, "id"|"nickname" | "email" | "password">[] = [
		{
			id: 1,
			nickname:"Root",
			email:"root@gmail.com",
			password: password,
		},
		{
			id: 2,
			nickname:"Admin",
			email:"admin.nsfw@gmail.com",
			password: password,
		},
		{
			id: 3,
			nickname:"moderator",
			email:"moderator@gmail.com",
			password: password,
		},
		{
			id: 4,
			nickname:"user",
			email:"user@gmail.com",
			password: password,
		},
    ];
    await prisma.user.createMany({data, skipDuplicates: true});
    console.log(`Created ${data.length} users`);
}

export default userSeeder;