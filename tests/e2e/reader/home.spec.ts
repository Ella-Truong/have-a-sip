import { test, expect } from "@playwright/test";

test.describe("Reader Homepage", () => {
    test("Should display hero section", async ({ page }) => {
        await page.goto("/");

        // Browser metadata
        await expect(page).toHaveTitle(/Have a Sip/i);

        // Hero heading
        await expect(
            page.getByRole("heading", {
                level: 1,
            })
        ).toBeVisible();

        // Brand heading
        await expect(
            page.getByRole("heading", {
                level: 2,
                name: /Have a Sip/i,
            })
        ).toBeVisible();

        // Hero description
        await expect(
            page.getByText(
                /A quiet corner where I collect lessons from backend engineering/i
            )
        ).toBeVisible();
    });

    test("Should display latest articles section", async ({ page }) => {
        await page.goto("/");

        await expect(
            page.getByRole("heading", {
                name: /Latest Articles/i,
            })
        ).toBeVisible();
    });

    test("Should display topics sidebar", async ({ page }) => {
        await page.goto("/");

        await expect(
            page.getByRole("heading", {
                name: /Topics/i,
            })
        ).toBeVisible();
    });
});