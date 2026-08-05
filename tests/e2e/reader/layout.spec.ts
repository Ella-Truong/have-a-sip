import { test, expect } from "@playwright/test";

test.describe("Reader Layout", () => {
    // Navigation 
    test("should display the navigation bar", async ({ page }) => {
        await page.goto("/");

        await expect(page.getByRole("navigation")).toBeVisible();

        await expect(
            page.getByRole("link", {
                name: /Have a Sip/i,
            })
        ).toBeVisible();

        await expect(
            page.getByRole("link", {
                name: "Sips",
                exact: true,
            })
        ).toBeVisible();

        await expect(
            page.getByRole("link", {
                name: "About",
            })
        ).toBeVisible();
    });

    test("should navigate to the homepage when clicking the logo", async ({ page }) => {
        await page.goto("/about");

        await page.getByRole("link", {
            name: /Have a Sip/i,
        }).click();

        await expect(page).toHaveURL("/");
    });

    test("should navigate to the About page", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("link", {
            name: "About",
        }).click();

        await expect(page).toHaveURL("/about");
    });

    test("should navigate to the Sips page", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("link", {
            name: "Sips",
            exact: true,
        }).click();

        await expect(page).toHaveURL("/sips");
    });

    // Footer
    test("should display the footer section", async ({page}) => {
        await page.goto("/");

        const footer = page.getByRole("contentinfo");
        await expect(footer).toBeVisible();

        await expect(
            footer.getByText("Find Me",{
                exact: true,
            })
        ).toBeVisible();

        await expect(
            footer.getByRole("link", {
                name: /GitHub/i,
            })
        ).toHaveAttribute("href", /github\.com/);

        await expect(
            footer.getByRole("link", {
                name: /LinkedIn/i
            })
        ).toHaveAttribute("href", /linkedin\.com/);

        await expect(
            footer.getByRole("link", {
                name: /Email/i
            })
        ).toHaveAttribute("href", /^mailto:/);

    })


});