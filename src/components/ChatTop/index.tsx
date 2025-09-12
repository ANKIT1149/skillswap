/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { MoreVertical, Flag, UserX, Settings } from 'lucide-react';
import { GetUserService } from '@/services/GetUserService';
import { CheckOnlineOrNot } from '@/utils/CheckOnline';
import { useParams, useRouter } from 'next/navigation';
import { GetTeacherIdService } from '@/services/GetTeacherIdService';
import { BlockedService } from '@/services/BlockedService';
import toast from 'react-hot-toast';
import { GetAnotherUserProfile } from '@/services/GetAnotherUserProfileService';
import ReportPopup from '../Report';
import { ReportService } from '@/services/ReportServices';

export interface Recipient {
  $id: string;
  username: string;
  profilePictureurl?: string;
  lastSeen?: string;
  userId?: string;
}

const ChatTop = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [onlineUser, setIsOnlineUser] = useState(false);
  const [mockRecipient, setMockReciepient] = useState<Recipient>();
  const [currentUser, setCurrentUser] = useState('');
  const [showReportPopup, setShowReportPopup] = useState(false);

  const { id }: any = useParams();

  const router = useRouter();

  useEffect(() => {
    const getUserandCheckOnline = async () => {
      try {
        const userId = await GetUserService();
        setCurrentUser(userId);
        const userDataArray = await GetAnotherUserProfile(id, userId);
        const userData = Array.isArray(userDataArray)
          ? userDataArray[0]
          : userDataArray;
        setMockReciepient(
          userData
            ? {
                $id: userData.$id,
                username: userData.username,
                profilePictureurl: userData.profilePictureurl,
                lastSeen: userData.lastSeen,
                userId: userData.userId,
              }
            : undefined
        );
      } catch (error) {
        console.log('Error in Getting data', error);
      }
    };

    getUserandCheckOnline();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const userId = await GetUserService();
      const isOnline = await CheckOnlineOrNot(userId);
      setIsOnlineUser(isOnline);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleMenuAction = (action: 'report' | 'block' | 'settings') => {
    if (action === 'report') {
      setShowReportPopup(true);
    } else {
      console.log(`Action: ${action}`);
    }
    setShowMenu(false);
  };

  const handleReportSubmit = async (reportType: string) => {
    try {
      const sendReport = await ReportService({
        chatId: id,
        reportedBy: currentUser,
        reportedUser: mockRecipient?.userId as string,
        message: reportType,
      });

      if (sendReport) {
        console.log(`Reporting user for: ${reportType}`);
        toast.success(`Reported user for ${reportType}`);
      }
    } catch (error) {
      console.log('Error in Submitting report', error);
      toast.error('Sending report failed');
    }
  };

  const handleRating = async () => {
    const getId = await GetTeacherIdService(id!, currentUser);
    router.replace(`/dashboard/rated/${getId}`);
  };

  const handleBlock = async (blockedId: string) => {
    console.log('blockedID', blockedId);
    const blockedUser = await BlockedService(currentUser, blockedId);
    toast.success('User Blocked Successfully');
    console.log('blockedUser', blockedUser);
    router.replace(`/dashboard/viewblock`);
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-[1285px] top-0 z-50 bg-teal-950 bg-opacity-95  backdrop-blur-lg px-6 py-4 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 mr-4"
          >
            <img
              src={mockRecipient?.profilePictureurl}
              alt={mockRecipient?.username}
              width={48}
              height={48}
              className="rounded-full object-cover border-2 border-teal-400"
            />
          </motion.div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {mockRecipient?.username}
            </h2>
            <p className="text-sm text-teal-200">
              {onlineUser ? (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  Online
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-700 rounded-full mr-2 animate-pulse" />
                  Offline
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-teal-200"
          >
            <MoreVertical className="w-6 h-6" />
          </motion.button>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute right-5 mt-2 w-48 bg-teal-950 rounded-lg shadow-xl z-50"
              >
                <button
                  onClick={() => handleMenuAction('report')}
                  className="flex items-center w-full px-4 py-2 text-sm text-teal-200 hover:bg-teal-800"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Report User
                </button>
                <button
                  onClick={() => handleBlock(mockRecipient?.userId as string)}
                  className="flex items-center w-full px-4 py-2 text-sm text-teal-200 hover:bg-teal-800"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Block
                </button>

                <button
                  onClick={handleRating}
                  className="flex items-center w-full px-4 py-2 text-sm text-teal-200 hover:bg-teal-800"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Rate Your Teacher
                </button>
                <button
                  onClick={() => handleMenuAction('settings')}
                  className="flex items-center w-full px-4 py-2 text-sm text-teal-200 hover:bg-teal-800"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showReportPopup && (
          <ReportPopup
            onClose={() => setShowReportPopup(false)}
            onSubmit={handleReportSubmit}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatTop;
