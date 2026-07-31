import Link from "next/link";

import { ArticleSummary } from "@/backend/types/article";

interface ArticleArchiveProps {
    articles: ArticleSummary[];
}

export default function ArticleArchive({
    articles,
}: ArticleArchiveProps) {

    if (articles.length === 0) {
        return (
            <section>
                <div className="py-20 text-center">
                    <p className="text-[#817873]">
                        No sips yet. More thoughts are brewing.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section>

            {articles.map((article) => (

                <Link
                    key={article.id}
                    href={`/sips/${article.slug}`}
                    className="group block border-b border-[#ECE5DE] py-10 first:pt-0 last:border-none"
                >

                    {/* Meta */}

                    <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#9A918B]">

                        <span>{article.topic.name}</span>

                        <span>·</span>

                        <span>
                            {article.readingTime} min read
                        </span>

                    </div>

                    {/* Title */}

                    <h2 className="font-serif text-3xl font-normal leading-snug text-[#3F3A37] transition-colors duration-300 group-hover:text-[#71866A]">

                        {article.title}

                    </h2>

                    {/* Excerpt */}

                    {article.excerpt && (

                        <p className="mt-4 max-w-2xl leading-8 text-[#817873]">

                            {article.excerpt}

                        </p>

                    )}

                    {/* Date */}

                    {article.publishedAt && (

                        <p className="mt-6 text-sm text-[#A09892]">

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

                </Link>

            ))}

        </section>
    );
}