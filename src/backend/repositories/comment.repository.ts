import { prisma } from "@/lib/prisma";

import { GetCommentQuery } from "../validations/comment.validation";

import {
    CommentSummary, 
    CreateCommentData,
    UpdateCommentInput,
} from "@/backend/types/comment"

export class CommentRepository {
    /**
     * for Admin only
     * find comments from multiple different params (articleId, cupName)
     */
    async findComments(
        query: GetCommentQuery
    ): Promise<CommentSummary[]>{
        return prisma.comment.findMany({
            where: {
                ...(query.articleId && {
                    articleId: query.articleId
                }),
                ...(query.cupName && {
                    cupName: query.cupName
                })
            },
            orderBy: {
                createdAt: "asc"
            },
            include: {
                article: {
                    select: {
                        id: true,
                        title: true,
                        slug: true
                    }
                }
            }
        })
    }


    /**
     * for Readers 
     * find comments by article ID
     */
    async findCommentsByArticleId(
        articleId: string
    ): Promise<CommentSummary[]>{
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
        data: CreateCommentData
    ): Promise<CommentSummary>{
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
    ): Promise<CommentSummary>{
        return prisma.comment.update({
            where: {
                id,
            },
            data,
        })
    }

    /**
     * for Admin only
     * delete a comment
     */
    async deleteComment(
        id: string
    ): Promise<CommentSummary>{
        return prisma.comment.delete({
            where: {
                id,
            }
        })
    }

    /**
     * for Admin only
     * delete entire conversation
     */
    async deleteConversation(
        articleId: string
    ): Promise<{count: number}> {
        return prisma.comment.deleteMany({
            where: {
                articleId,
            }
        })
    }
}