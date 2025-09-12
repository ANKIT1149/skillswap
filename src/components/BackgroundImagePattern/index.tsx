import { motion } from 'framer-motion'
import React from 'react'

const BackgroundImagePattern = () => {
  return (
      <motion.div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A5B4FC' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2zM6 34v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2zm0-30v4h4v4h2v-4h4v-2h-4v-4h-2v4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        initial={{ y: 0 }}
        animate={{ y: -100 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
      />
  )
}

export default BackgroundImagePattern
