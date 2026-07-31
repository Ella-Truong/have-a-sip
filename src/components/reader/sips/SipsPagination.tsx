import Link from "next/link";

import { Pagination } from "@/backend/types/pagination";

interface SipsPaginationProps {
    page: number;
    topic?: string;
    pagination: Pagination;
}

export default function SipsPagination({
    page,
    topic,
    pagination,
}: SipsPaginationProps) {
    if (pagination.totalPages <= 1) {
        return null;
    }

    function buildHref(targetPage: number) {
        const params = new URLSearchParams();

        params.set("page", targetPage.toString());

        if (topic) {
            params.set("topic", topic);
        }

        return `/sips?${params.toString()}`;
    }

    return (
        <div className="mt-16 flex items-center justify-between border-t border-[#ECE5DE] pt-8">
            {pagination.hasPreviousPage ? (
                <Link
                    href={buildHref(page - 1)}
                    className="text-sm text-[#6B655F] transition hover:text-[#3F3A37]"
                >
                    ← Previous
                </Link>
            ) : (
                <div />
            )}

            <p className="text-sm tracking-[0.15em] text-[#9A918B]">
                {page} / {pagination.totalPages}
            </p>

            {pagination.hasNextPage ? (
                <Link
                    href={buildHref(page + 1)}
                    className="text-sm text-[#6B655F] transition hover:text-[#3F3A37]"
                >
                    Next →
                </Link>
            ) : (
                <div />
            )}
        </div>
    );
}