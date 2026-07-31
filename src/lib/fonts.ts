import { Cormorant_Garamond } from "next/font/google";
import { Parisienne } from "next/font/google";

export const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["normal", "italic"],
});

export const parisienne = Parisienne({
    subsets: ["latin"],
    weight: "400",
});