/**
 * Admin write a new article
 */

import { NextRequest, NextResponse } from "next/server";
import { ArticleService } from "@/backend/services/article.service";
import { createArticleSchema } from "@/backend/validations/article.validation";
import { ZodError, flattenError } from "zod";
import { revalidatePath } from "next/cache";

const articleService = new ArticleService();

export async function POST(request: NextRequest){
    try{
        const body = await request.json();

        //this create type CreateArticleBody after validation
        const validatedBody = createArticleSchema.parse(body)

        const article = await articleService.createArticle(validatedBody);

        revalidatePath("/admin/articles");

        if (article.published) {
            revalidatePath("/");
            revalidatePath("/sips");
            revalidatePath(`/articles/${article.slug}`)
        }

        return NextResponse.json(article, { status: 201})
    }catch(error){
        if (error instanceof ZodError) {
            return NextResponse.json(
                { 
                    message: "Validation failed",
                    errors: flattenError(error),
                },
                { status: 400}
            )
        }
        
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
