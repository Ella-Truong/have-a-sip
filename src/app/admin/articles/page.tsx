import Link from "next/link";
import { ArticleService } from "@/backend/services/article.service";
import DeleteArticleButton from "@/components/admin/articles/DeleteArticleButton";

const articleService = new ArticleService();

export default async function AdminArticlesPage() {
    const result = await articleService.getAdminArticles();

    return (
        <main className="min-h-screen bg-[#FAF8F5] px-6 py-10">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-[#3F3A37]">
                            Articles
                        </h1>

                        <p className="mt-2 text-sm text-[#817873]">
                            Write, edit, and manage your thoughts.
                        </p>
                    </div>

                    <Link
                        href="/admin/articles/new"
                        className="
                            rounded-xl
                            bg-[#B8C8B0]
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-[#34402F]
                            transition
                            hover:bg-[#A8BCA0]
                        "
                    >
                        + New Article
                    </Link>
                </div>

                {/* Article Table */}
                <div className="overflow-hidden rounded-2xl border border-[#E7E0DA] bg-white">
                    <table className="w-full text-left">
                        <thead className="bg-[#F4EFEA]">
                            <tr>
                                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#817873]">
                                    Title
                                </th>

                                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#817873]">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#817873]">
                                    Updated
                                </th>

                                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#817873]">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#EEE8E3]">
                            {result.map((article) => (
                                <tr
                                    key={article.id}
                                    className="
                                        transition
                                        hover:bg-[#FBF9F7]
                                    "
                                >
                                    {/* Title */}
                                    <td className="px-6 py-5">
                                        <p className="font-medium text-[#3F3A37]">
                                            {article.title}
                                        </p>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5">
                                        {article.published ? (
                                            <span
                                                className="
                                                    rounded-full
                                                    bg-[#E4EFE0]
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-medium
                                                    text-[#587052]
                                                "
                                            >
                                                Published
                                            </span>
                                        ) : (
                                            <span
                                                className="
                                                    rounded-full
                                                    bg-[#F5E8DD]
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-medium
                                                    text-[#956F56]
                                                "
                                            >
                                                Draft
                                            </span>
                                        )}
                                    </td>

                                    {/* Updated */}
                                    <td className="px-6 py-5 text-sm text-[#817873]">
                                        {new Date(
                                            article.updatedAt
                                        ).toLocaleDateString()}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <Link
                                                href={`/admin/articles/${article.id}/edit`}
                                                className="
                                                    text-sm
                                                    font-medium
                                                    text-[#71866A]
                                                    transition
                                                    hover:text-[#4F6549]
                                                "
                                            >
                                                Edit
                                            </Link>

                                            <DeleteArticleButton articleId = {article.id}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty state */}
                    {result.length === 0 && (
                        <div className="px-6 py-16 text-center">
                            <p className="text-sm text-[#817873]">
                                No articles yet.
                            </p>

                            <Link
                                href="/admin/articles/new"
                                className="
                                    mt-3
                                    inline-block
                                    text-sm
                                    font-medium
                                    text-[#71866A]
                                    hover:text-[#4F6549]
                                "
                            >
                                Write your first article →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}