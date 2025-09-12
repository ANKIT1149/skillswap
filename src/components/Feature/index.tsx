'use client';

import { features } from '@/constants/FeatureData';
import { motion } from 'framer-motion';
import BackgroundImagePattern from '../BackgroundImagePattern';

export default function Features() {
  return (
    <section
      id="features"
      className="relative max-w-full mx-auto px-6 sm:px-8 py-20 bg-gradient-to-br overflow-hidden"
      aria-label="Features"
    >
      <BackgroundImagePattern />

      <h2 className="text-4xl font-extrabold text-center text-white mb-12">
        Features
      </h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {features.map(({ icon, title, description }, i) => (
          <motion.div
            key={title}
            variants={{
              hidden: { opacity: 0, y: 30, rotateX: 10 },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: { duration: 0.5, ease: 'easeOut' },
              },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(99,102,241,0.3)',
              transition: { duration: 0.3 },
            }}
            className="bg-white rounded-xl p-6 shadow-md cursor-default select-none"
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5, color: '#8b5cf6' }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              {icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
