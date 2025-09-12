/* eslint-disable @typescript-eslint/no-explicit-any */
import { icons } from "@/constants/IconData"
import { motion } from "framer-motion"

const FeatureIcon = ({ type }: any) => {

  return (
    <motion.svg
      className="w-6 h-6 text-indigo-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      whileHover={{ scale: 1.3, rotate: 15, transition: { duration: 0.3 } }}
    >
      {icons[type]}
    </motion.svg>
  )
}

export default FeatureIcon