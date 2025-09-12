/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import React from 'react';

interface ProfileTopSection{
    profilePictureUrl: string;
    username: string
}
const ProfileTopSection = ({ profilePictureUrl, username }: ProfileTopSection) => {
  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.div
        variants={avatarVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-32 h-32"
      >
        <img
          src={profilePictureUrl}
          alt={username}
          width={128}
          height={128}
          className="rounded-full object-cover border-4 border-teal-400 shadow-lg"
        />
      </motion.div>
      <h1
        className="text-3xl font-serif font-extrabold text-white mt-4"
        style={{
          textShadow:
            '0 0 12px rgba(94, 234, 212, 0.6), 0 0 24px rgba(94, 234, 212, 0.4)',
        }}
      >
        {username}
      </h1>
    </motion.div>
  );
};

export default ProfileTopSection;
