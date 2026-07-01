import { Topic } from "./topic";

export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    readingTime: number;
    published: boolean;
    publishedAt: Date;
    updatedAt: Date;
    topic: Topic;
}