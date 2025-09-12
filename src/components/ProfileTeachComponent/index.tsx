import { motion, Variants } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import React from 'react';

interface ProfileTeach {
  cardVariants: Variants;
  skillcanTeach: string[];
}
const ProfileTeachComponent = ({
  cardVariants,
  skillcanTeach,
}: ProfileTeach) => {
  return (
    <motion.div
      custom={0}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-teal-950 hover:scale-105 cursor-pointer transition-all bg-opacity-80 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-teal-600"
    >
      <div className="flex items-center mb-4">
        <BookOpen className="w-6 h-6 text-teal-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">Skills I Can Teach</h2>
      </div>
      <ul className="space-y-2">
        {skillcanTeach.map((skills, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-teal-200"
          >
            • {skills}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ProfileTeachComponent;
