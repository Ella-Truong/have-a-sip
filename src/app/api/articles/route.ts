import { NextRequest, NextResponse } from "next/server";
import { getArticlesSchema } from "@/backend/validations/article.validation";
import { ArticleService } from "@/backend/services/article.service";
import { ZodError } from "zod";

//create an instance of ArticleService class
const articleService = new ArticleService();

export async function GET(request: NextRequest){
    try {
        //make request.url a URL object --> use URL attributes like searchParams, pathName, ...
        const { searchParams } = request.nextUrl;

        const query = {
            page: searchParams.get("page") ?? undefined,
            limit: searchParams.get("limit") ?? undefined,
            topic: searchParams.get("topic") ?? undefined,
        }
    
        //validatedQuery: GetArticlesQuery
        const validatedQuery = getArticlesSchema.parse(query)
    
        const articles = await articleService.getArticles(validatedQuery)

        return NextResponse.json(articles, { status: 200})
    }catch(error){
        if (error instanceof ZodError){
            return NextResponse.json(
                {
                    message: "Invalid query parameters",
                    errors: error.issues
                },
                { status: 400}
            );
        }
        
        return NextResponse.json(
            { message: "Internal Server Error"},
            { status: 500 }
        );
    }
}