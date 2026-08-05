/**
 * HOW DO WE VERIFY A USER? (ADMIN)
 */

//import configuration type
import type { NextAuthConfig } from "next-auth";

/*This tell Auth.js that users will log in using email and password
*Auth.js supports many providers, like GitHub, Google, Facebook, ...
*This blog choose Credentials because only admin will log in
*/
import Credentials from "next-auth/providers/credentials";

// This is used to hash password
import bcrypt from "bcrypt";

//Authentication needs to talk to the database
import { prisma } from "./lib/prisma";

// authConfig object contains all authentication rules
export const authConfig = {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials){
                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials")
                    return null;
                }
            
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    }
                });

                if (!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!passwordMatch){
                    return null;
                }
                
                console.log("Authentication successful")
                //when Auth.js knows who logged in
                //never return password
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
            },
        }),
    ],
} satisfies NextAuthConfig;   //check if the returned object matches NextAuthConfig type
