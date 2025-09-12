/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2Icon, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { GetUserRow } from '@/utils/GetUserRow';
import { Recipient } from '../ChatTop';
import { RatingService } from '@/services/RatingService';
import { GetUserService } from '@/services/GetUserService';
import toast from 'react-hot-toast';

const RateTeacher = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [userData, setUserData] = useState<Recipient>();
  const { id }: any = useParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
      if (rating === 0 || !review.trim()) return toast.error("Please provide rating");
      setLoading(true)
    try {
      const userId = await GetUserService();
      const submit = await RatingService({
        ratedUserId: id,
        raterUserId: userId,
        stars: rating,
        review: review,
        timestamp: new Date().toISOString(),
      });

      toast.success('Review Submitted Successfully');
      console.log(
        `Submitted: Rating=${rating}, Review=${review}, data=${submit}`
      );
    } catch (error) {
      console.log('Error in SUbmitting review', error);
    } finally {
      setRating(0);
        setReview('');
        setLoading(false);
    }
  };

  const starVariants = {
    filled: { scale: 1.2, color: '#FBBF24', transition: { duration: 0.2 } },
    empty: { scale: 1, color: '#D1D5DB', transition: { duration: 0.2 } },
  };

  const textareaVariants = {
    focus: { scale: 1.02, boxShadow: '0 0 12px rgba(94, 234, 212, 0.5)' },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 0 12px rgba(94, 234, 212, 0.7)' },
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await GetUserRow(id);
      setUserData(
        user
          ? {
              $id: user.$id,
              username: user.username,
            }
          : undefined
      );
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col z-20 h-screen overflow-hidden bg-gradient-to-br from-teal-900 via-indigo-900 to-teal-800">
      {/* Animated Background Effect */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-r from-teal-900 to-indigo-900 opacity-20 filter blur-3xl"
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-10 z-10 bg-teal-950 bg-opacity-95 backdrop-blur-lg px-6 py-4 shadow-lg"
      >
        <h1
          className="text-3xl font-extrabold text-white text-center tracking-tight"
          style={{
            textShadow:
              '0 0 12px rgba(94, 234, 212, 0.6), 0 0 24px rgba(94, 234, 212, 0.4)',
          }}
        >
          Rate Your Teacher: Help Students Learn Better!
        </h1>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl bg-teal-950 bg-opacity-80 backdrop-blur-lg rounded-xl p-8 shadow-xl"
        >
          {/* Teacher Name */}
          <h2 className="text-xl font-semibold text-white mb-6">
            Rating for {userData?.username}
          </h2>

          {/* Star Rating */}
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                variants={starVariants}
                animate={
                  hoverRating >= star || rating >= star ? 'filled' : 'empty'
                }
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="cursor-pointer mx-1"
              >
                <Star
                  className="w-10 h-10"
                  fill={
                    hoverRating >= star || rating >= star ? '#FBBF24' : 'none'
                  }
                />
              </motion.div>
            ))}
          </div>

          {/* Review Textarea */}
          <motion.textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            className="w-full h-40 p-4 bg-teal-900 text-white border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            whileFocus="focus"
            variants={textareaVariants}
          />

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={rating === 0 || !review.trim()}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`mt-6 w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 ${
              rating === 0 || !review.trim()
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r cursor-pointer from-teal-500 to-teal-600'
            }`}
          >
            {loading ? <Loader2Icon className='mx-auto animate-spin'/> : "Submit Review"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
export default RateTeacher;
