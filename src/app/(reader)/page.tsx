import Link from "next/link";

import { ArticleService } from "@/backend/services/article.service";
import { TopicService } from "@/backend/services/topic.service";

import TopicsSidebar from "@/components/reader/TopicsSidebar";

const articleService = new ArticleService();
const topicService = new TopicService();

export default async function HomePage() {
    const [{ data: articles }, topics] = await Promise.all([
        articleService.getArticles({
            page: 1,
            limit: 5,
        }),
        topicService.getTopics(),
    ]);

    return (
        <main className="relative overflow-hidden">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#F5E2EB]/40 blur-3xl" />

                <div className="absolute right-0 top-[35rem] h-96 w-96 rounded-full bg-[#DDEDD8]/50 blur-3xl" />

                <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F7E8D5]/40 blur-3xl" />

            </div>

            <div className="relative mx-auto max-w-6xl px-6 py-16">

                {/* ===================================================== */}
                {/* HERO */}
                {/* ===================================================== */}

                <section className="relative mb-28 overflow-hidden rounded-[36px] border border-[#ECE4DD] bg-gradient-to-br from-[#FFFDFB] via-[#FCF8F3] to-[#FAF6F2] px-8 py-20 md:px-16">

                    {/* watercolor blobs */}

                    <div className="absolute -left-24 top-8 h-60 w-60 rounded-full bg-[#EEDBE5]/40 blur-3xl" />

                    <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-[#DCEAD8]/40 blur-3xl" />

                    <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#F8E7D2]/50 blur-3xl" />

                    <div className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

                        {/* Left */}

                        <div>

                            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#A09892]">
                                Slow Engineering Journal
                            </p>

                            <h1 className="max-w-xl font-serif text-4xl font-medium leading-[1.18] text-[#3F3A37] md:text-5xl">
                                One cup,
                                <br />
                                many ideas,
                                <br />
                                endless learning.
                            </h1>

                            <p className="mt-8 max-w-lg leading-8 text-[#7F7772]">
                                A quiet corner where I write about backend
                                engineering, architecture, debugging stories,
                                and the little discoveries collected one cup of
                                coffee at a time.
                            </p>

                            <div className="my-10 flex items-center gap-4">

                                <div className="h-px w-12 bg-[#DDD2C8]" />

                                <span className="text-[#C6BBB4]">
                                    ✦
                                </span>

                                <div className="h-px w-12 bg-[#DDD2C8]" />

                            </div>

                            <p className="font-serif text-xl italic text-[#8A817B]">
                                {`"Every bug teaches something worth remembering"`}
                            </p>

                        </div>

                        {/* Right */}

                        <div className="flex justify-center">

                            <div className="relative flex h-[420px] items-center justify-center">

    {/* floating decorations */}

    <span className="absolute left-6 top-6 text-3xl opacity-60">
        ☁️
    </span>

    <span className="absolute right-8 top-16 text-2xl opacity-50">
        ✨
    </span>

    <span className="absolute bottom-10 left-12 text-2xl opacity-60">
        🍃
    </span>

    {/* main illustration */}

    <div className="flex flex-col items-center">

        <div className="text-7xl">
            ☕
        </div>

        <div className="my-8 h-px w-20 bg-[#DDD2C8]" />

        <h2 className="font-serif text-2xl text-[#3F3A37]">
            Have a Sip
        </h2>

        <p className="mt-3 text-center text-sm leading-7 text-[#8A817B]">
            Learning slowly.
            <br />
            Building intentionally.
        </p>

    </div>

</div>

                        </div>

                    </div>

                </section>

                {/* ===================================================== */}
                {/* CONTENT */}
                {/* ===================================================== */}

                <div className="grid gap-16 lg:grid-cols-[1fr_280px]">

                    {/* Articles */}

                    <section>

                        <div className="mb-12 flex items-end justify-between">

                            <div>

                                <p className="text-xs uppercase tracking-[0.3em] text-[#A09892]">
                                    Latest Writings
                                </p>

                                <h2 className="mt-2 font-serif text-4xl text-[#3F3A37]">
                                    Recent Sips
                                </h2>

                            </div>

                            <Link
                                href="/sips"
                                className="rounded-full bg-[#DCEAD8] px-5 py-2 text-sm font-medium text-[#52634D] transition hover:scale-105"
                            >
                                View all →
                            </Link>

                        </div>

                        {articles.length > 0 ? (
                            <div className="space-y-14">

                                {articles.map((article) => (

                                    <article
                                        key={article.id}
                                        className="group"
                                    >

                                        <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#A09892]">

                                            <span>
                                                ☕ {article.topic.name}
                                            </span>

                                            <span>•</span>

                                            <span>
                                                {article.readingTime} min read
                                            </span>

                                        </div>

                                        <Link
                                            href={`/sips/${article.slug}`}
                                        >
                                            <h3 className="font-serif text-3xl leading-snug transition group-hover:text-[#52634D]">
                                                {article.title}
                                            </h3>
                                        </Link>

                                        {article.excerpt && (

                                            <p className="mt-5 max-w-3xl leading-8 text-[#817873]">
                                                {article.excerpt}
                                            </p>

                                        )}

                                        <div className="mt-6 flex items-center justify-between">

                                            <p className="text-sm text-[#A09892]">

                                                {article.publishedAt?.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month: "long",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    }
                                                )}

                                            </p>

                                            <Link
                                                href={`/sips/${article.slug}`}
                                                className="text-sm font-medium text-[#71866A] opacity-0 transition group-hover:opacity-100"
                                            >
                                                Read article →
                                            </Link>

                                        </div>

                                        <div className="mt-10 h-px bg-[#E8E0DA]" />

                                    </article>

                                ))}

                            </div>

                        ) : (

                            <div className="rounded-3xl border border-[#ECE4DD] bg-white/80 px-8 py-16 text-center">

                                <div className="text-5xl">
                                    ☕
                                </div>

                                <h3 className="mt-5 font-serif text-2xl">
                                    Brewing...
                                </h3>

                                <p className="mt-4 text-[#817873]">
                                    Nothing here yet.
                                    The first sip is coming soon.
                                </p>

                            </div>

                        )}

                    </section>

                    {/* Sidebar */}

                    <aside className="space-y-8">

                        <div className="rounded-3xl border border-[#ECE4DD] bg-[#FFFDFB] p-8">

                            <p className="text-xs uppercase tracking-[0.3em] text-[#A09892]">
                                {`Today's Thought`}
                            </p>

                            <p className="mt-5 font-serif text-2xl italic leading-10 text-[#6F6660]">
                                {`"...The best engineers
                                aren't the ones
                                who never fail,
                                but the ones who
                                never stop learning..."`}
                            </p>

                        </div>

                        <TopicsSidebar topics={topics} />

                    </aside>

                </div>

            </div>

        </main>
    );
}