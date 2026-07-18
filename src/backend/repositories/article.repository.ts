/**
 * Query published articles
 * Apply pagination
 * Return the articles
 * Return the total number of matching articles
 */

import { prisma } from "@/lib/prisma";

import {
    ArticleSummary,
    ArticleDetail,
    CreateArticleData,
    UpdateArticleData,
} from "@/backend/types/article"

export class ArticleRepository {
    /**
     * Find published articles with pagination
     */
    async findArticles(
        page: number,
        limit: number
    ): Promise<{
        articles: ArticleSummary[];
        totalItems: number;
    }> {
        const skip = (page-1)*limit;

        const articles = await prisma.article.findMany({
            where: {
                published: true,
            },
            include: {
                topic: true
            },
            orderBy: {
                publishedAt: "desc"
            },
            skip,
            take: limit,
        })

        //count all published articles
        const totalItems = await prisma.article.count({
            where: {
                published: true
            },
        });

        return {
            articles,
            totalItems,
        };
    }

    
    /**
     * Find a published article by slug 
     */
    async findArticleBySlug(
        slug: string,
    ): Promise<ArticleDetail>{
        const article = await prisma.article.findFirst({
            where: {
                slug,
                published: true
            },
            include: {
                topic: true
            }
        })

        if (!article){
            throw new Error("Article not found")
        }

        return article;
    }

    /**
     * Find all articles for admin
     * Including both published articles and drafts
     */
    async findAllArticles(): Promise<ArticleSummary[]>{
        return prisma.article.findMany({
            include:{
                topic: true,
            },
            orderBy: {
                updatedAt: "desc",
            }
        })
    }

    /**
     * Find a published article by ID (admin role)
     */
    async findArticleById(
        id: string
    ): Promise<ArticleDetail | null>{
        return prisma.article.findUnique({
            where: {
                id,
            },
            include: {
                topic: true,
            },
        })
    }

    /**
     * Create new article
     */
    async createArticle(data: CreateArticleData){
        return prisma.article.create({
            data
        });
    }

    /**
     * Update an existing article
     */
    async updateArticle(
        id: string,
        input: UpdateArticleData
    ){
        const article = await prisma.article.findUnique({
            where: {
                id,
            }
        });

        if (!article){
            throw new Error("Article not found")
        };
        
        return prisma.article.update({
            where: {
                id,
            },
            data: input,
            include: {
                topic: true,
            }
        })
    }

    /**
     * Delete article
     */
    async deleteArticle(id: string){
        const article = await prisma.article.findUnique({
            where:{
                id,
            }
        })

        if (!article) {
            throw new Error("Article not found")
        }

        return prisma.article.delete({
            where:{
                id,
            }
        })
    }
}