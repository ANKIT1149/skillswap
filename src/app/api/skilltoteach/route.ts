import { FindTeacherService } from "@/services/FindTeacherService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { skillWantTolearn } = await req.json()
    
    const result = await FindTeacherService(skillWantTolearn)

    return NextResponse.json({status: 200, message: "Fetch skilltoteach success", result})
}