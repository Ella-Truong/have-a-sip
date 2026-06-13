# Tech Stack

## Frontend

- **Next.js** – Application framework
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling
- **MDX** – Article content

---

## Backend

- **Next.js Route Handlers** – API endpoints
- **PostgreSQL** – Primary database
- **Prisma** – ORM and migrations

Responsibilities:

- Article metadata
- Categories
- The Table (comments)
- Take a Sip flow
- Moderation support

---

## Infrastructure

- **Vercel** – Hosting and deployment

---

## Testing

- **Jest** – Unit and integration testing
- **Playwright** – End-to-end testing

---

## Future Learning Opportunities

Technologies that may be introduced as the platform grows:

- **Redis** – Caching and rate limiting
- **Docker** – Containerization
- **OpenTelemetry** – Observability
- **CI/CD** – Automated deployment pipelines

---

## Architecture

```text
Reader
   │
   ▼
Next.js
   │
   ├── MDX Articles
   ├── API Routes
   │
   ▼
PostgreSQL
   │
   ▼
 Prisma
```

---

## Why This Stack?

The stack is intentionally simple.

The frontend focuses on creating a calm reading experience, while the backend provides opportunities to learn:

- API design
- Database modeling
- Comment systems
- Validation
- Testing
- Caching
- Deployment
- System design fundamentals

As Have a Sip grows, it can evolve from a personal blog into a platform for exploring more advanced backend and infrastructure concepts.