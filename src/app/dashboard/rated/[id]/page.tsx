'use client';
import RateTeacher from '@/components/RatingPart';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const RatingPage = () => {
  return (
    <div className="flex h-screen overflow-x-hidden">
      <div className='w-[255px]'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <RateTeacher />
      </div>

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
          animation: gradientShift 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default RatingPage;
