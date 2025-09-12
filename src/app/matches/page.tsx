'use client';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { GetUserService } from '@/services/GetUserService';
import { FetchSkillToTeachService } from '@/services/FetchSkillToTeachService';
import axios from 'axios';
import toast from 'react-hot-toast';
import { StoreSkillWantToTeach } from '@/services/StoreSkillWantToTeach';
import { StoreSkillWantToLearn } from '@/services/StoreSkillWantToLearnServices';
import { useRouter } from 'next/navigation';

const CreatingMatches = () => {
  const textControls = useAnimation();
  const [displayedText, setDisplayedText] = useState('');
  const [fullText, setFullText] = useState('Please Wait, Creating Matches...');
  const [isTypingForward, setIsTypingForward] = useState(true);
    const router = useRouter();

  useEffect(() => {
    let i = 0;
    const typingSpeed = 100;

    const typingInterval = setInterval(
      () => {
        if (isTypingForward) {
          if (i <= fullText.length) {
            setDisplayedText(fullText.slice(0, i));
            i++;
          } else {
            setIsTypingForward(false);
            i = fullText.length;
          }
        } else {
          if (i >= 0) {
            setDisplayedText(fullText.slice(0, i));
            i--;
          } else {
            setIsTypingForward(true);
            i = 0;
          }
        }
      },
      isTypingForward ? typingSpeed : typingSpeed / 2
    );

    return () => clearInterval(typingInterval);
  }, [isTypingForward]);

  useEffect(() => {
    textControls.start({
      textShadow: [
        '0 0 10px rgba(239, 68, 68, 0.5)',
        '0 0 20px rgba(239, 68, 68, 0.8)',
        '0 0 10px rgba(239, 68, 68, 0.5)',
      ],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    });
  }, [textControls]);

  const orbVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.1, 1],
      transition: { duration: 12, repeat: Infinity, ease: 'linear' as const },
    },
  };

  const loaderVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  useEffect(() => {
    const FetchEmbeddingData = async () => {
      try {
        const userId = await GetUserService();
        const skillwanttolearn = await FetchSkillToTeachService(userId);

        console.log('SkillWantToLearn:', skillwanttolearn.skillWantTolearn);

        if (skillwanttolearn) {
          const response = await axios.post('/api/skilltoteach', {
            skillWantTolearn: skillwanttolearn.skillWantTolearn,
          });

          if (response.status === 200) {
            const matches = response.data.result;
            const savedTeachDoc = await StoreSkillWantToLearn({
              currentUserId: userId,
              skillsToLearn: skillwanttolearn.skillWantTolearn,
              pineconeMatches: matches,
            });
            console.log(savedTeachDoc);
            console.log('savedTeachDoc', matches);
          }
        }
      } catch (error) {
        console.log('error in sending embedding data', error);
        toast.error('Fetch failed');
      }
    };

    FetchEmbeddingData();
  }, []);

  useEffect(() => {
    const FetchLearnerEmbeddingData = async () => {
      try {
        const userId = await GetUserService();
        const skillwanttolearn = await FetchSkillToTeachService(userId);

        console.log('SkillWantToLearn:', skillwanttolearn.skillcanTeach);

        if (skillwanttolearn) {
          const response = await axios.post('/api/skilltolearn', {
            skillWantToteach: skillwanttolearn.skillcanTeach,
          });

          if (response.status === 200) {
            toast.success('Fetch success');
            const data = response.data.result;
            const savedTeachDoc = await StoreSkillWantToTeach({
              currentUserId: userId,
              skillsToTeach: skillwanttolearn.skillcanTeach,
              pineconeMatches: data,
            });
            setFullText('Match Created.Redirecting To Dashboard....');
            console.log(savedTeachDoc);
            toast.success("Match Creeated Successfully")
            router.push(`dashboard/teachermatched`)
          }
        }
      } catch (error) {
        console.log('error in sending embedding data', error);
        toast.error('Fetch failed');
      }
    };

    FetchLearnerEmbeddingData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-amber-700 overflow-hidden relative py-12">
      <motion.div
        variants={orbVariants}
        animate="animate"
        className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-coral-400 to-red-500 rounded-full opacity-30 filter blur-xl"
        style={{ transformOrigin: 'center' }}
      />
      <motion.div
        variants={orbVariants}
        animate="animate"
        className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-peach-300 to-coral-500 rounded-full opacity-25 filter blur-xl"
        style={{ transformOrigin: 'center' }}
      />
      <motion.div
        variants={orbVariants}
        animate="animate"
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-red-400 to-coral-600 rounded-full opacity-20 filter blur-lg"
        style={{ transformOrigin: 'center' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center"
      >

        <motion.div
          variants={loaderVariants}
          animate="animate"
          className="mx-auto mb-8 w-20 h-20"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: '#F87171', stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: '#DC2626', stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.h1
          animate={textControls}
          className="text-5xl font-extrabold text-coral-600 mb-6"
        >
          {displayedText}
          <span className="animate-blink">|</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl mt-4 text-gray-700 max-w-lg mx-auto"
        >
          We're crafting perfect skill matches for you!
        </motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 text-4xl font-medium text-white z-10 font-serif"
      >
        SkillSwap.io
      </motion.p>

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
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
        .animate-spin-slow {
          animation: spinSlow 4s linear infinite;
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default CreatingMatches;
