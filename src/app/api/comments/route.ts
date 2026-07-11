import { NextRequest, NextResponse } from "next/server";
import { CommentService } from "@/backend/services/comment.service";

import {
    createCommentSchema,
    getArticleCommentSchema,
} from "@/backend/validations/comment.validation"

const commentService = new CommentService()

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        const query = {
            articleId: searchParams.get("articleId")
        }

        const validatedQuery = getArticleCommentSchema.parse(query)

        const comments = await commentService.getCommentsByArticleId(
            validatedQuery.articleId
        )

        return NextResponse.json(comments)
    }catch(error){
        console.log(error)

        return NextResponse.json(
            { message: "Failed to fetch comments" },
            { status: 500 } 
        )
    }
}


export async function POST(request: NextRequest){
    try{
        const body = await request.json()

        const validatedBody = createCommentSchema.parse(body)

        const comment = await commentService.createComment(validatedBody)

        return NextResponse.json(comment, {status: 201})
    }catch(error){
        console.log(error)

        return NextResponse.json(
            { message: "Failed to create comment."},
            { status: 500 }
        )
    }
}