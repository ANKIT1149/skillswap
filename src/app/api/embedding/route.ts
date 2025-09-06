import { EmbeddingServices } from "@/services/EmbeddingService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, skillsToLearn, skillsToTeach } = await req.json();
    
    const embedding = await EmbeddingServices(userId, skillsToTeach, skillsToLearn)

    return NextResponse.json({embedding})
}