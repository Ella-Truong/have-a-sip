import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";

const socialLinks = [
    {
        href: "https://github.com/Ella-Truong",
        icon: FaGithub,
        label: "GitHub",
        external: true,
    },
    {
        href: "https://www.linkedin.com/in/ellatruong/",
        icon: FaLinkedin,
        label: "LinkedIn",
        external: true,
    },
    {
        href: "mailto:ellatruong95@gmail.com",
        icon: FaEnvelope,
        label: "Email",
        external: false,
    },
];

export default function FooterSocial() {
    return (
        <div className="w-full md:w-64">
            <p className="text-xs uppercase tracking-[0.35em] text-[#A39B95]">
                Find Me
            </p>

            <div className="mt-6 space-y-4">
                {socialLinks.map(
                    ({ href, icon: Icon, label, external }) => (
                        <a
                            key={label}
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={
                                external
                                    ? "noopener noreferrer"
                                    : undefined
                            }
                            aria-label={label}
                            className="flex items-center gap-3 text-[#6D6661] transition hover:translate-x-1 hover:text-[#3F3A37]"
                        >
                            <Icon className="h-5 w-5" />
                        </a>
                    )
                )}
            </div>
        </div>
    );
}