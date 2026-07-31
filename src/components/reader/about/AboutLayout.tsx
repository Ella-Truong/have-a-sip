import { ReactNode } from "react";

interface AboutPageLayoutProps {
    children: ReactNode;
}

export default function AboutPageLayout({
    children,
}: AboutPageLayoutProps) {
    return (
        <main className="relative overflow-hidden">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#F5E2EB]/40 blur-3xl" />
                <div className="absolute right-0 top-[35rem] h-96 w-96 rounded-full bg-[#DDEDD8]/50 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F7E8D5]/40 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6 py-24">

                {/* Hero Decorations */}
                <div className="absolute -left-24 top-8 h-60 w-60 rounded-full bg-[#EEDBE5]/40 blur-3xl" />
                <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-[#DCEAD8]/40 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#F8E7D2]/50 blur-3xl" />

                <div className="relative space-y-28">
                    {children}
                </div>
            </div>
        </main>
    );
}