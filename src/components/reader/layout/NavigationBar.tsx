import Link from "next/link";
import { Coffee } from "lucide-react";

import NavigationLinks from "./NavigationLinks";

export default function NavigationBar() {
    return (
        <header className="sticky top-0 z-50 border-b border-[#ECE4DD] bg-[#FAF8F5]/85 backdrop-blur-md">
            {/* Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/coffeebean.jpg')" }}
            />

            {/* Blur + Overlay */}
            <div className="absolute inset-0 z-0 bg-[#FAF8F5]/55 backdrop-blur-[5px]" />

            {/* Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/10 via-transparent to-white/10" />

            <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
                <Link
                    href="/"
                    className="flex items-center gap-4 transition-opacity hover:opacity-90"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5EEE8] text-[#7B6653] shadow-sm">
                        <Coffee className="h-8 w-8" strokeWidth={1.8} />
                    </div>

                    <div>
                        <h1 className="font-serif text-2xl font-semibold tracking-tight text-[#3F3A37]">
                            Have a Sip
                        </h1>

                        <p className="text-xs uppercase tracking-[0.2em] text-[#9A908A]">
                            Slow Engineering Journal
                        </p>
                    </div>
                </Link>

                <NavigationLinks />
            </nav>
        </header>
    );
}