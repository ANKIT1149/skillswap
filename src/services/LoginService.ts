import { account } from "@/db/Appwrite";
import { LoginData } from "@/props/LoginData";

export const LoginService = async ({ email, password }: LoginData) => {
    if (!email && !password) {
        throw new Error("All fields are Required")
    }

    try {
        const createsession = await account.createEmailPasswordSession({ email, password })
        if (!createsession.$id) {
            throw new Error("Createsession token failed")
        }
        
        const user = await account.get()
        if (!user.emailVerification) {
            await account.deleteSession({sessionId: 'current'})
        }

        return user

    } catch (error) {
        console.log("Login Failed", error)
        throw new Error("Login Failed")
    }
}