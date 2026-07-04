/**
 * Admin write a new article
 */

import { NextRequest, NextResponse } from "next/server";
import { ArticleService } from "@/backend/services/article.service";
import { createArticleSchema } from "@/backend/validations/article.validation";

const articleService = new ArticleService();

export async function POST(request: NextRequest){
    const body = await request.json();

    //this create type CreateArticleBody after validation
    const validatedBody = createArticleSchema.parse(body)

    const article = await articleService.createArticle(validatedBody);

    return NextResponse.json(article, { status: 201})
}