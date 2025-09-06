/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from '@/db/Appwrite';
import { Query } from 'appwrite';

export const FetchMatchandUserService = async (currentUserId: string) => {
  if (!currentUserId) {
    throw new Error('No CurrentUserId provided');
  }

  const otherUserIds: any[] = [];

  try {
    const docs = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_MATCH_COLLECTION_ID!,
      queries: [Query.equal('userIds', currentUserId)],
    });

    docs.rows.forEach((doc) => {
      const otherUser = doc.userIds.find((id: string) => id !== currentUserId);
      if (otherUser) {
        otherUserIds.push(otherUser);
      }
    });

    let userDetails: any[] = [];

    if (otherUserIds.length > 0) {
      const userRes = await database.listRows({
        databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
        tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
        queries: [Query.equal('userId', otherUserIds)]}
      );
      userDetails = userRes.rows;
      }
      
      const result = docs.rows.map((item: any) => {
          const otherUser = item.userIds.find((id: string) => id !== currentUserId)
          const userData = userDetails.find((u: any) => u.userId === otherUser)

          return {
              matchId: item.$id,
              otherUserId: otherUser,
              userData,
              skills: item.skillSwapped?.[otherUser || ""] || [],
          }
      })

      return result
  } catch (error) {
    console.log('Error in Fetching MatchData', error);
    throw new Error('Error in creating MatchData Service');
  }
};
