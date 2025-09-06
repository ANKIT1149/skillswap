import OpenAI from 'openai';

export const getOpenAi = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};
