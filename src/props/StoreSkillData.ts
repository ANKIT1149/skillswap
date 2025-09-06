type PineconeMatch = { metadata: { userId: string, skill: string[] } };
export type StoreSkillDataFixed = {
    currentUserId: string;
    skillsToLearn: string[];
    pineconeMatches: PineconeMatch[];
};