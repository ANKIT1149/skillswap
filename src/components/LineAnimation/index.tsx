import { motion } from 'framer-motion';
import React from 'react';

const LineAnimation = () => {
  const lineVariants = {
    hidden: { pathLength: 0, stroke: '#9CA3AF' },
    visible: {
      pathLength: 1,
      stroke: '#FFFFFF',
      transition: {
        duration: 2,
        ease: 'easeInOut' as const,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  return (
      <svg
        className="w-full max-w-2xl mb-8 z-10"
        viewBox="0 0 600 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 C150,100 450,0 600,50"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="4"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>
  );
};

export default LineAnimation;
