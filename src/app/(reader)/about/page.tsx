export default function AboutPage() {
    return (
        <main>
            <div className="mx-auto max-w-3xl px-6 py-16">

                {/* Header */}
                <section className="mb-12">
                    <p className="mb-3 text-sm font-medium text-[#71866A]">
                        ☕ About
                    </p>

                    <h1 className="text-4xl font-semibold text-[#3F3A37]">
                        About Have a Sip
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-[#817873]">
                        A small corner of the internet where I
                        write down what I&apos;m learning while
                        building things.
                    </p>
                </section>

                {/* Content */}
                <div className="space-y-6 rounded-2xl border border-[#E7E0DA] bg-white p-8 leading-8 text-[#4F4945]">
                    <p>
                        Have a Sip is my personal learning journal
                        and engineering blog.
                    </p>

                    <p>
                        I write about backend engineering,
                        debugging, system design, projects, and
                        the small lessons I pick up along the way.
                    </p>

                    <p>
                        Some posts are technical. Some are
                        reflections. Some are simply things I
                        want my future self to remember.
                    </p>

                    <p>
                        The idea is simple: learn something,
                        build something, then sit down with a
                        drink and write about it. ☕
                    </p>
                </div>

                {/* Small Note */}
                <div className="mt-10 rounded-2xl bg-[#EEF3EB] p-6">
                    <p className="text-sm leading-6 text-[#52634D]">
                        Still learning. Still building.
                        Probably debugging something right now.
                    </p>
                </div>

            </div>
        </main>
    );
}