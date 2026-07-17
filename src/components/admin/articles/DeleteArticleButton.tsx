"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteArticleButtonProps {
    articleId: string;
}

export default function DeleteArticleButton({
    articleId,
}: DeleteArticleButtonProps) {
    const router = useRouter();

    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this article?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);
        setError("");

        try {
            const response = await fetch(
                `/api/admin/articles/${articleId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete article");
            }

            router.refresh();
        } catch (error) {
            console.error(error);
            setError("Failed to delete");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div>
            <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-sm font-medium text-[#C17C74] transition hover:text-[#A65F58] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isDeleting ? "Deleting..." : "Delete"}
            </button>

            {error && (
                <p className="mt-1 text-xs text-[#A65F58]">
                    {error}
                </p>
            )}
        </div>
    );
}