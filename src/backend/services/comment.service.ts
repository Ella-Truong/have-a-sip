import { CommentRepository } from "../repositories/comment.repository";
import { ArticleRepository } from "../repositories/article.repository";

import { CommentSummary } from "@/backend/types/comment";

import {
    CreateCommentBody,
    UpdateCommentBody,
    GetCommentQuery,
} from "@/backend/validations/comment.validation"


export class CommentService {
    private commentRepository = new CommentRepository();
    private articleRepository = new ArticleRepository();

    constructor(){
        this.commentRepository = new CommentRepository();
        this.articleRepository = new ArticleRepository()
    }
    /**
     * get comments by slug (reader)
     */
    async getCommentsByArticleSlug(
        slug: string
    ){
        const article = await this.articleRepository.findArticleBySlug(slug)

        if (!article) {
            throw new Error("Article not found.")
        }

        return this.commentRepository.findCommentsByArticleId(article.id)
    }

    /**
     * get comments by ID or by cupName (admin)
     */
    async getComments(
        query: GetCommentQuery
    ): Promise<CommentSummary[]>{
        return this.commentRepository.findComments(query)
    }

    /**
     * create comment
     */
    async createComment(
        slug: string,
        body: CreateCommentBody
    ): Promise<CommentSummary>{
        const article = await this.articleRepository.findArticleBySlug(slug);
        if (!article) {
            throw new Error("Article not found.")
        }

        return this.commentRepository.createComment({
            articleId: article.id,
            cupName: body.cupName,
            sipType: body.sipType,
            content: body.content
        })
    }

    /**
     * update a comment
     */
    async updateComment(
        id: string,
        input: UpdateCommentBody
    ): Promise<CommentSummary>{
        return this.commentRepository.updateComment(id, input)
    }

    /**
     * delete a comment (admin)
     */
    async deleteComment(
        id: string
    ): Promise<CommentSummary>{
        return this.commentRepository.deleteComment(id)
    }
}