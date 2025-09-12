/* eslint-disable @next/next/no-img-element */
'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import Link from 'next/link';
import { socialLinks } from '@/constants/FooterLink';

const Footer = () => {

  const footerLinks = useMemo(
    () => ({
      company: [
        { name: 'About', href: '/about' },
        { name: 'Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
      ],
      platform: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Blog', href: '/blog' },
      ],
      community: [
        { name: 'Forum', href: '/forum' },
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'Badges', href: '/badges' },
        { name: 'Events', href: '/events' },
      ],
      legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
      ],
    }),
    []
  );

  return (
    <footer
      id="footer"
      className="relative w-full mx-auto px-6 sm:px-8 py-16 min-h-[400px] bg-[radial-gradient(circle_at_top_left,_#1e1b4b_0%,_#4c1d95_30%,_#000_70%)] text-gray-100 overflow-hidden"
      role="contentinfo"
      aria-label="SkillSwap Footer"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-indigo-300 rounded-full shadow-[0_0_15px_#a5b4fc]"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 0.8, 0.3],
              filter: ['blur(2px)', 'blur(5px)', 'blur(2px)'],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(165,180,252,0.2)_50%,transparent_75%)] bg-[length:200%_200%]"
          animate={{
            backgroundPosition: ['0% 0%', '200% 200%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        />
      </motion.div>

      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20 relative z-10">
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-5xl font-extrabold text-indigo-200 mb-6 tracking-wide"
            animate={{
              textShadow: [
                '0 0 5px #a5b4fc',
                '0 0 15px #a5b4fc',
                '0 0 5px #a5b4fc',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          >
            SkillSwap
          </motion.h2>
          <p className="text-gray-200 text-base max-w-sm leading-relaxed">
            Revolutionizing skill-sharing with cutting-edge AI technology.
          </p>
          <motion.div
            className="mt-6 flex gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-indigo-300"
                whileHover={{
                  scale: 1.4,
                  rotate: [0, 5, -5, 0],
                  filter: 'drop-shadow(0 0 8px #a5b4fc)',
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                aria-label={`Visit SkillSwap on ${social.name}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="ml-[50px]"
        >
          <h3 className="text-xl font-bold text-indigo-200 mb-5">Company</h3>
          <ul className="space-y-4">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>
                  <motion.a
                    className="text-white font-serif hover:text-white text-xl font-medium"
                    whileHover={{
                      x: 8,
                      textShadow: '0 0 8px #a5b4fc',
                      color: '#A5B4FC',
                    }}
                    transition={{ duration: 0.2 }}
                    aria-label={link.name}
                  >
                    {link.name}
                  </motion.a>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <h3 className="text-xl font-bold text-indigo-200 mb-5">Platform</h3>
          <ul className="space-y-4">
            {footerLinks.platform.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>
                  <motion.a
                    className="text-white hover:text-white hover:translate-x-1.5 transition-all transform text-xl font-serif font-medium"
                    whileHover={{
                      x: 8,
                      textShadow: '0 0 8px #a5b4fc',
                      color: '#A5B4FC',
                    }}
                    transition={{ duration: 0.2 }}
                    aria-label={link.name}
                  >
                    {link.name}
                  </motion.a>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Community Links */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <h3 className="text-xl font-bold text-indigo-200 mb-5">Community</h3>
          <ul className="space-y-4">
            {footerLinks.community.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>
                  <motion.a
                    className="text-white hover:text-white text-xl font-serif font-medium"
                    whileHover={{
                      x: 8,
                      textShadow: '0 0 8px #a5b4fc',
                      color: '#A5B4FC',
                    }}
                    transition={{ duration: 0.2 }}
                    aria-label={link.name}
                  >
                    {link.name}
                  </motion.a>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 border-t border-indigo-400/30 pt-10 flex flex-col sm:flex-row justify-between items-center relative z-10">
        <motion.div
          className="flex gap-8 mb-6 sm:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {footerLinks.legal.map((link) => (
            <Link key={link.name} href={link.href}>
              <motion.a
                className="text-gray-100 hover:text-indigo-300 text-base font-medium"
                whileHover={{
                  y: -3,
                  textShadow: '0 0 8px #a5b4fc',
                  color: '#A5B4FC',
                }}
                transition={{ duration: 0.2 }}
                aria-label={link.name}
              >
                {link.name}
              </motion.a>
            </Link>
          ))}
        </motion.div>
        <motion.div
          className="flex items-center gap-3 text-gray-100 text-base"
          animate={{
            y: [0, -5, 0],
            textShadow: [
              '0 0 5px #a5b4fc',
              '0 0 10px #a5b4fc',
              '0 0 5px #a5b4fc',
            ],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            },
            textShadow: {
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            },
          }}
        >
          <span>© 2025 SkillSwap.io Made By</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>Aryansh Raj</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
