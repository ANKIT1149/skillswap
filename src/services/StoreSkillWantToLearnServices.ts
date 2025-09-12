/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from '@/db/Appwrite';
import { StoreSkillDataFixed } from '@/props/StoreSkillData';
import { ID, Query } from 'appwrite';

export const StoreSkillWantToLearn = async ({
  currentUserId,
  skillsToLearn,
  pineconeMatches,
}: StoreSkillDataFixed) => {
  if (!currentUserId || !skillsToLearn || !pineconeMatches) {
    throw new Error('Please provide details to store data');
  }

  try {
    const result: any[] = [];

    for (const match of pineconeMatches) {
      if (!match.metadata) continue;

      const matchedUserId = match.metadata.userId;
      const matchedSkill = match.metadata.skill;

      if (matchedUserId === currentUserId) continue;

      const existingMatch = await database.listRows({
        databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
        tableId: process.env.NEXT_PUBLIC_MATCH_COLLECTION_ID!,
        queries: [
          Query.and([
            Query.contains('userIds', currentUserId),
            Query.contains('userIds', matchedUserId),
          ]),
        ],
      });

      if (existingMatch.total > 0) {
        const matchId = existingMatch.rows[0].$id;
        const newSkills = Array.from(
          new Set([...skillsToLearn, ...matchedSkill])
        );

        const updated = await database.updateRow({
          databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
          tableId: process.env.NEXT_PUBLIC_MATCH_COLLECTION_ID!,
          rowId: matchId,
          data: { skillSwapped: newSkills },
        });

        result.push(updated);
      } else {
        const newMatch = await database.createRow({
          databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
          tableId: process.env.NEXT_PUBLIC_MATCH_COLLECTION_ID!,
          rowId: ID.unique(),
          data: {
            userIds: [currentUserId, matchedUserId],
            skillSwapped: [...skillsToLearn, ...matchedSkill],
            type: 'student',
          },
        });

        result.push(newMatch);
      }
    }

    return result;
  } catch (error) {
    console.log('Error storing skills want to learn', error);
    throw new Error('Error storing skills want to learn');
  }
};
