"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, NotebookPen, Newspaper } from "lucide-react";

const links = [
    {
        href: "/",
        label: "Home",
        icon: House,
        activeClass: "bg-[#DCEAD8] text-[#4E4540]",
        hoverClass: "hover:bg-[#DCEAD8]",
    },
    {
        href: "/sips",
        label: "Sips",
        icon: NotebookPen,
        activeClass: "bg-[#F7E8D5] text-[#4E4540]",
        hoverClass: "hover:bg-[#F7E8D5]",
    },
    {
        href: "/about",
        label: "About",
        icon: Newspaper,
        activeClass: "bg-[#EEDBE5] text-[#4E4540]",
        hoverClass: "hover:bg-[#EEDBE5]",
    },
];

export default function NavigationLinks() {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-2 rounded-full bg-[#F5EEE8] p-2 shadow-sm">
            {links.map(
                ({ href, label, icon: Icon, activeClass, hoverClass }) => {
                    const isActive =
                        href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(href);

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow ${
                                isActive
                                    ? activeClass
                                    : `text-[#6E6560] ${hoverClass}`
                            }`}
                        >
                            <Icon className="h-4 w-4" strokeWidth={1.8} />
                            <span>{label}</span>
                        </Link>
                    );
                }
            )}
        </div>
    );
}