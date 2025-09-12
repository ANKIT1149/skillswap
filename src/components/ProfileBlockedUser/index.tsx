import { motion, Variants } from 'framer-motion';
import { ShieldOff } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ProfileBlocked {
  cardVariants: Variants;
  buttonVariants: Variants;
  blockedUsersCount: number;
}

const ProfileBlockedUser = ({
  cardVariants,
  buttonVariants,
  blockedUsersCount,
}: ProfileBlocked) => {
  return (
    <motion.div
      custom={3}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-teal-950 hover:scale-105 cursor-pointer transition-all bg-opacity-80 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-teal-600"
    >
      <div className="flex items-center mb-4">
        <ShieldOff className="w-6 h-6 text-teal-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">Blocked Users</h2>
      </div>
      <p className="text-teal-200 mb-4">
        {blockedUsersCount
          ? `${blockedUsersCount} users blocked`
          : 'No Blocked Users found'}
      </p>
      {blockedUsersCount ? (
        <Link href="viewblock">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-gradient-to-r hover:scale-105 cursor-pointer transition-all from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
          >
            See Blocked Users
          </motion.button>
        </Link>
      ) : (
        ''
      )}
    </motion.div>
  );
};

export default ProfileBlockedUser;
