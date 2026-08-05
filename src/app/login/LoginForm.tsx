"use client";

import { useActionState } from "react";
import { Coffee } from "lucide-react";

import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {
    error: null,
};

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(
        loginAction,
        initialState
    );

    return (
        <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="mb-3 flex justify-center">
                    <Coffee
                        className="h-10 w-10 text-[#7B6653]"
                        strokeWidth={1.7}
                    />
                </div>

                <h1 className="text-3xl font-semibold text-[#3F3A37]">
                    Welcome back
                </h1>

                <p className="mt-2 text-sm text-[#817873]">
                    Sign in to manage Have a Sip.
                </p>
            </div>

            {/* Login Card */}
            <form
                action={formAction}
                className="space-y-5 rounded-2xl border border-[#E7E0DA] bg-white p-8 shadow-sm"
            >
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-[#4F4945]"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-[#DDD5CE] bg-[#FCFBF9] px-4 py-3 text-[#3F3A37] outline-none transition placeholder:text-[#B5ACA5] focus:border-[#A8BCA0] focus:ring-2 focus:ring-[#E4EFE0]"
                    />
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-[#4F4945]"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-[#DDD5CE] bg-[#FCFBF9] px-4 py-3 text-[#3F3A37] outline-none transition placeholder:text-[#B5ACA5] focus:border-[#A8BCA0] focus:ring-2 focus:ring-[#E4EFE0]"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-xl bg-[#B8C8B0] px-5 py-3 text-sm font-medium text-[#34402F] transition hover:bg-[#A8BCA0] focus:outline-none focus:ring-2 focus:ring-[#DDE8D8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? "Signing In..." : "Sign In"}
                </button>
            </form>

            {/* Footer / Authentication Message */}
            <div className="mt-6 text-center">
                {state.error ? (
                    <p className="text-sm font-medium text-[#B06A7A]">
                        {state.error}
                    </p>
                ) : (
                    <p className="text-xs text-[#a09892]">
                        A quiet corner for writing and learning.
                    </p>
                )}
            </div>
        </div>
    );
}