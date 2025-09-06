import { account } from "@/db/Appwrite"

export const CreateJWTService = async () => {
    try {
        const jwt = await account.createJWT()
        return jwt
    } catch (error) {
        console.log("Creating jwt service failed", error)
        throw new Error("Error in creating jwt token")
    }
}