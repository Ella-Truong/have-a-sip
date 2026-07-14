import { NextRequest, NextResponse } from "next/server";
import { ArticleService } from "@/backend/services/article.service";

const articleService = new ArticleService();

//shape of the second argument passed to route handler
interface RouteParams { params: Promise<{ slug: string}> }

export async function GET(
    request: NextRequest,
    {params}: RouteParams
){
    try{
        const {slug} = await params;

        const article = await articleService.getArticleBySlug(slug);

        return NextResponse.json(article, { status: 200 })
    }catch(error){
        if (error instanceof Error && error.message === "Article not found") {
            return NextResponse.json(
                { message: "Artile not found"},
                { status: 404 }
            )
        }

        console.error(error);

        return NextResponse.json(
            { message: "Internal Server Error"},
            { status: 500 }
        )
    }
}