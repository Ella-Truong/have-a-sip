# Slug

## What is it?

A URL-friendly identifier for an article.

Example:

Title:
Understanding Prisma Migrations

Slug:
understanding-prisma-migrations

## Why do we use it?

- Human-readable URLs.
- Better SEO.
- Easier to share.
- More meaningful than random IDs.

## Why not use the database ID?

ID:

/articles/cmdcx4xws0000...

Slug:

/articles/understanding-prisma-migrations

The ID is for the database.

The slug is for people.

## Flow

Browser
   ↓
params.slug
   ↓
Repository.findBySlug()
   ↓
Article
   ↓
article.id
   ↓
Comments

## Key takeaways

Slug is the public identity.

ID is the internal identity.