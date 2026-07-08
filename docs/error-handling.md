# Error Handling in Next.js Backend

## Why do we need HTTP status codes?

HTTP status codes communicate the result of an API request to the client.

They allow:

- Frontend applications to know whether a request succeeded or failed.
- Developers to quickly identify problems in the browser's DevTools (Network tab).
- API consumers to handle different situations appropriately.

Common status codes:

| Status | Meaning |
|---------|---------|
| 200 | OK |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# Why does the browser only show HTTP status instead of the actual error?

The browser is the **client**.

The client only receives the HTTP response returned by the server.

Example:

```http
HTTP/1.1 500 Internal Server Error

{
  "message": "Something went wrong."
}
```

The browser **does not** know what exception happened inside the server.

The actual exception remains on the server.

Example shown in the terminal:

```text
Error: Topic not found.
    at TopicService.getTopicById(...)
```

Therefore:

- Client → HTTP response
- Developer → Server logs

---

# Why does Next.js automatically return HTTP 500?

Suppose a Route Handler is:

```ts
export async function GET() {
    const topics = await topicService.getTopics();

    return NextResponse.json(topics);
}
```

If `getTopics()` throws an exception:

```ts
throw new Error("Database failed.");
```

Flow:

```text
Route

↓

Service

↓

throws Error

↓

Next.js catches the unhandled exception

↓

HTTP 500
```

Therefore:

> Next.js automatically returns **HTTP 500** for unhandled exceptions.

---

# If Next.js already returns HTTP 500, why use try/catch?

`try/catch` is **not** mainly for returning HTTP 500.

It is for controlling how errors are handled.

Without `try/catch`:

- Next.js returns HTTP 500 automatically.
- Cannot customize the response.
- Cannot convert validation errors into HTTP 400.
- Cannot convert business errors into HTTP 404 or HTTP 409.
- Harder to log or report errors consistently.

With `try/catch`:

```ts
try {
    ...
} catch (error) {
    console.error(error);

    return NextResponse.json(
        { message: "Something went wrong." },
        { status: 500 }
    );
}
```

Now we can:

- Log errors
- Return custom JSON
- Translate different exceptions into different HTTP status codes

---

# Why is ZodError usually handled inside Route Handlers?

Validation happens inside the Route Handler.

Example:

```ts
const input = createTopicSchema.parse(body);
```

If validation fails:

```text
ZodError

↓

Route

↓

HTTP 400
```

The Route already owns request validation, so it naturally handles validation errors.

---

# Why doesn't Next.js automatically return HTTP 404 when a Topic is not found?

There are **two completely different "Not Found" situations.**

## 1. Route Not Found (Framework)

Example:

```
GET /api/unknown
```

There is no matching Route Handler.

Next.js automatically returns:

```
404 Not Found
```

because routing is the framework's responsibility.

---

## 2. Resource Not Found (Application)

Example:

```
GET /api/topics/abc123
```

The route exists.

The database simply has no Topic with that ID.

Flow:

```text
Route

↓

Service

↓

Repository

↓

Database

↓

No Topic Found
```

Next.js does **not** know what a Topic is.

Only the application understands that.

Therefore **our application** must decide whether this situation should become:

```
404 Not Found
```

---

# Why shouldn't the Service return HTTP status codes?

The Service belongs to the business layer.

It should understand business rules such as:

- Topic exists
- Topic does not exist
- User is not allowed
- Article already exists

The Service should **not** know anything about HTTP.

Instead, the Service should throw business errors.

The Route translates those business errors into HTTP responses.

---

# What is each layer responsible for?

## Route

Responsibilities:

- Receive HTTP request
- Validate request
- Call Service
- Return HTTP response

Language:

```
HTTP
```

---

## Service

Responsibilities:

- Business logic
- Business rules
- Coordinate repositories

Language:

```
Business
```

---

## Repository

Responsibilities:

- Talk to Prisma
- Talk to PostgreSQL
- Execute database queries

Language:

```
Database
```

---

# Why does NestJS feel different?

NestJS provides built-in HTTP exception classes.

Example:

```ts
throw new NotFoundException("Topic not found.");
```

NestJS has a **Global Exception Filter**.

Flow:

```text
Service

↓

NotFoundException

↓

Global Exception Filter

↓

HTTP 404
```

The translation is automatic.

---

Next.js is different.

You decide how exceptions become HTTP responses.

That provides more flexibility but requires more manual implementation.

---

# What should I do for Have a Sip (V1)?

Current strategy:

- Handle `ZodError` → HTTP 400
- Log unexpected errors using `console.error()`
- Let all other unexpected errors return HTTP 500

Example:

```ts
try {
    ...
} catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                message: "Validation failed."
            },
            {
                status: 400
            }
        );
    }

    return NextResponse.json(
        {
            message: "Something went wrong."
        },
        {
            status: 500
        }
    );
}
```

Reason:

- Keep the architecture simple.
- Make debugging easy.
- Finish core features first.
- Introduce business errors later when the project grows.

---

# When should I introduce custom business errors?

After the application becomes larger.

Examples:

```text
NotFoundError

ConflictError

UnauthorizedError

ForbiddenError
```

The Route can then translate them:

```text
NotFoundError

↓

HTTP 404

ConflictError

↓

HTTP 409
```

This makes the API much more expressive.

---

# Mental Model

```text
HTTP Request
        │
        ▼
Route (HTTP)
        │
        ▼
Service (Business)
        │
        ▼
Repository (Database)
        │
        ▼
Prisma
        │
        ▼
PostgreSQL
```

Each layer speaks a different "language".

Errors are translated as they move upward.

```text
Database Error
        │
        ▼
Business Error
        │
        ▼
HTTP Response
```

Keeping each layer responsible for only one concern produces a cleaner and more maintainable architecture.