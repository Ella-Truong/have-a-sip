import { TopicSummary } from "./topic";

export interface ArticleSummary {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage?: string | null;
    readingTime: number;
    published: boolean;
    publishedAt: Date | null;
    updatedAt: Date;
    topic: TopicSummary;
    topicId: string;
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
    published: boolean;
}

export interface CreateArticleData extends CreateArticleInput {
    slug: string;
    readingTime: number;
}
export interface UpdateArticleInput {
    title?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string | null;
    topicId?: string;
    published?: boolean;
}

export interface UpdateArticleData extends UpdateArticleInput {
    slug?: string;
    readingTime?: number;
    publishedAt?: Date | null;
}

export interface ArticleFormData extends Omit<CreateArticleInput, "excerpt"> {
    id: string;
    excerpt: string | null;
}