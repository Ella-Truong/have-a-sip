import { test, expect } from "@playwright/test";

test.describe("Reader Navigation", () => {
    test("should display navigation bar", async ({ page }) => {
        await page.goto("/");

        await expect(
            page.getByRole("navigation")
        ).toBeVisible();

        await expect(
            page.getByRole("link", {
                name: /Have a Sip/i,
            })
        ).toBeVisible();

        await expect(
            page.getByRole("link", {
                name: /Sips/i,
            })
        ).toBeVisible();

        await expect(
            page.getByRole("link", {
                name: /About/i,
            })
        ).toBeVisible();
    });

    test("should navigate to homepage when clicking the logo", async ({ page }) => {
        // Start away from the homepage so navigation is meaningful.
        await page.goto("/about");

        await page.getByRole("link", {
            name: /Have a Sip/i,
        }).click();

        await expect(page).toHaveURL("/");
    });

    test("should navigate to About page", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("link", {
            name: /About/i,
        }).click();

        await expect(page).toHaveURL("/about");
    });

    test("should navigate to Sips page", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("link", {
            name: /Sips/i,
        }).click();

        await expect(page).toHaveURL("/sips");
    });
});