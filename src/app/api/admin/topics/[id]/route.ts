import { NextRequest, NextResponse } from "next/server";
import { TopicService } from "@/backend/services/topic.service";
import { updateTopicSchema } from "@/backend/validations/topic.validation";

const topicService = new TopicService();

interface RouteParams { params: Promise<{id: string}>}

export async function GET(
    request: NextRequest,
    { params }: RouteParams
){
    const {id} = await params;
    
    const topic = await topicService.getTopicById(id);

    return NextResponse.json(topic)
}

export async function PATCH(
    request: NextRequest,
    { params }: RouteParams
){
    try {
        const {id} = await params;

        const body = await request.json();

        const input = updateTopicSchema.parse(body);

        const topic = await topicService.updateTopic(id, input);

        return NextResponse.json(topic);
    }catch(error){
        console.log(error)

        return NextResponse.json(
            {message: "Failed to update topic"},
            {status: 400}
        )
    }   
}

export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
){
    const {id} = await params;

    await topicService.deleteTopic(id);

    return NextResponse.json({
        message: "Topic is deleted successfully."
    })
}