"use client";

import type { CommentSummary } from "@/backend/types/comment";

import { SIP_OPTIONS } from "@/constants/sip";

interface CommentCardProps {
    comment: CommentSummary;
    onEdit?: () => void;
}

export function CommentCard({
    comment,
    onEdit,
}: CommentCardProps) {
    const sip = SIP_OPTIONS.find(
        (option) => option.type === comment.sipType
    );

    const createdAt = new Date(comment.createdAt);

    return (
        <article className="py-2">
            <header>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <span
                            className="text-xs text-[#A58D7C]"
                            aria-hidden="true"
                        >
                            {sip?.emoji ?? "☕"}
                        </span>

                        <span className="text-xs font-medium tracking-[0.04em] text-[#6A625C]">
                            {comment.cupName}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        {onEdit && (
                            <button
                                type="button"
                                onClick={onEdit}
                                className="text-[11px] text-[#A58D7C] transition hover:text-[#8C7565]"
                            >
                                Edit
                            </button>
                        )}

                        <time
                            className="text-[11px] text-[#AAA29C]"
                            dateTime={createdAt.toISOString()}
                        >
                            {createdAt.toLocaleDateString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "numeric",
                                }
                            )}
                        </time>
                    </div>
                </div>

                <div className="mt-2 h-px w-12 bg-[#F0E8E2]" />
            </header>

            <p data-testid="comment-content" className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#5F5954]">
                {comment.content}
            </p>
        </article>
    );
}