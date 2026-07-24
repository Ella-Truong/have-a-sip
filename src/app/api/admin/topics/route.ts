import { NextRequest, NextResponse } from "next/server";
import { TopicService } from "@/backend/services/topic.service";
import { createTopicSchema } from "@/backend/validations/topic.validation";
import { revalidatePath } from "next/cache";

const topicService = new TopicService;

export async function GET(){
    const topics = await topicService.getPublishedTopic();

    return NextResponse.json(topics)
}

export async function POST(request: NextRequest){
    try {
        const body = await request.json();

        const input = createTopicSchema.parse(body);

        const topic = await topicService.createTopic(input);
        
        revalidatePath("/")
        revalidatePath("/sips")
        revalidatePath("/admin/topics")
        
        return NextResponse.json(topic, {status: 201})

    }catch(error){
        console.log(error)

        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}