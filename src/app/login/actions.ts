"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export type LoginState = {
    error: string | null;
};

export async function loginAction(
    prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/admin",
        });

        return {
            error: null,
        };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid email or password.",
                    };

                default:
                    return {
                        error: "Authentication failed. Please try again.",
                    };
            }
        }
        throw error;
    }
}