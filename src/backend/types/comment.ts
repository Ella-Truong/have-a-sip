import { SipType } from "@generated/prisma";
export interface CommentSummary {
    id: string;
    cupName: string;
    sipType: SipType;
    content: string;
    createdAt: Date;
    articleId: string;
}

export interface CreateCommentInput {
    cupName: string;
    sipType: SipType
    content: string;
    articleId: string;
}


export interface UpdateCommentInput {
    content: string;
}

