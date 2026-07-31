"use client";

import { useEffect, useState } from "react";
import { SIP_OPTIONS } from "@/constants/sip";

const sipOptionMap = Object.fromEntries(
    SIP_OPTIONS.map((option) => [option.type, option])
);

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import DeleteCommentButton from "./DeleteCommentButton";

import type { AdminCommentSummary } from "@/backend/types/comment";
import type { TopicSummary } from "@/backend/types/topic";

export function CommentTable() {
    const [comments, setComments] = useState<AdminCommentSummary[]>([]);
    const [topics, setTopics] = useState<TopicSummary[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [topicId, setTopicId] = useState("all");
    const [sipType, setSipType] = useState("all");

    useEffect(() => {
        let cancelled = false;

        async function fetchComments() {
            try {
                setLoading(true);
                setError(null);

                const params = new URLSearchParams();

                if (topicId !== "all") {
                    params.set("topicId", topicId);
                }

                if (sipType !== "all") {
                    params.set("sipType", sipType);
                }

                const query = params.toString();

                const response = await fetch(
                    `/api/admin/comments${query ? `?${query}` : ""}`
                );

                if (!response.ok) {
                    throw new Error();
                }

                const data: AdminCommentSummary[] = await response.json();

                if (!cancelled) {
                    setComments(data);
                }
            } catch {
                if (!cancelled) {
                    setError("Failed to load comments.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchComments();

        return () => {
            cancelled = true;
        };
    }, [topicId, sipType]);

    useEffect(() => {
        let cancelled = false;

        async function fetchTopics() {
            try {
                const response = await fetch("/api/topics");

                if (!response.ok) {
                    throw new Error();
                }

                const data: TopicSummary[] = await response.json();

                if (!cancelled) {
                    setTopics(data);
                }
            } catch (error) {
                console.error("Failed to load topics:", error);
            }
        }

        fetchTopics();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return <p>Loading comments...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="space-y-6">
            <p className="text-sm text-[#80756D] font-medium">
                All Comments
            </p>
            
            <div className="overflow-hidden rounded-3xl border border-[#E8DDD3] bg-[#FCFBF9] shadow-sm">
                <Table className="table-fixed w-full">
                    <TableHeader className="bg-[#f7f2ec]">
                        <TableRow className="hover:bg-transparent ">
                            <TableHead className="w-[30%] font-semibold text-[#5B463A]">
                                Comment
                            </TableHead>

                            <TableHead className="w-[30%] font-semibold text-[#5B463A]">
                                Article
                            </TableHead>

                            <TableHead className="w-[12%] font-semibold text-[#5B463A]">
                                <Select
                                    value={topicId}
                                    onValueChange={setTopicId}
                                >
                                    <SelectTrigger className="h-8 border-none p-0 shadow-none text-[#5B463A]">
                                        <SelectValue placeholder="Topic" />
                                    </SelectTrigger>

                                    <SelectContent position="popper" side="bottom" align="start" className="bg-[#FCFBF9] border-[#E8DDD3]">
                                        <SelectItem value="all" className="text-[#5b463a]">
                                            All Topics
                                        </SelectItem>

                                        {topics.map((topic) => (
                                            <SelectItem
                                                key={topic.id}
                                                value={topic.id}
                                                className="text-[#5b463a]"
                                            >
                                                {topic.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </TableHead>

                            <TableHead className="w-[12%] font-semibold text-[#5B463A]">
                                <Select
                                    value={sipType}
                                    onValueChange={setSipType}
                                >
                                    <SelectTrigger className="h-8 border-none bg-transparent p-0 shadow-none text-[#5B463A]">
                                        <SelectValue placeholder="Sip Type" />
                                    </SelectTrigger>

                                    <SelectContent position="popper" side="bottom" align="start" className="bg-[#FCFBF9] border-[#E8DDD3]">
                                        <SelectItem value='all' className="text-[#5b463a]">
                                            All Sip Types
                                        </SelectItem>

                                        {SIP_OPTIONS.map((option) =>(
                                            <SelectItem
                                                key={option.type}
                                                value={option.type}
                                            >
                                                <div className="flex items-center gap-2 text-[#5B463A]">
                                                    <span>{option.emoji}</span>
                                                    <span>{option.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </TableHead>

                            <TableHead className="w-[10%] text-[#5b463a] font-semibold">
                                Posted
                            </TableHead>

                            <TableHead className="text-right text-[#5b463a] font-semibold">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {comments.map((comment) => (
                            <TableRow key={comment.id}>
                                <TableCell className="w-[30%] align-top">
                                    <div className="space-y-2 overflow-hidden">
                                        <div className="font-medium text-[#4D3C35]">
                                            {comment.cupName}
                                        </div>

                                        <p className="line-clamp-2 break-all text-sm text-[#80756D]">
                                            {comment.content}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell className="truncate text-[#5b463a]">
                                    {comment.article.title}
                                </TableCell>

                                <TableCell className="truncate text-[#5b463a]">
                                    {comment.article.topic.name}
                                </TableCell>

                                <TableCell>
                                    <div>
                                        <span>{sipOptionMap[comment.sipType]?.emoji} </span>
                                        <span className="text-[#5b463a]">
                                            {sipOptionMap[comment.sipType]?.label ?? comment.sipType}
                                        </span>
                                
                                    </div>
                                </TableCell>

                                <TableCell className="text-[#5b463a]">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </TableCell>

                                <TableCell className="text-right">
                                    <DeleteCommentButton
                                        commentId={comment.id}
                                        onDelete = {() => 
                                            setComments((prev) => 
                                            prev.filter((c)=> c.id !== comment.id))
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}