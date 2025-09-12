import { motion } from 'framer-motion';
import React from 'react';
import { Variants } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UpdateAction {
    buttonVariants: Variants;
    cardVariants: Variants;
}
const ProfileActionButton = ({ buttonVariants, cardVariants }: UpdateAction) => {
    const router = useRouter()
  const handleUpdateProfile = () => {
    router.push("/updatebio")
  };

  const handleDeleteAccount = () => {
    console.log('Initiate account deletion');
  };
  return (
    <motion.div
      custom={6}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center space-x-4"
    >
      <motion.button
        onClick={handleUpdateProfile}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="bg-gradient-to-r cursor-pointer from-teal-500 to-teal-600 text-white py-2 px-6 rounded-lg text-sm font-medium"
      >
        <Edit className="w-5 h-5 inline mr-2" />
        Update Profile
      </motion.button>
      <motion.button
        onClick={handleDeleteAccount}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="bg-gradient-to-r cursor-pointer from-red-500 to-red-600 text-white py-2 px-6 rounded-lg text-sm font-medium"
      >
        <Trash2 className="w-5 h-5 inline mr-2" />
        Delete Account
      </motion.button>
    </motion.div>
  );
};

export default ProfileActionButton;
