import { z } from "zod";

//Image size is 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const uploadImageSchema = z.object({
  file: z
    .instanceof(File, {
      message: "Image file is required.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Image must be smaller than 5 MB.",
    })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      {
        message: "Unsupported image type.",
      }
    ),
});

export type UploadImageInput = z.infer<typeof uploadImageSchema>;