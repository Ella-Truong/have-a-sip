"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Topic } from "@/backend/types/topic";
import { 
    ArticleFormData,
    CreateArticleInput,
 } from "@/backend/types/article";

interface ArticleFormProps {
    article?: ArticleFormData
    topics: Topic[];
}

export default function ArticleForm({
    article,
    topics,
}: ArticleFormProps) {
    const router = useRouter();

    // If article exists -> Edit mode
    // If article does not exist -> Create mode
    const isEditing = !!article;

    const [title, setTitle] = useState(
        article?.title ?? ""
    );

    const [excerpt, setExcerpt] = useState(
        article?.excerpt ?? ""
    );

    const [topicId, setTopicId] = useState(
        article?.topicId ?? ""
    );

    const [content, setContent] = useState(
        article?.content ?? ""
    );

    const [published, setPublished] = useState(
        article?.published ?? false
    );

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] = useState("");

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsSubmitting(true);
        setError("");

        try {
            // Create -> POST /api/admin/articles
            // Edit   -> PATCH /api/admin/articles/:id
            const url = isEditing
                ? `/api/admin/articles/${article.id}`
                : "/api/admin/articles";

            const method = isEditing
                ? "PATCH"
                : "POST";

            const articleData: CreateArticleInput = {
                title,
                excerpt,
                content,
                topicId,
                published,
            }

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(articleData),
            });

            if (!response.ok) {
                const errorData = await response.json();

                console.error(
                    "API error:",
                    errorData
                );

                throw new Error(
                    errorData.error ??
                    errorData.message ??
                    (
                        isEditing
                            ? "Failed to update article"
                            : "Failed to create article"
                    )
                );
            }

            router.push("/admin/articles");
            router.refresh();

        } catch (error) {
            console.error(error);

            setError(
                isEditing
                    ? "Failed to update article. Please try again."
                    : "Failed to create article. Please try again."
            );

        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#E7E0DA] bg-white p-8"
        >
            <div className="space-y-6">

                {/* Title */}
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-[#4F4945]"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        required
                        placeholder="Understanding Prisma..."
                        className="w-full rounded-xl border border-[#DDD5CE] bg-[#FCFBF9] px-4 py-3 text-[#3F3A37] outline-none transition placeholder:text-[#B5ACA5] focus:border-[#A8BCA0] focus:ring-2 focus:ring-[#E4EFE0]"
                    />
                </div>

                {/* Excerpt */}
                <div>
                    <label
                        htmlFor="excerpt"
                        className="mb-2 block text-sm font-medium text-[#4F4945]"
                    >
                        Excerpt
                    </label>

                    <textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(event) =>
                            setExcerpt(event.target.value)
                        }
                        rows={3}
                        required
                        placeholder="A short introduction to your article..."
                        className="w-full resize-none rounded-xl border border-[#DDD5CE] bg-[#FCFBF9] px-4 py-3 text-[#3F3A37] outline-none transition placeholder:text-[#B5ACA5] focus:border-[#A8BCA0] focus:ring-2 focus:ring-[#E4EFE0]"
                    />
                </div>

                {/* Topic */}
                <div>
                    <label
                        htmlFor="topic"
                        className="mb-2 block text-sm font-medium text-[#4F4945]"
                    >
                        Topic
                    </label>

                    <select
                        id="topic"
                        value={topicId}
                        onChange={(event) =>
                            setTopicId(event.target.value)
                        }
                        required
                        className="w-full rounded-xl border border-[#DDD5CE] bg-[#FCFBF9] px-4 py-3 text-[#3F3A37] outline-none transition focus:border-[#A8BCA0] focus:ring-2 focus:ring-[#E4EFE0]"
                    >
                        <option value="">
                            Select a topic
                        </option>

                        {topics.map((topic) => (
                            <option
                                key={topic.id}
                                value={topic.id}
                            >
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Content */}
                <div>
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-medium text-[#4F4945]"
                    >
                        Content
                    </label>

                    <textarea
                        id="content"
                        value={content}
                        onChange={(event) =>
                            setContent(event.target.value)
                        }
                        required
                        rows={14}
                        placeholder="Start writing..."
                        className="w-full rounded-xl border border-[#DDD5CE] bg-[#FCFBF9] px-4 py-3 leading-7 text-[#3F3A37] outline-none transition placeholder:text-[#B5ACA5] focus:border-[#A8BCA0] focus:ring-2 focus:ring-[#E4EFE0]"
                    />
                </div>

                {/* Published */}
                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={(event) =>
                            setPublished(
                                event.target.checked
                            )
                        }
                        className="h-4 w-4 accent-[#71866A]"
                    />

                    <span className="text-sm text-[#4F4945]">
                        Published
                    </span>
                </label>

                {/* Error */}
                {error && (
                    <div className="rounded-xl bg-[#FBE9E6] px-4 py-3">
                        <p className="text-sm text-[#A65F58]">
                            {error}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 border-t border-[#EEE8E3] pt-6">

                    <Link
                        href="/admin/articles"
                        className="rounded-xl px-5 py-2.5 text-sm font-medium text-[#817873] transition hover:bg-[#F4EFEA]"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl bg-[#B8C8B0] px-5 py-2.5 text-sm font-medium text-[#34402F] transition hover:bg-[#A8BCA0] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Saving..."
                            : isEditing
                              ? "Update Article"
                              : published
                                ? "Publish Article"
                                : "Save Draft"}
                    </button>

                </div>
            </div>
        </form>
    );
}