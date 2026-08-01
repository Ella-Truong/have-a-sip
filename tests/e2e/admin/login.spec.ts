import { test, expect } from "@playwright/test";

test.describe("Admin Login", () => {
    test("Should display login page", async ({ page }) => {
        await page.goto("/login");

        await expect(page).toHaveTitle(/Have a Sip/i);

        await expect(
            page.getByRole("heading", {
                level: 1,
                name: /Welcome back/i
            })
        ).toBeVisible();

        await expect(page.getByLabel("Email")).toBeVisible();
        await expect(page.getByLabel("Password")).toBeVisible();
        
        await expect(
            page.getByRole("button", {
                name: /Sign In/i
            })
        ).toBeVisible();
    });

    test("Should login sucessfully", async ({ page }) => {
        await page.goto("/login");

        await page.getByLabel("Email").fill(process.env.ADMIN_EMAIL!);

        await page.getByLabel("Password").fill(process.env.ADMIN_PASSWORD!);

        await page.getByRole("button", {
            name: /Sign In/i
        }).click();

        await expect(page).toHaveURL("/admin");
    });

    test("Should reject invalid credentials", async ({ page }) => {

    });
})