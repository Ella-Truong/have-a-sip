# Database Environments & Project Workflow

## Overview

A software project should **not** use a single database for every purpose.

Instead, each stage of development has its own database with a specific responsibility.

```text
                PostgreSQL Server
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
   have_a_sip     have_a_sip_test    Production DB
   Development        Testing        (Supabase)
```

---

# 1. Development Database

**Database**

```
have_a_sip
```

## Purpose

- Build new features
- Debug the application
- Manually create articles
- Experiment with ideas

## Workflow

```text
npm run dev
        │
        ▼
Next.js
        │
Prisma
        │
have_a_sip
```

This database contains your working data while developing.

Examples:

- Topics
- Articles
- Comments
- Sample content

---

# 2. Testing Database

**Database**

```
have_a_sip_test
```

## Purpose

- Integration testing
- API testing
- Safe place for Jest

## Workflow

```text
npm test
        │
        ▼
Jest
        │
Prisma
        │
have_a_sip_test
```

This database is temporary.

Tests are free to:

- Create data
- Update data
- Delete data

Nothing here is permanent.

---

# 3. Production Database

Example:

```
Supabase PostgreSQL
```

## Purpose

- Store real articles
- Store real comments
- Store real users' data

## Workflow

```text
Users
    │
Vercel
    │
Prisma
    │
Supabase PostgreSQL
```

This database should never be touched by automated tests.

---

# Why Development and Testing Should Not Share One Database

## Case 1 — Tests Clean the Database

Development database:

```text
Redis Guide
Prisma Guide
Docker Guide
```

Test starts:

```ts
beforeEach(async () => {
    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();
    await prisma.topic.deleteMany();
});
```

Result:

```text
Database becomes empty.
```

Your development data is lost.

---

## Case 2 — Tests Don't Clean the Database

Each test inserts:

```text
Test Article
Test Topic
Test Comment
```

After many test runs:

```text
Redis Guide
Prisma Guide

Test Article 1
Test Article 2
Test Article 3
...
```

Your development database becomes polluted.

---

## Case 3 — Unpredictable Tests

You manually create:

```text
Topic

AI
```

A test assumes:

```text
Database is empty.
```

Instead, data already exists.

The test may fail even though the application works.

---

# Deterministic Tests

A good integration test should always behave the same way.

```text
Run #1
PASS

Run #2
PASS

Run #100
PASS
```

Tests should always begin from a known database state.

---

# One PostgreSQL Server Can Host Multiple Databases

```text
PostgreSQL Server
│
├── have_a_sip
├── have_a_sip_test
└── postgres
```

Think of PostgreSQL as an apartment building.

Each database is a different apartment.

---

# One Prisma Schema, Multiple Databases

```text
schema.prisma
        │
        ▼
Migrations
        │
        ├── have_a_sip
        ├── have_a_sip_test
        └── Production
```

All databases share the same schema.

Only the data is different.

Example:

```text
Article
Topic
Comment
```

exist in every database.

---

# Why Migrations Must Be Applied Everywhere

Suppose you add:

```prisma
model User {
    id    String @id
    email String @unique
}
```

Create a migration once.

Apply it to:

- Development database
- Testing database
- Production database

This keeps every environment using the same database structure.

---

# How Prisma Chooses the Database

Prisma does **not** know:

- Development
- Testing
- Production

It only reads:

```ts
process.env.DATABASE_URL
```

Whichever environment provides `DATABASE_URL` determines which database Prisma connects to.

Development:

```text
DATABASE_URL
        │
        ▼
have_a_sip
```

Testing:

```text
DATABASE_URL
        │
        ▼
have_a_sip_test
```

Production:

```text
DATABASE_URL
        │
        ▼
Supabase PostgreSQL
```

---

# Prisma CLI vs Prisma Client

## Prisma CLI (Tool)

Used in the terminal.

Examples:

```bash
npx prisma migrate dev
npx prisma migrate deploy
npx prisma studio
npx prisma generate
```

Purpose:

- Generate Prisma Client
- Apply migrations
- Open Prisma Studio

---

## Prisma Client (Library)

Used inside your application.

Example:

```ts
await prisma.article.findMany();
```

Purpose:

- Read data
- Create data
- Update data
- Delete data

---

# dotenv-cli

Purpose:

Load a specific environment file before running another command.

Example:

```bash
dotenv -e .env.test -- npx prisma studio
```

Flow:

```text
dotenv-cli
        │
Load .env.test
        │
process.env
        │
Prisma CLI
        │
Database
```

Without `dotenv-cli`:

```bash
npx prisma studio
```

Prisma loads:

```text
.env
```

With `dotenv-cli`:

```bash
dotenv -e .env.test -- npx prisma studio
```

Prisma loads:

```text
.env.test
```

---

# Git Workflow

```
feature/*
        │
Develop
        │
Run Tests
        │
Pull Request
        │
Merge
        │
main
```

`main` is the production-ready branch.

Feature branches:

```
feature/articles
feature/comments
feature/testing
feature/auth
```

---

# Deployment Workflow

```text
Feature Branch
        │
Pull Request
        │
Integration Tests
        │
Merge into main
        │
GitHub
        │
Vercel
        │
Supabase PostgreSQL
```

---

# Final Architecture

```text
                 Development

              npm run dev
                   │
               Next.js
                   │
                Prisma
                   │
             have_a_sip



                 Testing

               npm test
                   │
                 Jest
                   │
                Prisma
                   │
           have_a_sip_test



               Production

               Real Users
                   │
                Vercel
                   │
                Prisma
                   │
         Supabase PostgreSQL
```

---

# Key Takeaways

- One PostgreSQL server can contain multiple databases.
- Development, testing, and production should use different databases.
- Development data should never be deleted by automated tests.
- Every database should share the same Prisma schema.
- Prisma chooses the database through `DATABASE_URL`.
- Integration tests should always use a dedicated testing database.
- Production data should never be touched by testing code.
- Use feature branches for development.
- Keep `main` stable and deployable.
- Vercel deploys the application, while Supabase stores production data.