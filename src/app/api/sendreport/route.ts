import { EmailService } from '@/services/EmailService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, subject, body } = await req.json();

  const result = await EmailService({ email, subject, body });

  return NextResponse.json(
    {
      message: 'Fetch skilltoteach success',
      result,
    },
    { status: 200 }
  );
}
