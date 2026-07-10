import { CommentRepository } from "../repositories/comment.repository";
import { Comment } from "@/backend/types/comment";
import {
    CreateCommentBody,
    UpdateCommentBody,
} from "@/backend/validations/comment.validation"



export class CommentService {
    private commentRepository = new CommentRepository();

    constructor(){
        this.commentRepository = new CommentRepository();
    }

    /**
     * get comments
     */
    async getComments(
        articleId: string
    ): Promise<Comment[]>{
        return this.commentRepository.findCommentsByArticleId(articleId)
    }

    /**
     * create comment
     */
    async createComment(
        input: CreateCommentBody
    ): Promise<Comment>{
        return this.commentRepository.createComment(input)
    }

    /**
     * update a comment
     */
    async updateComment(
        id: string,
        input: UpdateCommentBody
    ): Promise<Comment>{
        return this.commentRepository.updateComment(id, input)
    }

    /**
     * delete a comment
     */
    async deleteComment(
        id: string
    ): Promise<Comment>{
        return this.commentRepository.deleteComment(id)
    }
}