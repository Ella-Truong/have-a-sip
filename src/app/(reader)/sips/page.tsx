import { ArticleService } from "@/backend/services/article.service";
import { TopicService } from "@/backend/services/topic.service";

import ArticleArchive from "@/components/reader/sips/ArticleArchive";
import SipsHero from "@/components/reader/sips/SipsHero";
import SipsPagination from "@/components/reader/sips/SipsPagination";
import TopicsSidebar from "@/components/reader/topics/TopicsSidebar";

const articleService = new ArticleService();
const topicService = new TopicService();

interface SipsPageProps {
    searchParams: Promise<{
        page?: string;
        topic?: string;
    }>;
}

export default async function SipsPage({
    searchParams,
}: SipsPageProps) {
    const { page: pageParam, topic } = await searchParams;

    const page = Math.max(1, Number(pageParam) || 1);

    const [
        { data: articles, pagination },
        topics,
    ] = await Promise.all([
        articleService.getArticles({
            page,
            limit: 5,
            topic,
        }),
        topicService.getTopics(),
    ]);

    return (
        <main className="relative overflow-visible">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-visible">
                <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#F5E2EB]/40 blur-xl" />
                <div className="absolute right-0 top-[34rem] h-96 w-96 rounded-full bg-[#DDEDD8]/40 blur-2xl" />
                <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F7E8D5]/40 blur-2xl" />
            </div>

            <div className="relative mx-auto max-w-6xl animate-fade-down px-6 py-20">
                <SipsHero />

                <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_220px]">
                    <section>
                        <ArticleArchive articles={articles} />
                        <SipsPagination
                            page={page}
                            topic={topic}
                            pagination={pagination}
                        />
                    </section>

                    <aside className="sticky top-28 h-fit">
                        <TopicsSidebar
                            topics={topics}
                            currentTopic={topic}
                        />
                    </aside>
                </div>
            </div>
        </main>
    );
}