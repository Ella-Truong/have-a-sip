import { test, expect } from "@playwright/test";

test.describe("Reader Sips", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/sips")
    });

    // Sips Hero
    test("should display the Sips Hero section", async ({ page }) => {
        await expect(
            page.getByRole("heading", {
                level: 1,
                name: "Sips"
            })
        ).toBeVisible();
    })

    // Sips List
    test("should display the article archive", async ({ page }) => {
        const articles = page.locator('a[href^="/sips/"]');

        await expect(articles.first()).toBeVisible();
    });

    // topic sidebar
    test("should filter articles by topic", async ({ page }) => {
        await page.getByRole("link", {
            name: "Backend Engineering",
            exact: true,
        }).click();

        await expect(page).toHaveURL(/topic=backend-engineering/);

        const articles = page.locator('a[href^="/sips/"]');

        await expect(articles.first()).toBeVisible()
    });

    // navigate to an article
    test("should navigate to an article", async ({ page }) => {
        const firstArticle = page.locator('a[href^="/sips/"]').first();

        await firstArticle.click();

        await expect(page).toHaveURL(/\/sips\/.+/)
    })

})