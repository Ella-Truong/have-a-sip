"use client";

import { ConversationIdentity } from "@/backend/types/conversation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { JoinConversationForm } from "./JoinConversationForm";
interface JoinConversationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (identity: ConversationIdentity) => void;
}

export function JoinConversationModal({
    open,
    onOpenChange,
    onSubmit,
}: JoinConversationModalProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="rounded-3xl border bg-[#f8f4ef] sm:max-w-md">
                <DialogHeader className="text-center">
                    <DialogTitle>
                        Welcome
                    </DialogTitle>

                    <DialogDescription>
                        Pick a cup and introduce yourself.
                    </DialogDescription>
                </DialogHeader>

                <JoinConversationForm
                    onSubmit={onSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}