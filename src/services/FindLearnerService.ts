import { getOpenAi } from '@/db/OpenAi';
import { index } from '@/db/Pinecone';

export const FindLearnerService = async (skillsToTeach: []) => {
  if (!skillsToTeach) {
    throw new Error('PLease provide the skill so we index db');
  }

  try {
    const openai = getOpenAi();
    const res = await openai.embeddings.create({
      model: 'text-embedding-3-large',
      input: skillsToTeach,
    });

    const embedding = res.data[0].embedding;

    const result = await index.query({
      vector: embedding,
      topK: 5,
      filter: { type: 'learn' },
      includeMetadata: true,
    });

    return result.matches;
  } catch (error) {
    console.log('Finding Learner Services failed', error);
    throw new Error('Finding learner failed');
  }
};
