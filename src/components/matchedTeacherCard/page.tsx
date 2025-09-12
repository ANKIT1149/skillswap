/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { User, Mail, BookOpen, Loader2 } from 'lucide-react';
import { FetchMatchandUserService } from '@/services/FetchMatchandUserService';
import { GetUserService } from '@/services/GetUserService';
import { CheckChatExsistService } from '@/services/CheckChatexsistService';
import { useRouter } from 'next/navigation';
import { CheckUnReadService } from '@/services/CheckUnReadService';

interface Teacher {
  matchId: string;
  userData: {
    profilePictureurl: string;
    username: string;
    bio: string;
    skillcanTeach: [];
  };
  skills: [];
  otherUserId: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const MatchedTeachersCard = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const router = useRouter();
  const [unreadCounts, setUnreadCounts] = useState<{
    [chatId: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const userId = await GetUserService();
      const match = await FetchMatchandUserService(userId);
      setTeachers(match);
      console.log(match);
    };

    fetchData();
  }, []);

  const handleRedirecting = async (matchId: string): Promise<void> => {
    const query = await CheckChatExsistService(matchId);
    if (!query) {
      router.push(`chat/${matchId}?return=false`);
    } else {
      console.log('data found');
      router.push(`chat/${matchId}?return=true`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = await GetUserService();
      const chatIds = teachers.map((item) => item.matchId);

      const counts: { [chatId: string]: number } = {};

      for (const chatId of chatIds) {
        const result = await CheckUnReadService(chatId, userId);
        counts[chatId] = result;
      }

      setUnreadCounts(counts);
      console.log('teachers state:', teachers);
      console.log('chatIds:', chatIds);
      console.log('unreadCounts before set:', counts);
    };

    if (teachers.length > 0) {
      fetchData();
    }
  }, [teachers]);

  return (
    <div className="max-w-4xl ml-[370px] space-y-8">
      {teachers.length > 0 ? (
        teachers
          .filter((t) => t.userData)
          .map((teacher, index) => (
            <motion.div
              key={teacher.matchId}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.02,
                boxShadow:
                  '0 12px 24px rgba(239, 68, 68, 0.3), 0 0 12px rgba(239, 68, 68, 0.2)',
                transition: { duration: 0.3 },
                cursor: 'pointer',
              }}
              className="relative flex bg-[#111111] z-10 rounded-xl p-6 shadow-xl overflow-hidden border-l-4 border-[#ff7f50]"
            >
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-xl"
                style={{
                  background:
                    'linear-gradient(45deg, #F87171, #DC2626, #FBBF24, #F87171)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientFlow 8s ease infinite',
                }}
                initial={{ opacity: 0.2 }}
                whileHover={{ opacity: 0.5 }}
              />

              <div className="absolute top-4 right-4 z-20">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRedirecting(teacher.matchId)}
                  className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#ff7f50]/30 hover:bg-[#ff7f50]/10 transition-colors duration-200 cursor-pointer"
                  title="View Messages"
                >
                  <Mail className="w-5 h-5 text-[#ff7f50]" />
                  {unreadCounts[teacher.matchId] > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-gradient-to-r from-[#ff7f50] to-red-600 rounded-full">
                      {unreadCounts[teacher.matchId] > 99
                        ? '99+'
                        : unreadCounts[teacher.matchId]}
                    </span>
                  )}
                </motion.div>
              </div>

              <div className="flex items-center w-full z-10">
                <div className="flex-shrink-0 w-20 h-20 mr-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={
                        teacher.userData.profilePictureurl
                          ? teacher.userData.profilePictureurl
                          : ''
                      }
                      alt="profile"
                      className="rounded-full object-cover border-2 border-coral-300"
                    />
                  </motion.div>
                </div>

                <div className="flex-1 flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center ml-5 mb-5">
                      <User className="w-10 h-10 text-[#ff7f50] mr-2" />
                      <h2 className="text-xl font-semibold text-white font-serif">
                        {teacher.userData.username}
                      </h2>
                    </div>
                    <div className="flex items-center ml-5 mb-5">
                      <BookOpen className="w-10 h-10 text-[#ff7f50] mr-2" />
                      <p className="text-gray-200 text-md font-normal font-serif">
                        <strong>Skill:</strong>{' '}
                        {teacher.userData.skillcanTeach.join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center ml-5 mb-5">
                      <Mail className="w-10 h-10 text-[#ff7f50] mr-2" />
                      <p className="text-white text-lg font-serif">
                        <strong>Rating:</strong> Very Good
                      </p>
                    </div>
                    <p className="text-white font-serif ml-5 text-md max-w-md">
                      <strong>Bio:</strong> {teacher.userData.bio}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 12px rgba(239, 68, 68, 0.7)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRedirecting(teacher.matchId)}
                    className="bg-gradient-to-r from-[#ff7f50] to-red-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer"
                  >
                    Start Learning Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
      ) : (
        <div className="flex justify-center items-center mt-[100px]">
          <Loader2 className="animate-spin w-10 h-10" />
        </div>
      )}
    </div>
  );
};

export default MatchedTeachersCard;
