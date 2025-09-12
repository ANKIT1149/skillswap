import { database } from "@/db/Appwrite"
import { Query } from "appwrite"

export const CountBlockedUserService = async (userId: string) => {
    if (!userId) {
        throw new Error("Please provide all field")
    }

    try {
        const queryDb = await database.listRows({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_BLOCKS_COLLECTION_ID!,
            queries: [Query.equal('blockerId', userId)]
        })

        if (queryDb.rows.length === 0) {
            return false
        }

        const blockedCount = queryDb.rows.length

        return blockedCount
    } catch (error) {
        console.log('Error in Creating count blocked user', error)
        throw new Error('Error in Creating count')
    }
}