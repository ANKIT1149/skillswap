import { database } from "@/db/Appwrite"
import { Query } from "appwrite"

export const FetchRating = async (raterId: string) => {
    if (!raterId) {
        throw new Error("Please provide all fields")
    }

    try {
        const queryDb = await database.listRows({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_RATINGS_COLLECTION_ID!,
            queries: [Query.equal('ratedId', raterId)]
        })

        if (queryDb.rows.length === 0) {
            return false
        }

        return queryDb.rows
    } catch (error) {
        console.log("Error in Creating FetchRating Services", error)
        throw new Error("Error in Creating FetchRating Services")
    }
}