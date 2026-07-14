/**
 * This route for admin role to GET a specific article
 * and work on it, like PATCH, DELETE,...
 */

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

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
    try {
        const {id} = await params;

        const article = await articleService.getArticleById(id)
    
        return NextResponse.json(article, { status: 200 })
    }catch(error){
        if (error instanceof Error && error.message === "Article not found") {
            return NextResponse.json(
                { message: "Article not found" },
                { status: 404 }
            )
        };

        console.error(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}

/**
 * Updating an existing article
 */
export async function PATCH(
    request: NextRequest,
    { params }: RouteParams
){
    try{
        const {id} = await params;

        const body = await request.json();

        const validatedBody: UpdateArticleInput =  updateArticleSchema.parse(body);

        const article = await articleService.updateArticle(id, validatedBody);

        return NextResponse.json(article, {status: 200})
    }catch(error){
        if (error instanceof ZodError){
            return NextResponse.json(
                { message: "Invalid request body" },
                { status: 400 }
            )
        }

        if (error instanceof Error && error.message === "Article not found"){
            return NextResponse.json(
                { message: "Article not found" },
                { status: 404 }
            )
        }

        console.error(error);

        return NextResponse.json(
            { messsage: "Internal Server Error" },
            { status: 500 }
        )
    }
}

/**
 * Delete or remove an artile
 */
export async function DELETE(
    request: NextRequest,
    {params}: RouteParams
){
    try{
        const {id} = await params;
    
        await articleService.deleteArticle(id);

        return NextResponse.json(
            { message: "Article deleted successfully."},
            { status: 200 }
        )
    }catch(error) {
        if (error instanceof Error && error.message === "Article not found") {
            return NextResponse.json(
                { message: "Article not found" },
                { status: 404}
            )
        }

        console.error(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}