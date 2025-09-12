import { database } from '@/db/Appwrite';
import { Query } from 'appwrite';
import { DeleteImageService } from './DeleteImageService';

export const DeleteMessageService = async (
  chatId: string,
  messageId: string,
  hasResources: boolean,
  fileId?: string
) => {
  if (!chatId || !messageId || hasResources) {
    throw new Error('Please provide all details');
  }

  try {
    const query = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID!,
      queries: [Query.equal('chatId', chatId)],
    });

    if (query.rows.length === 0) {
      return false;
    }

    if (!hasResources) {
      const deleteQuery = await database.deleteRow({
        databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
        tableId: process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID!,
        rowId: messageId,
      });

      return deleteQuery;
    }

    if (hasResources) {
      const getRowId = await database.listRows({
        databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
        tableId: process.env.NEXT_PUBLIC_RESOURCES_COLLECTION_ID!,
        queries: [Query.equal('resourceUrl', fileId!)],
      });

      const id = getRowId.rows[0].$id;
      const fileformat = getRowId.rows[0].fileId;

      await database.deleteRow({
        databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
        tableId: process.env.NEXT_PUBLIC_RESOURCES_COLLECTION_ID!,
        rowId: id,
      });

      await DeleteImageService(fileformat);

      await database.deleteRow({
        databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
        tableId: process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID!,
        rowId: messageId,
      });

      return getRowId;
    }

    return true;
  } catch (error) {
    console.log('Error in Creating DeleteMessageService', error);
    throw new Error('error in creating deleting service');
  }
};
