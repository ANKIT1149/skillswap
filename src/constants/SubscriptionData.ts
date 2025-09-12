const plans = [
  {
    name: 'Free',
    price: '$0/mo',
    features: [
      { text: 'Basic Skill Swap (5 matches/mo)', icon: 'swap' },
      { text: '1:1 Real-Time Chat', icon: 'chat' },
      { text: 'Ratings & Reviews', icon: 'star' },
      { text: 'Basic Safety (Report/Block)', icon: 'shield' },
    ],
    details: 'Get started with SkillSwap for free. Swap skills with up to 5 matches per month, chat in real-time, rate teachers, and use basic safety features like reporting and blocking.',
    cta: 'Get Started',
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '$9.99/mo',
    features: [
      { text: 'Unlimited AI Skill Matches', icon: 'ai' },
      { text: 'Advanced Chat (Multimedia Support)', icon: 'chat' },
      { text: 'Priority Matching', icon: 'bolt' },
      { text: 'Profile Analytics', icon: 'chart' },
    ],
    details: 'Unlock unlimited AI-powered skill matches, send images, audio, and video in chats, get priority in matching queues, and track profile performance with analytics.',
    cta: 'Upgrade to Pro',
    isPopular: true,
  },
  {
    name: 'Premium',
    price: '$19.99/mo',
    features: [
      { text: 'Everything in Pro', icon: 'check' },
      { text: 'Early Access to AI Resources', icon: 'ai' },
      { text: 'AI Workspace (Quizzes, Testing)', icon: 'workspace' },
      { text: 'Video Call Integration', icon: 'video' },
      { text: 'Exclusive Badges', icon: 'badge' },
    ],
    details: 'Get everything in Pro, plus early access to AI-suggested resources, an AI workspace for creating quizzes and testing students, video call integration (token-based), and exclusive badges to showcase your expertise.',
    cta: 'Go Premium',
    isPopular: false,
  },
]

export {plans}