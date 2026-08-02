import Link from "next/link";
import { Coffee } from "lucide-react";

import { parisienne } from "@/lib/fonts";

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
                    className="group flex items-center gap-4 transition-opacity hover:opacity-90"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5EEE8] text-[#7B6653] transition-transform duration-200 group-hover:rotate-6 shadow-sm">
                        <Coffee className="h-7 w-7" strokeWidth={1.7} />
                    </div>

                    <div>
                        <span className={`${parisienne.className} block text-[2.15rem] leading-none text-[#3F3A37]`}>
                            Have a Sip
                        </span>

                        <p className="mt-0.5 text-[11px] uppercase tracking-[0.24em] text-[#9A908A]">
                            Slow Engineering Journal
                        </p>
                    </div>
                </Link>

                <NavigationLinks />
            </nav>
        </header>
    );
}