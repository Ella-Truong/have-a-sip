import { NextRequest, NextResponse } from "next/server";
import { ArticleService } from "@/backend/services/article.service";

const articleService = new ArticleService();

//shape of the second argument passed to route handler
interface RouteParams { params: Promise<{ slug: string}> }

export async function GET(
    request: NextRequest,
    {params}: RouteParams
){
    const {slug} = await params;

    const article = await articleService.getArticleBySlug(slug);

    return NextResponse.json(article)
}