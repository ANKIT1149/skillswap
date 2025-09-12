/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Message } from '@/props/ChatMessage';
import { DeleteParams } from '@/props/DeleteParams';
import { DeleteMessageService } from '@/services/DeleteMessageService';
import { GetUserService } from '@/services/GetUserService';
import { UpdateMessageService } from '@/services/UpdateMessageService';
import { GetTimeForMessage } from '@/utils/GetTimeForMessage';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ChatMessageProps {
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
  messages: Message[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  chatContainerRef,
  messages,
}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { id }: any = useParams();

  const messageVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await GetUserService();
      setCurrentUser(userId);
    };

    fetchUser();
  }, []);

  const groupedMessage = messages.reduce((acc: any, message) => {
    const label: any = GetTimeForMessage(message.timestamp);
    if (!acc[label]) acc[label] = [];
    acc[label].push(message);
    return acc;
  }, {});

  const onDelete = async ({
    messageId,
    chatId,
    hasResources,
    fileId,
  }: DeleteParams) => {
    try {
      const deleteUser = await DeleteMessageService(
        chatId,
        messageId,
        hasResources,
        fileId
      );
      if (deleteUser) {
        toast.success('Message Deleted Successfully');
      }
    } catch (error) {
      console.log('Error in deleting service', error);
      toast.error('Failed to delete Message');
    }
  };

  useEffect(() => {
    console.log('useEffect fired:', { currentUser, id });
    const readChatUpdate = async () => {
      const userId = await GetUserService()
      const chatUpdate = await UpdateMessageService(userId, id!);
      console.log('data', currentUser, id);
      console.log('updatedata', chatUpdate);
      return chatUpdate;
    };

    
      readChatUpdate();
      console.log('running chatupdate function')
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 mt-20 mb-14 min-h-screen z-30 overflow-y-auto bg-teal-950 bg-opacity-80 backdrop-blur-md px-6 py-4 overflow-x-hidden w-[1285px]"
    >
      {Object.keys(groupedMessage).map((dateLabel) => (
        <div key={dateLabel} className="mb-6">
          <p className="text-center text-xs opacity-50 mb-2">{dateLabel}</p>
          {groupedMessage[dateLabel].map((message: Message, index: number) => (
            <motion.div
              key={message.$id}
              custom={index}
              variants={messageVariants}
              initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
              animate="visible"
              className={`flex ${message.sender === currentUser ? 'justify-end mr-5' : 'justify-start'} mb-10 group`} // Added group class
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`
                  relative max-w-[70%] p-3 rounded-2xl
                  ${
                    message.sender === currentUser
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                      : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white'
                  } shadow-md
                `}
              >
                {message.type === 'text' && (
                  <p className="text-sm">{message.message}</p>
                )}

                {message.type === 'image' && message.fileId && (
                  <img
                    src={message.fileId}
                    alt="chat image"
                    className="rounded-lg max-h-64 object-cover cursor-pointer transition-transform hover:scale-105"
                    onClick={() => setPreviewImage(message.fileId!)}
                  />
                )}

                {message.type === 'voice' && message.fileId && (
                  <audio
                    controls
                    src={message.fileId}
                    className="max-w-xs"
                    preload="metadata"
                  />
                )}

                {message.sender === currentUser && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      onDelete({
                        messageId: message.$id ?? '',
                        chatId: message.chatId,
                        hasResources: !!message.hasResources,
                        fileId: message.hasResources
                          ? message.fileId
                          : undefined,
                      })
                    }
                    className={`
                      absolute right-2 top-2/2 -translate-y-1/2
                      hidden group-hover:flex items-center justify-center
                      p-2 rounded-full bg-red-50 hover:bg-red-100
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-red-300
                    `}
                    title="Delete message"
                  >
                    <Trash2 size={20} className="text-red-500" />
                  </motion.button>
                )}
                <p className="text-xs opacity-70 mt-1 text-right">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </motion.div>
            </motion.div>
          ))}

          {previewImage && (
            <div className="absolute top-2/2 left-1/2 z-50 pointer-events-auto transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-[900px] max-w-full">
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-2 right-2 cursor-pointer bg-teal-800 text-white rounded-full p-2 hover:bg-opacity-80 z-50"
                >
                  ✕
                </button>
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-[500px] object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
