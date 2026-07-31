import { describe, it, expect } from "@jest/globals";
import { POST } from "@/app/api/admin/articles/route";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

import { prismaArticleFixture } from "../../fixtures/article.fixture";
import { topicFixture } from "../../fixtures/topic.fixture";

import { revalidatePath } from "next/cache";
jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}))

//test suite 
describe("POST /api/admin/articles", () => {
    //test #1
    it("should create an article successfully", async () => {
        const topic = await prisma.topic.create({
            data: topicFixture,
        });

        const body = {
            ...prismaArticleFixture,
            topicId: topic.id
        };

        const request = new NextRequest(
            "http://localhost/api/admin/articles",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }
        );

        // Act
        const response = await POST(request);
        
        // Assert
        expect(response.status).toBe(201);

        const article = await response.json();

        expect(article.title).toBe(prismaArticleFixture.title);
        expect(article.excerpt).toBe(prismaArticleFixture.excerpt);
        expect(article.content).toBe(prismaArticleFixture.content);
        expect(article.topicId).toBe(topic.id);

        expect(revalidatePath).toHaveBeenCalledWith("/");
        expect(revalidatePath).toHaveBeenCalledWith("/sips");
        expect(revalidatePath).toHaveBeenCalledWith(`/articles/${article.slug}`);
        
        // Business logic
        expect(article.slug).toBe("learning-prisma");
        expect(article.readingTime).toBeGreaterThan(0);
        
        // Verify database
        const savedArticle = await prisma.article.findUnique({
            where: {
                id: article.id,
            },
        });

        expect(savedArticle).not.toBeNull();
        expect(savedArticle?.title).toBe(prismaArticleFixture.title);
        expect(savedArticle?.slug).toBe("learning-prisma");
    })
})