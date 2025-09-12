import { motion, Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import React from 'react';

interface Average {
  cardVariants: Variants;
  averageRating: number;
}
const AverageRating = ({ cardVariants, averageRating }: Average) => {
  return (
    <motion.div
      custom={2}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-teal-950 hover:scale-105 cursor-pointer transition-all bg-opacity-80 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-teal-600"
    >
      <div className="flex items-center mb-4">
        <Star className="w-6 h-6 text-teal-400 mr-2" fill="#FBBF24" />
        <h2 className="text-xl font-semibold text-white">Average Rating</h2>
      </div>
      <p className="text-2xl font-bold text-teal-200">
              {averageRating ? averageRating.toFixed(1) : 'No Rating Found'}
      </p>
      <div className="flex mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5"
            fill={i < Math.round(averageRating) ? '#FBBF24' : 'none'}
            stroke="#FBBF24"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AverageRating;
