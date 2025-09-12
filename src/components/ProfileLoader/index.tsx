import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React from 'react';
import OrbsAnimation from '../OrbsAnimation';

const ProfileLoader = () => {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-y-auto bg-gradient-to-br from-[#0a0a0a] via-[#004b1a] to-[#0f001f] py-12 px-20">
      <OrbsAnimation />
      <Loader2 className="w-14 ml-[300px] h-14 animate-spin text-red-800" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-teal-200 text-lg ml-[300px]"
      >
        Loading Data...
      </motion.p>
    </div>
  );
};

export default ProfileLoader;
