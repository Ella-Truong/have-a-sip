/**
 * This route for admin role to get a specific article
 * and work on it, like mofidy, delete, update, ...
 */

import { NextRequest, NextResponse } from "next/server";
import { ArticleService } from "@/backend/services/article.service";
import { updateArticleSchema } from "@/backend/validations/article.validation";
import { UpdateArticleInput } from "@/backend/types/article";

const articleService = new ArticleService();

interface RouteParams {params: Promise<{id: string}>}

/**
 * Get a single article
 */
export async function GET(
    request: NextRequest,
    { params }: RouteParams
){
    const {id} = await params;

    const article = await articleService.getArticleById(id)
    
    return NextResponse.json(article)
}

/**
 * Updating an existing article
 */
export async function PATCH(
    request: NextRequest,
    { params }: RouteParams
){
    const {id} = await params;

    const body = await request.json();

    const validatedBody: UpdateArticleInput =  updateArticleSchema.parse(body);

    const article = await articleService.updateArticle(id, validatedBody);

    return NextResponse.json(article)
}