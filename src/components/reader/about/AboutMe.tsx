import Image from "next/image";
import { Coffee, CodeXml, Sprout } from "lucide-react";
import { parisienne } from "@/lib/fonts";

export default function AboutMe() {
    return (
        <section className="grid items-center gap-20 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Photo */}

            <div className="flex justify-center">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#F5E2EB]/40 blur-3xl" />

                    <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-[0_20px_60px_rgba(70,55,45,0.06)]">
                        <Image
                            src="/me.jpg" // Replace with your photo
                            alt="Ella Truong"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Content */}

            <div>
                <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#9C938D]">
                    About Me
                </p>

                <h2 className={`${parisienne.className} text-6xl font-medium tracking-wide text-[#3F3A37] md:text-7xl`}>
                    {`Hi, I'm Ella`}
                </h2>

                <p className="mt-8 text-lg leading-9 text-[#5B5551]">
                    {`I'm a computer science student who enjoys building thoughtful
                    software and learning through personal projects. I'm especially
                    interested in backend engineering, system design, and creating
                    applications that are both reliable and enjoyable to use.`}
                </p>

                <p className="mt-6 text-lg leading-9 text-[#5B5551]">
                    I created{" "}
                    <span className="font-serif text-[#3F3A37]">
                        Have a Sip
                    </span>{" "}
                    {`as a place to document my journey, share debugging stories,
                    and reflect on the lessons I discover along the way. It's less
                    about having all the answers, and more about learning one step
                    at a time.`}
                </p>

                {/* Tags */}

                <div className="mt-10 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-[#ECE4DD] bg-[#FAF8F5] px-4 py-2 text-sm text-[#6D6661]">
                        <Coffee size={16} strokeWidth={1.8} className="text-[#71866a]" />
                        <span>Coffee Lover</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-[#ECE4DD] bg-[#FAF8F5] px-4 py-2 text-sm text-[#6D6661]">
                        <CodeXml size={16} strokeWidth={1.8} className="text-[#71866a]"/>
                        <span>Full-Stack Engineering</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-[#ECE4DD] bg-[#FAF8F5] px-4 py-2 text-sm text-[#6D6661]">
                        <Sprout size={16} strokeWidth={1.8} className="text-[#71866a]"/>
                        <span>Always Learning</span>
                    </div>
                </div>
            </div>
        </section>
    );
}