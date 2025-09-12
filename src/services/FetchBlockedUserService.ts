/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from '@/db/Appwrite';
import { Query } from 'appwrite';

export const FetchBlockedUserService = async (blockerId: string) => {
  if (!blockerId) {
    throw new Error('Please provide blocker Id');
  }

  try {
    const blockedData: any[] = [];
    const otherId: any[] = [];

    const queryBlockDb = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_BLOCKS_COLLECTION_ID!,
      queries: [Query.equal('blockerId', blockerId)],
    });

    if (queryBlockDb.rows.length === 0) {
      return false;
    }

    queryBlockDb.rows.forEach((doc) => {
      const blockedId = doc.blockedId;
      otherId.push(blockedId);
    });

    const fetchBlockedData = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      queries: [Query.equal('userId', otherId)],
    });

    return fetchBlockedData.rows;
  } catch (error) {
    console.log('Error in FetchingBlocked User', error);
    throw new Error('Error in Fetching Blocked User');
  }
};
