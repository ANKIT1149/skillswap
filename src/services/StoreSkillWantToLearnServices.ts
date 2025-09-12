/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from '@/db/Appwrite';
import { StoreSkillDataFixed } from '@/props/StoreSkillData';
import { ID, Query } from 'appwrite';

export const StoreSkillWantToLearn = async ({
  currentUserId,
  skillsToLearn,
  pineconeMatches,
}: StoreSkillDataFixed) => {
  if (!currentUserId && !skillsToLearn && !pineconeMatches) {
    throw new Error('Please provide details to store data');
  }

  try {
    const result: any[] = [];

    for (const matches of pineconeMatches) {
      if (matches.metadata) {
        const matchedUserId = matches.metadata.userId;
        const matchedSkill = matches.metadata.skill;

        const data = await database.listRows({
          databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
          tableId: process.env.NEXT_PUBLIC_MATCH_COLLECTION_ID!,
          queries: [Query.equal('userIds', matchedUserId)],
        });

        if (data.total > 0) {
          const dataId = data.rows[0].$id;
          const updateData = await database.updateRow({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_MATCH_COLLECTION_ID!,
            rowId: dataId,
            data: {
              userIds: [currentUserId, matchedUserId],
              skillSwapped: [...skillsToLearn, ...matchedSkill],
            },
          });

          result.push(updateData);
        } else {
          const doc = await database.createRow({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_MATCH_COLLECTION_ID!,
            rowId: ID.unique(),
            data: {
              userIds: [currentUserId, matchedUserId],
              skillSwapped: [...skillsToLearn, ...matchedSkill],
              type: 'student',
            },
          });

          result.push(doc);
        }
      }
    }
    return result;
  } catch (error) {
    console.log('error in storing skill want to learn', error);
    throw new Error('Error in stroing skill want to learn');
  }
};
