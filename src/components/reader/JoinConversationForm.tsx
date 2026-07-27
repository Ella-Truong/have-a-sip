"use client";

import { useState } from "react";

import { SipType } from "@generated/prisma";

import { ConversationIdentity } from "@/backend/types/conversation";
import { SIP_OPTIONS } from "@/constants/sip";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface JoinConversationFormProps {
    onSubmit: (identity: ConversationIdentity) => void;
}

export function JoinConversationForm({
    onSubmit,
}: JoinConversationFormProps) {
    const [cupName, setCupName] = useState("");
    const [sipType, setSipType] = useState<SipType>(SipType.LATTE);

    const handleSubmit = () => {
        const trimmedCupName = cupName.trim();

        if (!trimmedCupName) {
            return;
        }

        onSubmit({
            cupName: trimmedCupName,
            sipType,
        });
    };

    return (
        <TooltipProvider delayDuration={100}>
            <form
                className="mt-5 space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
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
                                            onClick={() => setSipType(option.type)}
                                            className={`flex h-12 w-12 items-center justify-center rounded-full border text-2xl transition-all duration-200 ${
                                                selected
                                                    ? "scale-105 border-[#71866A] bg-[#F4F8F3]"
                                                    : "border-[#E7E0DA] hover:scale-105 hover:bg-[#FAF7F5]"
                                            }`}
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
                    onChange={(e) => setCupName(e.target.value)}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={!cupName.trim()}
                >
                    {`Let's Start`}
                </Button>
            </form>
        </TooltipProvider>
    );
}