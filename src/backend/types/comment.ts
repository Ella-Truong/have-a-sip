import { SipType } from "@generated/prisma";
export interface CommentSummary {
    id: string;
    cupName: string;
    sipType: SipType;
    content: string;
    createdAt: Date;
    articleId: string;
}

export interface CreateCommentData {
    cupName: string;
    sipType: SipType
    content: string;
    articleId: string;
}


export interface UpdateCommentInput {
    content: string;
}

export interface AdminCommentSummary extends CommentSummary {
    article: {
        id: string;
        title: string;
        slug: string;
        topic: {
            id: string;
            name: string;
        };
    };
}