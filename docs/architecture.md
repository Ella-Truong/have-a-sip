# Architecture

## Overview

Have a Sip is a personal publishing platform built with Next.js.

The application consists of two sections:

- **Public Reader Section**
- **Private Admin Section**

Both sections live inside a single Next.js application and share the same database.

```text
                 Have a Sip
              (One Next.js App)
                       │
        ┌──────────────┴──────────────┐
        │                             │
 Public Reader Routes          Private Admin Routes
        │                             │
        └──────────────┬──────────────┘
                       │
                  PostgreSQL

```
---

# System Architecture

```text
Reader
   │
   ▼
Next.js App
   │
   ├── Reader Routes
   ├── Admin Routes
   ├── Server Actions
   └── Route Handlers
            │
            ▼
         Prisma ORM
            │
            ▼
        PostgreSQL
```
## Reader Routes

```text
/
├── articles
│   └── [slug]
├── topics
│   └── [slug]
└── about
```
---

# Admin Section

The admin section acts as a private CMS.

Only the owner can access these routes.

## Admin Routes

```text
/admin
├── login
├── dashboard
├── posts
│   ├── new
│   └── [id]/edit
├── analytics
├── comments
└── topics
```

---
# Request Flow

## Reader Request

```text
Reader
   │
   ▼
Article Page
   │
   ▼
Server Component
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

## Admin Request

```text
Admin
   │
   ▼
Dashboard
   │
   ▼
Server Actions
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

---

# Application Layers

```text
UI Components
      │
      ▼
Server Actions
      │
      ▼
Services
      │
      ▼
Repositories
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL
```

# Authentication

Authentication is required only for the admin section.

```text
User
   │
   ▼
/admin
   │
   ▼
Middleware
   │
   ├── Authenticated → Continue
   │
   └── Unauthenticated → Redirect to /admin/login
```

Readers do not need accounts.

---

# Analytics Flow

Every article view creates a record that can later be aggregated.

```text
Reader
   │
   ▼
Article Page
   │
   ▼
Create View Record
   │
   ▼
Views Table
   │
   ▼
Analytics Dashboard
```

Analytics include:

- Total views
- Monthly views
- Top articles
- Popular topics
- Reading trends

---

# Comment Flow

```text
Reader
   │
   ▼
Submit Comment
   │
   ▼
Comment Table
   │
   ▼
Admin Dashboard
   │
   ▼
Approve / Delete
```

---


# Database

## User

Used only for the owner.

```text
User
-----
id
email
password
createdAt
```

## Post

```text
Post
-----
id
title
slug
content
excerpt
status
createdAt
updatedAt
```

## Topic

```text
Topic
-----
id
name
slug
```
## Comment

```text
Comment
--------
id
postId
authorName
content
createdAt
```

## View

```text
View
----
id
postId
viewedAt
```
# Design Principles

## Keep Reader Experience Simple

Readers come to:

- Read
- Learn
- Discuss

Not to:

- Like
- Follow
- Bookmark
- Build profiles

## Keep Admin Powerful

Admin can:

- Write articles
- Publish content
- Manage topics
- Moderate comments
- Analyze reader interests

## Single Application

Have a Sip is deployed as a single application.

```text
One Repository
       │
One Next.js Application
       │
One Deployment
       │
One PostgreSQL Database
```

This keeps development simple while allowing the platform to grow in the future.