# Playwright Notes

## What is Playwright?

Playwright is an **End-to-End (E2E) testing framework** that automates a real web browser to test an application exactly as a user would.

Unlike Jest integration tests, which call backend routes directly, Playwright interacts with the application's user interface.

Think of Playwright as a robot controlling a browser.

```text
Playwright
    │
    ▼
Browser
    │
    ▼
Your Website
```

Playwright does **not** know about your service layer, repository layer, or database. It only sees what a real user sees.

---

# The Testing Pyramid

A modern full-stack application usually has three testing levels.

```text
                E2E
           (Playwright)
                ▲
         Integration
             (Jest)
                ▲
            Unit Test
             (Jest)
```

---

## Unit Test

### Purpose

Test one function in isolation.

### Example

```text
generateSlug()

↓

Return correct slug
```

### Characteristics

- Very fast
- No database
- No HTTP request
- No browser

---

## Integration Test

### Purpose

Verify one backend feature works correctly.

### Example

```text
PATCH API

↓

Route

↓

Validation

↓

Service

↓

Repository

↓

Database
```

### Characteristics

- Uses the real database
- Calls the API route directly
- No browser

---

## End-to-End Test

### Purpose

Verify the entire application works from a user's perspective.

### Example

```text
Browser

↓

React

↓

API

↓

Service

↓

Repository

↓

Database

↓

React updates UI

↓

Browser displays result
```

### Characteristics

- Uses a real browser
- Uses the real frontend
- Uses the real backend
- Uses the real database

---

# How Playwright Works

Suppose we write:

```ts
test("publish article", async ({ page }) => {
```

Internally, Playwright performs the following steps.

```text
Playwright

↓

Launch Browser

↓

Open Website

↓

Locate Login Form

↓

Type Email

↓

Type Password

↓

Click Login

↓

Browser sends HTTP request

↓

Next.js API

↓

Validation

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

↓

Response

↓

React updates UI

↓

Playwright verifies UI
```

Notice that Playwright never calls the API directly.

It simply performs the same actions a real user would.

---

# What is Chromium?

When Playwright is installed, it downloads browser engines.

Typically:

```text
Chromium

Firefox

WebKit
```

---

## Chromium

Chromium is the open-source browser project used by many modern browsers.

Examples include:

```text
Chromium

↓

Google Chrome

Microsoft Edge

Brave

Opera

Arc
```

Playwright downloads its own version of Chromium so every developer and CI pipeline uses the same browser version.

This makes tests consistent and reproducible.

---

## Firefox

Playwright can also automate Mozilla Firefox.

This helps verify browser compatibility.

---

## WebKit

WebKit is the browser engine used by Safari.

Playwright uses WebKit to test Safari behavior.

---

# Why Does Playwright Download Browsers?

Suppose:

- Developer A has Chrome 141.
- Developer B has Chrome 142.

Small browser differences can cause inconsistent test results.

Instead, Playwright downloads known browser versions so every machine runs identical tests.

---

# The Page Object

The most important object in Playwright is:

```ts
page
```

Think of it as:

```text
One browser tab
```

Everything happens through `page`.

---

## Open a Page

```ts
await page.goto("/");
```

Meaning:

```text
Browser

↓

Open homepage
```

---

## Click

```ts
await page.click(...)
```

Meaning:

```text
User clicks
```

---

## Type

```ts
await page.fill(...)
```

Meaning:

```text
User types
```

---

## Verify

```ts
await expect(...)
```

Meaning:

```text
User should see...
```

---

# Integration Test vs Playwright

## Jest Integration Test

Thinking like the server.

```text
Create Request

↓

Call Route

↓

Receive Response

↓

Verify Database
```

---

## Playwright

Thinking like the user.

```text
Open Browser

↓

Click Login

↓

Type Email

↓

Click Submit

↓

See Dashboard
```

---

# Example: Creating an Article

## Integration Test

```text
POST API

↓

Route

↓

Service

↓

Repository
```

---

## Playwright

```text
Login

↓

Click "New Article"

↓

Enter Title

↓

Enter Content

↓

Click Publish

↓

Article appears
```

Notice that Playwright never interacts with the repository or service directly.

It only interacts with the user interface.

---

# What Can Playwright Catch?

Some bugs cannot be detected by integration tests.

## Example 1

The API works correctly.

However:

```tsx
disabled={true}
```

prevents the button from being clicked.

Integration Test:

```text
PASS
```

Playwright:

```text
FAIL
```

because the user cannot perform the action.

---

## Example 2

The API returns correct data.

React renders the wrong field.

Integration Test:

```text
PASS
```

Playwright:

```text
FAIL
```

because the UI is incorrect.

---

# Mental Model

When writing Playwright tests, avoid thinking:

> "How do I call this API?"

Instead think:

> "If I were using the application, what would I do?"

---

## Reader Journey

```text
Open Homepage

↓

View Articles

↓

Open an Article

↓

Read Content

↓

Leave a Comment

↓

Comment appears
```

---

## Admin Journey

```text
Login

↓

Create Topic

↓

Create Article

↓

Publish Article

↓

Verify article appears publicly
```

These are ideal Playwright scenarios because they validate complete user workflows rather than isolated backend functionality.

---

# Learning Roadmap

1. Understand `playwright.config.ts`.
2. Learn the structure of `test()`.
3. Learn the `page` object.
4. Learn locators (`getByRole`, `getByText`, etc.).
5. Learn assertions (`expect`).
6. Build complete user workflows.

By following this progression, Playwright becomes much easier to understand because each new concept builds on the previous one.