import { connectDB } from '@/app/lib/mongodb';
import History from '@/app/lib/models/History';
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

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Fetch history
    const history = await History.find({ userId: payload.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await History.countDocuments({ userId: payload.userId });

    return NextResponse.json(
      successResponse('History fetched successfully', {
        history,
        total,
        page,
        pages: Math.ceil(total / limit),
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      errorResponse('Error fetching history', error.message),
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const payload = authenticateToken(req);
    if (!payload) {
      return NextResponse.json(
        errorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        errorResponse('Please provide history ID'),
        { status: 400 }
      );
    }

    const history = await History.findByIdAndDelete(id);

    if (!history || history.userId.toString() !== payload.userId) {
      return NextResponse.json(
        errorResponse('History not found or unauthorized'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse('History deleted successfully'),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting history:', error);
    return NextResponse.json(
      errorResponse('Error deleting history', error.message),
      { status: 500 }
    );
  }
}
