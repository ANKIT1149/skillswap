/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { steps } from '@/constants/HowItWorksData'
import { motion } from 'framer-motion'
import { useState } from 'react'
import BannerParticle from '../BannerParticle'


export default function HowItWorks() {
  const [selectedStep, setSelectedStep] = useState<any>(null)

  return (
    <section
      id="how-it-works"
      className="relative w-full mx-auto px-6 sm:px-8 py-20 overflow-hidden"
      aria-label="How SkillSwap Works"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900 -z-20" />
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C7D2FE' fill-opacity='0.7'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2zM6 34v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2zm0-30v4h4v4h2v-4h4v-2h-4v-4h-2v4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        initial={{ y: 0, opacity: 0.3 }}
        animate={{ y: -100, opacity: [0.3, 0.5, 0.3] }}
        transition={{
          y: { duration: 20, repeat: Infinity, repeatType: 'loop', ease: 'linear' },
          opacity: { duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
        }}
      />

      <BannerParticle />

      <h2 className="text-5xl font-extrabold text-center text-white mb-16 tracking-tight">
        How SkillSwap Works
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-indigo-500/50 -translate-x-1/2 hidden md:block" />
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-indigo-400"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        <div className="space-y-12 md:space-y-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50, rotateX: 90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.2 }}
              className={`relative flex flex-col md:flex-row items-start gap-6 p-6 bg-gray-900/30 backdrop-blur-md rounded-xl shadow-xl ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 12px 24px rgba(99, 102, 241, 0.4)',
                transition: { duration: 0.3 },
              }}
              onClick={() => setSelectedStep(selectedStep === step.title ? null : step.title)}
              role="button"
              tabIndex={0}
              aria-label={`Toggle details for ${step.title}`}
            >
              <motion.div
                className="absolute left-4 md:left-1/2 top-6 w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center -translate-x-1/2"
                whileHover={{ scale: 1.3, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {step.icon}
              </motion.div>
              <div className="flex-1 mt-10 md:mt-0 md:ml-12">
                <h3 className="text-2xl font-bold text-indigo-300 mb-2">{step.title}</h3>
                <p className="text-gray-200">{step.description}</p>
                {selectedStep === step.title && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="mt-4 p-4 bg-indigo-900/50 rounded-lg text-gray-100"
                  >
                    {step.details}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}