import { Coffee } from "lucide-react";

export default function SipsHero() {
    return (
        <section className="mb-16">

            <p className="text-[11px] uppercase tracking-[0.35em] text-[#8F8782]">
                Have a Sip
            </p>

            <h1 className="mt-3 font-serif text-5xl font-normal tracking-[-0.02em] text-[#3F3A37]">
                Sips
            </h1>

            <p className="mt-6 max-w-xl leading-8 text-[#817873]">
                Small notes from things I learn,
                build, debug, and occasionally
                overthink.
            </p>

            <div className="mt-10 flex items-center gap-3">
                <div className="h-px w-8 bg-[#DDD2C8]" />

                <Coffee
                    className="h-3.5 w-3.5 text-[#C6BBB4]"
                    strokeWidth={1.5}
                />

                <div className="h-px w-8 bg-[#DDD2C8]" />
            </div>

        </section>
    );
}