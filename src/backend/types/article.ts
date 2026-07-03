import { Topic } from "./topic";

export interface ArticleSummary {
    id: string;
    title: string;
    slug: string;
    coverImage?: string | null;
    readingTime: number;
    published: boolean;
    publishedAt: Date | null;
    updatedAt: Date;
    topic: Topic;
}

export interface ArticleDetail extends ArticleSummary {
    content: string;
}

export interface CreateArticleInput {
    title: string;
    excerpt: string;
    content: string;
    coverImage?: string | null;
    topicId: string;
}

export interface CreateArticleData extends CreateArticleInput {
    slug: string;
    readingTime: number;
}
export interface UpdateArticleInput {
    title?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    topicId?: string;
    published?: boolean;
}