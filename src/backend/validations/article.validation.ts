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