import { describe, it, expect } from "@jest/globals";
import { prisma } from "@/lib/prisma";

import { NextRequest } from "next/server";
import { PATCH } from "@/app/api/admin/articles/[id]/route";

import { topicFixture } from "../../fixtures/topic.fixture";
import { dockerArticleFixture } from "../../fixtures/article.fixture";

//test suite
describe("PATCH api/admin/articles/[id]", async () => {
    //test #1
    it("Should update an existing article by Id", async () => {
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
        
        // Verify database
        const updatedArticle = await prisma.article.findUnique({
            where: {
                id: article.id
            }
        });

        expect(updatedArticle?.published).toBe(true);
        expect(updatedArticle?.publishedAt).not.toBeNull();
    })
})