import { notFound } from "next/navigation";

import ArticleForm from "@/components/admin/articles/ArticleForm";
import { ArticleService } from "@/backend/services/article.service";
import { TopicService } from "@/backend/services/topic.service";

const articleService = new ArticleService();
const topicService = new TopicService();

interface EditArticlePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditArticlePage({
    params,
}: EditArticlePageProps) {
    const { id } = await params;

    const [article, topics] = await Promise.all([
        articleService.getArticleById(id),
        topicService.getTopics(),
    ]);

    if (!article) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#FAF8F5] px-6 py-10">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-[#3F3A37]">
                        Edit Article
                    </h1>

                    <p className="mt-2 text-sm text-[#817873]">
                        Make changes to your article.
                    </p>
                </div>

                <ArticleForm
                    article={article}
                    topics={topics}
                />
            </div>
        </main>
    );
}