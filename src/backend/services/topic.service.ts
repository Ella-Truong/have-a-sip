/**
 * Handles business logic for topics
 */
import { TopicRepository } from "../repositories/topic.repository";
import { 
    Topic,
    CreateTopicData,
    CreateTopicInput,
    UpdateTopicInput,
    UpdateTopicData,
 } from "../types/topic";

import { generateSlug } from "@/lib/helper";


export class TopicService{
    private readonly topicRepository: TopicRepository;
    
    constructor(){
        this.topicRepository = new TopicRepository();
    }

     /**
     * Get only published topics for reader side
     */
    async getPublishedTopic(){
        return this.topicRepository.findPublishedTopic();
    }


    /**
     * Get all topics
     */
    async getTopics(): Promise<Topic[]>{
        return this.topicRepository.findTopics()
    }


    /**
     * Get a topic by ID
     */
    async getTopicById(
        id: string
    ): Promise<Topic | null>{
        return this.topicRepository.findTopicById(id)
    }



    /**
     * Create a topic
     */
    async createTopic(
        input: CreateTopicInput
    ): Promise<Topic>{
        const data: CreateTopicData = {
            ...input,
            slug: generateSlug(input.name)
        }
        return this.topicRepository.createTopic(data)
    }

    /**
     * Update a topic
     */
    async updateTopic(
        id: string,
        input: UpdateTopicInput
    ): Promise<Topic>{
        const data: UpdateTopicData = {...input}

        if (input.name){
            data.slug = generateSlug(input.name)
        }

        return this.topicRepository.updateTopic(id, data)
    }

    /**
     * Delete a topic
     */
    async deleteTopic(id: string): Promise<void>{
        await this.topicRepository.deleteTopic(id)
    }
}