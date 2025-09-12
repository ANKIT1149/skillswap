/* eslint-disable @next/next/no-img-element */
'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackgroundImagePattern from '../BackgroundImagePattern';
import BannerParticle from '../BannerParticle';

const CTABanner = () => {
  const [userCount, setUserCount] = useState(10000);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount((prev) => prev + Math.floor(Math.random() * 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const headlineText = 'Join the SkillSwap Revolution Today!';

  return (
    <section
      id="cta-banner"
      className="relative w-full mx-auto px-6 sm:px-8 py-32 min-h-[500px] overflow-hidden"
      aria-label="SkillSwap Call to Action"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900 -z-20" />

      <BackgroundImagePattern />
      <BannerParticle />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-5xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight"
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
        >
          {headlineText.split('').map((char, i) => (
            <motion.span key={i} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h2>
        <motion.p
          className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Learn or Teach Any Skill with AI-Powered Matches & Real-Time
          Collaboration
        </motion.p>
        <motion.div
          className="relative w-full h-64 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="SkillSwap collaboration network"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-xl"
            quality={75}
            loading="lazy"
          />
        </motion.div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/signup">
              <motion.button
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg min-h-[60px]"
                whileHover={{ boxShadow: '0 0 15px rgba(99, 102, 241, 0.6)' }}
                transition={{ duration: 0.3 }}
                aria-label="Sign up for free"
              >
                Sign Up Free
              </motion.button>
            </Link>
            <motion.div
              className="absolute -top-32 left-1/2 -translate-x-1/2 bg-gray-900/80 p-2 rounded-lg text-gray-100 text-sm w-48 opacity-0 pointer-events-none"
              whileHover={{ opacity: 1, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              Preview: Join now to access AI-powered skill matching and
              real-time chat!
            </motion.div>
          </motion.div>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/pricing">
              <motion.button
                className="px-8 py-4 bg-gray-700 text-white rounded-lg font-semibold text-lg min-h-[60px]"
                whileHover={{
                  boxShadow: '0 0 15px rgba(99, 102, 241, 0.6)',
                  backgroundColor: '#4B5563',
                }}
                transition={{ duration: 0.3 }}
                aria-label="Explore premium features"
              >
                Explore Premium Features
              </motion.button>
            </Link>
            <motion.div
              className="absolute -top-32 left-1/2 -translate-x-1/2 bg-gray-900/80 p-2 rounded-lg text-gray-100 text-sm w-48 opacity-0 pointer-events-none"
              whileHover={{ opacity: 1, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              Preview: Unlock unlimited matches, AI workspace, and video calls!
            </motion.div>
          </motion.div>
        </div>
        <motion.p
          className="text-gray-400 mt-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Join {userCount.toLocaleString()}+ users already swapping skills!
        </motion.p>
      </div>
    </section>
  );
};

export default CTABanner;
