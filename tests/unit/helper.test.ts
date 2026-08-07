import {
    generateSlug,
    calculateReadingTime,
    buildingPagination
} from "@/lib/helper";

describe("generateSlug", () => {
    it("should convert a title into a URL-friendly slug", () => {
        expect(generateSlug("Learning Prisma")).toBe(
            "learning-prisma"
        );
    });

    it("should handle special characters", () => {
        expect(generateSlug("Hello, World!")).toBe(
            "hello-world"
        );
    });

    it("should remove extra spaces", () => {
        expect(generateSlug("Learning   Prisma")).toBe(
            "learning-prisma"
        );
    });
});

describe("calculateReadingTime", () => {
    it("should calculate reading time based on content length", () => {
        const content = Array(200).fill("word").join(" ");

        expect(calculateReadingTime(content)).toBe(1);
    });

    it("should return at least one minute", () => {
        expect(calculateReadingTime("Hello world")).toBe(1);
    });
});

describe("buildingPagination", () => {
    it("should build pagination metadata", () => {
        expect(
            buildingPagination(1, 10, 25)
        ).toEqual({
            page: 1,
            limit: 10,
            totalItems: 25,
            totalPages: 3,
            hasNextPage: true,
            hasPreviousPage: false,
        });
    });

    it("should indicate when there is a previous page", () => {
        expect(
            buildingPagination(2, 10, 25)
        ).toEqual({
            page: 2,
            limit: 10,
            totalItems: 25,
            totalPages: 3,
            hasNextPage: true,
            hasPreviousPage: true,
        });
    });

    it("should indicate when there is no next page", () => {
        expect(
            buildingPagination(3, 10, 25)
        ).toEqual({
            page: 3,
            limit: 10,
            totalItems: 25,
            totalPages: 3,
            hasNextPage: false,
            hasPreviousPage: true,
        });
    });
});