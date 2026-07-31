import AboutLetter from "./AboutLetter";
import { parisienne } from "@/lib/fonts";

export default function AboutHero() {
    return (
        <div className="grid items-center gap-20 lg:grid-cols-[1.15fr_0.85fr]">
            <section>
                <p className="mb-5 text-xs uppercase tracking-[0.4em] text-[#9C938D]">
                    Journal
                </p>

                <h1 className="font-serif text-5xl font-medium leading-tight text-[#3F3A37]">
                    About{" "}
                    <span className={`${parisienne.className} text-5xl text-[#a67c52]`}>
                        Have a Sip
                    </span>
                </h1>

                <p className="mt-8 max-w-xl font-serif text-2xl italic leading-10 text-[#6E6560]">
                    {`"Software engineering moves quickly.`}
                    <br />
                    {`This little corner doesn't."`}
                </p>

                <div className="my-14 flex items-center gap-5">
                    <div className="h-px flex-1 bg-[#E8E0D9]" />
                    <span className="text-lg text-[#B69C7A]">✦</span>
                    <div className="h-px flex-1 bg-[#E8E0D9]" />
                </div>

                <div className="space-y-8 text-lg leading-9 text-[#5B5551]">
                    <p>
                        <span
                            className={`${parisienne.className} text-3xl text-[#a67c52]`}
                        >
                            Have a Sip{" "}
                        </span>{" "}
                        {`began as a quiet habit of writing down the lessons I
                        didn't want to forget.`}
                    </p>

                    <p>
                        Here, I share what I learn about backend engineering,
                        system design, debugging, and the small moments that
                        make building software meaningful.
                    </p>

                    <p>
                        {`This isn't a place for perfect answers. It's a journal
                        of curiosity, steady progress, and the joy of learning
                        one sip at a time.`}
                    </p>
                </div>
            </section>

            <AboutLetter />
        </div>
    );
}