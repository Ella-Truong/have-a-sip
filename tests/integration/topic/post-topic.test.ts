import { describe, it, expect } from "@jest/globals";

import { NextRequest } from "next/server";
import { POST } from "@/app/api/admin/topics/route";

import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/helper";

import { revalidatePath } from "next/cache";
jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}))

describe("POST /api/admin/topic", () => {
    it("should create a topic", async () => {
        //Arrange
        const requestBody = {
            name: "Redis"
        }

        const request = new NextRequest(
            "http://localhost/api/admin/topics",
            {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(requestBody),
            }
        )

        //Act
        const response = await POST(request);

        expect(response.status).toBe(201);

        const result = await response.json();

        expect(result.name).toBe(requestBody.name);
        expect(result.slug).toBe(generateSlug(requestBody.name));

        const topic = await prisma.topic.findUnique({
            where: {
                slug: generateSlug(requestBody.name),
            }
        });

        expect(topic).not.toBeNull();
        expect(topic?.name).toBe(requestBody.name);
        expect(topic?.slug).toBe(generateSlug(requestBody.name))

        expect(revalidatePath).toHaveBeenCalledWith("/");
        expect(revalidatePath).toHaveBeenCalledWith("/sips");
        expect(revalidatePath).toHaveBeenCalledWith("/admin/topics");
        expect(revalidatePath).toHaveBeenCalledWith("/admin/articles/new");

    })

    it("should return 400 when request body is invalid", async () => {
        const request = new NextRequest(
            "http://localhost/api/admin/topics",
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    name: ""
                })
            }
        )

        const response = await POST(request);

        expect(response.status).toBe(400)

        const result = await response.json();

        expect(result.message).toBe("Invalid request body.")
    })
})

