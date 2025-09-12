"use client"
import MatchedTeachers from "@/components/MatchedTeachers";
import Sidebar from "@/components/Sidebar";

export default function TeachersTab() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <MatchedTeachers />
      </main>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
      `}</style>
    </div>
  );
}