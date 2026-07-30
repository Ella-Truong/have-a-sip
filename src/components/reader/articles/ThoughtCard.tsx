import { Coffee } from "lucide-react";

const THOUGHTS = [
    "The best engineers aren't the ones who never fail, but the ones who never stop learning.",
    "A bug is often a lesson waiting to be understood.",
    "Simple systems age better than clever ones.",
    "Every feature begins with a thoughtful question.",
    "Write code as if you're writing for your future self.",
    "Progress comes from consistency, not intensity.",
    "Software is built one thoughtful commit at a time.",
    "Good code is read more often than it is written.",
    "The smallest refactor today prevents the biggest headache tomorrow.",
    "Curiosity is one of the most valuable engineering tools.",
];

export default function ThoughtCard() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(
        (today.getTime() - startOfYear.getTime()) / millisecondsPerDay
    );

    const thought = THOUGHTS[dayOfYear % THOUGHTS.length];

    return (
        <div className="rounded-3xl border border-[#ECE4DD] bg-[#FFFDFB] p-8">
            <div className="flex items-center gap-2">
                <Coffee
                    className="h-4 w-4 text-[#7B6653]"
                    strokeWidth={1.8}
                />

                <p className="text-xs uppercase tracking-[0.3em] text-[#A09892]">
                    {`Today's Thought`}
                </p>
            </div>

            <blockquote className="mt-5 font-serif text-2xl italic leading-10 text-[#6F6660]">
                “...{thought}...”
            </blockquote>

            <p className="mt-6 text-right text-sm text-[#A09892]">
                — Have a Sip
            </p>
        </div>
    );
}