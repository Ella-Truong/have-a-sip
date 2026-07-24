/**
 * Receive a trusted object
 * Get published articles
 * Build pagination response
 * Return response
 */

import { GetArticlesQuery } from "../validations/article.validation";
import { PaginatedResponse } from "../types/pagination";
import { ArticleRepository } from "../repositories/article.repository";

import { Article } from "@generated/prisma";

import { 
    ArticleDetail, 
    ArticleSummary, 
    CreateArticleInput, 
    UpdateArticleData, 
    UpdateArticleInput 
} from "../types/article";

import {
    generateSlug,
    calculateReadingTime,
    buildingPagination
} from "@/lib/helper";


export class ArticleService {
    //property declaration
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
            pagination: buildingPagination(page, limit, totalItems)
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
     * Get all articles for admin
     * Includes drafts and published articles
     */
    async getAdminArticles(): Promise<ArticleSummary[]>{
        return this.articleRepository.findAllArticles();
    }

    /**
     * Get a specific article by ID (admin)
     */
    async getArticleById(
        id: string
    ): Promise<ArticleDetail | null>{
        return this.articleRepository.findArticleById(id)
    }

    /**
     * Create article (admin)
     */
    async createArticle(input: CreateArticleInput){
        const slug = generateSlug(input.title)
        const readingTime = calculateReadingTime(input.content)

        return this.articleRepository.createArticle({
            ...input,
            slug,
            readingTime,
        })
    }


    /**
     * Update a specific article (admin)
     */
    async updateArticle(
        id: string,
        input: UpdateArticleInput,
    ): Promise<ArticleDetail>{
        const article = await this.articleRepository.findArticleById(id);

        const data: UpdateArticleData = { ...input};

        if (input.title) {
            data.slug = generateSlug(input.title);
        }

        if(input.content) {
            data.readingTime = calculateReadingTime(input.content);
        }

        //if published for the first time
        if (input.published === true && !article?.published){
            data.publishedAt = new Date();
        }

        return this.articleRepository.updateArticle(id, data)
        
    }

    /**
     * Delete or remove an article
     */
    async deleteArticle(
        id: string 
    ): Promise<Article>{
        return await this.articleRepository.deleteArticle(id);
    }
}