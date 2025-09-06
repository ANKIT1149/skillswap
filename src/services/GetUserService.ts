import { account } from '@/db/Appwrite';

export const GetUserService = async () => {
  try {
    const user = account.get();
    console.log('user', user);

    const userId = (await user).$id;
    return userId;
  } catch (error) {
    console.log('User getting failed', error);
    throw new Error('Error in fetching error');
  }
};
