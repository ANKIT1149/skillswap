import { database } from '@/db/Appwrite';
import { ProfileFormData } from '@/props/ProfileFormData';
import { BioSchema } from '@/schema/BioSchema';
import { ID, Query } from 'appwrite';
import { NextResponse } from 'next/server';

export const BioService = async ({
  name,
  bio,
  skillsToTeach,
  skillsToLearn,
  profilePictureurl,
  userId,
  learnEmbedding,
  teachEmbedding,
  email
}: ProfileFormData) => {
  console.log(
    'data',
    name,
    bio,
    skillsToLearn,
    skillsToTeach,
    profilePictureurl,
    userId,
    learnEmbedding,
    teachEmbedding,
    email
  );

  if (
    !name ||
    !bio ||
    !skillsToTeach ||
    !skillsToLearn ||
    !profilePictureurl ||
    !userId ||
    !learnEmbedding ||
    !teachEmbedding ||
    !email
  ) {
    throw new Error('All fields are required');
  }

  const validation = BioSchema.safeParse({
    name,
    bio,
    skillsToLearn,
    skillsToTeach,
    profilePictureurl,
  });
  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  try {
    const query = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      queries: [Query.equal('username', name)],
    });

    if (query.total > 0) {
      const user = query.rows[0];
      const id = user.$id;
      return NextResponse.json({
        status: 400,
        message: `Username "${name}" is already taken. Existing rowId: ${id}`,
        success: false,
      });
    }

    const userdata = {
      username: name,
      bio: bio,
      userId: userId,
      skillcanTeach: skillsToTeach,
      skillWantTolearn: skillsToLearn,
      profilePictureurl: profilePictureurl,
      learnEmbeddingId: learnEmbedding,
      teachEmbeddingId: teachEmbedding,
      email: email
    };

    const store = await database.createRow({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      rowId: ID.unique(),
      data: userdata,
      permissions: ['read("any")', 'write("users")'],
    });

    return store;
  } catch (error) {
    console.log('Creating users failed', error);
    throw new Error('USer creating service failed');
  }
};
