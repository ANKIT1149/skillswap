import { database } from "@/db/Appwrite"
import { Query } from "appwrite"

export const CheckChatExsistService = async (matchId: string) => {
    if (!matchId) {
        throw new Error("Match Id not found")
    }
    try {
        const query = await database.listRows({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID!,
            queries: [Query.equal('chatId', matchId), Query.orderAsc("timestamp")]
        })

        if (!query.rows || query.rows.length === 0) {
            return false
        }

        return query.rows
    } catch (error) {
        console.log("Error in Checking Chat Exsist", error)
        throw new Error("Error in Checking Chat Exsist")
    }
}