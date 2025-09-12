import { motion, Variants } from 'framer-motion';
import { User } from 'lucide-react';
import React from 'react';

interface ProfileCompletedProps {
  cardVariants: Variants;
}

const ProfileCompleted = ({ cardVariants }: ProfileCompletedProps) => {

  return (
    <motion.div
      custom={5}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-teal-950 hover:scale-105 cursor-pointer transition-all bg-opacity-80 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-teal-600"
    >
      <div className="flex items-center mb-4">
        <User className="w-6 h-6 text-teal-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">
          Profile Completeness
        </h2>
      </div>
      <p className="text-teal-200">85% complete</p>
      <motion.div
        className="mt-2 h-2 bg-teal-900 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `85%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="h-full bg-teal-400 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default ProfileCompleted;
