/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useMemo } from 'react';
import BackgroundImagePattern from '../BackgroundImagePattern';
import BannerParticle from '../BannerParticle';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const controls = useAnimation();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSuccess(true);
    setEmail('');
    setTimeout(() => setSuccess(false), 3000);
  };

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

  const headlineText = 'Stay Updated with New Features';

  const formData = useMemo(
    () => ({ email, error, success }),
    [email, error, success]
  );

  return (
    <section
      id="newsletter"
      className="relative w-full mx-auto px-6 sm:px-8 py-32 min-h-[500px] overflow-hidden"
      aria-label="SkillSwap Newsletter Signup"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900 -z-20" />

      <BackgroundImagePattern />

      <BannerParticle />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-5xl font-extrabold text-white mb-6 tracking-tight"
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
          className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Join our newsletter to get the latest on AI-powered skill swapping,
          exclusive tips, and community updates.
        </motion.p>
        <motion.div
          className="w-[900px] mx-auto p-6 bg-gray-900/50 backdrop-blur-lg rounded-xl shadow-2xl border border-indigo-600/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 outline-none min-h-[60px]"
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
              }}
              transition={{ duration: 0.3 }}
              aria-label="Email address for newsletter"
            />
            <motion.button
              onClick={handleSubmit}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold text-lg min-h-[60px]"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              aria-label="Subscribe to newsletter"
            >
              Subscribe Now
            </motion.button>
          </div>
          {formData.error && (
            <motion.p
              className="text-red-400 mt-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {formData.error}
            </motion.p>
          )}
          {formData.success && (
            <motion.p
              className="text-indigo-400 mt-2 text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            >
              Thanks for subscribing!
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
