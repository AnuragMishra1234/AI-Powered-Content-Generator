import { connectDB } from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';
import { authenticateToken } from '@/app/lib/middleware';
import { successResponse, errorResponse } from '@/app/lib/apiResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const payload = authenticateToken(req);
    if (!payload) {
      return NextResponse.json(
        errorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json(
        errorResponse('User not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse('User fetched successfully', {
        id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      errorResponse('Error fetching user', error.message),
      { status: 500 }
    );
  }
}
