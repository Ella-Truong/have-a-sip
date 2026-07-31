import { Coffee } from "lucide-react";

export default function SipsHero() {
    return (
        <section className="relative mb-24 overflow-hidden">
            {/* Watermark */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -top-8
                    left-0
                    hidden
                    select-none
                    font-serif
                    text-[9rem]
                    font-semibold
                    tracking-[0.28em]
                    text-[#8F7B69]/[0.035]
                    lg:block
                "
            >
                SIPS
            </div>

            <div className="relative max-w-3xl">
                {/* Eyebrow */}
                <div className="flex items-center gap-3">
                    <div className="h-px w-10 bg-[#DDD2C8]" />

                    <p className="text-[11px] uppercase tracking-[0.45em] text-[#978D86]">
                        HAVE A SIP
                    </p>
                </div>

                {/* Title */}
                <h1 className="mt-6 font-serif text-6xl leading-none tracking-[-0.04em] text-[#3F3A37]">
                    Sips
                </h1>

                {/* Subtitle */}
                <p className="mt-8 max-w-xl text-lg leading-8 text-[#7D746E]">
                    Small engineering notes collected between
                    debugging sessions, design decisions,
                    and moments of curiosity.
                </p>

                {/* Divider */}
                <div className="mt-12 flex items-center gap-4">
                    <Coffee
                        className="h-4 w-4 text-[#B9ADA4]"
                        strokeWidth={1.5}
                    />

                    <div className="h-px w-24 bg-[#DDD2C8]" />
                </div>
            </div>
        </section>
    );
}