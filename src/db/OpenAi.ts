import OpenAI from 'openai';
console.log('envKey', process.env.OPENAI_API_KEY);
console.log('Running on', typeof window === 'undefined' ? 'server' : 'client');

export const getOpenAi = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};
