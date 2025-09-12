'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { navLinks } from '@/constants/HomeNav';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3, ease: 'easeOut' as const },
    },
  };

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeInOut' as const },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' as const },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl'
          : 'bg-gradient-to-r from-transparent via-gray-900/30 to-transparent'
      } backdrop-blur-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-3xl font-extrabold text-white tracking-tight select-none"
        >
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            SkillSwap
          </motion.span>
        </Link>

        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              onClick={(e) => {
                e.preventDefault();
                router.push(link.href);
              }}
              variants={linkVariants}
              whileHover="hover"
              className="text-gray-200 text-sm cursor-pointer font-medium hover:text-blue-400 transition-colors duration-200"
            >
              {link.name}
            </motion.a>
          ))}
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.preventDefault();
                router.push('/login');
              }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full text-sm font-medium text-white border border-blue-500 hover:bg-blue-500/20 transition-all duration-200"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.preventDefault();
                router.push('/signup');
              }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Signup
            </motion.button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <motion.button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.path
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <motion.path
                    key="menu"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    d="M3 12h18M3 6h18M3 18h18"
                  />
                )}
              </AnimatePresence>
            </svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-gray-900/95 backdrop-blur-md shadow-xl"
          >
            <div className="flex flex-col px-6 py-6 space-y-5">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  variants={linkVariants}
                  whileHover="hover"
                  className="text-gray-200 text-lg font-medium hover:text-blue-400 transition-colors duration-200"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-5 py-3 rounded-full text-sm font-medium text-white border border-blue-500 hover:bg-blue-500/20 transition-all duration-200"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-5 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Signup
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
