import { connectDB } from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';
import { generateToken } from '@/app/lib/auth';
import { successResponse, errorResponse } from '@/app/lib/apiResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        errorResponse('Please provide email and password'),
        { status: 400 }
      );
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        errorResponse('Invalid email or password'),
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        errorResponse('Invalid email or password'),
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Return success
    return NextResponse.json(
      successResponse('Login successful', {
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          credits: user.credits,
        },
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      errorResponse('Error logging in', error.message),
      { status: 500 }
    );
  }
}
