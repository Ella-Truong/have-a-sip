"use client";

import { useState } from "react";

import { SipType } from "@generated/prisma";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface JoinConversationFormProps {
    articleId: string;
    onSuccess: () => void;
}

interface SipOption {
    type: SipType;
    emoji: string;
    label: string;
}

const SIP_OPTIONS: SipOption[] = [
    { type: SipType.ESPRESSO, emoji: "☕", label: "Espresso" },
    { type: SipType.AMERICANO, emoji: "🥤", label: "Americano" },
    { type: SipType.LATTE, emoji: "🥛", label: "Latte" },
    { type: SipType.CAPPUCCINO, emoji: "☕", label: "Cappuccino" },
    { type: SipType.MATCHA, emoji: "🍵", label: "Matcha" },
    { type: SipType.HOT_CHOCOLATE, emoji: "🍫", label: "Hot Chocolate" },
    { type: SipType.LEMONADE, emoji: "🍋", label: "Lemonade" },
    { type: SipType.JASMINE_TEA, emoji: "🫖", label: "Jasmine Tea" },
    { type: SipType.CROISSANT, emoji: "🥐", label: "Croissant" },
    { type: SipType.BAGEL, emoji: "🥯", label: "Bagel" },
    { type: SipType.MUFFIN, emoji: "🧁", label: "Muffin" },
    { type: SipType.DONUT, emoji: "🍩", label: "Donut" },
];

export function JoinConversationForm({
    articleId,
    onSuccess,
}: JoinConversationFormProps) {
    const [cupName, setCupName] = useState("");
    const [sipType, setSipType] = useState<SipType>(SipType.LATTE);
    const [loading, setLoading] = useState(false);

    return (
        <TooltipProvider delayDuration={100}>
            <form
                className="mt-5 space-y-6"
                onSubmit={async (event) => {
                    event.preventDefault();

                    if (!cupName.trim()) return;

                    setLoading(true);

                    try {
                        console.log({
                            articleId,
                            cupName,
                            sipType,
                        });

                        // TODO:
                        // await commentApi.joinConversation(...)

                        onSuccess();
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                <div>
                    <p className="mb-3 text-center text-sm text-muted-foreground">
                        Pick your sip
                    </p>

                    <div className="grid grid-cols-6 gap-2">
                        {SIP_OPTIONS.map((option) => {
                            const selected =
                                option.type === sipType;

                            return (
                                <Tooltip key={option.type}>
                                    <TooltipTrigger asChild>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSipType(option.type)
                                            }
                                            className={`
                                                flex h-12 w-12 items-center justify-center
                                                rounded-full border text-2xl
                                                transition-all duration-200
                                                ${
                                                    selected
                                                        ? "border-[#71866A] bg-[#F4F8F3] scale-105"
                                                        : "border-[#E7E0DA] hover:bg-[#FAF7F5] hover:scale-105"
                                                }
                                            `}
                                        >
                                            {option.emoji}
                                        </button>
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        {option.label}
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </div>
                </div>

                <Input
                    value={cupName}
                    maxLength={20}
                    placeholder="Cup name"
                    onChange={(event) =>
                        setCupName(event.target.value)
                    }
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={
                        loading ||
                        !cupName.trim()
                    }
                >
                    {loading
                        ? "Joining..."
                        : "Let's Start"}
                </Button>
            </form>
        </TooltipProvider>
    );
}