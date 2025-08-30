import { account } from "@/db/Appwrite"

export const VerificationService = async(userId: string, secret:string) => {
    if (!userId || !secret) {
        throw new Error("User id a and secret are required")
    }

    try {
        const verify = await account.updateVerification({ userId, secret })
       
        if (!verify.$id) {
            throw new Error("Email Verification Failed")
        }

        return verify
    } catch (error) {
        console.log("Email Verification Failed", error)
        throw new Error("Email Verification Failed")
    }
}