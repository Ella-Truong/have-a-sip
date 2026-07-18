"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTopicForm() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("/api/admin/topics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create topic");
            }

            setName("");

            router.refresh();
        } catch (error) {
            console.error(error);
            setError("Failed to create topic.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 rounded-2xl border border-[#E7E0DA] bg-white p-6"
        >
            <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#4F4945]"
            >
                New Topic
            </label>

            <div className="flex gap-3">
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    required
                    placeholder="Backend Engineering"
                    className="flex-1 rounded-xl border border-[#DDD5CE] bg-[#FCFBF9] px-4 py-3 text-[#3F3A37] outline-none focus:border-[#A8BCA0] focus:ring-2 focus:ring-[#E4EFE0]"
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-[#B8C8B0] px-5 py-3 text-sm font-medium text-[#34402F] transition hover:bg-[#A8BCA0] disabled:opacity-60"
                >
                    {isSubmitting
                        ? "Adding..."
                        : "Add Topic"}
                </button>
            </div>

            {error && (
                <p className="mt-3 text-sm text-[#A65F58]">
                    {error}
                </p>
            )}
        </form>
    );
}