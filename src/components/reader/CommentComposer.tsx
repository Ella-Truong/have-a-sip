"use client";

import { useState } from "react";

interface CommentComposerProps {
    initialContent?: string;
    submitLabel?: string;
    onSubmit: (content: string) => Promise<void>;
    onCancel?: () => void;
}

export function CommentComposer({
    initialContent = "",
    submitLabel = "Share",
    onSubmit,
    onCancel,
}: CommentComposerProps) {
    const [content, setContent] = useState(initialContent);
    const [posting, setPosting] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const value = content.trim();

        if (!value || posting) {
            return;
        }

        try {
            setPosting(true);
            await onSubmit(value);

            if (!onCancel) {
                setContent("");
            }
        } finally {
            setPosting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <textarea
                value={content}
                onChange={(event) =>
                    setContent(event.target.value)
                }
                rows={4}
                maxLength={1000}
                placeholder="What did this article make you think about?"
                className="
                    w-full
                    rounded-2xl
                    border
                    border-[#E7E0DA]
                    bg-white
                    p-4
                    text-sm
                    text-[#4F4945]
                    outline-none
                    transition
                    focus:border-[#B8A89D]
                    focus:ring-2
                    focus:ring-[#F5E2EB]
                "
            />

            <div className="flex items-center justify-between">
                <span className="text-xs text-[#9A918B]">
                    {content.length}/1000
                </span>

                <div className="flex items-center gap-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="
                                rounded-full
                                border
                                border-[#E7E0DA]
                                px-5
                                py-2
                                text-sm
                                font-medium
                                text-[#6C645F]
                                transition
                                hover:bg-[#F8F5F3]
                            "
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={
                            posting ||
                            content.trim().length === 0
                        }
                        className="
                            rounded-full
                            bg-[#71866A]
                            px-5
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-[#5F7358]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {posting
                            ? "Saving..."
                            : submitLabel}
                    </button>
                </div>
            </div>
        </form>
    );
}