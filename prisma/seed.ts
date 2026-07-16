import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

async function main() {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

    await prisma.user.upsert({
        where:{
            email: process.env.ADMIN_EMAIL!,
        },
        update: {},
        create: {
            name: "Ella",
            email: process.env.ADMIN_EMAIL!,
            password,
            role: "ADMIN",
        }
    });

    console.log("Admin user created");
}

main()
    .catch(console.error)
    .finally(async () => { 
        await prisma.$disconnect();
    })