import { database } from "@/db/Appwrite"
import { ResourceData } from "@/props/ResourceData"
import { ID } from "appwrite"

export const SaveCollectionService = async ({messageId, chatId, fileId, resourceUrl, timestamp}: ResourceData) => {
    if (!messageId || !chatId || !fileId || !resourceUrl || !timestamp) {
        throw new Error("Please provide all details")
    }

    try {
        const query = await database.createRow({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_RESOURCES_COLLECTION_ID!,
            rowId: ID.unique(),
            data: {
                chatId: chatId,
                messageId: messageId,
                fileId: fileId,
                resourceUrl: resourceUrl,
                timestamp: timestamp
            }
        })

        return query
    } catch (error) {
        console.log("Error in Creating SaveResourceService", error)
        throw new Error("Error in Creating Save services")
    }
}