import { signIn } from "@/auth";

export default function LoginPage() {
    async function login(formData: FormData){
        "use server";

        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/admin",
        });
    }

    return (
        <main className="max-w-md mx-auto mt-20">
            <h1 className="text-2xl font-bold mb-6">
                Admin Login
            </h1>

            <form action={login} className="space-y-4">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Sign In
                </button>
            </form>
        </main>
    )
}