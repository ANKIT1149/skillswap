import { storage } from '@/db/Appwrite';

export const GetProfileImageUrl = async (fileId: string) => {
  if (!fileId) {
    throw new Error('Fileid required for getting image url');
    }
    
    console.log('fileId', fileId)

  try {
    const Storage = storage.getFileView(
      process.env.NEXT_PUBLIC_BUCKET_ID as string,
      fileId,
    );
    console.log('url', Storage)

    return Storage;
  } catch (error) {
    console.log('Error in Getting profile url', error);
    throw new Error('Error in getting profile image url');
  }
};
