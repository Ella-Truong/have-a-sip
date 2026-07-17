import ArticleForm from "@/components/admin/articles/ArticleForm";
import { TopicService } from "@/backend/services/topic.service";

const topicService = new TopicService();

export default async function NewArticlePage() {
    const topics = await topicService.getTopics();

    return (
        <main className="min-h-screen bg-[#FAF8F5] px-6 py-10">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-[#3F3A37]">
                        New Article
                    </h1>

                    <p className="mt-2 text-sm text-[#817873]">
                        Pour out your thoughts, one sip at a time.
                    </p>
                </div>

                <ArticleForm topics={topics}/>
            </div>
        </main>
    );
}