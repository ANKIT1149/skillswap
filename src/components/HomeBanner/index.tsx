/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { backgrounds } from '@/constants/HomeBanner';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const preloadImages = backgrounds.map((bg) => {
      return new Promise((resolve: any) => {
        const img = new window.Image();
        img.src = bg;
        img.onload = resolve;
        img.onerror = () => {
          img.src = backgrounds[2];
          resolve();
        };
      });
    });

    Promise.all(preloadImages).then(() => {
      setIsLoading(false);
    });

    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {isLoading ? (
          <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-t-blue-500 border-gray-700 rounded-full"
            />
          </div>
        ) : (
          backgrounds.map((bg, i) => (
            <motion.div
              key={bg}
              initial={{ opacity: 0 }}
              animate={{ opacity: i === bgIndex ? 1 : 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={bg}
                alt={`Background ${i + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                quality={75}
                priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="filter brightness-70"
                onError={(e: any) => {
                  e.target.src = backgrounds[2];
                }}
              />
            </motion.div>
          ))
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-indigo-900/30 to-gray-900/70" />
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl px-4 sm:px-8 text-white"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-2xl"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
            Connect. Learn. Excel.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-lg font-medium"
        >
          SkillSwap bridges learners and mentors with AI-powered skill matching.
        </motion.p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <motion.a
            whileHover={{
              scale: 1.1,
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            href="#pricing"
            onClick={(e: any) => { e.preventDefault(); router.push("/signup")}}
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Join Now
          </motion.a>
          <motion.a
            whileHover={{
              scale: 1.1,
              boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            href="#features"
            className="inline-block px-10 py-4 rounded-full border-2 border-white text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
          >
            Explore Features
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
