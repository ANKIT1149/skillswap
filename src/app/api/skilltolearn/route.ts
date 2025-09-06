import { FindLearnerService } from "@/services/FindLearnerService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { skillWantToteach } = await req.json()
    
    const result = await FindLearnerService(skillWantToteach)

    return NextResponse.json({status: 200, message: "Fetch skilltoteach success", result})
}