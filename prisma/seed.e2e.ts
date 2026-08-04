/**
 * Seed data for Playwright E2E tests.
 * This file creates only the data required for automated tests.
 */

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

async function main() {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
    // Admin
    const password = await bcrypt.hash(
        process.env.ADMIN_PASSWORD!,
        10
    );

    await prisma.user.upsert({
        where: {
            email: process.env.ADMIN_EMAIL!,
        },
        update: {
            name: "Ella",
            password,
            role: "ADMIN"
        },
        create: {
            name: "Ella",
            email: process.env.ADMIN_EMAIL!,
            password,
            role: "ADMIN",
        },
    });

    // Topic
    const topic = await prisma.topic.upsert({
        where: {
            slug: "backend-engineering",
        },
        update: {},
        create: {
            name: "Backend Engineering",
            slug: "backend-engineering",
        },
    });

    // Article
    await prisma.article.upsert({
        where: {
            slug: "the-bug-wasnt-in-my-code",
        },
        update: {},
        create: {
            title: "The Bug Wasn't In My Code",
            slug: "the-bug-wasnt-in-my-code",
            excerpt:
                "Sometimes debugging teaches you more than success ever could.",
            content: `
# The Bug Wasn't In My Code

Sometimes the best debugging sessions don't teach you how to fix code.

They teach you how software evolves.
            `,
            readingTime: 1,
            published: true,
            publishedAt: new Date(),
            topicId: topic.id,
        },
    });

    console.log("E2E seed completed.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });