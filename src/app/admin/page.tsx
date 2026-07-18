import Link from "next/link";

export default function AdminDashboardPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F5] px-6 py-10">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-10">
                    <p className="mb-2 text-sm font-medium text-[#71866A]">
                        ☕ Have a Sip
                    </p>

                    <h1 className="text-3xl font-semibold text-[#3F3A37]">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-sm text-[#817873]">
                        Manage your writing and keep things organized.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="mb-10">
                    <h2 className="mb-4 text-sm font-medium text-[#817873]">
                        Quick Actions
                    </h2>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/admin/articles/new"
                            className="rounded-xl bg-[#B8C8B0] px-5 py-3 text-sm font-medium text-[#34402F] transition hover:bg-[#A8BCA0]"
                        >
                            + New Article
                        </Link>

                        <Link
                            href="/admin/topics"
                            className="rounded-xl border border-[#DDD5CE] bg-white px-5 py-3 text-sm font-medium text-[#4F4945] transition hover:bg-[#F4EFEA]"
                        >
                            Manage Topics
                        </Link>
                    </div>
                </div>

                {/* Management Cards */}
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Articles */}
                    <Link
                        href="/admin/articles"
                        className="group rounded-2xl border border-[#E7E0DA] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#C9D5C3] hover:shadow-sm"
                    >
                        <div className="mb-4 text-2xl">
                            📝
                        </div>

                        <h2 className="text-lg font-semibold text-[#3F3A37]">
                            Articles
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#817873]">
                            Create, edit, publish, and manage your articles.
                        </p>

                        <p className="mt-5 text-sm font-medium text-[#71866A]">
                            Manage articles →
                        </p>
                    </Link>

                    {/* Topics */}
                    <Link
                        href="/admin/topics"
                        className="group rounded-2xl border border-[#E7E0DA] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#C9D5C3] hover:shadow-sm"
                    >
                        <div className="mb-4 text-2xl">
                            🏷️
                        </div>

                        <h2 className="text-lg font-semibold text-[#3F3A37]">
                            Topics
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#817873]">
                            Organize your writing into simple topics.
                        </p>

                        <p className="mt-5 text-sm font-medium text-[#71866A]">
                            Manage topics →
                        </p>
                    </Link>
                </div>
            </div>
        </main>
    );
}