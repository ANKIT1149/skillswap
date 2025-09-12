/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '@/db/Appwrite';

interface MessageProps {
  chatId: string;
  onMessage: (msg: any) => void;
}

export const listenNewMessage = ({ chatId, onMessage }: MessageProps) => {
  if (!chatId || !onMessage) {
    console.error('Invalid chatId or onMessage:', { chatId, onMessage });
    return;
  }

  try {
    const unsubscribe = client.subscribe(
      `databases.${process.env.NEXT_PUBLIC_DATABSE_ID}.tables.${process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID}.rows`,
      (response) => {
        console.log('Realtime event:', response);

        if (response.events.some((e) => e.endsWith('.create'))) {
          const newMsg: any = response.payload;
          console.log('Realtime new message:', newMsg);
          if (newMsg.chatId === chatId) {
            onMessage(newMsg);
          }
        }
      }
    );

    console.log(
      'Subscribed to channel:',
      `databases.${process.env.NEXT_PUBLIC_DATABSE_ID}.tables.${process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID}.rows`,
    );
    return unsubscribe;
  } catch (error) {
    console.error('Error in subscribing:', error);
    throw new Error('Error in subscribing');
  }
};
