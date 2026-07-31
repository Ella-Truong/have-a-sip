"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteCommentButtonProps {
    commentId: string;
    onDelete: () => void;
}

export default function DeleteCommentButton({
    commentId,
    onDelete
}: DeleteCommentButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setIsDeleting(true);

            const response = await fetch(
                `/api/admin/comments/${commentId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            onDelete();
        } catch {
            alert("Failed to delete comment.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-[#B45C5C] transition hover:text-red-700 disabled:opacity-50"
        >
            <Trash2 size={16} />
        </button>
    );
}