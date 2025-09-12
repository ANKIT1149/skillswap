import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Send, Paperclip, Mic, Image as ImageIcon, Smile } from 'lucide-react';

interface ChatBottomProps {
  handleFileUpload: (type: 'image' | 'voice' | 'video') => void;
  handleSendMessage: () => void;
  newMessage: string;
  setNewMessage: (msg: string) => void;
  StartRecording: () => void;
  stopRecording: () => void;
  isRecording: boolean;
}

const ChatBottom: React.FC<ChatBottomProps> = ({
  handleFileUpload,
  handleSendMessage,
  newMessage,
  setNewMessage,
  StartRecording,
  stopRecording,
  isRecording,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputVariants = {
    focus: { scale: 1.02, boxShadow: '0 0 12px rgba(94, 234, 212, 0.5)' },
  };

  const toggleRecording = () => {
  if (isRecording) {
    stopRecording();
  } else {
    StartRecording();
  }
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-[-5px] bg-teal-800 z-40 bg-opacity-95 backdrop-blur-lg px-6 py-4 shadow-lg"
    >
      <div className="flex items-center space-x-3">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-teal-200"
          onClick={() => handleFileUpload('image')}
        >
          <ImageIcon className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: '0 6px 12px rgba(0, 128, 128, 0.2)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleRecording}
          className={`
        relative p-4 rounded-full bg-gradient-to-br from-teal-700 to-teal-900 
        text-white shadow-md hover:shadow-lg 
        transition-all duration-200
      `}
        >
      
          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.7, 0.1, 0.7],
                boxShadow: [
                  '0 0 10px rgba(239, 68, 68, 0.4)',
                  '0 0 20px rgba(239, 68, 68, 0.2)',
                  '0 0 10px rgba(239, 68, 68, 0.4)',
                ],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
          {/* Secondary ripple effect for extra flair */}
          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-300"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.1, 0.5],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3,
              }}
            />
          )}

          {/* Mic icon */}
          <Mic
            className={`
          w-7 h-7 relative z-10 transition-colors duration-300
          ${isRecording ? 'text-red-300' : 'text-white'}
        `}
          />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-teal-200"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <Smile className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-teal-200"
          onClick={() => handleFileUpload('image')}
        >
          <Paperclip className="w-6 h-6" />
        </motion.button>
        <motion.input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 w-[977px] px-4 py-2 bg-teal-900 text-white border border-teal-600 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          whileFocus="focus"
          variants={inputVariants}
        />
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 12px rgba(94, 234, 212, 0.7)',
          }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSendMessage}
          className="p-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full"
        >
          <Send className="w-6 h-6" />
        </motion.button>
      </div>
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-teal-950 rounded-lg p-4 shadow-lg z-20"
          >
            <p className="text-teal-200">
              Emoji picker placeholder (integrate emoji-mart)
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatBottom;
