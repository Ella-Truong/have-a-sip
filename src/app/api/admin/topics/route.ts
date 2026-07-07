import { NextRequest, NextResponse } from "next/server";
import { TopicService } from "@/backend/services/topic.service";
import { createTopicSchema } from "@/backend/validations/topic.validation";

const topicService = new TopicService;

export async function GET(){
    const topics = await topicService.getPublishedTopic();

    return NextResponse.json(topics)
}

export async function POST(request: NextRequest){
    const body = await request.json();

    const input = createTopicSchema.parse(body);

    const topic = await topicService.createTopic(input);

    return NextResponse.json(topic, {status: 201})
}