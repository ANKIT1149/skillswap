/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import BannerParticle from '../BannerParticle';
import BackgroundImagePattern from '../BackgroundImagePattern';
import { testimonials } from '@/constants/TestinomialData';

const NeuralNetworkOverlay = () => (
  <motion.svg
    className="absolute top-[-150px] inset-0 scale-75 -z-10 opacity-20"
    viewBox="0 0 200 200"
    animate={{ rotate: 360 }}
    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
  >
    <path
      d="M50 50 L150 50 M50 150 L150 150 M50 50 L50 150 M150 50 L150 150 M75 75 L125 125 M75 125 L125 75"
      stroke="#6366F1"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="50" cy="50" r="5" fill="#C7D2FE" />
    <circle cx="150" cy="50" r="5" fill="#C7D2FE" />
    <circle cx="50" cy="150" r="5" fill="#C7D2FE" />
    <circle cx="150" cy="150" r="5" fill="#C7D2FE" />
  </motion.svg>
);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = useMemo(() => {
    const start = currentIndex;
    return [testimonials[start % testimonials.length]];
  }, [currentIndex]);

  const handleDotClick = (index: any) => setCurrentIndex(index);

  return (
    <section
      id="testimonials"
      className="relative w-full mx-auto px-6 sm:px-8 py-32 min-h-[600px] overflow-hidden"
      aria-label="SkillSwap User Testimonials"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900 -z-20" />

      <BackgroundImagePattern />
      <NeuralNetworkOverlay />
      <BannerParticle />

      <h2 className="text-5xl font-extrabold text-center text-white mb-16 tracking-tight">
        Voices of SkillSwap
      </h2>

      <div className="max-w-7xl mt-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={testimonial.name}
            initial={{
              opacity: 0,
              x: i % 2 === 0 ? -100 : 100,
              y: i > 1 ? 100 : 0,
            }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.3 }}
            className="relative max-w-sm min-h-[300px] p-6 bg-gray-900/50 backdrop-blur-lg rounded-xl shadow-2xl border border-indigo-600/50"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 12px 24px rgba(99, 102, 241, 0.6)',
              transition: { duration: 0.3 },
            }}
            role="region"
            aria-label={`Testimonial from ${testimonial.name}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative w-16 h-16 rounded-full overflow-hidden"
              >
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}'s avatar`}
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={75}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-indigo-300">
                  {testimonial.name}
                </h3>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-100 mb-4 italic min-h-[80px]">
              &quot;{testimonial.quote}&quot;
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-400 mb-4">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360, fill: '#C7D2FE' }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </motion.div>
              {testimonial.badge}
            </div>
            <motion.div
              className="absolute inset-0 bg-indigo-900/70 rounded-xl p-4 text-gray-100 opacity-0 pointer-events-none"
              whileHover={{ opacity: 1, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {testimonial.details}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            className={`w-3 h-3 rounded-full ${currentIndex === i ? 'bg-indigo-600' : 'bg-gray-500'}`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDotClick(i)}
            aria-label={`View testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
