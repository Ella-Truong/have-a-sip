import { Topic } from "@/backend/types/topic";

interface TopicsSidebarProps {
    topics: Topic[];
}

export default function TopicsSidebar({
    topics,
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

                <h2 className="text-sm font-semibold text-[#3F3A37]">
                    All Topics
                </h2>

                <div className="mt-5 space-y-3">
                    {topics.map((topic) => (
                        <div
                            key={topic.id}
                            className="text-sm text-[#817873]"
                        >
                            {topic.name}
                        </div>
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