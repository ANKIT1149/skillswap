import { storage } from '@/db/Appwrite';
import { ID } from 'appwrite';

export const UploadImageService = async (file: File) => {
  if (!file) {
    throw new Error('No file  is present,please upload a file');
  }

  try {
    const response = await storage.createFile({
      bucketId: process.env.NEXT_PUBLIC_BUCKET_ID as string,
      fileId: ID.unique(),
      file: file,
      permissions: ['read("any")']
    });
      
    if (!response.$id) {
        throw new Error("File Uploadation Failed")
    }

    return response.$id
  } catch (error) {
    console.log('Upload Image Service Failed', error);
    throw new Error('Upload Image Service failed');
  }
};
