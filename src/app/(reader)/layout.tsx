import Link from "next/link";
import {FaGithub, FaLinkedin, FaEnvelope} from "react-icons/fa6";

export default function ReaderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-[#4E4540]">

            {/* ========================= */}
            {/* Navigation */}
            {/* ========================= */}
            <header className="sticky top-0 z-50 border-b border-[#ECE4DD] bg-[#FAF8F5]/85 backdrop-blur-md">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/coffeebean.jpg')" }}
                />

                {/* Blur + White Overlay */}
                <div className="absolute inset-0 z-0 bg-[#FAF8F5]/55 backdrop-blur-[5px]" />

                {/* Optional gradient */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/10 via-transparent to-white/10" />

                <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 transition-opacity hover:opacity-90"
                    >
                        <div className="text-4xl">
                            ☕
                        </div>

                        <div>
                            <h1 className="font-serif text-2xl font-semibold tracking-tight">
                                Have a Sip
                            </h1>

                            <p className="text-xs text-[#9A908A]">
                                slow engineering journal
                            </p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-2 rounded-full bg-[#F5EEE8] p-2 shadow-sm">

                        <Link
                            href="/"
                            className="rounded-full bg-[#DCEAD8] px-5 py-2 text-sm font-medium text-[#4E4540] transition-all duration-200 hover:-translate-y-0.5 hover:shadow"
                        >
                            🏠 Home
                        </Link>

                        <Link
                            href="/sips"
                            className="rounded-full px-5 py-2 text-sm font-medium text-[#6E6560] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F7E8D5] hover:shadow"
                        >
                            ☕ Sips
                        </Link>

                        <Link
                            href="/about"
                            className="rounded-full px-5 py-2 text-sm font-medium text-[#6E6560] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EEDBE5] hover:shadow"
                        >
                            🌿 About
                        </Link>

                    </div>
                </nav>
            </header>

            {/* ========================= */}
            {/* Main Content */}
            {/* ========================= */}
            <main className="relative flex-1 overflow-hidden animate-page-fade">
                {children}
            </main>

            {/* ========================= */}
            {/* Footer */}
            {/* ========================= */}
            <footer className="relative overflow-hidden border-t border-[#ECE4DD] bg-[#FCFBF9]">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{backgroundImage: "url('/coffeebean.jpg')"}}
                />

                <div className="absolute inset-0 z-0 bg-[#FAF8F5]/50 backdrop-blur-[5px]"/>

                {/* Optional gradient */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/30 via-transparent to-white/20" />

                <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-12 md:flex-row md:items-start md:justify-between">
                    {/* Left side */}
                    <div className="max-w-lg flex-1">
                        <div className="mb-6 h-px w-20 bg-[#DDD2C8]"/>

                            <p className="mt-5 font-serif text-lg italic text-[#6E6560]">
                                Every cup has a story. Every bug has a lesson
                            </p>

                            <h2 className="font-serif text-3xl font-semibold text-[#3F3A37]">
                                Have a Sip ☕
                            </h2>

                            <p className="mt-5 leading-8 text-[#8F8781]">
                                A quiet corner where I document what I learn about
                                software engineering, backend development, and the
                                small moments that make building enjoyable.
                            </p>

                    </div>

                    {/* Right side */}
                    <div className="w-full md:w-64">
                        <p className="text-xs uppercase tracking-[0.35em] text-[#A39B95]">
                            Find Me
                        </p>
                        <div className="mt-6 space-y-4">
                            <a 
                                href="https://github.com/Ella-Truong"
                                target="_blank"
                                className="flex items-center gap-3 text-[#6D6661] transition hover:translate-x-1 hover:text-[#3F3A37]"
                            >
                                <FaGithub className="h-5 w-5"/>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/ellatruong/"
                                target="_blank"
                                className="flex items-center gap-3 text-[#6D6661] transition hover:translate-x-1 hover:text-[#3F3A37]"
                            >
                                <FaLinkedin className="h-5 w-5"/>
                            </a>

                            <a
                                href="mailto:ellatruong95@gmail.com"
                                className="flex items-center gap-3 text-[#6D6661] transition hover:translate-x-1 hover:text-[#3F3A37]"
                            >
                                <FaEnvelope className="h-5 w-5"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 border-t border-[#ECE4DD]/70">
                    <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-[#9C938D] md:flex-row md:items-center md:justify-between">

                        <p>© 2026 Have a Sip. Crafted with coffee and curiosity.</p>

                        <p>Learning • Building • Sharing</p>

                    </div>
                </div>
            </footer>

        </div>
    );
}