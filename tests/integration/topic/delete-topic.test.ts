import {describe, it, expect } from "@jest/globals";
import { NextRequest } from "next/server";

import { DELETE } from "@/app/api/admin/topics/[id]/route";
import { prisma } from "@/lib/prisma";

import { dockerTopicFixture } from "../../fixtures/topic.fixture";

import { revalidatePath } from "next/cache";
jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}))

describe("DELETE /api/admin/topics/[id]", () => {
    it("should delete a topic by Id", async () => {
        // Arrange
        const topic = await prisma.topic.create({
            data: dockerTopicFixture
        });

        // Act
        const request = new NextRequest(
            `http://localhost/api/admin/topics/${topic.id}`,
            {
                method: "DELETE",
            }
        );

        const response = await DELETE(request, {
            params: Promise.resolve({
                id: topic.id
            })
        });

        //Assert
        expect(response.status).toBe(200);

        const result = await response.json();

        expect(result.message).toBe("Topic is deleted sucessfully")
        
        const deletedTopic = await prisma.topic.findUnique({
            where: {
                id: topic.id
            }
        });

        expect(deletedTopic).toBeNull();

        expect(revalidatePath).toHaveBeenCalledWith("/");
        expect(revalidatePath).toHaveBeenCalledWith("/sips");
        expect(revalidatePath).toHaveBeenCalledWith("/admin/topics");
        expect(revalidatePath).toHaveBeenCalledWith("/admin/articles/new");

    });

    it("should return 404 when topic does not exist", async () => {
        //Act
        const request = new NextRequest(
            "http://localhost/api/admin/topics/not-found",
            {
                method: "DELETE"
            }
        );

        const response = await DELETE(request, {
            params: Promise.resolve({
                id: "not-found"
            })
        });

        //Assert
        expect(response.status).toBe(404);

        const result = await response.json();

        expect(result.message).toBe("Topic not found")

        expect(revalidatePath).toHaveBeenCalledWith("/");
        expect(revalidatePath).toHaveBeenCalledWith("/sips");
        expect(revalidatePath).toHaveBeenCalledWith("/admin/topics");
        expect(revalidatePath).toHaveBeenCalledWith("/admin/articles/new");
    })
})