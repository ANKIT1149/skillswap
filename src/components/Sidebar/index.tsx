/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LogOut, Settings } from 'lucide-react';
import { navItems } from '@/constants/NavItem';
import { GetUserService } from '@/services/GetUserService';
import { database } from '@/db/Appwrite';
import { GetUserRow } from '@/utils/GetUserRow';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const user = await GetUserService();
      setUserId(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(async () => {
      try {
        const rowId: any = await GetUserRow(userId)
        await database.updateRow({
          databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
          tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
          rowId: rowId.$id,
          data: {
            lastSeen: new Date().toISOString(),
          },
        });
      } catch (error) {
        console.error('Error updating lastSeen', error);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const sidebarVariants = {
    open: {
      width: '16rem',
      transition: { duration: 0.4, ease: 'easeInOut' as const },
    },
    closed: {
      width: '4rem',
      transition: { duration: 0.4, ease: 'easeInOut' as const },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="open"
      animate={isOpen ? 'open' : 'closed'}
      className="h-screen  fixed bg-gradient-to-b from-coral-600 to-red-700 text-white flex flex-col shadow-2xl z-50"
    >
      <button
        onClick={toggleSidebar}
        className="p-4 flex justify-end focus:outline-none"
      >
        <div className="relative right-[80px] top-[19px]">
          <h1 className="text-2xl font-bold font-serif">SkillSwap</h1>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className="mt-5"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.div>
      </button>

      <nav className="flex-1 px-4 mt-10">
        {navItems.map((item) => (
          <Link key={item.name} href={item.name === 'Profile' ? `/dashboard/${userId}`: item.href}>
            <motion.div
              variants={navItemVariants}
              whileHover={{
                scale: 1.05,
                x: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center mt-4 p-3 rounded-lg mb-2 cursor-pointer transition-colors duration-300"
            >
              <item.icon className="w-6 h-6 text-white" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="ml-3 text-sm font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Settings Icon */}
      <div className="px-4 mb-10 py-4 mt-auto flex gap-10 justify-center items-center">
        <div>
          <Link href="/dashboard/settings">
            <motion.div
              variants={navItemVariants}
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-300"
            >
              <Settings className="w-6 h-6 text-blue-900 border-2 rounded-full font-bold" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="ml-3 text-sm font-medium"
                  >
                    Settings
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
        <div>
          <div className="">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer flex justify-center items-center"
              onClick={handleLogout}
            >
              <LogOut className="w-6 h-6 text-amber-400" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="ml-2 text-sm font-medium"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Tailwind Styles */}
      <style jsx>{`
        .bg-gradient-to-b {
          background: linear-gradient(to bottom, #f87171, #dc2626);
        }
      `}</style>
    </motion.aside>
  );
}
