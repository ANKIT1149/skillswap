import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';

const Provider = () => {
  return (
    <div className="mt-4 flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(255, 255, 255, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center bg-gray-900 border border-gray-600 py-3 px-4 rounded-lg text-white hover:bg-gray-800 transition-all duration-300"
            onClick={() => console.log('Google signup')}
          >
            <Image src="https://tse4.mm.bing.net/th/id/OIP.lsGmVmOX789951j9Km8RagHaHa?pid=Api&P=0&h=180" alt="GitHub" width={20} height={20} className="mr-2" />
            Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(255, 255, 255, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center bg-gray-900 border border-gray-600 py-3 px-4 rounded-lg text-white hover:bg-gray-800 transition-all duration-300"
            onClick={() => console.log('GitHub signup')}
          >
            <Image src="https://tse1.mm.bing.net/th/id/OIP.T41aAOhgX-pnfJ8uPE9pcgHaGs?pid=Api&P=0&h=180" alt="GitHub" width={20} height={20} className="mr-2" />
            GitHub
          </motion.button>
        </div>
  )
}

export default Provider
