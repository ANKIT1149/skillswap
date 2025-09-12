/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from '@/db/Appwrite';
import { StoreSkillTeachData } from '@/props/SroreSkillTeachData';
import { ID, Query } from 'appwrite';

export const StoreSkillWantToTeach = async ({
  currentUserId,
  skillsToTeach,
  pineconeMatches,
}: StoreSkillTeachData) => {
  if (!currentUserId && !skillsToTeach && !pineconeMatches) {
    throw new Error('Please provide details to store data');
  }

  try {
    const result: any[] = [];

    for (const matches of pineconeMatches) {
      const matchedUserId = matches.metadata.userId;
      const matchedSkill = matches.metadata.skill;

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
          new Set([...skillsToTeach, ...matchedSkill])
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
            skillSwapped: [...skillsToTeach, ...matchedSkill],
            type: 'teacher',
          },
        });

        result.push(newMatch);
      }
    }

    return result;
  } catch (error) {
    console.log('error in storing skill want to learn', error);
    throw new Error('Error in stroing skill want to learn');
  }
};
