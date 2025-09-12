/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import { images, points } from '@/constants/WhyChoosData';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import BackgroundImagePattern from '../BackgroundImagePattern';

export default function WhyChoose() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <BackgroundImagePattern />
      <section
        id="whychoose"
        className="relative w-full mx-auto px-0 sm:px-8 py-20 overflow-hidden"
        aria-label="Why Choose SkillSwap"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black -z-20" />
        <div className="flex flex-col lg:flex-row justify-between items-center mx-auto gap-20 ml-[200px]">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 max-w-lg relative h-96"
          >
            {images.map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0 }}
                animate={{ opacity: i === imageIndex ? 1 : 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={img}
                  alt={`Why Choose SkillSwap ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={75}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="rounded-xl shadow-lg filter brightness-90"
                  onError={(e: any) => {
                    e.target.src = images[0];
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1"
          >
            <h2 className="text-4xl font-extrabold text-center lg:text-left text-white mb-8">
              Why Choose SkillSwap?
            </h2>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
              }}
              className="list-none space-y-6 text-lg text-gray-200"
            >
              {points.map((point) => (
                <motion.li
                  key={point}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    x: 10,
                    color: '#A5B4FC',
                    transition: { duration: 0.3 },
                  }}
                  className="relative pl-8 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-indigo-400 before:rounded-full before:shadow-lg before:content-['']"
                >
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
