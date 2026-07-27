"use client";

import type { CommentSummary } from "@/backend/types/comment";

import { CommentCard } from "./CommentCard";
import { ConversationIdentity } from "@/backend/types/conversation";

interface CommentListProps {
    comments: CommentSummary[];
    loading: boolean;
    error: string | null;
    identity: ConversationIdentity | null
    onEdit: (comment: CommentSummary) => void;
}

export function CommentList({
    comments,
    loading,
    error,
    onEdit,
    identity
}: CommentListProps) {
    if (loading) {
        return (
            <p className="text-sm text-[#817873]">
                Loading conversation...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-sm text-red-500">
                {error}
            </p>
        );
    }

    if (comments.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-[#E7E0DA] bg-[#FCFAF8] p-8 text-center">
                <p className="text-base font-medium text-[#4E4B47]">
                    No conversations yet.
                </p>

                <p className="mt-2 text-sm text-[#817873]">
                    Be the first to pull up a chair and share your thoughts.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {comments.map((comment) => (
                <CommentCard
                    key={comment.id}
                    comment={comment}
                    onEdit={
                        identity &&
                        comment.cupName === identity.cupName &&
                        comment.sipType === identity.sipType 
                            ? () => onEdit(comment)
                            : undefined
                    }
                />
            ))}
        </div>
    );
}