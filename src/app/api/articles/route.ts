import { NextRequest, NextResponse } from "next/server";
import { getArticlesSchema } from "@/backend/validations/article.validation";
import { ArticleService } from "@/backend/services/article.service";

//create an instance of ArticleService class
const articleService = new ArticleService();

export async function GET(request: NextRequest){
    //make request.url a URL object --> use URL attributes like searchParams, pathName, ...
    const { searchParams } = new URL(request.url);

    const query = {
        page: searchParams.get("page") ?? undefined,
        limit: searchParams.get("limit") ?? undefined,
    }
    
    //validatedQuery: GetArticlesQuery
    const validatedQuery = getArticlesSchema.parse(query)
    
    const articles = await articleService.getArticles(validatedQuery)

    return NextResponse.json(articles)
}

