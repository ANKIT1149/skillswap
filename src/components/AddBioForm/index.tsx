'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WaveAnimation from '../WaveAnimation';
import LineAnimation from '../LineAnimation';

// Define form data type
interface ProfileFormData {
  name: string;
  bio: string;
  skillsToTeach: [];
  skillsToLearn: [];
  profilePicture: File | null;
}

export default function AddProfile() {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    bio: '',
    skillsToTeach: [],
    skillsToLearn: [],
    profilePicture: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, profilePicture: file });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Profile submitted:', formData);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut' as const,
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="h-auto flex flex-col items-center justify-center bg-gradient-to-br from-amber-500 to-black overflow-hidden relative">
      <WaveAnimation />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-amber-600 to-red-300 opacity-30 animate-gradient-shift" />

      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-5xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent from-black via-gray-600 to-white text-center text-coral-600 mb-8 z-10 mt-20"
      >
        Welcome to SkillSwap
      </motion.h1>

      <LineAnimation />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white bg-opacity-95 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-lg z-10"
      >
        <motion.h2
          variants={childVariants}
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          Add your Bio
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={childVariants} className="flex justify-center">
            <label className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-gray-200 transition-all duration-300 group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer "
              />
              {formData.profilePicture ? (
                <Image
                  src={URL.createObjectURL(formData.profilePicture)}
                  alt="Profile Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full group-hover:opacity-80 transition-opacity duration-300"
                />
              ) : (
                <Image
                  src="https://tse1.mm.bing.net/th/id/OIP.vAwBjeWI1VqeesQSKlDJTwHaHa?pid=Api&P=0&h=180"
                  alt="Upload"
                  width={32}
                  height={32}
                  className="text-red-500 mix-blend-darken group-hover:scale-110 transition-transform duration-300"
                />
              )}
            </label>
          </motion.div>

          <motion.div variants={childVariants}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <motion.input
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all duration-300 cursor-pointer"
              placeholder="Enter your name"
              required
            />
          </motion.div>

          <motion.div variants={childVariants}>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Short Bio
            </label>
            <motion.textarea
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              name="bio"
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all duration-300 cursor-pointer"
              placeholder="Tell us about yourself"
              rows={4}
              required
            />
          </motion.div>


          <motion.div variants={childVariants}>
            <label
              htmlFor="skillsToTeach"
              className="block text-sm font-medium text-gray-700"
            >
              Skills You Can Teach
            </label>
            <motion.input
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              type="text"
              name="skillsToTeach"
              id="skillsToTeach"
              value={formData.skillsToTeach}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all duration-300 cursor-pointer"
              placeholder="e.g., React, Python"
              required
            />
          </motion.div>

          <motion.div variants={childVariants}>
            <label
              htmlFor="skillsToLearn"
              className="block text-sm font-medium text-gray-700"
            >
              Skills That You Want Learn
            </label>
            <motion.input
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              type="text"
              name="skillsToLearn"
              id="skillsToLearn"
              value={formData.skillsToLearn}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all duration-300 cursor-pointer"
              placeholder="e.g., JavaScript, Data Science"
              required
            />
          </motion.div>

          <motion.button
            variants={childVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 12px rgba(239, 68, 68, 0.7)',
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-black to-red-600 text-white py-3 px-4 rounded-lg hover:from-coral-600 hover:to-red-700 transition-all duration-300 cursor-pointer"
          >
            Add Bio
          </motion.button>
        </form>
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
          animation: gradientShift 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
