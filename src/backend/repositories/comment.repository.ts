import { prisma } from "@/lib/prisma";

import {
    Comment, 
    CreateCommentInput,
    UpdateCommentInput,
} from "@/backend/types/comment"

export class CommentRepository {
    /**
     * find comments by article ID
     */
    async findCommentsByArticleId(
        articleId: string
    ): Promise<Comment[]>{
        return prisma.comment.findMany({
            where: {
                articleId,
            },
            orderBy: {
                createdAt: "asc"
            }
        })
    }

    /**
     * create comment
     */
    async createComment(
        data: CreateCommentInput
    ): Promise<Comment>{
        return prisma.comment.create({
            data,
        })
    }

    /**
     * update a comment
     */
    async updateComment(
        id: string,
        data: UpdateCommentInput
    ): Promise<Comment>{
        return prisma.comment.update({
            where: {
                id,
            },
            data,
        })
    }

    /**
     * delete a comment
     */
    async deleteComment(
        id: string
    ): Promise<Comment>{
        return prisma.comment.delete({
            where: {
                id,
            }
        })
    }
}