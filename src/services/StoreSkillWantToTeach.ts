/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from '@/db/Appwrite';
import { StoreSkillTeachData } from '@/props/SroreSkillTeachData';
import { ID } from 'appwrite';

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

        const doc = await database.createRow({
          databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
          tableId: process.env.NEXT_PUBLIC_MATCH_COLLECTION_ID!,
          rowId: ID.unique(),
          data: {
            userIds: [currentUserId, matchedUserId],
            skillSwapped:[...skillsToTeach, ...matchedSkill],
            type: 'Teacher',
          },
        });

        result.push(doc);
      }
        
      return result
  } catch (error) {
    console.log('error in storing skill want to learn', error);
    throw new Error('Error in stroing skill want to learn');
  }
};
