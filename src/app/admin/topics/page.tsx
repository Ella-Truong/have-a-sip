import { TopicService } from "@/backend/services/topic.service";
import CreateTopicForm from "@/components/admin/topics/CreateTopicForm";
import DeleteTopicButton from "@/components/admin/topics/DeleteTopicButton";
import { Tags, Leaf } from "lucide-react";

const topicService = new TopicService();

export default async function AdminTopicsPage() {
    const topics = await topicService.getTopics();

    return (
        <main className="relative min-h-screen overflow-hidden px-6 py-12">
            {/* Background */}
            <div
                className="absolute inset-0 scale-105 bg-cover bg-center blur-sm"
                style={{
                    backgroundImage: "url('/coffeebean.jpg')",
                }}
            />

            <div className="absolute inset-0 bg-white/50" />

            <div className="relative mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="rounded-full bg-[#B8C8B0] p-4 shadow-lg">
                        <Tags
                            size={30}
                            className="text-white"
                            strokeWidth={2}
                        />
                    </div>

                    <h1 className="mt-5 font-serif text-4xl text-[#4E4038]">
                        Topics
                    </h1>

                    <p className="mt-3 max-w-md text-sm italic leading-7 text-[#80756D]">
                        Organize every story into thoughtful collections,
                        one page at a time.
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
                    {/* Create Topic */}
                    <div className="border-b border-[#ECE3DB] bg-[#FBF8F5] p-8">
                        <div className="mb-4 flex items-center gap-2">
                            <Leaf
                                size={14}
                                className="text-[#71866A]"
                            />

                            <p className="text-xs uppercase tracking-[0.3em] text-[#71866A]">
                                Create Topic
                            </p>
                        </div>
                        <CreateTopicForm />
                    </div>

                    {/* Table */}

                    {topics.length > 0 ? (
                        <table className="w-full">
                            <thead className="bg-[#FCF9F6]">
                                <tr>
                                    <th className="px-8 py-5 text-left font-serif text-sm tracking-wide text-[#7A5A45]">
                                        Name
                                    </th>

                                    <th className="px-8 py-5 text-left font-serif text-sm tracking-wide text-[#7A5A45]">
                                        Slug
                                    </th>

                                    <th className="px-8 py-5 text-right font-serif text-sm tracking-wide text-[#7A5A45]">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#F1EBE5]">

                                {topics.map((topic) => (
                                    <tr
                                        key={topic.id}
                                        className="transition hover:bg-[#FBF9F6]"
                                    >

                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF5EC]">
                                                    <Tags
                                                        size={16}
                                                        className="text-[#71866A]"
                                                    />

                                                </div>

                                                <span className="font-medium text-[#4E4038]">
                                                    {topic.name}
                                                </span>

                                            </div>

                                        </td>

                                        <td className="px-8 py-6">

                                            <span className="rounded-full bg-[#F4ECE4] px-3 py-1 font-mono text-sm text-[#7A5A45]">
                                                {topic.slug}
                                            </span>

                                        </td>

                                        <td className="px-8 py-6 text-right">
                                            <DeleteTopicButton topicId={topic.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    ) : (

                        <div className="flex flex-col items-center px-8 py-16 text-center">
                            <div className="mb-5 rounded-full bg-[#EEF5EC] p-5">
                                <Tags
                                    size={28}
                                    className="text-[#71866A]"
                                />
                            </div>

                            <h2 className="font-serif text-2xl text-[#4E4038]">
                                Your notebook is waiting
                            </h2>

                            <p className="mt-3 max-w-sm leading-7 text-[#80756D]">
                                Create your first topic to organize future
                                stories into meaningful collections.
                            </p>

                        </div>

                    )}

                </div>

            </div>
        </main>
    );
}