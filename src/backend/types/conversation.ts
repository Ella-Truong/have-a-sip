import { SipType } from "@generated/prisma";

export interface ConversationIdentity {
    cupName: string;
    sipType: SipType;
}