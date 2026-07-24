import Link from "next/link";

import { ArticleService } from "@/backend/services/article.service";
import { TopicService } from "@/backend/services/topic.service";

import TopicsSidebar from "@/components/reader/TopicsSidebar";

const articleService = new ArticleService();
const topicService = new TopicService();

export default async function HomePage() {
    const [
        { data: articles },
        topics,
    ] = await Promise.all([
        articleService.getArticles({
            page: 1,
            limit: 5,
        }),
        topicService.getTopics(),
    ]);
    console.log("Topics:", topics)

    return (
        <main>
            <div className="mx-auto max-w-6xl px-6 py-16">

                {/* Hero */}
                <section className="mb-16">
                    <p className="mb-3 text-sm font-medium text-[#71866A]">
                        ☕ Welcome to Have a Sip
                    </p>

                    <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-[#3F3A37] md:text-5xl">
                        Notes from learning,
                        building, and figuring
                        things out.
                    </h1>

                    <p className="mt-5 max-w-xl leading-7 text-[#817873]">
                        A quiet corner where I write about
                        backend engineering, things I learn,
                        bugs I meet, and ideas worth remembering.
                    </p>
                </section>

                {/* Main Layout */}
                <div className="grid gap-10 lg:grid-cols-[1fr_260px]">

                    {/* Left Side — Recent Sips */}
                    <section>
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-[#3F3A37]">
                                Recent Sips
                            </h2>

                            <Link
                                href="/sips"
                                className="text-sm font-medium text-[#71866A] transition hover:text-[#52634D]"
                            >
                                View all →
                            </Link>
                        </div>

                        {articles.length > 0 ? (
                            <div className="space-y-4">
                                {articles.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={`/sips/${article.slug}`}
                                        className="block rounded-2xl border border-[#E7E0DA] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#C9D5C3] hover:shadow-sm"
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
                                        <h3 className="text-xl font-semibold text-[#3F3A37]">
                                            {article.title}
                                        </h3>

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
                                    Nothing here yet. The coffee is still brewing. ☕
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Right Side — All Topics */}
                    <aside>
                        <TopicsSidebar topics={topics} />
                    </aside>

                </div>
            </div>
        </main>
    );
}