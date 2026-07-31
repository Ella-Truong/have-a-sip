import { describe, it, expect } from "@jest/globals";
import { NextRequest } from "next/server";

import { DELETE } from "@/app/api/admin/articles/[id]/route";
import { prisma } from "@/lib/prisma";
import { topicFixture } from "../../fixtures/topic.fixture";
import { redisArticleFixture } from "../../fixtures/article.fixture";

import { revalidatePath } from "next/cache";
jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}))

//test suite
describe("DELETE api/admin/articles/[id]", () => {
    //test #1
    it("should delete an article by ID", async () => {
        //Arrange
        const topic = await prisma.topic.create({
            data: topicFixture
        });

        const article = await prisma.article.create({
            data: {
                ...redisArticleFixture,
                topicId: topic.id
            }
        });

        const request = new NextRequest(
            `http://localhost/api/admin/articles/${article.id}`,
            {
                method: "DELETE",
            }
        );

        // Act
        const response = await DELETE(request, {
            params: Promise.resolve({
                id: article.id
            })
        });

        //Assert
        expect(response.status).toBe(200);

        const result = await response.json();

        expect(result.message).toBe("Article deleted successfully.")
        
        expect(revalidatePath).toHaveBeenCalledWith("/")
        expect(revalidatePath).toHaveBeenCalledWith("/sips")
        expect(revalidatePath).toHaveBeenCalledWith(`/articles/${article.slug}`)


        //Verify the database
        const deletedArticle = await prisma.article.findUnique({
            where: {
                id: article.id
            }
        });

        expect(deletedArticle).toBeNull();
    });

    //test #2
    it("should return 404 when the article does not exist", async () => {
        //Arrange
        const request = new NextRequest(
            `http://api/admin/articles/not-found`,
            {
                method: "DELETE"
            }
        );

        // Act
        const response = await DELETE(request, {
            params: Promise.resolve({
                id: "not-found"
            })
        });

        // Assert
        expect(response.status).toBe(404);

        const result = await response.json();

        expect(result.message).toBe("Article not found")
    })
})