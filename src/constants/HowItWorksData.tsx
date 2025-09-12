const steps = [
  {
    title: 'Sign Up & Verify',
    description: 'Create an account and verify your email with a secure link sent to your inbox.',
    icon: (
      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    details: 'Join SkillSwap by signing up with your email. After registration, verify your account using a secure link sent to your inbox, powered by Appwrite Auth, to ensure a safe start.',
  },
  {
    title: 'Create Your Profile',
    description: 'Add your profile picture, name, bio, skills you can teach, and skills you want to learn.',
    icon: (
      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    details: 'Personalize your profile with a photo, name, and a short bio. List skills you can teach (e.g., React) and skills you want to learn (e.g., Python). Your data is stored securely with Appwrite, and vector embeddings are created in Pinecone for AI matching.',
  },
  {
    title: 'AI-Powered Matching',
    description: 'Our AI compares your skills with others to find perfect learning or teaching matches.',
    icon: (
      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    details: 'Our AI, powered by Pinecone vector embeddings, analyzes your skills to match you with teachers who can teach what you want to learn and learners who need your expertise, ensuring precise and efficient connections.',
  },
  {
    title: 'Discover Top Teachers',
    description: 'View top 5 matched teachers with their profiles and start learning instantly.',
    icon: (
      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    details: 'On the dashboard, explore cards of the top 5 teachers matched by our AI. Each card shows their name, skills, and bio. Click "Start Learning" to connect instantly via chat.',
  },
  {
    title: 'Chat & Collaborate',
    description: 'Engage in real-time chat with messages, audio, video, and images, plus rate or report.',
    icon: (
      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-4.072A8.983 8.983 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    details: 'Use real-time chat (Appwrite Realtime) to send messages, audio, video, or images. See if teachers are online, view unread message counts, rate their teaching, report issues, or block spammers for a safe experience.',
  },
  {
    title: 'Manage Profile & More',
    description: 'Update your profile, view blocked users, or explore future AI features and video calls.',
    icon: (
      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" />
      </svg>
    ),
    details: 'Edit your profile, update skills (triggering new AI matches), view or unblock users, or delete your account. Coming soon: AI-suggested resources, quizzes in an AI workspace, and video calls via tokens for seamless learning.',
  },
]

export {steps}