import Link from "next/link";

import { ArticleSummary } from "@/backend/types/article";

type Props = {
    article: ArticleSummary;
};

export default function ArticleCard({ article }: Props) {
    return (
        <article className="group">
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#A09892]">
                <span>☕ {article.topic.name}</span>

                <span>•</span>

                <span>{article.readingTime} min read</span>
            </div>

            <Link href={`/sips/${article.slug}`}>
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
                    {article.publishedAt?.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
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
    );
}