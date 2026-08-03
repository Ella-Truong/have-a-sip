import { test, expect, type Page } from "@playwright/test";

const ARTICLE_SLUG = "the-bug-wasnt-in-my-code";

async function joinConversation(
    page: Page,
    cupName: string
) {
    await page.getByRole("button", {
        name: /Join the conversation/i,
    }).click();

    await page.getByRole("button", {
        name: "Latte",
    }).click();

    await page
        .getByPlaceholder("Cup name")
        .fill(cupName);

    await page.getByRole("button", {
        name: /Let's Start/i,
    }).click();
}

test.describe("Reader Article", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`/sips/${ARTICLE_SLUG}`);
    });

    // Navigation
    test("should navigate back to the Sips page", async ({ page }) => {
        await page.getByRole("link", {
            name: /Back to Sips/i,
        }).click();

        await expect(page).toHaveURL("/sips");
    });

    test("should navigate using the More Sips link", async ({ page }) => {
        await page.getByRole("link", {
            name: /More Sips/i,
        }).click();

        await expect(page).toHaveURL("/sips");
    });

    // Article header
    test("should display article header", async ({ page }) => {
        await expect(
            page.getByRole("heading", {
                level: 1,
            })
        ).toBeVisible();
    });

    // Article content
    test("should display article content", async ({ page }) => {
        const content = page.locator(".article-content");

        await expect(content).toBeVisible();

        await expect(
            content.getByText(/teach you how software evolves/i)
        ).toBeVisible();
    });

    // Join Conversation
    test("should display the Join Conversation section", async ({ page }) => {
        await expect(
            page.getByRole("heading", {
                level: 2,
                name: /Wanna join the conversation/i,
            })
        ).toBeVisible();

        await expect(
            page.getByText(/Pull up a chair/i)
        ).toBeVisible();

        await expect(
            page.getByRole("button", {
                name: "Join the conversation",
            })
        ).toBeVisible();
    });

    test("should open the Join Conversation modal", async ({ page }) => {
        await page.getByRole("button", {
            name: /Join the conversation/i,
        }).click();

        await expect(
            page.getByRole("dialog")
        ).toBeVisible();

        await expect(
            page.getByText("Pick your sip")
        ).toBeVisible();

        await expect(
            page.getByPlaceholder("Cup name")
        ).toBeVisible();

        await expect(
            page.getByRole("button", {
                name: /Let's Start/i,
            })
        ).toBeDisabled();
    });

    test("should join the conversation", async ({ page }) => {
        const cupName = `pw-${Date.now()}`;

        await joinConversation(page, cupName);

        await expect(
            page.getByRole("heading", {
                level: 2,
                name: new RegExp(`Welcome back, ${cupName}`),
            })
        ).toBeVisible();

        await expect(
            page.getByText(/Your thoughtful note is waiting below/i)
        ).toBeVisible();
    });

    test("should submit a comment", async ({ page }) => {
        const cupName = `pw-${Date.now()}`;

        await joinConversation(page, cupName);

        const comment =
            "This is my Playwright E2E comment.";

        await page
            .getByPlaceholder(
                "What did this article make you think about?"
            )
            .fill(comment);

        await page.getByRole("button", {
            name: "Share",
        }).click();

        await expect(
            page.getByText(comment)
        ).toBeVisible();
    });
});