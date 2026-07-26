"use client";

import { useState } from "react";
import { Armchair } from "lucide-react";

import { JoinConversationModal } from "./JoinConversationModal";

interface JoinConversationProps {
    articleId: string;
}

export function JoinConversation({
    articleId,
}: JoinConversationProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <section className="flex flex-col items-center gap-4 py-16">
                <div className="space-y-2 text-center">
                    <h2 className="text-lg font-medium text-[#4E4B47]">
                        Wanna join the conversation?
                    </h2>

                    <p className="text-sm text-[#817873]">
                        Pull up a chair.
                    </p>
                </div>

                <button
                    type="button"
                    aria-label="Join the conversation"
                    onClick={() => setOpen(true)}
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
                >
                    <Armchair
                        size={42}
                        className="text-[#9B8E84]"
                    />
                </button>
            </section>

            <JoinConversationModal
                articleId={articleId}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}