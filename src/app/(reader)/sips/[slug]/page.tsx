import Link from "next/link";
import { notFound } from "next/navigation";

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

    const article =
        await articleService.getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    return (
        <main>
            <article className="mx-auto max-w-3xl px-6 py-16">
                <Link
                    href="/sips"
                    className="text-sm font-medium text-[#71866A] transition hover:text-[#52634D]"
                >
                    ← Back to Sips
                </Link>

                <header className="mt-10 border-b border-[#E7E0DA] pb-10">
                    <div className="mb-4 flex items-center gap-2 text-sm text-[#9A918B]">
                        <span>
                            {article.topic.name}
                        </span>

                        <span>·</span>

                        <span>
                            {article.readingTime} min read
                        </span>
                    </div>

                    <h1 className="text-4xl font-semibold leading-tight text-[#3F3A37] md:text-5xl">
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="mt-5 text-lg leading-8 text-[#817873]">
                            {article.excerpt}
                        </p>
                    )}

                    {article.publishedAt && (
                        <p className="mt-5 text-sm text-[#A09892]">
                            {article.publishedAt.toLocaleDateString(
                                "en-US",
                                {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    )}
                </header>

                <div className="mt-10 whitespace-pre-wrap text-[16px] leading-8 text-[#4F4945]">
                    {article.content}
                </div>

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