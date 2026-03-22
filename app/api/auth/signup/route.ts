import { connectDB } from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';
import { generateToken } from '@/app/lib/auth';
import { successResponse, errorResponse } from '@/app/lib/apiResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, confirmPassword } = await req.json();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        errorResponse('Please provide all required fields'),
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        errorResponse('Passwords do not match'),
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        errorResponse('User already exists with this email'),
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      credits: 100, // Initial credits
    });

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Return success
    return NextResponse.json(
      successResponse('User created successfully', {
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          credits: user.credits,
        },
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map((err: any) => err.message)
        .join(', ');
      return NextResponse.json(
        errorResponse('Validation error', messages),
        { status: 400 }
      );
    }
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        errorResponse('Email already exists'),
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      errorResponse('Error creating user', error.message),
      { status: 500 }
    );
  }
}
