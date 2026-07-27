import { SipType } from "@generated/prisma";

export interface SipOption {
    type: SipType;
    emoji: string;
    label: string;
}

export const SIP_OPTIONS: SipOption[] = [
    { type: SipType.ESPRESSO, emoji: "☕", label: "Espresso" },
    { type: SipType.AMERICANO, emoji: "🥤", label: "Americano" },
    { type: SipType.LATTE, emoji: "🥛", label: "Latte" },
    { type: SipType.CAPPUCCINO, emoji: "☕", label: "Cappuccino" },
    { type: SipType.MATCHA, emoji: "🍵", label: "Matcha" },
    { type: SipType.HOT_CHOCOLATE, emoji: "🍫", label: "Hot Chocolate" },
    { type: SipType.LEMONADE, emoji: "🍋", label: "Lemonade" },
    { type: SipType.JASMINE_TEA, emoji: "🫖", label: "Jasmine Tea" },
    { type: SipType.CROISSANT, emoji: "🥐", label: "Croissant" },
    { type: SipType.BAGEL, emoji: "🥯", label: "Bagel" },
    { type: SipType.MUFFIN, emoji: "🧁", label: "Muffin" },
    { type: SipType.DONUT, emoji: "🍩", label: "Donut" },
];