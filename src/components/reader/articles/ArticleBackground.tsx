"use client";

import { useEffect, useRef, useState } from "react";
import { parisienne } from "@/lib/fonts";

interface ArticleBackgroundProps {
    targetId: string;
}

const COLORS = [
    "text-[#B89B84]/10",
    "text-[#C2B09C]/10",
    "text-[#B8C8AF]/10",
    "text-[#D5B9C4]/10",
];

const POSITIONS = [
    {
        side: "-left-44",
        rotation: "-rotate-[18deg]",
    },
    {
        side: "-right-40",
        rotation: "rotate-[15deg]",
    },
    {
        side: "-left-32",
        rotation: "-rotate-[12deg]",
    },
    {
        side: "-right-24",
        rotation: "rotate-[20deg]",
    },
];

export function ArticleBackground({
    targetId,
}: ArticleBackgroundProps) {
    const [articleHeight, setArticleHeight] = useState(0);
    const [count, setCount] = useState(3);

    const observerRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        const article = document.getElementById(targetId);

        if (!article) return;

        const update = () => {
            const height = article.offsetHeight;

            const newCount = Math.max(
                3,
                Math.ceil(height / 650)
            );

            setArticleHeight((prev) =>
                prev === height ? prev : height
            );

            setCount((prev) =>
                prev === newCount ? prev : newCount
            );
        };

        update();

        observerRef.current = new ResizeObserver(update);
        observerRef.current.observe(article);

        return () => observerRef.current?.disconnect();
    }, [targetId]);

    return (
        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
            {Array.from({ length: count }).map((_, index) => {
                const position = POSITIONS[index % POSITIONS.length];

                const top = ((index + 1) * articleHeight) / (count + 1)

                return (
                    <span
                        key={index}
                        className={`
                            ${parisienne.className}
                            absolute
                            whitespace-nowrap
                            leading-none
                            blur-[0.8px]
                            text-[14rem]
                            ${COLORS[index % COLORS.length]}
                            ${position.side}
                            ${position.rotation}
                        `}
                        style={{
                            top,
                        }}
                    >
                        Have a Sip
                    </span>
                );
            })}
        </div>
    );
}