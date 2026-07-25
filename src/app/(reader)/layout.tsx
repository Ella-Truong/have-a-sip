import Link from "next/link";

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
                    style={{ backgroundImage: "url('/colorpattern.jpg')" }}
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
                    style={{backgroundImage: "url('/colorpattern.jpg')"}}
                />

                <div className="absolute inset-0 z-0 bg-[#FAF8F5]/50 backdrop-blur-[5px]"/>

                {/* Optional gradient */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/30 via-transparent to-white/20" />

                <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-6 py-12">
                    <div className="h-px w-20 bg-[#DDD2C8]" />

                    <p className="font-serif text-lg italic text-[#6E6560]">
                        Every cup has a story. Every bug has a lesson
                    </p>

                    <h2 className="font-serif text-2xl font-semibold">
                        Have a Sip ☕
                    </h2>

                    <p className="max-w-lg text-center text-sm leading-7 text-[#8F8781]">
                        A quiet corner where I document what I learn about
                        software engineering, backend development, and the
                        small moments that make building enjoyable.
                    </p>

                    <p className="text-xs tracking-[0.25em] text-[#B0A7A1] uppercase">
                        Learning • Building • Sharing
                    </p>

                </div>
            </footer>

        </div>
    );
}