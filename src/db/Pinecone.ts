import { Pinecone } from "@pinecone-database/pinecone"

export const pinecone = new Pinecone({
    apiKey: process.env.SKILLSWAP_API_KEY!
})

export const index = pinecone.index("skills")