/**
 * 
 */
import { TopicRepository } from "../repositories/topic.repository";
import { Topic } from "../types/topic";
import { 
    CreateTopicInput,
    UpdateTopicInput
 } from "../types/topic";



export class TopicService{
    private readonly topicRepository: TopicRepository;
    
    constructor(){
        this.topicRepository = new TopicRepository();
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

    }

}