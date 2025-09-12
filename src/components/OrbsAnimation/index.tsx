import { motion } from 'framer-motion';
import React from 'react';

const OrbsAnimation = () => {
  const orbVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.05, 1],
      transition: { duration: 15, repeat: Infinity, ease: 'linear' as const },
    },
  };
  return (
    <>
      <motion.div
        variants={orbVariants}
        animate="animate"
        className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-amber-400 to-red-400 rounded-full opacity-25 filter blur-xl"
      />
      <motion.div
        variants={orbVariants}
        animate="animate"
        className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-red-500 to-white rounded-full opacity-20 filter blur-xl"
      />
    </>
  );
};

export default OrbsAnimation;
