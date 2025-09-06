import { motion } from 'framer-motion';
import MatchedTeachersCard from '../matchedTeacherCard/page';

const MatchedTeachers = () => {
  // Animation variants for header
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  const orbVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.05, 1],
      transition: { duration: 15, repeat: Infinity, ease: 'linear' as const },
    },
  };


  return (
   <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#004b1a] to-[#0f001f] py-12 px-20">
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
      <motion.h1
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-extrabold text-center ml-[200px] text-coral-600 mb-12 tracking-tight"
        style={{
          textShadow:
            '0 0 12px rgba(239, 68, 68, 0.6), 0 0 24px rgba(239, 68, 68, 0.4)',
        }}
      >
        Connect with Your Ideal Teachers!
      </motion.h1>
          <MatchedTeachersCard />
    </div>
  );
};

export default MatchedTeachers;
