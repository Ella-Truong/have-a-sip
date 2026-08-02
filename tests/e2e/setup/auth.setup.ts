
import { test as authSetup, expect } from "@playwright/test";

import { admin } from "../utils/auth";

const authFile = "playwright/.auth/admin.json";

authSetup("authenticate as admin", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill(admin.email);
    await page.getByLabel("Password").fill(admin.password);

    await page.getByRole("button", {
        name: /Sign In/i,
    }).click();

    await expect(page).toHaveURL("/admin");

    await page.context().storageState({
        path: authFile,
    });
});