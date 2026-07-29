import { NextRequest, NextResponse } from "next/server";
import { CommentService } from "@/backend/services/comment.service";
import { getCommentSchema } from "@/backend/validations/comment.validation";
import { ZodError } from "zod";

const commentService = new CommentService()

//Get comments using optional filters for admin dashboard
export async function GET(request: NextRequest){
    try{
        const { searchParams } = request.nextUrl;

        const query = {
            articleId: searchParams.get("articleId") ?? undefined,
            cupName: searchParams.get("cupName") ?? undefined,
            sipType: searchParams.get("sipType") ?? undefined,
            topicId: searchParams.get("topicId") ?? undefined
        }

        const validatedQuery = getCommentSchema.parse(query);

        const comments = await commentService.getComments(validatedQuery);

        return NextResponse.json(comments)
    }catch(error){
        console.error(error);

        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: "Invalid query parameters" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to fetch all comments."},
            { status: 500 }
        )
    }
}


