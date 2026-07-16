# Authentication & Authorization

## Overview

The **Have a Sip** blog uses a simple authentication model with two types of users:

- **Reader** – Anonymous visitors who can read published content without signing in.
- **Admin** – The blog owner who can manage articles, topics, and comments.

The application is designed so that **only the admin authenticates**. Readers never need an account.

---

# User Roles

## Reader

Readers can:

- Read published articles
- Browse topics
- Read comments
- *(Future)* Leave comments

Readers cannot:

- Access the admin dashboard
- Create or edit content
- Access admin APIs

---

## Admin

The admin can:

- Create articles
- Edit articles
- Publish or unpublish articles
- Delete articles
- Manage topics
- Moderate comments

---

# Technology Stack

- Next.js 16 (App Router)
- Auth.js v5
- Prisma 7
- PostgreSQL
- Prisma Adapter
- bcrypt

---

# Authentication Architecture

```text
Browser
    │
    ▼
Login Page
    │
    ▼
Auth.js Credentials Provider
    │
    ▼
authorize()
    │
    ▼
Prisma
    │
    ▼
PostgreSQL
    │
    ▼
JWT Session
    │
    ▼
Next.js Proxy
    │
    ▼
Protected Admin Routes
```

---

# Authentication Flow

```text
Admin
    │
    ▼
Visit /login
    │
    ▼
Enter Email & Password
    │
    ▼
Credentials Provider
    │
    ▼
authorize()
    │
    ▼
Find User by Email
    │
    ▼
bcrypt.compare()
    │
    ▼
Password Valid?
      │
 ┌────┴────┐
 │         │
 ▼         ▼
No        Yes
 │         │
 ▼         ▼
Reject   Create JWT Session
               │
               ▼
      Redirect to /admin
```

---

# Authorization Flow

```text
Incoming Request
       │
       ▼
Proxy
       │
       ▼
Protected Route?
       │
 ┌─────┴─────┐
 │           │
 ▼           ▼
No          Yes
 │           │
 ▼           ▼
Allow    Has Session?
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
      No            Yes
       │             │
       ▼             ▼
 Redirect        Continue
  /login
```

---

# Protected Routes

Protected by the proxy:

```text
/admin/*
/api/admin/*
```

Public routes:

```text
/
/articles
/articles/[slug]
/about
/api/articles/*
```

---

# Project Structure

```text
src
├── app
│   ├── (reader)
│   ├── admin
│   ├── login
│   └── api
│       └── auth
│           └── [...nextauth]
│               └── route.ts
│
├── auth.ts
├── auth.config.ts
├── proxy.ts
│
├── backend
│   ├── repositories
│   ├── services
│   ├── types
│   └── validations
│
├── generated
├── lib
│   └── prisma.ts
│
└── prisma
```

---

# Authentication Components

## auth.config.ts

Responsible for authentication configuration.

### Responsibilities

- Configure the Credentials Provider
- Validate login credentials
- Find the user by email
- Compare passwords using `bcrypt`
- Return the authenticated user

---

## auth.ts

Creates and exports the Auth.js instance.

### Responsibilities

- Configure the Prisma Adapter
- Configure JWT session strategy
- Export:

```ts
handlers
auth
signIn
signOut
```

---

## app/api/auth/[...nextauth]/route.ts

Registers the Auth.js API routes.

```ts
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
```

Available endpoints include:

```text
/api/auth/signin
/api/auth/signout
/api/auth/session
```

---

## proxy.ts

Protects application routes.

### Responsibilities

- Check whether the user is authenticated
- Redirect unauthenticated users to `/login`
- Allow authenticated users to continue

---

# User Model

```text
User
├── id
├── name
├── email
├── password (hashed)
├── role
├── createdAt
└── updatedAt
```

Current role:

```text
ADMIN
```

---

# Session Strategy

The project uses **JWT sessions**.

### Why JWT?

- Required for the Credentials Provider in Auth.js v5
- Lightweight
- Fast authentication
- No database lookup for every request

---

# Password Security

Passwords are never stored as plain text.

Authentication process:

1. User enters a password.
2. The stored password hash is retrieved.
3. `bcrypt.compare()` verifies the password.
4. Authentication succeeds only if the passwords match.

---

# Security Features

## Implemented

- Password hashing with bcrypt
- Credentials authentication
- JWT session strategy
- Protected admin pages
- Protected admin API routes
- Admin-only authentication

## Future Improvements

- Logout
- Remember Me
- Password reset
- GitHub OAuth
- Google OAuth
- Role-based authorization
- Session expiration handling
- Login rate limiting
- Audit logging

---

# Current Status

## Completed

- ✅ User model
- ✅ Database migration
- ✅ Admin seed script
- ✅ Auth.js integration
- ✅ Prisma Adapter
- ✅ Credentials Provider
- ✅ Password hashing
- ✅ Login page
- ✅ JWT authentication
- ✅ Protected admin routes
- ✅ Protected admin API routes

---

# Next Steps

- Admin Dashboard
- Article Management
- Topic Management
- Comment Moderation
- Logout
- Role-based authorization

---

# Design Philosophy

**Have a Sip** is a personal engineering blog.

The authentication system is intentionally minimal:

- Readers never need an account.
- Only the blog owner authenticates.
- Administrative functionality is isolated behind protected routes.
- Authentication and authorization are separated, making the architecture clean, maintainable, and easy to extend.

This approach provides a frictionless reading experience while ensuring all content management features remain secure.