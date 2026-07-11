import { NextRequest, NextResponse } from "next/server";
import { CommentService } from "@/backend/services/comment.service";
import { getCommentSchema } from "@/backend/validations/comment.validation";

const commentService = new CommentService()

//Get all comments from an article, or from a cup name
export async function GET(request: NextRequest){
    try{
        const { searchParams } = new URL(request.url)

        const query = {
            articleId: searchParams.get("articleId") ?? undefined,
            cupName: searchParams.get("cupName") ?? undefined
        }

        const validatedQuery = getCommentSchema.parse(query)

        const comments = await commentService.getComments(validatedQuery)

        return NextResponse.json(comments)
    }catch(error){
        console.log(error)

        return NextResponse.json(
            { message: "Failed to fetch all comments."},
            { status: 500 }
        )
    }
}


