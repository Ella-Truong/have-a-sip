import { test, expect } from "@playwright/test";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password){
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set.")
} 

test.describe("Admin Login", () => {
    test("should display login page", async ({ page }) => {
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

    test("should login successfully", async ({ page }) => {
        await page.goto("/login");

        await page.getByLabel("Email").fill(email);
        await page.getByLabel("Password").fill(password);

        await page.getByRole("button", {
            name: /Sign In/i
        }).click();

        await expect(page).toHaveURL("/admin");
    });

    test("should reject invalid credentials", async ({ page }) => {
        await page.goto("/login");

        await page.getByLabel("Email").fill(email);
        await page.getByLabel("Password").fill("wrong-password");

        await page.getByRole("button", {
            name: /Sign In/i
        }).click();

        await expect(page).toHaveURL("/login")

        await expect(
            page.getByText(/Invalid email or password./i)
        ).toBeVisible();
    });
})