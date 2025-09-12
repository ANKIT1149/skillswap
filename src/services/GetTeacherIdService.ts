import { database } from "@/db/Appwrite";
import { Query } from "appwrite";

export const GetTeacherIdService = async (chatId: string, userId: string) => {
    if (!chatId) {
        throw new Error("Please provide chatId")
    }

    try {
        const query = await database.listRows({
            databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
            tableId: process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID!,
            queries: [Query.equal("chatId", chatId)]
        })

        if (query.rows.length === 0) {
            return false
        }

        const getTeacher = query.rows.find((row) => row.sender !== userId);

        return getTeacher?.sender
    } catch (error) {
        console.log('Error in Creating GetTeacherIDService', error);
        throw new Error("Error in Creating Getteacherservice")
    }
}