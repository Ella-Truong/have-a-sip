import { NextRequest, NextResponse } from "next/server";
import { getArticlesSchema } from "@/backend/validations/article.validation";

export async function GET(request: NextRequest){
    //make request.url a URL object --> use URL attributes like searchParams, pathName, ...
    const { searchParams } = new URL(request.url);

    const query = {
        page: searchParams.get("page"),
        limit: searchParams.get("limit"),
    }

    const validatedQuery = getArticlesSchema.parse(query)

    return NextResponse.json(validatedQuery)
}