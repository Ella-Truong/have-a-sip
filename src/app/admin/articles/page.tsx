import Link from "next/link";
import { ArticleService } from "@/backend/services/article.service";
import DeleteArticleButton from "@/components/admin/articles/DeleteArticleButton";
import { FileText, Leaf, PenLine } from "lucide-react";

const articleService = new ArticleService();

export default async function AdminArticlesPage() {
    const articles = await articleService.getAdminArticles();

    return (
        <main className="relative min-h-screen overflow-hidden px-6 py-12">
            {/* Background */}

            <div
                className="absolute inset-0 scale-105 bg-cover bg-center blur-sm"
                style={{
                    backgroundImage: "url('/coffeebean.jpg')",
                }}
            />

            <div className="absolute inset-0 bg-white/60" />

            <div className="relative mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="rounded-full bg-[#E8D8CA] p-4 shadow-lg">
                        <FileText
                            size={30}
                            className="text-[#7A5A45]"
                            strokeWidth={2}
                        />
                    </div>

                    <h1 className="mt-5 font-serif text-4xl text-[#4E4038]">
                        Articles
                    </h1>

                    <p className="mt-3 max-w-md text-sm italic leading-7 text-[#80756D]">
                        A collection of thoughts, carefully written,
                        revised, and shared.
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        <div className="h-px w-12 bg-[#D9C8BA]" />
                        <Leaf
                            size={14}
                            className="text-[#71866A]"
                        />
                        <div className="h-px w-12 bg-[#C8D8C1]" />
                    </div>
                </div>

                {/* Paper */}
                <div className="overflow-hidden rounded-3xl border border-[#E9E0D8] bg-white/85 shadow-xl backdrop-blur-md">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between border-b border-[#ECE3DB] bg-[#FBF8F5] p-8">
                        <div>
                            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#71866A]">

                                <Leaf size={12} />

                                Writing Collection

                            </p>

                            <p className="mt-2 font-serif text-2xl text-[#4E4038]">
                                {articles.length} Article{articles.length !== 1 && "s"}
                            </p>
                        </div>

                        <Link
                            href="/admin/articles/new"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-[#B8C8B0]
                                px-6
                                py-3
                                text-sm
                                font-medium
                                text-[#34402F]
                                transition
                                hover:bg-[#A8BAA0]
                            "
                        >
                            <PenLine size={16} />
                            New Article
                        </Link>
                    </div>

                    {articles.length > 0 ? (
                        <table className="w-full">
                            <thead className="bg-[#FCF9F6]">
                                <tr>
                                    <th className="px-8 py-5 text-left font-serif text-sm tracking-wide text-[#7A5A45]">
                                        Title
                                    </th>

                                    <th className="px-8 py-5 text-left font-serif text-sm tracking-wide text-[#7A5A45]">
                                        Status
                                    </th>

                                    <th className="px-8 py-5 text-left font-serif text-sm tracking-wide text-[#7A5A45]">
                                        Updated
                                    </th>

                                    <th className="px-8 py-5 text-right font-serif text-sm tracking-wide text-[#7A5A45]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#F1EBE5]">
                                {articles.map((article) => (

                                    <tr
                                        key={article.id}
                                        className="transition hover:bg-[#FBF9F6]"
                                    >

                                        {/* Title */}
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4ECE4]">
                                                    <FileText
                                                        size={16}
                                                        className="text-[#7A5A45]"
                                                    />
                                                </div>

                                                <span className="font-medium text-[#4E4038]">
                                                    {article.title}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-8 py-6">
                                            {article.published ? (
                                                <span className="rounded-full bg-[#EEF5EC] px-3 py-1 text-xs font-medium text-[#5F7455]">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-[#F5ECE4] px-3 py-1 text-xs font-medium text-[#8A654F]">
                                                    Draft
                                                </span>
                                            )}
                                        </td>

                                        {/* Updated */}
                                        <td className="px-8 py-6 text-sm text-[#817873]">
                                            {new Date(
                                                article.updatedAt
                                            ).toLocaleDateString()}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-8 py-6">
                                            <div className="flex justify-end items-center gap-5">
                                                <Link
                                                    href={`/admin/articles/${article.id}/edit`}
                                                    className="
                                                        text-sm
                                                        font-medium
                                                        text-[#71866A]
                                                        transition
                                                        hover:text-[#566A50]
                                                    "
                                                >
                                                    Edit
                                                </Link>

                                                <DeleteArticleButton
                                                    articleId={article.id}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (

                        <div className="flex flex-col items-center px-8 py-20 text-center">
                            <div className="mb-5 rounded-full bg-[#F4ECE4] p-5">

                                <FileText
                                    size={30}
                                    className="text-[#7A5A45]"
                                />

                            </div>

                            <h2 className="font-serif text-2xl text-[#4E4038]">
                                An empty journal
                            </h2>

                            <p className="mt-3 max-w-sm leading-7 text-[#80756D]">
                                Every memorable collection begins with a
                                single page. Write your first article and
                                let your readers have a sip.
                            </p>

                            <Link
                                href="/admin/articles/new"
                                className="
                                    mt-8
                                    rounded-full
                                    bg-[#B8C8B0]
                                    px-6
                                    py-3
                                    text-sm
                                    font-medium
                                    text-[#34402F]
                                    transition
                                    hover:bg-[#A8BAA0]
                                "
                            >
                                Write First Article
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}