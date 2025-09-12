"use client"
import Sidebar from "@/components/Sidebar";
import ViewBlockedUsers from "@/components/ViewBlock";

export default function ViewBlockedUsersPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <ViewBlockedUsers />
      </main>
    
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradientFlow 8s ease infinite;
        }
      `}</style>
    </div>
  );
}