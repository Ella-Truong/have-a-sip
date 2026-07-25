export default function AboutPage() {
    return (
        <main className="relative overflow-hidden">

            {/* Background Decorations*/}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#F5E2EB]/40 blur-3xl" />

                <div className="absolute right-0 top-[35rem] h-96 w-96 rounded-full bg-[#DDEDD8]/50 blur-3xl" />

                <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F7E8D5]/40 blur-3xl" />

            </div>

            <div className="relative mx-auto max-w-6xl px-6 py-24">
                <div className="absolute -left-24 top-8 h-60 w-60 rounded-full bg-[#EEDBE5]/40 blur-3xl" />
                <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-[#DCEAD8]/40 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#F8E7D2]/50 blur-3xl" />
                <div className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]"></div>

                {/* Hero */}
                <div className="grid items-center gap-20 lg:grid-cols-[1.15fr_0.85fr]">

                    {/* Left */}

                    <section>

                        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#9C938D]">
                            Journal
                        </p>

                        <h1 className="font-serif text-5xl font-medium text-[#3F3A37]">
                            About Have a Sip
                        </h1>

                        <p className="mt-8 max-w-xl text-xl leading-9 text-[#7B726C]">
                            {`Software engineering moves quickly.
                            This little corner doesn't`}
                        </p>

                        <div className="my-12 flex items-center gap-4">

                            <div className="h-px w-20 bg-[#E8E0D9]" />

                            <span>☕</span>

                            <div className="h-px w-20 bg-[#E8E0D9]" />

                        </div>

                        <div className="space-y-8 text-lg leading-9 text-[#5B5551]">

                            <p>
                                <span className="font-serif text-2xl text-[#3F3A37]">
                                    Have a Sip
                                </span>{" "}
                                started as a habit of writing things
                                down before I forgot them.
                            </p>

                            <p>
                                Every solved bug, every architecture
                                decision, every project taught me
                                something worth remembering. Instead of
                                letting those moments disappear, I began
                                collecting them here.
                            </p>

                            <p>
                                Today, this blog is my engineering
                                journal—a place for backend development,
                                system design, debugging stories, and the
                                small lessons that make building software
                                meaningful.
                            </p>

                        </div>

                    </section>

                    {/* Right */}

                    <aside className="animate-fade-up">

                        <div className="relative overflow-hidden rounded-[2rem] p-10 backdrop-blur-md ring-1 ring-white/70 shadow-[0_20px_60px_rgba(70,55,45,0.06)]">
                            <div
                                className="absolute inset-0 z-0 bg-cover bg-center"
                                style={{backgroundImage: "url('/colorpattern.jpg')"}}
                            />

                            <div className="absolute inset-0 z-0 bg-[#FAF8F5]/50 backdrop-blur-[5px]"/>

                            <div className="relative z-10">
                                <p className="text-xs uppercase tracking-[0.35em] text-[#9C938D]">
                                    A Letter
                                </p>

                                <p className="mt-8 font-serif text-3xl italic leading-relaxed text-[#5E5752]">
                                    Welcome.
                                </p>

                                <div className="mt-8 space-y-6 leading-8 text-[#6D6661]">

                                    <p>
                                        {`If you're reading this,
                                        you're probably learning too.`}
                                    </p>

                                    <p>
                                        I hope these posts feel less like
                                        lectures and more like conversations
                                        over coffee—honest notes from someone
                                        who is still learning every day.
                                    </p>

                                    <p>
                                        {`Take what helps.
                                        Leave what doesn't.
                                        And enjoy your stay.`}
                                    </p>

                                </div>

                                <div className="mt-12 h-px bg-[#ECE4DD]" />

                                <p className="mt-8 text-right font-serif italic text-[#8A817B]">
                                    — Ella
                                </p>
                            </div>

                        </div>

                    </aside>

                </div>

                {/* Philosophy */}

                <section className="mx-auto mt-28 max-w-3xl text-center">
                     <div className="mb-12 flex items-center justify-center gap-5">

        <div className="h-px w-16 bg-[#E8E0D9]" />

        <span className="text-lg text-[#B8AEA6]">✦</span>

        <div className="h-px w-16 bg-[#E8E0D9]" />

    </div>

                    <h2 className="font-serif text-4xl font-medium text-[#3F3A37]">
                        {`Why "Have a Sip"?`}
                    </h2>

                    <p className="mt-10 text-lg leading-9 text-[#5B5551]">
                        {`Learning isn't about finishing everything at
                        once. It's about slowing down enough to enjoy
                        the process - one concept, one project, and one
                        conversation at a time.`}
                    </p>

                    <p className="mt-8 text-lg leading-9 text-[#5B5551]">
                        Every article here is one small sip of that
                        journey.
                    </p>

                </section>

                {/* Closing */}

                <section className="mt-28 text-center">

                    <div className="mx-auto mb-8 h-px w-24 bg-[#E8E0D9]" />

                    <p className="font-serif text-3xl italic leading-relaxed text-[#6C645F]">
                        Still learning.
                        <br />
                        Still building.
                        <br />
                        One sip at a time.
                    </p>

                </section>

            </div>

        </main>
    );
}