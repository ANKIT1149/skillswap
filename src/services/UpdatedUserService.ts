import { database } from '@/db/Appwrite';
import { ProfileFormData } from '@/props/ProfileFormData';
import { Query } from 'appwrite';

export const UpdateUserService = async ({
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

  try {
    const query = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      queries: [Query.equal('userId', userId!)],
    });
      
      if (query.rows.length === 0) {
          throw new Error("No User Found")
      }
      
    const getData = query.rows[0]

    const userdata = {
      username: name ? name : getData.username,
      bio: bio ? bio : getData.bio,
      userId: userId,
      skillcanTeach: skillsToTeach ? skillsToTeach : getData.skillcanTeach,
      skillWantTolearn: skillsToLearn ? skillsToLearn: getData.skillWantTolearn,
      profilePictureurl: profilePictureurl ? profilePictureurl : getData.profilePictureurl,
      learnEmbeddingId: learnEmbedding ? learnEmbedding: getData.learnEmbeddingId,
      teachEmbeddingId: teachEmbedding ? teachEmbedding: getData.teachEmbeddingId,
      email: email ? email : getData.email
    };

    const store = await database.updateRow({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      rowId: getData.$id,
      data: userdata,
    });

    return store;
  } catch (error) {
    console.log('Updating users failed', error);
    throw new Error('Updating user service failed');
  }
};
