import { z } from "zod";

export const createCommentSchema = z.object({
    cupName: z
        .string()
        .trim()
        .min(2, "Cup name must be at leat 2 characters.")
        .max(30, "Cup name cannot exceed 30 characters"),
    
    content: z
        .string()
        .trim()
        .min(1, "Share a thought before posting")
        .max(1000, "Commnent cannot exceed 1000 characters."),
    
    articleId: z
        .string()
        .min(1, "Article ID is required.")
})
export type CreateCommentBody = z.infer<typeof createCommentSchema>

export const updateCommentSchema = z.object({
    content: z
        .string()
        .trim()
        .min(1, "Comment cannot be empty")
        .max(1000, "Comment cannot exceed 1000 characters.")
})
export type UpdateCommentBody = z.infer<typeof updateCommentSchema>


export const getCommentSchema = z.object ({
    articleId: z.string().min(1),
})
