export default function AboutLetter() {
    return (
        <aside className="animate-fade-up">

            <div className="relative overflow-hidden rounded-[2rem] p-10 backdrop-blur-md ring-1 ring-white/70 shadow-[0_20px_60px_rgba(70,55,45,0.06)]">

                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/coffeebean.jpg')",
                    }}
                />

                <div className="absolute inset-0 z-0 bg-[#FAF8F5]/50 backdrop-blur-[5px]" />

                <div className="relative z-10">

                    <p className="text-xs uppercase tracking-[0.35em] text-[#9C938D]">
                        A Letter
                    </p>

                    <p className="mt-8 font-serif text-3xl italic leading-relaxed text-[#5E5752]">
                        Welcome.
                    </p>

                    <div className="mt-8 space-y-6 leading-8 text-[#6D6661]">

                        <p>
                            {`If you're reading this, you're probably learning too.`}
                        </p>

                        <p>
                            I hope these posts feel less like lectures and more like
                            conversations over coffee—honest notes from someone who is
                            still learning every day.
                        </p>

                        <p>
                            Take what helps.
                            <br />
                            {`Leave what doesn't.`}
                            <br />
                            And enjoy your stay.
                        </p>

                    </div>

                    <div className="mt-12 h-px bg-[#ECE4DD]" />

                    <p className="mt-8 text-right font-serif italic text-[#8A817B]">
                        — Ella
                    </p>

                </div>

            </div>

        </aside>
    );
}