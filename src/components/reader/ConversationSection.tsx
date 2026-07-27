"use client";

import { useEffect, useState } from "react";

import type { CommentSummary } from "@/backend/types/comment";
import type { ConversationIdentity } from "@/backend/types/conversation";

import { CommentComposer } from "./CommentComposer";
import { CommentList } from "./CommentList";

interface ConversationSectionProps {
    articleSlug: string;
    identity: ConversationIdentity | null;
}

export function ConversationSection({
    articleSlug,
    identity,
}: ConversationSectionProps) {
    const [comments, setComments] = useState<CommentSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const hasCommented =
        identity != null &&
        comments.some(
            (comment) =>
                comment.cupName === identity.cupName &&
                comment.sipType === identity.sipType
        );

    useEffect(() => {
        let cancelled = false;

        async function fetchComments() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `/api/articles/${articleSlug}/comments`
                );

                if (!response.ok) {
                    throw new Error();
                }

                const data: CommentSummary[] =
                    await response.json();

                if (!cancelled) {
                    setComments(data);
                }
            } catch {
                if (!cancelled) {
                    setError(
                        "Unable to load conversation."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchComments();

        return () => {
            cancelled = true;
        };
    }, [articleSlug]);

    const handleCreateComment = async (
        content: string
    ) => {
        if (!identity) {
            return;
        }

        const response = await fetch(
            `/api/articles/${articleSlug}/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    ...identity,
                    content,
                }),
            }
        );

        if (!response.ok) {
            console.error(await response.text());
            throw new Error();
        }

        const newComment: CommentSummary =
            await response.json();

        setComments((prev) => [
            ...prev,
            newComment,
        ]);
    };

    return (
        <section className="space-y-10">
            {identity && (
                <CommentComposer
                    disabled={hasCommented}
                    onSubmit={handleCreateComment}
                />
            )}

            <CommentList
                comments={comments}
                loading={loading}
                error={error}
            />
        </section>
    );
}