/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from '../ChatMessage';
import ChatBottom from '../chatbottom/page';
import { useParams, useSearchParams } from 'next/navigation';
import { Message } from '@/props/ChatMessage';
import { SaveChatMessageService } from '@/services/SaveChatMesageService';
import { GetUserService } from '@/services/GetUserService';
import { CheckChatExsistService } from '@/services/CheckChatexsistService';
import toast from 'react-hot-toast';
import { UploadImageService } from '@/services/UploadImageService';
import { GetProfileImageUrl } from '@/services/GetProfileImageService';
import { SaveCollectionService } from '@/services/SaveCollectionService';
import { client } from '@/db/Appwrite';
import ChatTop from '../ChatTop';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [resources, setResources] = useState('');
  const searchParams = useSearchParams();
  const shouldFetch = searchParams.get('return') === 'true';
  const { id }: any = useParams();
  const [isRecording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!id) return;

    const unsubscribe = client.subscribe(
      `databases.${process.env.NEXT_PUBLIC_DATABSE_ID}.tables.${process.env.NEXT_PUBLIC_MESSAGE_COLLECTION_ID}.rows`,
      (response) => {
        console.log('Realtime event:', response);

        if (response.events.some((e) => e.endsWith('.create'))) {
          const newMsg: any = response.payload;
          if (newMsg.chatId !== id) return;

          const processMessage = async () => {
            let resourceUrl: string | null = null;

            if (newMsg.hasResources) {
              resourceUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${newMsg.fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
            }

            setMessages((prev) => {
              if (prev.some((msg) => msg.$id === newMsg.$id)) return prev;
              return [...prev, { ...newMsg, resourceUrl }];
            });
          };

          processMessage();
        }
      }
    );

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const fetchMessageData = async () => {
      console.log('running');
      if (shouldFetch) {
        const fetchData = await CheckChatExsistService(id);
        console.log(fetchData);
        setMessages(
          fetchData
            ? fetchData.map((row: any) => ({
                $id: row.$id,
                chatId: row.chatId,
                sender: row.sender,
                message: row.message,
                timestamp: row.timestamp,
                type: row.type,
                fileId: row.fileId,
              }))
            : []
        );
      } else {
        console.log('Creating New Chat');
      }
    };

    fetchMessageData();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const userId = await GetUserService();
      setNewMessage('');
      const newMsg: Message = {
        chatId: id,
        sender: userId,
        message: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text',
        hasResources: false,
      };
      const saveMessage = await SaveChatMessageService(newMsg);
      console.log(saveMessage);
      setNewMessage('');
    } catch (error) {
      console.log('Error in saving message', error);
    }
  };

  const handleFileUpload = (type: 'image' | 'voice' | 'video') => {
    try {
      const input = document.createElement('input');
      input.type = 'file';

      if (type === 'image') input.accept = 'image/**';
      if (type === 'voice') input.accept = 'audio/';
      if (type === 'video') input.accept = 'video/';

      input.onchange = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return toast.error('Please provide file');

        const uploadImage = await UploadImageService(file);
        const getfileId = await GetProfileImageUrl(uploadImage);

        const userId = await GetUserService();
        const newMsg: Message = {
          chatId: id,
          sender: userId,
          message: '',
          timestamp: new Date().toISOString(),
          type: type,
          hasResources: true,
          fileId: getfileId,
        };

        const saveMessage = await SaveChatMessageService(newMsg);

        const saveCollection = await SaveCollectionService({
          messageId: saveMessage.$id,
          chatId: id,
          fileId: uploadImage,
          resourceUrl: getfileId,
          timestamp: new Date().toISOString(),
        });

        setResources(saveCollection.$id);

        setMessages((prev) => [
          ...prev,
          {
            ...newMsg,
            $id: saveMessage.$id,
            hasResources: true,
            fileId: uploadImage,
          },
        ]);
      };

      input.click();
    } catch (error) {
      console.log('Error in getting data', error);
      toast.error('Error in uploading file');
    }
  };

  const StartRecording = async() => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)

    mediaRecorderRef.current = mediaRecorder
    audioChunks.current = []

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
         audioChunks.current.push(event.data)
       }
    }

    mediaRecorder.onstop = async () => {
      const audioblob = new Blob(audioChunks.current, { type: "mimeType" })
      const file = new File([audioblob], `voice-${Date.now()}.webm`, {
        type: 'mimeType'
      })
      
      const userId = await GetUserService()
      const upload = await UploadImageService(file)
      const fileId = await GetProfileImageUrl(upload)

      const newMsg: Message = {
        chatId: id,
        sender: userId,
        message: '',
        timestamp: new Date().toISOString(),
        type: 'voice',
        hasResources: true,
        fileId: fileId,
      }

      await SaveChatMessageService(newMsg)

    }

    mediaRecorder.start()
    setRecording(true)
  }
  
  const stopRecording = () => {
  if (mediaRecorderRef.current && isRecording) {
    mediaRecorderRef.current.stop();
    setRecording(false);
  }
};
  return (
      <div className="flex flex-col mx-auto ml-[258px] w-[1285px] overflow-hidden bg-gradient-to-br from-teal-900 via-indigo-900 to-teal-800">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-indigo-500 opacity-20 filter blur-3xl"
        />

        <ChatTop />

        <ChatMessage chatContainerRef={chatContainerRef} messages={messages} />

        <ChatBottom
          handleSendMessage={handleSendMessage}
          handleFileUpload={handleFileUpload}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          StartRecording={StartRecording}
          stopRecording={stopRecording}
          isRecording={isRecording}
        />
      </div>
  );
};
export default Chat;
