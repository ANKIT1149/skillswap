import { database } from "@/db/Appwrite"
import { ID } from "appwrite"

export const BlockedService = async (userId: string, blockedId: string) => {
    if (!userId || !blockedId) {
        throw new Error("Please provide all field")
    }

    try {
        const storeBlocker = await database.createRow({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_BLOCKS_COLLECTION_ID!,
            rowId: ID.unique(),
            data: {
                blockerId: userId,
                blockedId: blockedId,
            }
        })

        if (!storeBlocker.$id) {
            return false
        }

        return storeBlocker;
    } catch (error) {
        console.log('Error in Providing BlockedService', error)
        throw new Error("Error in Providing BlockedService")
    }
}