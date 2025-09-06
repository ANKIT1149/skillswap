type PineconeMatch = { metadata: { userId: string, skill: string[] } };
export type StoreSkillTeachData = {
    currentUserId: string;
    skillsToTeach: string[];
    pineconeMatches: PineconeMatch[];
};