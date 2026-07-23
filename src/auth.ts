/**
 * CREATE AND EXPORT THE AUTHENTICATION SYSTEM
 */

//import the engine factory
import NextAuth from "next-auth";

//import database adapter
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

//import rules
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    ...authConfig
})
