import { describe, it, expect } from "@jest/globals";
import { NextRequest } from "next/server";

import { GET } from "@/app/api/articles/route";
import { prisma } from "@/lib/prisma";

import { topicFixture } from "../../fixtures/topic.fixture";
import {
    redisArticleFixture,
    dockerArticleFixture,
} from "../../fixtures/article.fixture"


describe("GET api/articles", () => {
    // test #1
    it("should return all published articles", async () => {
        // Arrange
        const topic = await prisma.topic.create({
            data: topicFixture
        })

        await prisma.article.create({
            data: {
                ...redisArticleFixture,
                topicId: topic.id,
                publishedAt: new Date("2026-07-10"),
            }
        });

        await prisma.article.create({
            data: {
                ...dockerArticleFixture,
                topicId: topic.id,
                publishedAt: new Date("2026-07-11")
            }
        });

        // Act
        const request = new NextRequest(
            "http://localhost/api/articles?page=1&limit=10"
        );

        const response = await GET(request);

        // Assert
        expect(response.status).toBe(200)

        const result = await response.json()

        // verify returned articles
        expect(result.status).toBe(200)
        expect(result.data).toHaveLength(2);

        expect(result.data[0]).toMatchObject({
            title: dockerArticleFixture.title,
            slug: dockerArticleFixture.slug,
            excerpt: dockerArticleFixture.excerpt,
        });

        expect(result.data[1]).toMatchObject({
            title: redisArticleFixture.title,
            slug: redisArticleFixture.slug,
            excerpt: redisArticleFixture.excerpt,
        });

        // verify pagination
        expect(result.pagination).toEqual({
            page: 1,
            limit: 10,
            totalItems: 2,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false,
        });
    })
})