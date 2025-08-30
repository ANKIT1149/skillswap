"use client"
import { VerificationService } from '@/services/VerificationService';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Canvas from '../Canvas';
import { motion } from 'framer-motion';
import Image from 'next/image';

const VerifyEmail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    const verifyEmail = async () => {
      setLoading(true);
      try {
        const verifyemail = await VerificationService(userId!, secret!);

        if (verifyemail.$id) {
          toast.success('Email Verified successfully');
          setVerified(true);
          setTimeout(() => router.push('/dashboard'), 10000);
        }
      } catch (error) {
        console.log('Verification failed', error);
        toast.error('Email Verification failed');
      } finally {
        setLoading(false);
      }
    };

    if (userId && secret) {
      verifyEmail();
    }
  }, [searchParams, router]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
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
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-lg text-gray-200">
              Verifying your email...
            </p>
          </div>
        ) : verified ? (
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
            >
              <Image
                src="https://tse2.mm.bing.net/th/id/OIP.3kbijHzNbSZnUgDs9VC0FwHaG7?pid=Api&P=0&h=180"
                alt="Verified"
                width={32}
                height={32}
                className=""
              />
            </motion.div>
            <p className="mt-4 text-lg text-gray-200">
              Email verified successfully!
            </p>
          </div>
        ) : (
          <p className="text-lg text-gray-200">Verification in progress...</p>
        )}
      </motion.div>

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

export default VerifyEmail;
