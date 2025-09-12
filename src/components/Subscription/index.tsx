/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import { plans } from '@/constants/SubscriptionData';
import { motion } from 'framer-motion';
import { useState } from 'react';
import BannerParticle from '../BannerParticle';
import FeatureIcon from '../FeatureIcon';
import BackgroundImagePattern from '../BackgroundImagePattern';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  return (
    <section
      id="pricing"
      className="relative w-full mx-auto px-6 sm:px-8 py-8 overflow-hidden"
      aria-label="SkillSwap Pricing Plans"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900 -z-20" />

      <BackgroundImagePattern />

      <BannerParticle />

      <h2 className="text-5xl font-extrabold text-center text-white mb-16 tracking-tight">
        Choose Your SkillSwap Plan
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 50, rotateX: 90 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.2 }}
            className={`relative flex flex-col p-8 bg-gray-900/30 backdrop-blur-md rounded-xl shadow-xl border ${plan.isPopular ? 'border-indigo-400' : 'border-gray-700'} ${plan.isPopular ? 'scale-105' : ''}`}
            whileHover={{
              scale: plan.isPopular ? 1.08 : 1.05,
              boxShadow: '0 12px 24px rgba(99, 102, 241, 0.4)',
              transition: { duration: 0.3 },
            }}
            role="button"
            tabIndex={0}
            aria-label={`Toggle details for ${plan.name} plan`}
            onClick={() =>
              setSelectedPlan(selectedPlan === plan.name ? null : plan.name)
            }
          >
            {plan.isPopular && (
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                Most Popular
              </motion.div>
            )}
            <h3 className="text-2xl font-bold text-indigo-300 mb-4">
              {plan.name}
            </h3>
            <p className="text-4xl font-extrabold text-white mb-6">
              {plan.price}
            </p>
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li
                  key={feature.text}
                  className="flex items-center gap-3 text-gray-200"
                >
                  <FeatureIcon type={feature.icon} />
                  {feature.text}
                </li>
              ))}
            </ul>
            <motion.button
              className={`w-full py-3 rounded-lg font-semibold text-white ${plan.isPopular ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-gray-700 hover:bg-gray-600'}`}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
            >
              {plan.cta}
            </motion.button>
            {selectedPlan === plan.name && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-6 p-4 bg-indigo-900/50 rounded-lg text-gray-100"
              >
                {plan.details}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
