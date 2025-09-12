/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from '@/db/Appwrite';
import { Query } from 'appwrite';

export const UpdateMessageService = async (userId: string, chatId: string) => {
  if (!chatId || !userId) {
    throw new Error('Please Provide all fields');
  }

  try {
    const query = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID!,
      queries: [Query.equal('chatId', chatId)],
    });

    const results: any[] = [];

    for (const msg of query.rows) {
      if (!msg.seenBy?.includes(userId)) {
        const updateSeenBy = [...(msg.seenBy || []), userId];

        const data = await database.updateRow({
          databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
          tableId: process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID!,
          rowId: msg.$id,
          data: { seenBy: updateSeenBy },
        });

        results.push(data);
      }
    }

    return results;
  } catch (error) {
    console.log('Error in Creating UpdateMessageService', error);
    throw new Error('Error in Creating UpdateMessageService');
  }
};
