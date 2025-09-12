import { database } from '@/db/Appwrite';
import { Query } from 'appwrite';

export const CalculateAverageRatingService = async (raterUserId: string) => {
  if (!raterUserId) {
    throw new Error('please provide all field');
  }

  try {
    const listRows = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_RATINGS_COLLECTION_ID!,
      queries: [Query.equal('ratedUserId', raterUserId)],
    });

    if (listRows.rows.length === 0) {
      return false;
    }

    let totalStars = 0;

    listRows.rows.forEach((doc) => {
      const stars = doc.stars;
      totalStars += stars;
    });

    const averageValue = totalStars / listRows.rows.length;
    return averageValue;
  } catch (error) {
    console.log('Error in Calculating average rating', error);
    throw new Error('Error in Calculating average rating');
  }
};
