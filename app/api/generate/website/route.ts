import { connectDB } from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';
import History from '@/app/lib/models/History';
import { authenticateToken } from '@/app/lib/middleware';
import { successResponse, errorResponse } from '@/app/lib/apiResponse';
import { generateWithGroq } from '@/app/lib/groq';
import { NextRequest, NextResponse } from 'next/server';

const CREDITS_PER_REQUEST = 25;

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

    const { title, description } = await req.json();

    if (!title) {
      return NextResponse.json(
        errorResponse('Please provide a website title'),
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

    // Generate website using Groq API
    const prompt = `Create a complete HTML website with professional design. Title: "${title}". Description: "${description || 'Welcome to our website'}". Include header with gradient background, features section with cards, and footer. Make it modern and responsive with inline CSS.`;
    let output;
    try {
      output = await generateWithGroq(prompt, 2500);
    } catch (genError: any) {
      console.error('Groq generation error:', genError);
      return NextResponse.json(
        errorResponse('Failed to generate website', genError.message),
        { status: 500 }
      );
    }

    // Deduct credits
    user.credits -= CREDITS_PER_REQUEST;
    await user.save();

    // Save to history
    await History.create({
      userId: user._id,
      toolType: 'website',
      input: JSON.stringify({ title, description }),
      output,
      creditsUsed: CREDITS_PER_REQUEST,
    });

    return NextResponse.json(
      successResponse('Website generated successfully', {
        output,
        creditsRemaining: user.credits,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Website generation error:', error);
    return NextResponse.json(
      errorResponse('Error generating website', error.message),
      { status: 500 }
    );
  }
}
