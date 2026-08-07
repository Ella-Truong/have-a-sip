import { LogOut } from "lucide-react";
import { signOut } from "@/auth";

export default function LogoutButton() {
    return (
        <form
            action={async () => {
                "use server";

                await signOut({
                    redirectTo: "/",
                });
            }}
        >
            <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-[#E3D6CA] bg-[#FCF8F4] px-4 py-2 text-sm font-medium text-[#7A5A45] transition hover:bg-[#F4EEE8] hover:text-[#5F4637]"
            >
                <LogOut size={16} strokeWidth={1.8} />
                Logout
            </button>
        </form>
    );
}