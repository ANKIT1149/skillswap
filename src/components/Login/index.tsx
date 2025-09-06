'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Provider from '../Providers';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import Canvas from '../Canvas';
import { LoginData } from '@/props/LoginData';
import { LoginService } from '@/services/LoginService';

export default function SignIn() {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setLoading(true);

    try {
      const login = await LoginService(formData);

      if (login.$id) {
        toast.success('Login Successfully');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
          if (!login.emailVerification) {
              toast.error("Please verify your email")
          }
      }
    } catch (error) {
      console.log('Login Failed', error);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  const inputVariants = {
    focus: { scale: 1.03, boxShadow: '0 0 10px rgba(129, 140, 248, 0.6)' },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative">
       <Canvas />
      <div className="absolute inet-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-20 animate-gradient-shift" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-gray-800 bg-opacity-90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-600"
      >
        <h1 className="text-4xl leading-normal font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 mb-6">
          Welcome Again! SkillSwap
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <motion.input
              variants={inputVariants}
              whileFocus="focus"
              transition={{ duration: 0.3 }}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <motion.input
              variants={inputVariants}
              whileFocus="focus"
              transition={{ duration: 0.3 }}
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
              placeholder="Create a password"
              required
            />
          </div>
          <motion.button
            disabled={loading}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 15px rgba(129, 140, 248, 0.7)',
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
          >
            {loading ? <Loader2Icon className='mx-auto animate-spin'/> : 'Login Now'}
          </motion.button>
        </form>
        <p className="text-center text-sm text-gray-300 mt-5">
          Do not have account?{' '}
          <Link
            href="/signup"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Signup
          </Link>
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="border-t border-gray-600 w-1/4"></span>
          <span className="text-sm text-gray-300">Or continue with</span>
          <span className="border-t border-gray-600 w-1/4"></span>
        </div>
        <Provider />
      </motion.div>

      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 12s ease infinite;
        }
      `}</style>
    </div>
  );
}
