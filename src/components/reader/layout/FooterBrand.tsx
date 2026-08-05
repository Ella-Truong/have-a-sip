import { Coffee } from "lucide-react";
import { parisienne } from "@/lib/fonts";

export default function FooterBrand() {
    return (
        <div className="max-w-lg flex-1">
            <div className="mb-6 h-px w-20 bg-[#DDD2C8]" />

            <p className="mt-5 font-serif text-lg italic text-[#6E6560]">
                Every cup has a story. Every bug has a lesson.
            </p>

            <div className="mt-6 flex items-center gap-3">
                <Coffee
                    className="h-8 w-8 text-[#7B6653]"
                    strokeWidth={1.8}
                />

                <div>
                    <span
                        className={`${parisienne.className} block text-[2.1rem] leading-none text-[#3F3A37]`}
                    >
                        Have a Sip
                    </span>

                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.22em] text-[#9A908A]">
                        Slow Engineering Journal
                    </p>
                </div>
            </div>

            <p className="mt-6 leading-8 text-[#8F8781]">
                A quiet corner where I document what I learn about software
                engineering, backend development, and the small moments that
                make building enjoyable.
            </p>
        </div>
    );
}