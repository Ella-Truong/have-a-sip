"use client";

import { useState } from "react";

import  {cormorant} from "@/lib/fonts";

interface CommentComposerProps {
    disabled: boolean;
    onSubmit: (content: string) => Promise<void>;
}

export function CommentComposer({
    disabled,
    onSubmit,
}: CommentComposerProps) {
    const [content, setContent] = useState("");
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
            setContent("");
        } finally {
            setPosting(false);
        }
    };

    if (disabled) {
        return (
            <div className="text-center p-4">
                <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-10 bg-[#e8dfd8]" />
                    <span className="text-xs text-[#B8A89D]">✦</span>
                    <div className="h-px w-10 bg-[#E8DFD8]" />
                </div>

                <p className={`${cormorant.className} text-base font-cormorant italic tracking-[0.04em] text-[#7a726d]`}>
                    one cup, one thoughtful note
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
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
                        ? "Posting..."
                        : "Share"}
                </button>
            </div>
        </form>
    );
}