import { Coffee } from "lucide-react";
import { parisienne } from "@/lib/fonts";

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

                    <h1 className="max-w-xl font-serif leading-[1.08] tracking-[-0.02em] text-[#3F3A37]">
                        <span className="text-2xl font-normal md:text-3xl">
                            One cup,
                        </span>

                        <br />

                        <span className="text-5xl font-normal md:text-6xl">
                            many ideas,
                        </span>

                        <br />

                        <span className="text-4xl font-normal md:text-5xl italic text-[#5f5752]">
                            endless learning.
                        </span>
                    </h1>

                    <p className="mt-8 max-w-lg leading-8 text-[#7F7772]">
                        A quiet corner where I collect lessons from backend
                        engineering, system design, debugging stories, and the
                        little discoveries that make building software worth
                        remembering.
                    </p>

                    <div className="my-10 flex items-center gap-3">
                        <div className="h-px w-8 bg-[#DDD2C8]" />
                        <Coffee className="h-3.5 w-3.5 text-[#C6BBB4]" strokeWidth={1.5} />
                        <div className="h-px w-8 bg-[#DDD2C8]" />
                    </div>

                    <p className="font-serif text-xl italic text-[#8A817B]">
                        “Every bug teaches something worth remembering.”
                    </p>
                </div>

                {/* Right */}
                <div className="flex justify-center">
                    <div className="relative flex h-[420px] items-center justify-center">
                        <span
                            className="absolute left-10 top-24 text-lg opacity-35 animate-sparkle"
                            style={{ animationDelay: "1.6s" }}
                        >
                            ✦
                        </span>

                        <span className="absolute right-8 top-16 text-lg opacity-45 animate-sparkle">
                            ✦
                        </span>

                        <span className="absolute bottom-10 left-12 text-lg opacity-40 animate-sway">
                            ❦
                        </span>

                        <div className="flex flex-col items-center">
                            <Coffee
                                className="h-16 w-16 text-[#7B6653] animate-sip"
                                strokeWidth={1.6}
                            />

                            <div className="my-8 h-px w-20 bg-[#DDD2C8]" />

                            <h2
                                className={`${parisienne.className} text-[2.7rem] leading-none text-[#3F3A37]`}
                            >
                                Have a Sip
                            </h2>

                            <div className="my-5 h-px w-12 bg-[#DDD2C8]" />

                            <p className="text-center font-serif text-base italic leading-8 text-[#8A817B]">
                                Thoughts on software.
                                <br />
                                Stories shared over coffee.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}