/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from '@/db/Appwrite';
import { Query } from 'appwrite';

export const FetchSkillToTeachService = async (userId: string) => {
  if (!userId) {
    throw new Error('Please provide userId');
  }

  try {
    const queryUser = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID as string,
      tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID as string,
      queries: [Query.equal('userId', userId)],
    });

    const userdata: any = queryUser.rows[0];

    if (!userdata && !userdata.skillWantTolearn) {
      throw new Error('userdata not found');
    }

    console.log(userdata.skillWantTolearn);
    return userdata
  } catch (error) {
    console.log('Fetch teaching skill failed', error);
    throw new Error('Fetch teaching skill failed');
  }
};
