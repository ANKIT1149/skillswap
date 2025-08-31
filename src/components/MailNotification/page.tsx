
"use client"
import { motion } from 'framer-motion';
import Canvas from '../Canvas';

const EmailNotification = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  const handleOpenGmail = () => {
    window.open('https://mail.google.com', '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative">
      <Canvas />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-20 animate-gradient-shift" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-gray-800 bg-opacity-90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-600 flex flex-col items-center"
      >
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 mb-6">
          SkillSwap
        </h1>
        <p className="text-lg text-gray-200 text-center mb-8">
          The verification link has been sent to your email
        </p>
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 15px rgba(129, 140, 248, 0.7)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenGmail}
          className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
        >
          Open Gmail
        </motion.button>
        <p className="text-sm text-gray-300 mt-6">skillswap.io</p>
      </motion.div>

      {/* Custom Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 12s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default EmailNotification;
