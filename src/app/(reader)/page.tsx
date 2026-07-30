import { ArticleService } from "@/backend/services/article.service";
import { TopicService } from "@/backend/services/topic.service";

import HeroSection  from "@/components/reader/articles/HeroSection";
import LatestArticles from "@/components/reader/articles/LatestArticles";
import TopicsSidebar from "@/components/reader/topics/TopicsSidebar";
import ThoughtCard from "@/components/reader/articles/ThoughtCard";

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
                <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#F5E2EB]/50 blur-3xl" />
                <div className="absolute right-0 top-[35rem] h-96 w-96 rounded-full bg-[#DDEDD8]/50 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F7E8D5]/50 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6 py-16">
                {/** Hero Section */}
                <HeroSection />

                {/** Content Section */}
                <div className="grid gap-16 lg:grid-cols-[1fr_280px] animate-fade-in">
                    <LatestArticles articles={articles}/>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <ThoughtCard />
                        <TopicsSidebar topics={topics} />
                    </aside>
                </div>
            </div>
        </main>
    );
}