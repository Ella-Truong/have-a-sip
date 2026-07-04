import { z } from "zod";

/**
 * Zod is a TypeScript-first schema validation library
 * 
 * It validates incoming data (query params, request body, etc.)
 * and converts it into a safe, typed object for the application
 * 
 * In this case: 
 * 1. Convert query string ("1") into number (1)
 * 2. Applies default values when params are missing
 * 3. Ensures values satisfy our constraints
 */


//valiedate query parameters for GET /api/articles
export const getArticlesSchema = z.object({
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),
    
    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(20)
        .default(10)
})

export type GetArticlesQuery = z.infer<typeof getArticlesSchema>;

//validate the request body for POST /api/admin/articles
export const createArticleSchema = z.object ({
    title: z
        .string()
        .trim()
        .min(1)
        .max(200),
    
    excerpt: z
        .string()
        .trim()
        .min(1)
        .max(500),
    
    content: z
        .string()
        .trim()
        .min(1),
    
    coverImage: z
        .string()
        .nullable()
        .optional(),

    topicId: z
        .string()
        .min(1)
})

//create a TypeScript type from the Zod schema
export type CreateArticleBody = z.infer<typeof createArticleSchema>

/**
 * 
 */
export const updateArticleSchema = z.object ({
    title: z
        .string()
        .trim()
        .min(1)
        .max(200)
        .optional(),

    excerpt: z
        .string()
        .trim()
        .min(1)
        .max(500)
        .optional(),

    content: z
        .string()
        .trim()
        .min(1)
        .optional(),

    coverImage: z
        .string()
        .nullable()
        .optional(),

    topicId: z
        .string()
        .min(1)
        .optional(),

    published: z
        .boolean()
        .optional()
})

export type UpdateArticleBody = z.infer<typeof updateArticleSchema>