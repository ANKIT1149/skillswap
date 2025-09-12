/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { comparisons } from '@/constants/ComparisonData';
import { motion } from 'framer-motion';
import { useState } from 'react';
import BackgroundImagePattern from '../BackgroundImagePattern';

const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-indigo-400"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg
    className="w-6 h-6 text-red-400"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function Comparison() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  return (
    <section
      id="comparison"
      className="relative w-full mx-auto px-6 sm:px-8 py-10 overflow-hidden"
      aria-label="SkillSwap vs Alternatives Comparison"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black -z-20" />

      <BackgroundImagePattern />

      <h2 className="text-4xl font-extrabold text-center text-white mb-12">
        SkillSwap vs Alternatives
      </h2>

      <div className="overflow-x-auto">
        <motion.table
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="w-full text-left text-gray-200"
        >
          <thead>
            <tr className="border-b border-indigo-400">
              <th className="py-4 px-6 text-lg font-semibold">
                <div className="flex items-start">Feature</div>
              </th>
              <th className="py-4 px-6 text-lg font-semibold">
                <div className="flex items-center justify-center">
                  SkillSwap
                </div>
              </th>
              <th className="py-4 px-6 text-lg font-semibold">
                <div className="flex items-center justify-center">
                  Online Learning
                </div>
              </th>
              <th className="py-4 px-6 text-lg font-semibold">
                <div className="flex items-center justify-center">
                  Peer Tutoring
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map(
              (
                {
                  feature,
                  skillswap,
                  onlineLearning,
                  peerTutoring,
                  description,
                },
                i
              ) => (
                <motion.tr
                  key={feature}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: 'easeOut' },
                    },
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  }}
                  onClick={() =>
                    setSelectedFeature(
                      selectedFeature === feature ? null : feature
                    )
                  }
                  className="cursor-pointer border-b border-gray-700"
                >
                  <td className="py-4 px-6">{feature}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      {skillswap ? <CheckIcon /> : <CrossIcon />}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      {onlineLearning ? <CheckIcon /> : <CrossIcon />}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      {peerTutoring ? <CheckIcon /> : <CrossIcon />}
                    </div>
                  </td>
                </motion.tr>
              )
            )}
          </tbody>
        </motion.table>
      </div>

      {selectedFeature && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mt-8 p-6 bg-indigo-900/50 rounded-xl text-gray-200"
        >
          <h3 className="text-xl font-semibold mb-2">{selectedFeature}</h3>
          <p>
            {
              comparisons.find((c) => c.feature === selectedFeature)
                ?.description
            }
          </p>
        </motion.div>
      )}
    </section>
  );
}
