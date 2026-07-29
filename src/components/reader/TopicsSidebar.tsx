import { TopicSummary } from "@/backend/types/topic";
import Link  from "next/link";

interface TopicsSidebarProps {
    topics: TopicSummary[];
    currentTopic?: string;
}

export default function TopicsSidebar({
    topics,
    currentTopic,
}: TopicsSidebarProps) {
    return (
        <aside className="relative overflow-hidden rounded-2xl border border-[#E7E0DA]">

            {/* Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/coffeebean.jpg')" }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 z-0 bg-[#FAF8F5]/50 backdrop-blur-[5px]" />

            {/* Content */}
            <div className="relative z-10 p-6">

                <Link 
                    href="/sips"
                    className={`block rounded-lg px-3 py-2 text-sm transition ${
                        !currentTopic
                            ? "bg-[#F8F4EF] font-medium text-[#52634D]"
                            : "text-[#817873] hover:bg-[#F8F4EF]"
                    }`}
                >
                    All Topics
                </Link>

                <div className="mt-5 space-y-3">
                    {topics.map((topic) => (
                        <Link
                            key={topic.id}
                            href={`/sips?topic=${topic.slug}`}
                            className={`block rounded-lg px-3 py-2 text-sm transition ${
                                currentTopic === topic.slug
                                    ? "bg-[#F8F4EF] font-medium text-[#52634D]"
                                    : "text-[#817873] hover:bg-[#F8F4EF]"
                            }`}
                        >
                            {topic.name}
                        </Link>
                    ))}
                </div>

                {topics.length === 0 && (
                    <p className="mt-4 text-sm text-[#A09892]">
                        No topics yet.
                    </p>
                )}

            </div>

        </aside>
    );
}