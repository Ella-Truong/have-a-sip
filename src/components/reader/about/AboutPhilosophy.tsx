import { parisienne } from "@/lib/fonts";

export default function AboutPhilosophy() {
    return (
        <section className="mx-auto max-w-3xl text-center">

            <div className="mb-12 flex items-center justify-center gap-5">
                <div className="h-px w-16 bg-[#E8E0D9]" />
                <span className="text-lg text-[#B8AEA6]">✦</span>
                <div className="h-px w-16 bg-[#E8E0D9]" />
            </div>

            <h2 className="font-serif text-4xl font-medium text-[#3F3A37]">
                Why
                <span className={`${parisienne.className} text-[#a67c52]`}>
                    {" "}Have a Sip?
                </span>
            </h2>

            <p className="mt-10 text-lg leading-9 text-[#5B5551]">
                {`Learning isn't about finishing everything at once.
                It's about slowing down enough to enjoy the process—
                one concept, one project, and one conversation at a time.`}
            </p>

            <p className="mt-8 text-lg leading-9 text-[#5B5551]">
                Every article here is one small sip of that journey.
            </p>

        </section>
    );
}