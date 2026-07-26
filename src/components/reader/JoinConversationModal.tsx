"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { JoinConversationForm } from "./JoinConversationForm";

interface JoinConversationModalProps {
    articleId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function JoinConversationModal({
    articleId,
    open,
    onOpenChange,
}: JoinConversationModalProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-md rounded-3xl border bg-[#f8f4ef]">
                <DialogHeader className="text-center">
                    <DialogTitle>
                        Welcome
                    </DialogTitle>

                    <DialogDescription>
                        Pick a cup and introduce
                        yourself.
                    </DialogDescription>
                </DialogHeader>

                <JoinConversationForm articleId={articleId} onSuccess={() => onOpenChange(false)}/>
            </DialogContent>
        </Dialog>
    );
}