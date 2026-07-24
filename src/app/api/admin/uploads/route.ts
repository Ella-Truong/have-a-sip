import { NextRequest, NextResponse } from "next/server";

import { UploadService } from "@/backend/services/upload.service";
import { uploadImageSchema } from "@/backend/validations/upload.validation";

import { ZodError } from "zod";

const uploadService = new UploadService();

export async function POST(
    request: NextRequest
) {
    try {
        const formData = await request.formData();

        const validated =
            uploadImageSchema.parse({
                file: formData.get("file"),
            });

        const image =
            await uploadService.uploadImage(
                validated.file
            );

        return NextResponse.json(
            image,
            {
                status: 201,
            }
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: error.issues[0].message},
                { status: 400 }
            )
        }
        
        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Failed to upload image.",
            },
            {
                status: 500,
            }
        );
    }
}