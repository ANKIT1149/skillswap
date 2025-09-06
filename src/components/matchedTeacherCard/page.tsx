import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { User, Mail, BookOpen } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  skill: string;
  email: string;
  bio: string;
  profilePicture: string;
}

const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    skill: 'React & TypeScript',
    email: 'sarah@example.com',
    bio: 'Experienced frontend developer with a passion for building scalable web apps using React and TypeScript.',
    profilePicture:
      'https://tse2.mm.bing.net/th/id/OIP.kf9TvsuxepBOhAV4cTHEoAHaHa?pid=Api&P=0&h=180',
  },
  {
    id: '2',
    name: 'Michael Chen',
    skill: 'Python & Data Science',
    email: 'michael@example.com',
    bio: 'Data scientist specializing in machine learning, Python automation, and data visualization.',
    profilePicture: '/profiles/michael.jpg',
  },
  {
    id: '3',
    name: 'Emily Davis',
    skill: 'UI/UX Design',
    email: 'emily@example.com',
    bio: 'Creative designer focused on crafting user-centered interfaces and interactive prototypes.',
    profilePicture: '/profiles/emily.jpg',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const MatchedTeachersCard = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  useEffect(() => {
    setTeachers(mockTeachers);
  }, []);
    
  return (
    <div className="max-w-4xl ml-[370px] space-y-8">
      {teachers.map((teacher, index) => (
        <motion.div
          key={teacher.id}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.02,
            boxShadow:
              '0 12px 24px rgba(239, 68, 68, 0.3), 0 0 12px rgba(239, 68, 68, 0.2)',
            transition: { duration: 0.3 },
            cursor: 'pointer',
          }}
          className="relative flex bg-[#111111] z-10 rounded-xl p-6 shadow-xl overflow-hidden border-l-4 border-[#ff7f50]"
        >
          <motion.div
            className="absolute inset-0 border-2 border-transparent rounded-xl"
            style={{
              background:
                'linear-gradient(45deg, #F87171, #DC2626, #FBBF24, #F87171)',
              backgroundSize: '200% 200%',
              animation: 'gradientFlow 8s ease infinite',
            }}
            initial={{ opacity: 0.2 }}
            whileHover={{ opacity: 0.5 }}
          />

          <div className="flex items-center w-full z-10">
            <div className="flex-shrink-0 w-20 h-20 mr-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={teacher.profilePicture}
                  alt={teacher.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover border-2 border-coral-300"
                />
              </motion.div>
            </div>

            <div className="flex-1 flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center ml-5 mb-5">
                  <User className="w-10 h-10 text-[#ff7f50] mr-2" />
                  <h2 className="text-xl font-semibold text-white font-serif">
                    {teacher.name}
                  </h2>
                </div>
                <div className="flex items-center ml-5 mb-5">
                  <BookOpen className="w-10 h-10 text-[#ff7f50] mr-2" />
                  <p className="text-gray-200 text-md font-normal font-serif">
                    <strong>Skill:</strong> {teacher.skill}
                  </p>
                </div>
                <div className="flex items-center ml-5 mb-5">
                  <Mail className="w-10 h-10 text-[#ff7f50] mr-2" />
                  <p className="text-white text-lg font-serif">
                    <strong>Email:</strong> {teacher.email}
                  </p>
                </div>
                <p className="text-white font-serif ml-5 text-md max-w-md">
                  <strong>Bio:</strong> {teacher.bio}
                </p>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 12px rgba(239, 68, 68, 0.7)',
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#ff7f50] to-red-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer"
              >
                Start Learning Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MatchedTeachersCard;
