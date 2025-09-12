import { database } from "@/db/Appwrite"
import { Query } from "appwrite"

export const CheckOnlineOrNot = async (userId: string) => {
    if (!userId) {
        throw new Error("Please Send userId")
    }

    try {
        const user = await database.listRows({
          databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
          tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
           queries: [Query.equal('userId', userId)]
        })

        if (user.rows.length === 0) {
            return false
        }

        const lastSeen = user.rows[0].lastSeen

        const isOnline = new Date().getTime() - new Date(lastSeen).getTime() < 60000;

        return isOnline
    } catch (error) {
        console.log('Error in Creating Check online', error)
        throw new Error('Error in Creating Check online')
    }
}