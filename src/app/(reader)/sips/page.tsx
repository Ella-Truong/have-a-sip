import Link from "next/link";

import { ArticleService } from "@/backend/services/article.service";
import { TopicService } from "@/backend/services/topic.service";

import TopicsSidebar from "@/components/reader/TopicsSidebar";

const articleService = new ArticleService();
const topicService = new TopicService();

interface SipsPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function SipsPage({
    searchParams,
}: SipsPageProps) {
    const { page: pageParam } = await searchParams;

    const page = Math.max(
        1,
        Number(pageParam) || 1
    );

    // Fetch articles and topics at the same time
    const [
        { data: articles, pagination },
        topics,
    ] = await Promise.all([
        articleService.getArticles({
            page,
            limit: 6,
        }),
        topicService.getTopics(),
    ]);

    return (
        <main className="relative overflow-visible">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-visible">

                <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#F5E2EB]/40 blur-3xl" />

                <div className="absolute right-0 top-[35rem] h-96 w-96 rounded-full bg-[#DDEDD8]/50 blur-3xl" />

                <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F7E8D5]/40 blur-3xl" />

            </div>

            <div className="mx-auto max-w-6xl px-6 py-16 animate-fade-down">
                {/* Header */}
                <section className="mb-12">
                    <p className="mb-4 text-xs font-medium text-[#71866A]">
                        ☕ Have a Sip
                    </p>

                    <h1 className="text-4xl font-semibold text-[#3F3A37]">
                        Sips
                    </h1>

                    <p className="mt-4 max-w-xl leading-7 text-[#817873]">
                        Small notes from things I learn,
                        build, debug, and occasionally
                        overthink.
                    </p>
                </section>

                {/* Main Layout */}
                <div className="grid gap-10 lg:grid-cols-[1fr_260px]">

                    {/* Left Side — Articles */}
                    <section>
                        {articles.length > 0 ? (
                            <div className="space-y-4">
                                {articles.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={`/sips/${article.slug}`}
                                        className="block rounded-2xl border border-[#E7E0DA] bg-[#fffdf8]/80 p-6 transition hover:-translate-y-0.5 hover:border-[#C9D5C3] hover:shadow-sm"
                                    >
                                        {/* Meta */}
                                        <div className="mb-3 flex items-center gap-2 text-xs text-[#9A918B]">
                                            <span>
                                                {article.topic.name}
                                            </span>

                                            <span>·</span>

                                            <span>
                                                {article.readingTime} min read
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-semibold text-[#3F3A37]">
                                            {article.title}
                                        </h2>

                                        {/* Excerpt */}
                                        {article.excerpt && (
                                            <p className="mt-2 line-clamp-2 leading-6 text-[#817873]">
                                                {article.excerpt}
                                            </p>
                                        )}

                                        {/* Date */}
                                        {article.publishedAt && (
                                            <p className="mt-4 text-xs text-[#A09892]">
                                                {article.publishedAt.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </p>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-[#E7E0DA] bg-white px-6 py-12 text-center">
                                <p className="text-[#817873]">
                                    No sips yet. More thoughts are brewing. ☕
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="mt-10 flex items-center justify-between">

                                {/* Previous */}
                                {pagination.hasPreviousPage ? (
                                    <Link
                                        href={`/sips?page=${page - 1}`}
                                        className="rounded-xl border border-[#DDD5CE] bg-white px-4 py-2 text-sm font-medium text-[#4F4945] transition hover:bg-[#F4EFEA]"
                                    >
                                        ← Previous
                                    </Link>
                                ) : (
                                    <div />
                                )}

                                {/* Current Page */}
                                <p className="text-sm text-[#817873]">
                                    Page {page} of{" "}
                                    {pagination.totalPages}
                                </p>

                                {/* Next */}
                                {pagination.hasNextPage ? (
                                    <Link
                                        href={`/sips?page=${page + 1}`}
                                        className="rounded-xl border border-[#DDD5CE] bg-white px-4 py-2 text-sm font-medium text-[#4F4945] transition hover:bg-[#F4EFEA]"
                                    >
                                        Next →
                                    </Link>
                                ) : (
                                    <div />
                                )}
                            </div>
                        )}
                    </section>

                    {/* Right Side — Topics */}
                    <aside>
                        <TopicsSidebar topics={topics} />
                    </aside>

                </div>
            </div>
        </main>
    );
}