/**
 * 
 */
import { prisma } from "@/lib/prisma";
import {
    CreateTopicData,
    TopicSummary,
    UpdateTopicData,
} from "../types/topic"


export class TopicRepository {
    /**
     * Find only published topics to return to readers
     */
    async findPublishedTopic(): Promise<TopicSummary[]>{
        return prisma.topic.findMany({
            where:{
                articles:{
                    some: {
                        published: true,
                    }
                }
            },
            orderBy: {
                name: "asc"
            }
        })
    }


    /**
     * Admin finds all topics
     */
    async findTopics(): Promise<TopicSummary[]>{
        return await prisma.topic.findMany({
            orderBy: {
                name: "asc",
            }
        })
    }

    /**
     * Admin finds topic by id
     */
    async findTopicById(
        id: string
    ): Promise<TopicSummary | null>{
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
    ): Promise<TopicSummary>{
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
    ): Promise<TopicSummary>{
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
    async deleteTopic(id: string): Promise<void>{
        await prisma.topic.delete({
            where: {
                id,
            }
        })
    }
}