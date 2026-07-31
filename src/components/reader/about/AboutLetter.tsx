import { parisienne } from "@/lib/fonts";

export default function AboutLetter() {
    return (
        <aside className="animate-fade-up flex justify-center">

            <div className="relative w-full max-w-[430px] overflow-hidden rounded-sm border border-[#E6DCCF] bg-[#FCFAF5] px-8 py-8 shadow-[0_16px_36px_rgba(72,58,48,0.08)]">

                {/* Handmade paper grain */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px,#A67C52 0.5px,transparent 0.5px)",
                        backgroundSize: "18px 18px",
                    }}
                />

                {/* Soft edge vignette */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_28px_rgba(166,124,82,0.04)]" />

                {/* Watermark */}
                <span
                    className={`
                        ${parisienne.className}
                        pointer-events-none
                        absolute
                        bottom-4
                        right-4
                        -rotate-[8deg]
                        text-[4.5rem]
                        text-[#A67C52]/5
                        select-none
                    `}
                >
                    Letter
                </span>

                <div className="relative">

                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#A59A91]">
                        A Letter
                    </p>

                    <div className="mt-3 h-px w-12 bg-[#DDD0C3]" />

                    <h2 className="mt-5 font-serif text-3xl italic text-[#49433F]">
                        Dear friend,
                    </h2>

                    <div className="mt-5 space-y-4 text-[16px] leading-8 text-[#5E5752]">

                        <p>
                            {`If you're here,
                            we're probably learning together.`}
                        </p>

                        <p>
                            I hope these pages feel less like tutorials
                            and more like quiet conversations over coffee.
                            Stay curious, and enjoy your sip.
                        </p>
                        <p>
                            Stay curious.
                            <br />
                            Enjoy your sip.
                        </p>

                    </div>
                    <div className="mt-8 text-right">
                        <p
                        className={`
                            ${parisienne.className}
                            text-4xl
                            text-[#8B6546]
                        `}
                    >
                        Ella
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-[#A59A91]">
                        HAVE A SIP
                    </p>
                    </div>
                </div>

            </div>

        </aside>
    );
}