"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteTopicButtonProps {
    topicId: string;
}

export default function DeleteTopicButton({
    topicId,
}: DeleteTopicButtonProps) {
    const router = useRouter();

    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        setIsDeleting(true);
        setError("");

        try {
            const response = await fetch(
                `/api/admin/topics/${topicId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                const errorData = await response.json();

                throw new Error(
                    errorData.message ??
                        "Failed to delete topic"
                );
            }

            router.refresh();
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Failed to delete topic");
            }
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