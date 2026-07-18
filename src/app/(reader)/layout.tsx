import Link from "next/link";

export default function ReaderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-[#3F3A37]">

            {/* Navbar */}
            <header className="border-b border-[#E7E0DA] bg-[#FAF8F5]">
                <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-lg font-semibold tracking-tight text-[#3F3A37]"
                    >
                        Have a Sip ☕
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-sm text-[#817873] transition hover:text-[#52634D]"
                        >
                            Home
                        </Link>

                        <Link
                            href="/sips"
                            className="text-sm text-[#817873] transition hover:text-[#52634D]"
                        >
                            Sips
                        </Link>

                        <Link
                            href="/about"
                            className="text-sm text-[#817873] transition hover:text-[#52634D]"
                        >
                            About
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Page Content */}
            <div className="flex-1">
                {children}
            </div>

            {/* Footer */}
            <footer className="border-t border-[#E7E0DA]">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
                    <p className="text-sm text-[#9A918B]">
                        Have a Sip ☕
                    </p>

                    <p className="text-xs text-[#A09892]">
                        Learning, building, and writing along the way.
                    </p>
                </div>
            </footer>

        </div>
    );
}