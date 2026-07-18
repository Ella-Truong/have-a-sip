import { TopicService } from "@/backend/services/topic.service";
import CreateTopicForm from "@/components/admin/topics/CreateTopicForm";

const topicService = new TopicService();

export default async function AdminTopicsPage() {
    const topics = await topicService.getTopics();

    return (
        <main className="min-h-screen bg-[#FAF8F5] px-6 py-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-[#3F3A37]">
                        Topics
                    </h1>

                    <p className="mt-2 text-sm text-[#817873]">
                        Organize your articles by topic.
                    </p>
                </div>
                
                <CreateTopicForm/>

                <div className="overflow-hidden rounded-2xl border border-[#E7E0DA] bg-white">
                    <table className="w-full text-left">
                        <thead className="bg-[#F4EFEA]">
                            <tr>
                                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#817873]">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#817873]">
                                    Slug
                                </th>

                                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#817873]">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#EEE8E3]">
                            {topics.map((topic) => (
                                <tr
                                    key={topic.id}
                                    className="transition hover:bg-[#FBF9F7]"
                                >
                                    <td className="px-6 py-5 font-medium text-[#3F3A37]">
                                        {topic.name}
                                    </td>

                                    <td className="px-6 py-5 text-sm text-[#817873]">
                                        {topic.slug}
                                    </td>

                                    <td className="px-6 py-5">
                                        <button className="text-sm font-medium text-[#C17C74] hover:text-[#A65F58]">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {topics.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <p className="text-sm text-[#817873]">
                                No topics yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}