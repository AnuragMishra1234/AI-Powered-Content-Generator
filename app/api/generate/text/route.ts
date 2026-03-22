import { connectDB } from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';
import History from '@/app/lib/models/History';
import { authenticateToken } from '@/app/lib/middleware';
import { successResponse, errorResponse } from '@/app/lib/apiResponse';
import { generateWithGroq } from '@/app/lib/groq';
import { NextRequest, NextResponse } from 'next/server';

const CREDITS_PER_REQUEST = 10;

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const payload = authenticateToken(req);
    if (!payload) {
      return NextResponse.json(
        errorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        errorResponse('Please provide a prompt'),
        { status: 400 }
      );
    }

    // Get user and check credits
    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json(
        errorResponse('User not found'),
        { status: 404 }
      );
    }

    if (user.credits < CREDITS_PER_REQUEST) {
      return NextResponse.json(
        errorResponse('Insufficient credits'),
        { status: 402 }
      );
    }

    // Generate text using Groq API
    const output = await generateWithGroq(prompt);

    // Deduct credits
    user.credits -= CREDITS_PER_REQUEST;
    await user.save();

    // Save to history
    await History.create({
      userId: user._id,
      toolType: 'text',
      input: prompt,
      output,
      creditsUsed: CREDITS_PER_REQUEST,
    });

    return NextResponse.json(
      successResponse('Text generated successfully', {
        output,
        creditsRemaining: user.credits,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Text generation error:', error);
    return NextResponse.json(
      errorResponse('Error generating text', error.message),
      { status: 500 }
    );
  }
}
