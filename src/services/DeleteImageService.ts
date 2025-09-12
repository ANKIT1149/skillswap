import { storage } from "@/db/Appwrite"

export const DeleteImageService = async (fileformat: string) => {
    if (!fileformat) {
        throw new Error("Please Provide fileId")
    }

    try {
        const deleteImage = await storage.deleteFile({
            bucketId: process.env.NEXT_PUBLIC_BUCKET_ID!,
            fileId: fileformat
        }) 
        
        return deleteImage
    } catch (error) {
        console.log('Error in Creating Delete Image Service', error)
        throw new Error("Error in Creating Delet Image Service")
    }
}