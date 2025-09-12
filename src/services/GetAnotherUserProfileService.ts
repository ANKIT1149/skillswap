import { database } from '@/db/Appwrite';
import { Query } from 'appwrite';

export const GetAnotherUserProfile = async (chatID: string, userId: string) => {
  if (!chatID || !userId) {
    throw new Error('Please provide all field');
  }

  try {
    const queryMessage = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_MATCH_COLLECTION_ID!,
      queries: [Query.equal('$id', chatID)],
    });

    if (queryMessage.rows.length === 0) {
      throw new Error('No User Found');
    }

    const getUserId = queryMessage.rows.find((doc) => doc.userIds !== userId);
    if (!getUserId?.userIds) {
      throw new Error('No matching user found in this chat');
    }

    const fetchUser = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      queries: [Query.equal('userId', getUserId?.userIds)],
    });

    return fetchUser.rows;
  } catch (error) {
    console.log('Error in Creating Get AnotherUserProfile', error);
    throw new Error('Error in Creating Get AnotherUser');
  }
};
