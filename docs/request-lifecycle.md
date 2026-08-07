# Next.js, Playwright, Prisma, and Database Mental Model

## Overall Architecture

```text
                           Your Computer

+---------------------------------------------------------------+
|                           Node.js                             |
|                                                               |
|  +-----------------------+    +----------------------------+   |
|  |      Playwright       |    |      Next.js Server        |   |
|  |                       |    |    localhost:3000          |   |
|  |  +-----------------+  |    |                            |   |
|  |  |    Chromium     |──┼────►  Auth.js                  |   |
|  |  |   (Browser)     |  |HTTP|  Route Handlers           |   |
|  |  +-----------------+  |    |  Prisma                  |   |
|  +-----------------------+    +-------------┬--------------+   |
|                                             │                  |
+---------------------------------------------│------------------+
                                              │ SQL
                                              ▼
                                 +--------------------------+
                                 | PostgreSQL / Neon        |
                                 |        Database          |
                                 +--------------------------+
```

---

# What Each Box Means

## Node.js

The JavaScript runtime.

It runs server-side applications such as:

- Next.js
- Playwright

Think of Node.js as the operating environment.

---

## Playwright

An End-to-End (E2E) testing framework.

Responsibilities:

- Launch Chromium
- Simulate a real user
- Click buttons
- Fill forms
- Verify pages

Playwright **does not** import your Route Handlers or Prisma.

It communicates only through HTTP.

---

## Chromium

A real browser controlled by Playwright.

It behaves exactly like Chrome.

Example:

```text
GET http://localhost:3000/login
```

Chromium knows nothing about:

- Prisma
- PostgreSQL
- Auth.js

It only talks to the web server.

---

## Next.js Server

Runs on Node.js.

Listens on:

```text
http://localhost:3000
```

Receives requests from the browser.

Executes:

- Middleware
- Auth.js
- Route Handlers
- Server Components
- Prisma

---

## Auth.js

Handles authentication.

Reads:

```text
AUTH_URL
AUTH_SECRET
```

Responsible for:

- Login
- Sessions
- Cookies
- Redirects

---

## Prisma

Runs **inside** the Next.js server.

Reads:

```text
DATABASE_URL
```

Communicates with PostgreSQL.

Example:

```text
Next.js
    │
    ▼
Prisma
    │
    ▼
PostgreSQL
```

---

## PostgreSQL / Neon

Stores application data.

Examples:

- Users
- Articles
- Topics
- Comments

The database changes only when code writes to it.

Examples:

- API requests
- Seed scripts
- Prisma queries
- Migrations

---

# Request Flow

When Playwright runs:

```ts
await page.goto("/login");
```

The flow is:

```text
Playwright
      │
      ▼
Chromium
      │
HTTP Request
      ▼
Next.js
      │
      ▼
Auth.js
      │
      ▼
Prisma
      │
      ▼
Database
```

---

# Environment Variables

```text
Local .env
.env.e2e
GitHub Secrets
Vercel Environment Variables
          │
          ▼
     process.env
          │
          ▼
     Next.js Server
          │
          ▼
        Prisma
          │
          ▼
      PostgreSQL
```

Environment variables configure the application.

They do **not** automatically change the database.

---

# Seed Flow

```text
Environment Variables
        │
        ▼
     process.env
        │
        ▼
      seed.ts
        │
Run:
npx prisma db seed
        │
        ▼
      Database
```

Changing:

- `.env`
- GitHub Secrets
- Vercel Environment Variables

does **nothing** until the seed script is executed.

---

# Environment Separation

```text
Local Development

.env
    │
    ▼
Local Database


E2E / CI

GitHub Secrets
DATABASE_URL
    │
    ▼
have-a-sip-e2e


Production

Vercel Environment Variables
DATABASE_URL
    │
    ▼
Production Neon
```

Each environment has:

- Different configuration
- Different database

They are independent.

---

# Code vs Configuration vs Data

```text
              Code
     +------------------+
     | seed.ts          |
     | auth.ts          |
     | route.ts         |
     +---------+--------+
               |
               | reads
               ▼
     +------------------+
     | process.env      |
     | .env             |
     | GitHub Secrets   |
     | Vercel Env       |
     +---------+--------+
               |
               | when executed
               ▼
     +------------------+
     | Database         |
     | Local            |
     | E2E              |
     | Production       |
     +------------------+
```

---

# Key Takeaways

- Node.js is the runtime.
- Next.js runs on Node.js.
- Playwright is a separate Node.js application.
- Chromium behaves like a real browser.
- Chromium communicates with Next.js through HTTP.
- Next.js uses Prisma to communicate with PostgreSQL.
- `DATABASE_URL` determines which database Next.js connects to.
- Environment variables configure the application.
- The database changes only when code executes (API, seed, migration, etc.).
- Local, E2E, and Production environments are independent.
- Think in terms of three separate concepts:
  - **Code** → what your application does.
  - **Configuration** → environment variables (`process.env`).
  - **Data** → what is stored in the database.