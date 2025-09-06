import { getOpenAi } from '@/db/OpenAi';
import { index } from '@/db/Pinecone';

console.log('Running on', typeof window === 'undefined' ? 'server' : 'client');

export const EmbeddingServices = async (
  userId: string,
  skillToTeach: string,
  skillToLearn: string
) => {
  if (!skillToLearn || !skillToTeach) {
    throw new Error('Skill sets are undefined');
  }

  try {
    const openai = getOpenAi();
    const result = [];

    if (skillToLearn) {
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-large',
        input: skillToLearn,
      });

      const embeddings = response.data[0].embedding;

      const pineconeresult = await index.upsert([
        {
          id: `${userId}-${skillToLearn}-learn`,
          values: embeddings,
          metadata: { userId, skill: skillToLearn, type: 'learn' },
        },
      ]);

      result.push({ id: `${userId}-${skillToLearn}-learn`, pineconeresult });
    }

    if (skillToTeach) {
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-large',
        input: skillToTeach,
      });

      const embedding = response.data[0].embedding;

      const secondpineconeResult = await index.upsert([
        {
          id: `${userId}-${skillToTeach}-teach`,
          values: embedding,
          metadata: { userId, skill: skillToTeach, type: 'teach' },
        },
      ]);

      result.push({
        id: `${userId}-${skillToTeach}-teach`,
        secondpineconeResult,
      });
    }

    return result;
  } catch (error) {
    console.log('Embedding Failed', error);
    throw new Error('Embedding Failed');
  }
};
