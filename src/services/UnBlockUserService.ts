import { database } from "@/db/Appwrite"
import { Query } from "appwrite"

export const UnBlockUserService = async(blockedId: string) => {
    if (!blockedId) {
        throw new Error("Please provide blockedId")
    }

    try {
        const queryBlocked = await database.listRows({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_BLOCKS_COLLECTION_ID!,
            queries: [Query.equal("blockedId", blockedId)]
        })
        
        if (queryBlocked.rows.length === 0) {
            throw new Error("No Data found")
        }

        const rowId = queryBlocked.rows[0].$id

        const deleteBlocked = await database.deleteRow({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_BLOCKS_COLLECTION_ID!,
            rowId: rowId
        })

        return deleteBlocked
    } catch (error) {
        console.log('Error in doing unblocking', error)
        throw new Error("Error in doing unblocking")
    }
}