import { getOpenAi } from '@/db/OpenAi';
import { index } from '@/db/Pinecone';

export const FindTeacherService = async (skillsToLearn: []) => {
  if (!skillsToLearn) {
    throw new Error('Please provide skills to index db');
  }

  try {
    const openai = getOpenAi();

    const res = await openai.embeddings.create({
      model: 'text-embedding-3-large',
      input: skillsToLearn,
    });

    const embedding = res.data[0].embedding;

    const result = await index.query({
      vector: embedding,
      topK: 5,
      filter: { type: 'teach' },
      includeMetadata: true,
    });

    console.log(result.matches);

    return result.matches;
  } catch (error) {
    console.log('FindTeacher service failed', error);
    throw new Error('Finding teacher failed');
  }
};
