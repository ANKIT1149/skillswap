import { motion, Variants } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import React from 'react';

interface ProfileLearn {
  cardVariants: Variants;
  skillsToLearn: string[];
}

const ProfileLearnComponent = ({
  cardVariants,
  skillsToLearn,
}: ProfileLearn) => {
  return (
    <motion.div
      custom={1}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-teal-950 hover:scale-105 cursor-pointer transition-all bg-opacity-80 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-teal-600"
    >
      <div className="flex items-center mb-4">
        <BookOpen className="w-6 h-6 text-teal-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">
          Skills I Want to Learn
        </h2>
      </div>
      <ul className="space-y-2">
        {skillsToLearn.map((skill, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="text-teal-200"
          >
            • {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ProfileLearnComponent;
