/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from '@/db/Appwrite';
import { Query } from 'appwrite';

export const CheckUnReadService = async (chatId: string, userId: string) => {
  if (!chatId || !userId) {
    throw new Error('Please Provide all fields');
  }

  try {
    const result = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID!,
      queries: [Query.equal('chatId', chatId)],
    });

    const unread = result.rows.filter(
      (msg: any) => !msg.seenBy?.includes(userId)
    );

    return unread.length;
  } catch (error) {
    console.log('Error in Creating CheckUnReadService', error);
    throw new Error('Error in Creating CheckUnReadServices');
  }
};
