import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

if (!process.env.CI) {
  const result = dotenv.config({ path: ".env.e2e" });

  if (result.error) {
    throw result.error;
  }
}
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  
  /**
   * npm run test:e2e -> Start Next.js -> wait until localhost:300 is ready -> run tests
   */
  webServer: {
    command: process.env.CI
      ? "npm run build:e2e && npm run start:e2e"
      : "npm run build:e2e:local && npm run start:e2e:local",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      //run every file ending in .setup.ts
      name: "setup",
      testMatch: /.*\.setup\.ts/,

    },
    {
      //public pages - no authentication required
      name: "reader",
      testMatch: /reader\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"]
      },
    },
    { 
      //admin pages - starts already authenticated
      name: "admin",
      testMatch: /admin\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/admin.json"
      },
      dependencies: ["setup"],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
