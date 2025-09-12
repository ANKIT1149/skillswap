import { database } from "@/db/Appwrite";
import { RatingInterface } from "@/interface/RatingInterface";
import { ID } from "appwrite";

export const RatingService = async ({ratedUserId, raterUserId, stars, review, timestamp}: RatingInterface) => {
    if (!ratedUserId || !raterUserId || !stars || !timestamp) {
        throw new Error("Please provide all fields")
    }

    try {
        const query = await database.createRow({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_RATINGS_COLLECTION_ID!,
            rowId: ID.unique(),
            data: {
                ratedUserId: ratedUserId,
                raterUserId: raterUserId,
                stars: stars,
                review: review,
                timestamp: timestamp
            }
        })

        return query.$id
    } catch (error) {
        console.log('Error in Creating Rating Service', error)
        throw new Error("Error in Creating Rating Service")
    }
}