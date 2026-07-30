export default function HeroSection() {
    return (
        <section className="relative mb-28 overflow-hidden rounded-[36px] border border-[#ECE4DD] bg-gradient-to-br from-[#FFFDFB] via-[#FCF8F3] to-[#FAF6F2] px-8 py-20 md:px-16 animate-fade-up">
            {/* Watercolor blobs */}
            <div className="absolute -left-24 top-8 h-60 w-60 rounded-full bg-[#EEDBE5]/50 blur-xl" />
            <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-[#DCEAD8]/40 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#F8E7D2]/50 blur-3xl" />

            <div className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Left */}
                <div>
                    <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#A09892]">
                        Slow Engineering Journal
                    </p>

                    <h1 className="max-w-xl font-serif text-4xl font-medium leading-[1.18] text-[#3F3A37] md:text-5xl">
                        One cup,
                        <br />
                        many ideas,
                        <br />
                        endless learning.
                    </h1>

                    <p className="mt-8 max-w-lg leading-8 text-[#7F7772]">
                        A quiet corner where I write about backend engineering,
                        architecture, debugging stories, and the little
                        discoveries collected one cup of coffee at a time.
                    </p>

                    <div className="my-10 flex items-center gap-4">
                        <div className="h-px w-12 bg-[#DDD2C8]" />
                        <span className="text-[#C6BBB4]">✦</span>
                        <div className="h-px w-12 bg-[#DDD2C8]" />
                    </div>

                    <p className="font-serif text-xl italic text-[#8A817B]">
                        {"Every bug teaches something worth remembering"}
                    </p>
                </div>

                {/* Right */}
                <div className="flex justify-center">
                    <div className="relative flex h-[420px] items-center justify-center">
                        <span
                            className="absolute left-10 top-24 text-lg opacity-35 animate-sparkle"
                            style={{ animationDelay: "1.6s" }}
                        >
                            ✨
                        </span>

                        <span className="absolute right-8 top-16 text-2xl opacity-50 animate-sparkle">
                            ✨
                        </span>

                        <span className="absolute bottom-10 left-12 text-2xl opacity-60 animate-sway">
                            🍃
                        </span>

                        <div className="flex flex-col items-center">
                            <div className="text-7xl">☕</div>

                            <div className="my-8 h-px w-20 bg-[#DDD2C8]" />

                            <h2 className="font-serif text-2xl text-[#3F3A37]">
                                Have a Sip
                            </h2>

                            <p className="mt-3 text-center text-sm leading-7 text-[#8A817B]">
                                Learning slowly.
                                <br />
                                Building intentionally.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}