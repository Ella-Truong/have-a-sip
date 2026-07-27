"use client";

import { useRef, useEffect, useState } from "react";
import { Armchair } from "lucide-react";

import type { ConversationIdentity } from "@/backend/types/conversation";

import { ConversationSection } from "./ConversationSection";
import { JoinConversationModal } from "./JoinConversationModal";

interface JoinConversationProps {
    articleSlug: string;
}

export function JoinConversation({
    articleSlug,
}: JoinConversationProps) {
    const conversationRef = useRef<HTMLDivElement>(null);

    const storageKey = `conversation:${articleSlug}`;

    const [identity, setIdentity] =
        useState<ConversationIdentity | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);

        if (saved) {
            setIdentity(JSON.parse(saved));
        }
    }, [storageKey]);

    const [modalOpen, setModalOpen] = useState(false);

    const [isConversationVisible, setIsConversationVisible] =
        useState(false);

    const scrollToConversation = () => {
        requestAnimationFrame(() => {
            conversationRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    };

    const handleChairClick = () => {
        if (!identity) {
            setModalOpen(true);
            return;
        }

        setIsConversationVisible(true);
        scrollToConversation();
    };

    const handleJoin = (
        identity: ConversationIdentity
    ) => {
        localStorage.setItem(
            storageKey,
            JSON.stringify(identity)
        );

        setIdentity(identity);
        setModalOpen(false);

        setIsConversationVisible(true);
        scrollToConversation();
    };

    return (
        <>
            <section className="flex flex-col items-center gap-4 py-16">
                <div className="space-y-2 text-center">
                    {identity ? (
                        <>
                            <h2 className="text-lg font-medium text-[#4E4B47]">
                                Welcome back, {identity.cupName}.
                            </h2>

                            <p className="text-sm text-[#817873]">
                                Your thoughtful note is waiting below.
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-lg font-medium text-[#4E4B47]">
                                Wanna join the conversation?
                            </h2>

                            <p className="text-sm text-[#817873]">
                                Pull up a chair.
                            </p>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleChairClick}
                    className="
                        rounded-full
                        p-4
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:scale-105
                        hover:bg-[#F8F5F2]
                        active:scale-95
                    "
                    aria-label={
                        identity
                            ? "View conversation"
                            : "Join the conversation"
                    }
                >
                    <Armchair
                        size={42}
                        className="text-[#9B8E84]"
                    />
                </button>
            </section>

            <JoinConversationModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                onSubmit={handleJoin}
            />

            {isConversationVisible && (
                <div ref={conversationRef}>
                    <ConversationSection
                        articleSlug={articleSlug}
                        identity={identity}
                    />
                </div>
            )}
        </>
    );
}