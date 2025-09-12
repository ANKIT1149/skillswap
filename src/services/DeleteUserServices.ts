import { account } from '@/db/Appwrite';

export const DeleteUserService = async () => {
  try {
    const deleteUser = await account.deleteSession({ sessionId: 'current' });
    return deleteUser;
  } catch (error) {
    console.log('Error in creating DeleteUserService', error);
    throw new Error('Error in Creating DeleteUserService');
  }
};
