export interface TopicSummary {
    id: string;
    name: string;
    slug: string;
}
export interface CreateTopicInput {
    name: string;
}

export interface CreateTopicData extends CreateTopicInput {
    slug: string;
}

export interface UpdateTopicInput {
    name?: string;
}

export interface UpdateTopicData extends UpdateTopicInput {
    slug?: string;
}