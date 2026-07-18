import { signIn } from "@/auth";

export default function LoginPage() {
    async function login(formData: FormData) {
        "use server";

        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/admin",
        });
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mb-3 text-3xl">
                        ☕
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
                    action={login}
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
                        className="w-full rounded-xl bg-[#B8C8B0] px-5 py-3 text-sm font-medium text-[#34402F] transition hover:bg-[#A8BCA0] focus:outline-none focus:ring-2 focus:ring-[#DDE8D8]"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-[#A09892]">
                    A quiet corner for writing and learning.
                </p>
            </div>
        </main>
    );
}