import ArticleForm from "@/components/admin/articles/ArticleForm";
import { TopicService } from "@/backend/services/topic.service";

import { NotebookPen } from "lucide-react";

const topicService = new TopicService();

export default async function NewArticlePage() {
    const topics = await topicService.getTopics();

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#FAF8F5] px-6 py-10">
            <div 
                className="absolute inset-0 scale-105 bg-cover bg-center blur-sm"
                style={{backgroundImage: "url('/coffeebean.jpg')"}}
            />

            {/* White overlay */}
            <div className="absolute inset-0 bg-white/50" />

            <div className="relative mx-auto max-w-3xl">
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="rounded-full bg-[#f4ece4] border border-[#d9cbbe] p-4 shadow-lg">
                        <NotebookPen
                            size={34}
                            className="text-[#8a6a54]"
                            strokeWidth={1.75}
                        />
                    </div>

                    <div className="mt-6 h-px w-20 bg-[#D8C8BA]" />
                    
                    <h1 className="mt-6 font-serif text-3xl tracking-[0.15em] text-[#5A4638] uppercase">
                        Start Writing
                    </h1>

                    <p className="mt-3 max-w-md text-sm italic leading-7 text-[#8C7C71]">
                        Pour out your thoughts, one sip at a time.
                    </p>
                </div>

                <ArticleForm topics={topics}/>
            </div>
        </main>
    );
}