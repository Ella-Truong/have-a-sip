import { describe, it, expect } from "@jest/globals";
import { GET } from "@/app/api/topics/route";

import { prisma } from "@/lib/prisma";

import {
    redisTopicFixture,
    dockerTopicFixture,
} from "../../fixtures/topic.fixture";

describe("GET api/topics", () => {
    it("should return all topics", async () => {
        //Arrange
        await prisma.topic.create({
            data: redisTopicFixture
        });

        await prisma.topic.create({
            data: dockerTopicFixture
        })

        //Act
        const response = await GET();

        //Assert
        expect(response.status).toBe(200);

        const result = await response.json();
        
        expect(result).toHaveLength(2);
        
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining(redisTopicFixture),
                expect.objectContaining(dockerTopicFixture)
            ])
        )
    })
})