import { NextRequest, NextResponse } from "next/server";

import { CommentService } from "@/backend/services/comment.service";

import {
    createCommentSchema,
} from "@/backend/validations/comment.validation";

const commentService = new CommentService();

interface RouteParams {
    params: Promise<{
        slug: string;
    }>;
}

export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { slug } = await params;

        const comments = await commentService.getCommentsByArticleSlug(slug);

        return NextResponse.json(comments);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to fetch comments.",
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { slug } = await params;

        const body = await request.json();

        const validatedBody = createCommentSchema.parse(body);

        const comment =
            await commentService.createComment(
                slug,
                validatedBody
            );

        return NextResponse.json(
            comment,
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to create comment.",
            },
            {
                status: 500,
            }
        );
    }
}