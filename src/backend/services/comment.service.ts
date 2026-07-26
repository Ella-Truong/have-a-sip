import { CommentRepository } from "../repositories/comment.repository";
import { CommentSummary } from "@/backend/types/comment";
import {
    CreateCommentBody,
    UpdateCommentBody,
    GetCommentQuery,
} from "@/backend/validations/comment.validation"

export class CommentService {
    private commentRepository = new CommentRepository();

    constructor(){
        this.commentRepository = new CommentRepository();
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
     * get comments by Id (readers)
     */ 
    async getCommentsByArticleId(
        articleId: string
    ): Promise<CommentSummary[]>{
        return this.commentRepository.findCommentsByArticleId(articleId)
    }

    /**
     * create comment
     */
    async createComment(
        input: CreateCommentBody
    ): Promise<CommentSummary>{
        return this.commentRepository.createComment(input)
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