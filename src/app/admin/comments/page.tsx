import { MessageCircle } from "lucide-react";
import { CommentTable } from "@/components/admin/comments/CommentTable";

export default function AdminCommentsPage() {
    return (
        <main className="min-h-screen bg-[#F8F4EF] px-6 py-12">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3EEE8]">
                            <MessageCircle
                                size={26}
                                className="text-[#8B6A56]"
                            />
                        </div>

                        <div>
                            <h1 className="font-serif text-4xl text-[#4D3C35]">
                                Comments
                            </h1>

                            <p className="mt-1 text-sm text-[#80756D]">
                                Read and moderate conversations from your readers.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Comments Table */}
                <CommentTable />
            </div>
        </main>
    );
}