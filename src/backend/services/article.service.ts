/**
 * Receive a trusted object
 * Get published articles
 * Build pagination response
 * Return response
 */

import { GetArticlesQuery } from "../validations/article.validation";
import { PaginatedResponse } from "../types/pagination";
import { ArticleRepository } from "../repositories/article.repository";
import { ArticleDetail, ArticleSummary, CreateArticleInput } from "../types/article";

export class ArticleService {
    private readonly articleRepository: ArticleRepository;

    constructor() {
        this.articleRepository = new ArticleRepository();
    }
    
    /**
     * Get published articles with pagination (list of published articles)
     */
    async getArticles(
        query: GetArticlesQuery
    ): Promise<PaginatedResponse<ArticleSummary>>{
        const { page, limit} = query;

        const {articles, totalItems} = await this.articleRepository.findArticles(page, limit);

        return {
            data: articles,
            pagination: this.buildingPagination(page, limit, totalItems)
        }
    }

    /**
     * Helper functions
     * Generating slug
     * Calculate reading time
     */
    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g,"")
            .replace(/\s+/g, "-")
    }

    private calculateReadingTime(content: string): number {
        const words = content.trim().split(/\s+/).length
        const wordPerMinute = 200;

        return Math.max(1, Math.ceil(words/wordPerMinute))
    }

    private buildingPagination(
        page: number,
        limit: number,
        totalItems: number
    ) {
        const totalPages = Math.ceil(totalItems/limit);
        
        return {
            page, 
            limit, 
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        }
    }

    /**
     * Get a specific article by slug
     */
    async getArticleBySlug(
        slug: string
    ): Promise<ArticleDetail | null>{
        return this.articleRepository.findArticleBySlug(slug)
    }

    /**
     * Create article
     */
    async createArticle(input: CreateArticleInput){
        const slug = this.generateSlug(input.title)
        const readingTime = this.calculateReadingTime(input.content)

        return this.articleRepository.createArticle({
            ...input,
            slug,
            readingTime,
        })
    }
}