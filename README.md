# ☕ Have a Sip

**Have a Sip** is a personal engineering blog and publishing platform where I share what I learn about software engineering, backend development, system design, and my journey as a developer.

The goal is to create a calm, distraction-free reading experience. Readers can simply read and discuss articles, while I manage content and view analytics through a private admin dashboard.

---

## ✨ Features

### Public Reader Side

- Browse articles
- Read articles
- Browse topics
- Leave comments
- View related posts

### Private Admin Side

- Login
- Dashboard
- Create posts
- Edit posts
- Delete posts
- Draft / Publish workflow
- Manage topics
- Moderate comments
- View analytics

### Analytics

- Total views
- Monthly views
- Top posts
- Popular topics
- Reading trends

---

## Philosophy

Have a Sip is intentionally simple.

Readers can:

- Read
- Comment

Readers cannot:

- Sign up
- Like posts
- Bookmark posts
- Follow authors
- Edit content

The focus is on learning, sharing, and discussion—not social engagement.

---

## Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

### Backend

- Next.js Server Actions
- Route Handlers

### Database

- PostgreSQL

### ORM

- Prisma

### Authentication

- NextAuth.js (Auth.js)

### Validation

- Zod

### Charts & Analytics

- Recharts

### Deployment

- Vercel

---

## Project Structure

```text
src/
├── app/
│   ├── (reader)
│   ├── admin
│   ├── api
│   └── layout.tsx
│
├── components/
│   ├── admin
│   ├── reader
│   ├── shared
│   └── ui
│
├── actions/
├── services/
├── repositories/
├── lib/
├── hooks/
├── types/
├── validations/
├── constants/
└── prisma/
```