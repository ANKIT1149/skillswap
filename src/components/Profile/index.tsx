import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import ProfileActionButton from '../ProfileActionButton';
import OrbsAnimation from '../OrbsAnimation';
import ProfileLoader from '../ProfileLoader';
import ProfileTopSection from '../ProfileTopSection';
import ProfileTeachComponent from '../ProfileTeachComponent';
import ProfileLearnComponent from '../ProfileLearnComponent';
import AverageRating from '../AverageRating';
import ProfileBlockedUser from '../ProfileBlockedUser';
import ProfileCompleted from '../ProfileCompleted';
import { GetUserService } from '@/services/GetUserService';
import { GetUserRow } from '@/utils/GetUserRow';
import { CalculateAverageRatingService } from '@/services/CalculateAverageRatingService';
import { CountBlockedUserService } from '@/services/CountBlockedUserService';

export interface User {
  id?: string;
  username: string;
  bio?: string;
  profilePictureurl: string;
  skillcanTeach: [string];
  skillWantTolearn: [string];
  averageRating?: number;
  blockedUsersCount?: number;
}

const ProfileDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await GetUserService();
        setUserId(user);
        const userdata = await GetUserRow(user);
        if (userdata) {
          const mappedUser: User = {
            username: userdata.username,
            profilePictureurl: userdata.profilePictureurl,
            skillcanTeach: userdata.skillcanTeach,
            skillWantTolearn: userdata.skillWantTolearn,
          };

          setUser(mappedUser);
        }
      } catch (error) {
        console.log('error in fetching user', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleCalculating = async () => {
      if (userId) {
        const averageRating = await CalculateAverageRatingService(userId);
        if (!averageRating) {
          setUser((prev) => (prev ? { ...prev, averageRating: 0 } : prev));
        } else {
          setUser((prev) =>
            prev ? { ...prev, averageRating: averageRating } : prev
          );
        }
        console.log(averageRating);
      }
    };

    handleCalculating();
  }, [userId]);

  useEffect(() => {
    const handleblocked = async () => {
      const user = await GetUserService();
      const fetchblock = await CountBlockedUserService(user);
      if (fetchblock) {
        setUser((prev) =>
          prev ? { ...prev, blockedUsersCount: fetchblock } : prev
        );
      }
    };

    handleblocked();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' as const },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 0 12px rgba(94, 234, 212, 0.7)' },
    tap: { scale: 0.95 },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  if (!user) {
    return <ProfileLoader />;
  }

  return (
    <div className="relative min-h-screen overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#004b1a] to-[#0f001f] py-12 px-20">
      <OrbsAnimation />
      <motion.h1
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-extrabold text-center ml-[200px] font-serif text-coral-600 mb-12 tracking-tight"
        style={{
          textShadow:
            '0 0 12px rgba(239, 68, 68, 0.6), 0 0 24px rgba(239, 68, 68, 0.4)',
        }}
      >
        Your Data InYour Hand! See It Edit It Or Update It
      </motion.h1>

      <div className="flex-1 px-6 py-4 overflow-y-auto ml-[100px]">
        <div className="max-w-3xl mx-auto space-y-8">
          <ProfileTopSection
            profilePictureUrl={user.profilePictureurl}
            username={user.username}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileTeachComponent
              cardVariants={cardVariants}
              skillcanTeach={user.skillcanTeach}
            />

            <ProfileLearnComponent
              cardVariants={cardVariants}
              skillsToLearn={user.skillWantTolearn}
            />

            <AverageRating
              cardVariants={cardVariants}
              averageRating={user?.averageRating as number}
            />

            <ProfileBlockedUser
              cardVariants={cardVariants}
              buttonVariants={buttonVariants}
              blockedUsersCount={user?.blockedUsersCount as number}
            />

            <ProfileCompleted cardVariants={cardVariants} />
          </div>

          <ProfileActionButton
            buttonVariants={buttonVariants}
            cardVariants={cardVariants}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
