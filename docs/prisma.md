# Prisma Notes

## What is Prisma?

Prisma is an **ORM (Object-Relational Mapping)** and **database toolkit** for Node.js and TypeScript.

It acts as a bridge between your application and a relational database, allowing you to interact with the database using a type-safe API instead of writing raw SQL.

```text
Next.js Application
        │
        ▼
    Prisma Client
        │
        ▼
 PostgreSQL Database
```

---

# Core Responsibilities of Prisma

Prisma has **two primary responsibilities**:

1. **Manage the database schema**
2. **Generate a type-safe database client**

Both are driven from a single file:

```
schema.prisma
```

---

# The Single Source of Truth

`schema.prisma` is the blueprint of your database.

It defines:

- Database provider
- Database connection
- Models
- Relationships
- Constraints
- Generated Prisma Client

Example:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Article {
  id    String @id @default(cuid())
  title String
}
```

Everything Prisma does starts from this file.

---

# Responsibility 1 — Database Management

Prisma reads the models in `schema.prisma` and generates SQL migrations.

Command:

```bash
npx prisma migrate dev --name init
```

Flow:

```text
schema.prisma
        │
        ▼
Generate SQL Migration
        │
        ▼
migration.sql
        │
        ▼
PostgreSQL Database
```

Prisma can:

- Create tables
- Update tables
- Create foreign keys
- Apply primary keys
- Apply unique constraints
- Apply default values
- Keep the database schema synchronized with `schema.prisma`

---

# Responsibility 2 — Generate Prisma Client

Prisma also reads the same `schema.prisma` to generate a client library.

Command:

```bash
npx prisma generate
```

Flow:

```text
schema.prisma
        │
        ▼
Generate Prisma Client
        │
        ▼
generated/prisma/
```

The generated folder contains the implementation that your application uses to communicate with PostgreSQL.

---

# What's Inside generated/prisma?

Think of the generated folder as a **database SDK**.

It contains:

- PrismaClient
- Type definitions
- Query builder
- Runtime
- Utility code

You should **never edit these files manually**.

---

# Creating Prisma Client

Import the generated client.

```ts
import { PrismaClient } from "@generated/prisma";

export const prisma = new PrismaClient();
```

This creates a Prisma Client instance that your application will use throughout the project.

---

# Using Prisma Client

Example:

```ts
const articles = await prisma.article.findMany();
```

Breaking it down:

```
prisma
```

↓

Prisma Client instance

```
article
```

↓

Represents the **Article** model and the corresponding **Article** table in PostgreSQL.

```
findMany()
```

↓

Represents the database operation.

---

# Prisma Client → SQL

You write:

```ts
await prisma.article.findMany();
```

Prisma internally generates SQL similar to:

```sql
SELECT *
FROM "Article";
```

Another example:

```ts
await prisma.article.create({
  data: {
    title: "Learning Prisma"
  }
});
```

Prisma internally generates SQL similar to:

```sql
INSERT INTO "Article" ("title")
VALUES ('Learning Prisma');
```

---

# Common Prisma Methods

| Prisma Method | SQL Equivalent |
|---------------|----------------|
| `findMany()` | `SELECT` |
| `findUnique()` | `SELECT ... WHERE` |
| `create()` | `INSERT` |
| `update()` | `UPDATE` |
| `delete()` | `DELETE` |

---

# How Models Become Queries

Example:

```prisma
model Article {
    id String @id @default(cuid())
}
```

After running:

```bash
npx prisma generate
```

Prisma generates support for:

```ts
prisma.article
```

This represents operations on the **Article** table.

Examples:

```ts
prisma.article.findMany()

prisma.article.create()

prisma.article.update()

prisma.article.delete()
```

---

# Complete Prisma Workflow

```text
                     Design Database
                           │
                           ▼
                   Write schema.prisma
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
     prisma migrate dev           prisma generate
            │                             │
            ▼                             ▼
 Generate SQL Migration        Generate Prisma Client
            │                             │
            ▼                             ▼
    PostgreSQL Database         generated/prisma/
                                              │
                                              ▼
                        import { PrismaClient }
                                              │
                                              ▼
                    const prisma = new PrismaClient()
                                              │
                                              ▼
                    prisma.article.findMany()
                                              │
                                              ▼
                  Prisma translates into SQL
                                              │
                                              ▼
                    PostgreSQL executes SQL
                                              │
                                              ▼
                     Database returns rows
                                              │
                                              ▼
         Prisma maps rows into JavaScript objects
                                              │
                                              ▼
                    Next.js Application
```

---

# Mental Model

Think of Prisma as having **two jobs**.

```text
                     Prisma
                        │
        ┌───────────────┴────────────────┐
        │                                │
        ▼                                ▼
 Database Management           Database Access
        │                                │
        ▼                                ▼
 schema.prisma                 Generated Prisma Client
        │                                │
        ▼                                ▼
 PostgreSQL                     Next.js Application
```

- **Database Management**
  - Builds and updates the database using migrations.

- **Database Access**
  - Generates a type-safe client that translates Prisma methods into SQL.

---

# Key Takeaways

- `schema.prisma` is the **single source of truth**.
- Prisma has two major responsibilities:
  1. Manage the database schema.
  2. Generate a type-safe Prisma Client.
- `prisma migrate dev` creates or updates the PostgreSQL database.
- `prisma generate` creates the Prisma Client library.
- `PrismaClient` is generated from `schema.prisma`.
- `const prisma = new PrismaClient()` creates an instance of the generated client.
- `prisma.article` represents the **Article** model and **Article** table.
- Methods like `findMany()`, `create()`, `update()`, and `delete()` are translated into SQL by Prisma.
- Prisma executes the SQL and maps the returned rows into JavaScript/TypeScript objects.