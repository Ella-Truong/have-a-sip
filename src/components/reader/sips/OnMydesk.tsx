import Link from "next/link";
import {
    Bot,
    Coffee,
    ExternalLink,
    Headphones,
} from "lucide-react";

import { parisienne } from "@/lib/fonts";

export default function OnMyDesk() {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-[#DDD2C7] bg-[#FBF8F2] p-7 shadow-[0_10px_28px_rgba(78,69,64,0.08)]">
            {/* Watermark */}
            <span
                className={`
                    ${parisienne.className}
                    pointer-events-none
                    absolute
                    right-4
                    top-2
                    -rotate-[10deg]
                    select-none
                    text-[5.5rem]
                    text-[#B89B84]/5
                `}
            >
                Notes
            </span>

            <h3 className="font-serif text-[1.6rem] text-[#433D39]">
                On My Desk
            </h3>

            <div className="mt-8 space-y-7">
                {/* Building */}
                <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5D8CA] bg-[#F7F1E8]">
                        <Coffee
                            size={18}
                            strokeWidth={1.8}
                            className="text-[#A67C52]"
                        />
                    </div>

                    <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#A39A94]">
                            Building
                        </p>
                        <h4 className="mt-1 font-serif text-[#433D39]">
                            Have a Sip
                        </h4>
                    </div>
                </div>

                <div className="border-t border-dashed border-[#DED3C8]" />

                {/* Learning */}
                <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5D8CA] bg-[#F7F1E8]">
                        <Bot
                            size={18}
                            strokeWidth={1.8}
                            className="text-[#71866A]"
                        />
                    </div>

                    <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#A39A94]">
                            Learning
                        </p>

                        <p className="mt-1 font-serif text-[#433D39]">
                            Building AI Agents
                        </p>
                    </div>
                </div>

                <div className="border-t border-dashed border-[#DED3C8]" />

                {/* Listening */}
                <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5D8CA] bg-[#F7F1E8]">
                        <Headphones
                            size={18}
                            strokeWidth={1.8}
                            className="text-[#7B6A55]"
                        />
                    </div>

                    <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#A39A94]">
                            Listening
                        </p>

                        <Link
                            href="https://www.youtube.com/watch?v=KhJEic2cBoc&list=PLM--7QGslfeY7tpTTwXsKHaSBFPYaQg2o&index=4"
                            target="_blank"
                            className="mt-1 inline-flex items-center gap-1 font-serif text-[#433D39] transition-colors hover:text-[#A67C52]"
                        >
                            Acquired
                            <ExternalLink size={13} />
                        </Link>
                    </div>
                </div>

            </div>

            {/* Vintage Stamp */}
            <div className="absolute bottom-5 right-6 rotate-[-10deg] text-center opacity-20">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#9C6D52]">
                    EST.
                </p>

                <p className="font-serif text-lg text-[#9C6D52]">
                    2026
                </p>
            </div>
        </section>
    );
}