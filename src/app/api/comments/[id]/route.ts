import { NextRequest, NextResponse } from "next/server";
import { CommentService } from "@/backend/services/comment.service";
import { updateCommentSchema } from "@/backend/validations/comment.validation";

const commentService = new CommentService()

export async function PATCH(
    request: NextRequest,
    { params }: {params: Promise<{id: string}>}
) {
    try{
        const {id} = await params

        const body = await request.json()
        
        //this return type UpdateCommentBody after validating
        const validatedBody = updateCommentSchema.parse(body)

        const comment = await commentService.updateComment(id, validatedBody)

        return NextResponse.json(comment)
    }catch(error) {
        console.log(error)

        return NextResponse.json(
            { message: "Failed to update comment" },
            { status: 500 }
        )
    }
}

