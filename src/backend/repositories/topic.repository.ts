/**
 * 
 */
import { prisma } from "@/lib/prisma";
import {
    CreateTopicData,
    Topic,
    UpdateTopicData,
} from "../types/topic"


export class TopicRepository {
    /**
     * Public API
     * Find all topics
     */
    async findTopics(): Promise<Topic[]>{
        return await prisma.topic.findMany({
            orderBy: {
                name: "asc",
            }
        })
    }

    /**
     * Find topic by id
     */
    async findTopicById(
        id: string
    ): Promise<Topic | null>{
        return prisma.topic.findUnique({
            where:{
                id,
            }
        })
    }

    /**
     * Admin create a new topic
     * Use Prisma to insert a new row into Topic table
     */
    async createTopic(
        data: CreateTopicData
    ): Promise<Topic>{
        return prisma.topic.create({
            data
        })
    }

    /**
     * Admin updates an existing topic
     */
    async updateTopic(
        id: string,
        data: UpdateTopicData
    ): Promise<Topic>{
        return prisma.topic.update({
            where:{
                id,
            },
            data
        })
    }

    /**
     * Admin deletes a topic 
     */
    async deleteTopic(id: string){
        return prisma.topic.delete({
            where: {
                id,
            }
        })
    }
}