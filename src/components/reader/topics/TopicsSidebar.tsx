import Link from "next/link";

import { TopicSummary } from "@/backend/types/topic";
import { parisienne } from "@/lib/fonts";

interface TopicsSidebarProps {
    topics: TopicSummary[];
    currentTopic?: string;
}

const PAPERS = [
    "bg-[#F8F4ED]",
    "bg-[#EEF4EC]",
    "bg-[#F8EEF3]",
    "bg-[#F6EFE6]",
];

export default function TopicsSidebar({
    topics,
    currentTopic,
}: TopicsSidebarProps) {
    return (
        <div className="relative">
            {/* Watermark */}
            <span
                className={`
                    ${parisienne.className}
                    pointer-events-none
                    absolute
                    right-0
                    top-0
                    -rotate-[8deg]
                    text-[5rem]
                    text-[#B89B84]/5
                    select-none
                `}
            >
                Topics
            </span>

            <div className="relative mt-8 flex flex-wrap gap-3">
                <Link
                    href="/sips"
                    className={`
                        min-w-28
                        rounded-full
                        px-4
                        py-2
                        text-center
                        text-sm
                        transition-colors
                        ${
                            !currentTopic
                                ? "bg-[#e7d0b5] text-[#7d5a3d]"
                                : "bg-[#F8F4ED] text-[#5F5853] hover:bg-[#EFE7DD]"
                        }
                    `}
                >
                    All Sips
                </Link>

                {topics.map((topic, index) => (
                    <Link
                        key={topic.id}
                        href={`/sips?topic=${topic.slug}`}
                        className={`
                            min-w-28
                            rounded-full
                            px-4
                            py-2
                            text-center
                            text-sm
                            transition-all
                            hover:-translate-y-0.5
                            ${
                                PAPERS[index % PAPERS.length]
                            }
                            ${
                                currentTopic === topic.slug
                                    ? "bg-[#A67C52] text-white"
                                    : "text-[#5F5853] hover:bg-[#EFE7DD]"
                            }
                        `}
                    >
                        {topic.name}
                    </Link>
                ))}
            </div>

        </div>
    );
}