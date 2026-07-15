import { describe, it, expect } from "@jest/globals";
import { NextRequest } from "next/server";

import { GET } from "@/app/api/articles/[slug]/route";
import { prisma } from "@/lib/prisma";

import { topicFixture } from "../../fixtures/topic.fixture";
import { 
    dockerArticleFixture, 
    redisArticleFixture 
} from "../../fixtures/article.fixture";

//test suite
describe("GET api/articles/[slug]",() => {
    //test #1
    it("should return an aticle by slug", async () => {
        //arrange
        const topic = await prisma.topic.create({
            data: topicFixture,
        })

        await prisma.article.create({
            data: {
                ...redisArticleFixture,
                topicId: topic.id,
                publishedAt: new Date("2026-07-11")
            }
        });

        // Act
        const request = new NextRequest(
            `http://localhost/api/articles/${redisArticleFixture.slug}`
        )

        const response = await GET(request, {
            params: Promise.resolve({
                slug: redisArticleFixture.slug
            })
        });

        //Assert
        expect(response.status).toBe(200);

        const result = await response.json();

        expect(result).toMatchObject({
            title: redisArticleFixture.title,
            slug: redisArticleFixture.slug,
            excerpt: redisArticleFixture.excerpt
        })
    }) 
    
    // test #2
    it("should return 404 when article does not exist", async () => {
        // Arrange
        const request = new NextRequest(
            "http://localhost/api/articles/not-found"
        );

        const response = await GET(request, {
            params: Promise.resolve({
                slug: "not-found"
            })
        });

        // Assert
        expect(response.status).toBe(404);

        const result = await response.json();

        expect(result.message).toBe("Article not found")

    });

    // test #3
    it("should not return unpublished article", async () => {
        // arrange
        const topic = await prisma.topic.create({
            data: topicFixture
        });

        await prisma.article.create({
            data: {
                ...dockerArticleFixture,
                topicId: topic.id,
                published: false,
                publishedAt: null
            }
        });

        // Act
        const request = new NextRequest(
            `http://localhost/api/articles/${dockerArticleFixture.slug}`
        );

        const response = await GET(request, {
            params: Promise.resolve({
                slug: dockerArticleFixture.slug
            })
        });

        // Assert
        expect(response.status).toBe(404);

        const result = await response.json();

        expect(result.message).toBe("Article not found")
    })
})