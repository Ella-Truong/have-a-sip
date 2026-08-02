import { test, expect } from "@playwright/test";

test.describe("Reader About", () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto("/about")
    });

    // hero section
    test("should display the About hero section", async ({ page }) => {
        await expect(
            page.getByRole("heading", {
                level: 1,
                name: /About Have a Sip/i
            })
        ).toBeVisible();

        await expect(
            page.getByText(/Software engineering moves quickly/i)
        ).toBeVisible();
    });
    
    // introduction
    test("should display the about story", async ({ page }) => {
        await expect(
            page.getByText(/began as a quiet habit/i)
        ).toBeVisible();

        await expect(
            page.getByText(/I share what I learn about/i)
        ).toBeVisible();

        await expect(
            page.getByText(/steady progress/i)
        ).toBeVisible();
    });

    // letter
    test("should display the letter", async ({ page }) =>{
        const letter = page.getByRole("complementary");

        await expect(letter).toBeVisible();

        await expect(
            letter.getByRole("heading", {
                level: 2,
                name: /Dear friend/i
            })
        ).toBeVisible();

        await expect(
            letter.getByText(/we're probably learning together/i)
        ).toBeVisible();

        await expect(
            letter.getByText(/quiet conversations over coffee/i)
        ).toBeVisible();

        await expect(
            letter.getByText("Ella", {
                exact: true
            })
        ).toBeVisible();

        await expect(
            letter.getByText("HAVE A SIP", {
                exact: true,
            })
        ).toBeVisible();
    });

    // About me section
    test("should display the About Me section", async ({ page }) => {
        // profile picture
        await expect(
            page.getByRole("img", {
                name: /Ella Truong/i
            })
        ).toBeVisible();

        // Heading
        await expect(
            page.getByRole("heading", {
                level: 2,
                name: "Hi, I'm Ella"
            })
        ).toBeVisible();

        // Introduction
        await expect(
            page.getByText(/computer science student/i)
        ).toBeVisible();

        await expect(
            page.getByText(/both reliable and enjoyable/i)
        ).toBeVisible();

        await expect(
            page.getByText(/I created Have a Sip/i)
        ).toBeVisible();

        await expect(
            page.getByText("Coffee Lover")
        ).toBeVisible();

        await expect(
            page.getByText("Full-Stack Engineering")
        ).toBeVisible();

        await expect(
            page.getByText("Always Learning")
        ).toBeVisible();
    });
})