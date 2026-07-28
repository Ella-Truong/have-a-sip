import Link from "next/link";
import {
    ArrowRight,
    FileText,
    Leaf,
    NotebookPen,
    Plus,
    Tags,
    Coffee,
} from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <main className="min-h-screen bg-[#F8F4EF] px-6 py-12">
            <div className="mx-auto max-w-5xl">

                {/* Brand */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[#71866A] transition hover:text-[#5F7455]"
                >
                    <Coffee size={18} strokeWidth={1.8} />

                    <span className="font-medium tracking-wide">
                        Have a Sip
                    </span>
                </Link>

                {/* Header */}

                <header className="mt-8 mb-14 relative">

                    <div className="absolute -right-6 -top-8 opacity-10 hidden md:block">
                        <Leaf
                            size={120}
                            className="text-[#71866A]"
                        />
                    </div>

                    <div className="flex items-center gap-5">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EADCCF] shadow-sm">
                            <NotebookPen
                                size={30}
                                className="text-[#7A5A45]"
                                strokeWidth={1.75}
                            />
                        </div>

                        <div>

                            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#71866A]">
                                <Leaf size={12} />
                                Writing Space
                            </p>

                            <h1 className="mt-1 font-serif text-5xl text-[#4D3C35]">
                                Writing Desk
                            </h1>

                        </div>

                    </div>

                    <div className="mt-6 flex gap-3">
                        <div className="h-px w-16 bg-[#D7C7B9]" />
                        <div className="h-px w-12 bg-[#C8D8C1]" />
                    </div>

                    <p className="mt-5 max-w-xl text-sm italic leading-7 text-[#80756D]">
                        A quiet place to brew ideas, polish stories,
                        and share thoughtful moments with your readers.
                    </p>

                </header>

                {/* Quick Actions */}

                <section className="mb-14">

                    <div className="mb-5 flex items-center gap-2">
                        <div className="h-px w-8 bg-[#C8D8C1]" />

                        <p className="text-xs uppercase tracking-[0.3em] text-[#71866A]">
                            Quick Actions
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">

                        <Link
                            href="/admin/articles/new"
                            className="inline-flex items-center gap-2 rounded-full bg-[#B8C8B0] px-6 py-3 text-sm font-medium text-[#34402F] transition hover:bg-[#A8BAA0]"
                        >
                            <Plus size={16} />
                            New Article
                        </Link>

                        <Link
                            href="/admin/topics"
                            className="inline-flex items-center gap-2 rounded-full border border-[#E3D6CA] bg-[#FCF8F4] px-6 py-3 text-sm font-medium text-[#7A5A45] transition hover:bg-[#F4EEE8]"
                        >
                            <Tags size={16} />
                            Manage Topics
                        </Link>

                    </div>

                </section>

                {/* Collections */}

                <section>

                    <div className="mb-5 flex items-center gap-2">
                        <div className="h-px w-8 bg-[#D7C7B9]" />

                        <p className="text-xs uppercase tracking-[0.3em] text-[#7A5A45]">
                            Collections
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Articles */}

                        <Link
                            href="/admin/articles"
                            className="group rounded-3xl border border-[#ECE3DB] bg-[#FFFDFB] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D7C7B9] hover:shadow-lg"
                        >

                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E5D9]">
                                <FileText
                                    size={26}
                                    className="text-[#7A5A45]"
                                />
                            </div>

                            <h2 className="font-serif text-2xl text-[#4D3C35]">
                                Articles
                            </h2>

                            <p className="mt-4 leading-7 text-[#80756D]">
                                Draft, edit, and publish stories that feel
                                like conversations over coffee.
                            </p>

                            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#7A5A45]">
                                Open Collection

                                <ArrowRight
                                    size={16}
                                    className="transition group-hover:translate-x-1"
                                />
                            </div>

                        </Link>

                        {/* Topics */}

                        <Link
                            href="/admin/topics"
                            className="group rounded-3xl border border-[#ECE3DB] bg-[#FFFDFB] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C5D7BF] hover:shadow-lg"
                        >

                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF2E7]">
                                <Tags
                                    size={26}
                                    className="text-[#71866A]"
                                />
                            </div>

                            <h2 className="font-serif text-2xl text-[#4D3C35]">
                                Topics
                            </h2>

                            <p className="mt-4 leading-7 text-[#80756D]">
                                Organize your thoughts into collections that
                                help readers explore your writing.
                            </p>

                            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#71866A]">
                                View Topics

                                <ArrowRight
                                    size={16}
                                    className="transition group-hover:translate-x-1"
                                />
                            </div>

                        </Link>

                    </div>

                </section>

            </div>
        </main>
    );
}