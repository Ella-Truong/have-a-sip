import { CreateArticleInput } from "@/backend/types/article";

export const prismaArticleFixture: CreateArticleInput = {
    title: " Learning Prisma",
    excerpt: "A beginner's guide to Prisma ORM",
    content: "Prisma is a modern ORM for Node.js and TypeScript. It provides type-safe database access and excellent developer experience.",
    coverImage: null,
    topicId: "", //override this inside each test
}

export const redisArticleFixture = {
    title: "Learning Redis",
    slug: "learning-redis",
    excerpt: "Redis Cache",
    content: "Learning Redis",
    readingTime: 1,
    published: true,
}

export const dockerArticleFixture = {
    title: "Getting Started with Docker",
    slug: "getting-started-with-docker",
    excerpt: "A beginner-friendly introduction to containers.",
    content: "Docker makes it easy to package applications and their dependencies into portable containers.",
    readingTime: 2,
    published: true,
}