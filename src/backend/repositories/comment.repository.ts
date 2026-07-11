import { prisma } from "@/lib/prisma";
import { GetCommentQuery } from "../validations/comment.validation";
import {
    Comment, 
    CreateCommentInput,
    UpdateCommentInput,
} from "@/backend/types/comment"

export class CommentRepository {
    /**
     * find comments from multiple different params (articleId, cupName)
     */
    async findComments(
        query: GetCommentQuery
    ): Promise<Comment[]>{
        return prisma.comment.findMany({
            where: {
                articleId: query.articleId,
                cupName: query.cupName,
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

    /**
     * delete all comments or close 
     */
}