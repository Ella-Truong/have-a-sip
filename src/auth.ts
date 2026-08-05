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

  callbacks: {
    async jwt({ token, user }) {
      console.log("➡️ jwt callback");
      console.log("user:", user)
      return token;
    },

    async session({ session, token }) {
      console.log("➡️ session callback");
      console.log("token", token)
      return session;
    },
  },

  ...authConfig,
});
