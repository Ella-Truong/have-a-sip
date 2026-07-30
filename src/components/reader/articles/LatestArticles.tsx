import Link from "next/link";

import { ArticleSummary } from "@/backend/types/article";
import ArticleCard from "./ArticleCard";
import EmptyArticles from "./EmptyArticles";

type Props = {
    articles: ArticleSummary[];
};

export default function LatestArticles({ articles }: Props) {
    return (
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
                        <ArticleCard
                            key={article.id}
                            article={article}
                        />
                    ))}
                </div>
            ) : (
                <EmptyArticles />
            )}
        </section>
    );
}