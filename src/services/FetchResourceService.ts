import { database } from "@/db/Appwrite"
import { Query } from "appwrite"

export const FetchResourcesService = async (chatId: string) => {
    if (!chatId) {
        throw new Error("Please provide chatId")
    }

    try {
        const queryMessage = await database.listRows({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_NEXT_PUBLIC_MESSAGE_COLLECTION_ID!,
            queries: [Query.equal("chatId", chatId), Query.equal("hasResources", true)]
        })

        if (!queryMessage.rows) {
            return
        }

        const queryCollection = await database.listRows({
           databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_NEXT_PUBLIC_RESOURCES_COLLECTION_ID!,
          queries: [Query.equal("chatId", chatId)]
        })

        return queryCollection.rows
    } catch (error) {
        console.log('Error in fetching resourcesService', error)
        throw new Error("Error in Fetching resource service")
    }

}