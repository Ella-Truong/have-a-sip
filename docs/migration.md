# Prisma Migrations

## What is it?

A version history of the database schema.

## Why do we use it?

- Keep the database synchronized with the schema.
- Version control database changes.
- Allow teammates to reproduce the same schema.
- Avoid manually writing SQL for every change.

## Flow

schema.prisma
   ↓
Migration
   ↓
PostgreSQL

## Key takeaways

Every schema change creates a new migration.