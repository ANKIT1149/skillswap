import { database } from '@/db/Appwrite';
import { Message } from '@/props/ChatMessage';
import { ID, Permission, Query, Role } from 'appwrite';

export const SaveChatMessageService = async ({
  chatId,
  sender,
  message,
  timestamp,
  type,
  hasResources,
  fileId
}: Message) => {
  if (!chatId || !sender || !timestamp || !type) {
    throw new Error('Please provide all fields');
  }

  try {
    const query = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_MATCH_COLLECTION_ID!,
      queries: [Query.equal('$id', chatId)],
    });

    if (!query.rows) {
      throw new Error('Please first login and add your skill');
    }

    const messagesave = await database.createRow({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        chatId: chatId,
        sender: sender,
        message: message,
        timestamp: timestamp,
        type: type,
        hasResources: hasResources,
        fileId: fileId ?? null
      },
      permissions: [
        Permission.read(Role.user(sender)),
        Permission.read(Role.any()),
        Permission.update(Role.user(sender)),
        Permission.delete(Role.user(sender)),
      ],
    });

    return messagesave;
  } catch (error) {
    console.log('Error in saving message', error);
    throw new Error('Error in creating message');
  }
};
