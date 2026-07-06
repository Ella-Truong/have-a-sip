export interface Topic {
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

