import { describe, it, expect } from "@jest/globals";
import { prisma } from "@/lib/prisma";

import { NextRequest } from "next/server";
import { PATCH } from "@/app/api/admin/articles/[id]/route";

import { topicFixture } from "../../fixtures/topic.fixture";
import { dockerArticleFixture } from "../../fixtures/article.fixture";

import { generateSlug } from "@/lib/helper";

import { revalidatePath } from "next/cache";

jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}))

//test suite
describe("PATCH api/admin/articles/[id]", () => {
    //test #1
    it("Should publish a draft article", async () => {
        // arrange
        const topic = await prisma.topic.create({
            data: topicFixture
        });

        const article = await prisma.article.create({
            data: {
                ...dockerArticleFixture,
                topicId: topic.id,
                published: false,
                publishedAt: null
            }
        });

        const updateBody = {
            published: true
        }

        // Act
        const request = new NextRequest(
            `http://localhost/api/admin/articles/${article.id}`,
            {
                method: "PATCH",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify(updateBody)
            }
        )

        const response = await PATCH(request, {
            params: Promise.resolve({
                id: article.id
            })
        });

        // Assert
        expect(response.status).toBe(200)

        const result = await response.json()

        expect(result.published).toBe(true);
        expect(result.publishedAt).not.toBeNull();

        expect(revalidatePath).toHaveBeenCalledWith("/admin/articles");
        expect(revalidatePath).toHaveBeenCalledWith("/");
        expect(revalidatePath).toHaveBeenCalledWith("/sips");
        expect(revalidatePath).toHaveBeenCalledWith(`/articles/${article.slug}`);                  
        
        // Verify database
        const updatedArticle = await prisma.article.findUnique({
            where: {
                id: article.id
            }
        });
        
        expect(updatedArticle).not.toBeNull();
        expect(updatedArticle?.published).toBe(true);
        expect(updatedArticle?.publishedAt).not.toBeNull();
        
    });
    
    // test #2
    it("should update article title and regenerate slug", async () => {
        // Arrange
        const topic = await prisma.topic.create({
            data: topicFixture
        });

        const article = await prisma.article.create({
            data: {
                ...dockerArticleFixture,
                topicId: topic.id,
            }
        });

        const updateBody = {
            title: "Learning Docker Compose",
            excerpt: "Docker Compose Basics",
            content: "Docker Compose helps manage multi-container applications."
            
        }

        // Act
        const request = new NextRequest(
            `http://localhost/api/admin/articles/${article.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateBody)
            }
        );

        const response = await PATCH(request, {
            params: Promise.resolve({
                id: article.id
            })
        });

        //Assert
        expect(response.status).toBe(200);

        const result = await response.json();

        expect(result).toMatchObject({
            title: updateBody.title,
            excerpt: updateBody.excerpt,
            content: updateBody.content
        });

        expect(result.slug).toBe("learning-docker-compose");

        const updatedArticle = await prisma.article.findUnique({
            where: {
                id: article.id
            }
        });

        expect(updatedArticle?.title).toBe(updateBody.title);
        expect(updatedArticle?.slug).toBe(generateSlug(updateBody.title));

    });

    //test #3
    it("should return 404 when article does not exist", async () => {
        //Arrange
        const updateBody = {
            published: true
        };

        const request = new NextRequest(
            "http://localhost/api/admin/article/not-found",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateBody)
            }
        );

        // Act
        const response = await PATCH(request, {
            params: Promise.resolve({
                id: "not-found"
            })
        });

        //Assert
        expect(response.status).toBe(404);

        const result = await response.json();

        expect(result.message).toBe("Article not found")
    });

    //test #4
    it("should return 404 when body is invalid", async () => {
        // Arrange
        const topic = await prisma.topic.create({
            data: topicFixture
        });

        const article = await prisma.article.create({
            data: {
                ...dockerArticleFixture,
                topicId: topic.id
            }
        });

        const request = new NextRequest(
            `http://localhost/api/admin/articles/${article.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    published: "true",      //invalid type
                })
            }
        );

        // Act
        const response = await PATCH(request, {
            params: Promise.resolve({
                id: article.id
            })
        });

        // Assert
        expect(response.status).toBe(400);

        const result = await response.json();

        expect(result.message).toBe("Invalid request body")
    })
})