import { connectDB } from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';
import History from '@/app/lib/models/History';
import { authenticateToken } from '@/app/lib/middleware';
import { successResponse, errorResponse } from '@/app/lib/apiResponse';
import { generateWithGroq } from '@/app/lib/groq';
import { NextRequest, NextResponse } from 'next/server';

const CREDITS_PER_REQUEST = 15;

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

    const { name, title, experience } = await req.json();

    if (!name || !title) {
      return NextResponse.json(
        errorResponse('Please provide name and title'),
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

    // Generate resume using Groq API
    const prompt = `Create a professional resume for ${name} with job title "${title}". Professional summary: ${experience || 'Experienced professional with strong skills and achievements.'}. Include sections for Experience, Education, Skills, and Certifications.`;
    let output;
    try {
      output = await generateWithGroq(prompt, 2000);
    } catch (genError: any) {
      console.error('Groq generation error:', genError);
      return NextResponse.json(
        errorResponse('Failed to generate resume', genError.message),
        { status: 500 }
      );
    }

    // Deduct credits
    user.credits -= CREDITS_PER_REQUEST;
    await user.save();

    // Save to history
    await History.create({
      userId: user._id,
      toolType: 'resume',
      input: JSON.stringify({ name, title, experience }),
      output,
      creditsUsed: CREDITS_PER_REQUEST,
    });

    return NextResponse.json(
      successResponse('Resume generated successfully', {
        output,
        creditsRemaining: user.credits,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Resume generation error:', error);
    return NextResponse.json(
      errorResponse('Error generating resume', error.message),
      { status: 500 }
    );
  }
}
