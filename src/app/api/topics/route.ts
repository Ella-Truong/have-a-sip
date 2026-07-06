/**
 * Notes: not using NextRequest here
 * Because no query parameters, request body, and special headers
 * So GET route doesn't need to inspect the request
 */
import { NextResponse } from "next/server";
import { TopicService } from "@/backend/services/topic.service";

const topicService = new TopicService();

export async function GET(){
    const topics = await topicService.getTopics()

    return NextResponse.json(topics)
}
