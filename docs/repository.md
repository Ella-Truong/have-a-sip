# Repository Pattern

## What is it?

The Repository is the layer responsible for communicating with the database through Prisma.

## Why do we use it?

- Separate database access from business logic.
- Make the code easier to maintain.
- Allow services to focus on business rules.
- Make testing easier by mocking repositories.

## Responsibilities

- Read data from PostgreSQL.
- Save data.
- Update data.
- Delete data.

## What should NOT be here?

- Generate slugs.
- Calculate reading time.
- Check permissions.
- Send emails.

## Example

Page
↓
Service
↓
Repository
↓
Prisma
↓
PostgreSQL

## Key takeaways

The Repository answers:

"How do I access the database?"