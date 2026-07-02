/**
 * Receive a trusted object
 * Get published articles
 * Build pagination response
 * Return response
 */

import { GetArticlesQuery } from "../validations/article.validation";
import { PaginatedResponse } from "../types/pagination";
import { ArticleSummary } from "../types/article";

export class ArticleService {
    private readonly articleRepository: ArticleRepository;
    
    constructor() {
        this.articlesRepository = new ArticleRepository();
    }

    async getArticles(
        query: GetArticlesQuery
    ): Promise<PaginatedResponse<ArticleSummary>>{
        const { page, limit} = query;

        /**
         * Business logic
         */

        //TODO: call ArticleRepository

        throw new Error("Not implemented")
    }
}