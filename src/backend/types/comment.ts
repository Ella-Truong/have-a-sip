export interface Comment {
    id: string;
    cupName: string;
    content: string;
    createdAt: Date;
    articleId: string;
}

export interface CreateCommentInput {
    cupName: string;
    content: string;
    articleId: string;
}


export interface UpdateCommentInput {
    content: string;
}

