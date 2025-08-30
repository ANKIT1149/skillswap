import { account } from "@/db/Appwrite"
import { FormData } from "@/props/Formdata"
import { RegisterSchema } from "@/schema/RegisterSchema"
import { ID } from "appwrite"

export const RegisterService = async ({ username, email, password }: FormData) => {
    if (!username || !email || !password) {
        throw new Error('All fields are required')
    }

    try {
        const validation = RegisterSchema.safeParse({ username, email, password })
        if (!validation.success) {
            throw new Error(validation.error.message)
        }
        
        const response = await account.create({userId: ID.unique(), email, password, name: username})
        if (!response.$id) {
            throw new Error('Registration Failed')
        }

        const login = await account.createEmailPasswordSession({email, password})
        if (!login.$id) {
            throw new Error('Login Failed')
        }

        const verification = await account.createVerification({ url: 'http://localhost:3000/verify' })
        console.log('Verification email sent:', verification)

        return response
    } catch (error) {
        console.log("Registration failed", error)
        throw new Error('Registration Failed')
    }
}