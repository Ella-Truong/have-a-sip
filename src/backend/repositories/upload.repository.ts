import { put } from "@vercel/blob";

export class StorageRepository {
    async uploadImage(file: File) {
        const blob = await put(file.name, file, {
            access: "public",
        });

        return {
            url: blob.url,
        };
    }
}