import { account } from '@/db/Appwrite';

export const GetUserService = async () => {
  try {
    const user = await account.get();
    console.log('user', user);

    const userId = user.$id;
    return userId;
  } catch (error) {
    console.log('User getting failed', error);
    throw new Error('Error in fetching error');
  }
};

export const GetUser = async () => {
  try {
    const user = await account.get();
    console.log('user', user);
    return user;
  } catch (error) {
    console.log('User getting failed', error);
    throw new Error('Error in fetching error');
  }
};
