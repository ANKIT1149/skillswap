/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, UserX } from 'lucide-react';
import { GetUserService } from '@/services/GetUserService';
import { FetchBlockedUserService } from '@/services/FetchBlockedUserService';
import toast from 'react-hot-toast';
import { UnBlockUserService } from '@/services/UnBlockUserService';

interface BlockedUser {
  $id: string;
  username: string;
  profilePictureurl: string;
  userId?: string;
}

const ViewBlockedUsers = () => {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlockedUser = async () => {
      setLoading(true);
      try {
        const blockerId = await GetUserService();
        const blockedusers = await FetchBlockedUserService(blockerId);

        if (blockedusers) {
          setBlockedUsers(blockedusers);
          toast.success('Blocked User found');
        } else {
            toast.success("No Blocked User found")
        }
      } catch (error) {
        console.log('Error in fetching blocked user', error);
        toast.error('Could not find blocked error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlockedUser();
  }, []);

  const handleUnblock = async (userId: string) => {
    try {
      const blockedusers = await UnBlockUserService(userId);

      if (blockedusers) {
        toast.success('User UnBlocked');
      }
    } catch (error) {
      console.log('Error in fetching blocked user', error);
      toast.error('Could not find blocked error');
    } 
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' as const },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 0 12px rgba(94, 234, 212, 0.7)' },
    tap: { scale: 0.95 },
  };

  const orbVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.05, 1],
      transition: { duration: 15, repeat: Infinity, ease: 'linear' as const },
    },
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#0a0a0a] via-[#004b1a] to-[#0f001f]">
      <motion.div
        variants={orbVariants}
        animate="animate"
        className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-amber-400 to-red-400 rounded-full opacity-25 filter blur-xl"
      />
      <motion.div
        variants={orbVariants}
        animate="animate"
        className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-red-500 to-white rounded-full opacity-20 filter blur-xl"
      />
      {/* Header */}
      <motion.h1
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-extrabold text-center ml-[200px] mt-20 text-coral-600 mb-12 tracking-tight"
        style={{
          textShadow:
            '0 0 12px rgba(239, 68, 68, 0.6), 0 0 24px rgba(239, 68, 68, 0.4)',
        }}
      >
        Manage Your Blocked Users: Take Control!
      </motion.h1>

      {/* Blocked Users List */}
      <div className="flex-1 px-6 py-4 overflow-y-auto ml-[200px]">
        {loading ? (
          <Loader2 className="w-14 h-14 animate-spin flex justify-center items-center ml-[600px] mt-[150px]" />
        ) : (
          <div className="max-w-3xl mx-auto space-y-10">
            <AnimatePresence>
              {blockedUsers.map((user, index) => (
                <motion.div
                  key={user.$id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                  className="relative flex items-center bg-teal-950 bg-opacity-80 backdrop-blur-lg rounded-xl p-4 shadow-xl border border-teal-600"
                >
                  {/* Animated Gradient Border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-xl"
                    style={{
                      background:
                        'linear-gradient(45deg, #14B8A6, #6366F1, #FBBF24, #14B8A6)',
                      backgroundSize: '200% 200%',
                      animation: 'gradientFlow 8s ease infinite',
                    }}
                    initial={{ opacity: 0.2 }}
                    whileHover={{ opacity: 0.5 }}
                  />

                  {/* Content */}
                  <div className="flex items-center w-full z-10">
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-14 h-14 mr-4"
                    >
                      <img
                        src={user.profilePictureurl}
                        alt={user.username}
                        width={56}
                        height={56}
                        className="rounded-full object-cover border-2 border-teal-400"
                      />
                    </motion.div>

                    {/* User Details */}
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {user.username}
                        </h2>
                        <p className="text-sm text-teal-200">Blocked User</p>
                      </div>

                      {/* Unblock Button */}
                      <motion.button
                        onClick={() => handleUnblock(user.userId as string)}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="bg-gradient-to-r cursor-pointer from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
                      >
                        <UserX className="w-5 h-5 inline mr-2" />
                          UnBlock
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {blockedUsers.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-teal-200 text-lg"
              >
                No blocked users found.
              </motion.p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBlockedUsers;
