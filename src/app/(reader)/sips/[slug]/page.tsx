import Link from "next/link";
import { notFound } from "next/navigation";

import { JoinConversation } from "@/components/reader/comments/JoinConversation";
import { ArticleBackground } from "@/components/reader/articles/ArticleBackground";

import { ArticleService } from "@/backend/services/article.service";

const articleService = new ArticleService();

interface SipDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function SipDetailPage({
    params,
}: SipDetailPageProps) {
    const { slug } = await params;

    const article = await articleService.getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    return (
        <main className="relative overflow-hidden">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Soft blobs */}
                <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#F5E2EB]/50 blur-3xl" />

                <div className="absolute right-0 top-[35rem] h-96 w-96 rounded-full bg-[#DDEDD8]/50 blur-3xl" />

                <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F7E8D5]/50 blur-3xl" />

                {/* Dynamic Watermarks */}
                <ArticleBackground targetId="sip-article" />
            </div>

            <article
                id="sip-article"
                className="relative mx-auto max-w-3xl px-6 py-16"
            >
                <Link
                    href="/sips"
                    className="text-sm font-medium text-[#71866A] transition hover:text-[#52634D]"
                >
                    ← Back to Sips
                </Link>

                <header className="mt-10 border-b border-[#E7E0DA] pb-10">
                    <div className="mb-4 flex items-center gap-2 text-sm text-[#9A918B]">
                        <span>{article.topic.name}</span>

                        <span>·</span>

                        <span>{article.readingTime} min read</span>
                    </div>

                    <h1 className="font-serif text-4xl leading-tight text-[#3F3A37] md:text-5xl">
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="mt-5 text-lg leading-8 text-[#817873]">
                            {article.excerpt}
                        </p>
                    )}

                    {article.publishedAt && (
                        <p className="mt-5 text-sm text-[#A09892]">
                            {article.publishedAt.toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    )}
                </header>

                <div
                    className="article-content mt-10"
                    dangerouslySetInnerHTML={{
                        __html: article.content,
                    }}
                />

                <section className="mt-20 border-t border-[#E7E0DA] pt-12">
                    <JoinConversation articleSlug={article.slug} />
                </section>

                <footer className="mt-16 border-t border-[#E7E0DA] pt-8">
                    <Link
                        href="/sips"
                        className="text-sm font-medium text-[#71866A] transition hover:text-[#52634D]"
                    >
                        ← More Sips
                    </Link>
                </footer>
            </article>
        </main>
    );
}