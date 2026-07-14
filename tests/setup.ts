import { prisma } from "@/lib/prisma";
import { beforeEach, afterAll } from "@jest/globals";

//run before every individual test
beforeEach(async () => {
    //Delete child tables first because of foreign key constraints
    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();
    await prisma.topic.deleteMany();
});

//this run once, after all tests in that file
afterAll(async () => {
    await prisma.$disconnect();
})