# Postman API Testing

## Overview

This project follows a **backend-first** development workflow.

Before building the frontend, every API endpoint is verified using **Postman** to ensure the backend behaves correctly.

### Benefits

- Validate API endpoints independently of the frontend.
- Catch validation and database errors early.
- Verify business logic before UI integration.
- Reduce debugging time during frontend development.

---

# Why Postman?

Postman acts as a temporary client.

Instead of waiting for a React page or form to be built, Postman sends HTTP requests directly to the backend.

```text
Postman
    │
    ▼
API Route
    │
    ▼
Validation (Zod)
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
Prisma
    │
    ▼
PostgreSQL
    │
    ▼
HTTP Response
```

This allows each endpoint to be tested independently.

---

# API Testing Workflow

For every endpoint:

1. Send a request from Postman.
2. Observe the HTTP status code.
3. Inspect the response body.
4. Check server logs if an error occurs.
5. Fix the issue.
6. Retest until the endpoint behaves correctly.

---

# Endpoints Tested

## Topics

### Get Topics

```http
GET /api/topics
```

Expected:

- Return all topics.
- Status `200 OK`.

---

### Create Topic

```http
POST /api/admin/topics
```

Request Body:

```json
{
  "name": "Backend"
}
```

Expected:

- Slug generated automatically.
- Topic saved to PostgreSQL.
- Status `201 Created`.

---

## Articles

### Get Articles

```http
GET /api/articles
```

Supports pagination.

Examples:

```http
GET /api/articles

GET /api/articles?page=1

GET /api/articles?page=2&limit=10
```

Expected:

- Default pagination when parameters are omitted.
- Status `200 OK`.

---

### Create Article

```http
POST /api/admin/articles
```

Request Body:

```json
{
  "title": "Learning Backend",
  "excerpt": "Testing Postman",
  "content": "Today I learned backend testing.",
  "coverImage": null,
  "topicId": "<existing-topic-id>"
}
```

Expected:

- Slug generated automatically.
- Reading time calculated automatically.
- Foreign key validated.
- Status `201 Created`.

---

# Validation Testing

The following invalid requests were also tested.

## Invalid Pagination

```http
GET /api/articles?page=0
```

Expected:

- Zod validation fails.

---

## Missing Request Body

```http
POST /api/admin/articles
```

(no JSON body)

Expected:

- JSON parsing error.

---

## Invalid Foreign Key

```json
{
  "topicId": "invalid-topic-id"
}
```

Expected:

- PostgreSQL rejects the request with a foreign key constraint error.

---

## Missing Required Fields

```json
{}
```

Expected:

- Zod validation fails.

---

# HTTP Status Codes

| Status | Meaning |
|---------|---------|
| **200 OK** | Request completed successfully. |
| **201 Created** | Resource created successfully. |
| **400 Bad Request** | Invalid client input (validation error). |
| **404 Not Found** | Requested resource does not exist. |
| **405 Method Not Allowed** | Endpoint exists but the HTTP method is not supported. |
| **409 Conflict** | Resource conflict (e.g. duplicate data). |
| **500 Internal Server Error** | Unexpected server-side error. |

---

# Debugging Strategy

Errors are located by identifying the layer where execution stops.

```text
Client
    │
    ▼
Route
    │
    ▼
Validation
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
Prisma
    │
    ▼
Database
```

Examples:

| Error | Layer |
|--------|-------|
| `Unexpected end of JSON input` | Request body parsing |
| `ZodError` | Validation |
| `PrismaClientKnownRequestError` | Database operation |
| `Foreign key constraint failed` | Database relationship |
| `PrismaClientInitializationError` | Prisma configuration |

---

# Key Takeaway

Using Postman before building the frontend provided several advantages:

- Verified backend APIs independently of the frontend.
- Improved understanding of the complete request lifecycle.
- Identified validation, business logic, infrastructure, and database issues early.
- Increased confidence that backend functionality worked before frontend integration.

---

# Development Workflow

This project follows the following workflow:

```text
Design API
        │
        ▼
Implement Route
        │
        ▼
Validation (Zod)
        │
        ▼
Service
        │
        ▼
Repository
        │
        ▼
Prisma
        │
        ▼
PostgreSQL
        │
        ▼
Test with Postman
        │
        ▼
Build Frontend
        │
        ▼
End-to-End Testing
```

Testing each endpoint with Postman before frontend development ensures that backend functionality is validated independently, making frontend integration significantly easier.