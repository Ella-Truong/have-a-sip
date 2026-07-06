import { z } from "zod";

export const createTopicSchema = z.object({
    name: z.string().trim().min(1).max(50)
})

export type CreateTopicBody = z.infer<typeof createTopicSchema>

export const updateTopicSchema = z.object({
    name: z.string().trim().min(1).max(50).optional()
})

export type UpdateTopicBody = z.infer<typeof updateTopicSchema>