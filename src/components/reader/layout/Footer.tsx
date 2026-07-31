import FooterBrand from "./FooterBrand";
import FooterSocial from "./FooterSocial";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-[#ECE4DD] bg-[#FCFBF9]">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/coffeebean.jpg')" }}
            />

            <div className="absolute inset-0 z-0 bg-[#FAF8F5]/50 backdrop-blur-[5px]" />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/30 via-transparent to-white/20" />
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-12 md:flex-row md:items-start md:justify-between">
                <FooterBrand />
                <FooterSocial />
            </div>

            <div className="relative z-10 border-t border-[#ECE4DD]/70">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-[#9C938D] tracking-[0.15em] md:flex-row md:items-center md:justify-between">
                    <p>
                        © 2026 Have a Sip. Crafted with coffee and curiosity.
                    </p>

                    <p>Learning • Building • Sharing</p>
                </div>
            </div>
        </footer>
    );
}