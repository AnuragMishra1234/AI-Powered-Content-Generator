import { verifyToken } from '@/app/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export function authenticateToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  return payload;
}

export function withAuth(
  handler: (req: NextRequest, context?: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: any) => {
    const payload = authenticateToken(req);

    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Attach payload to request
    (req as any).user = payload;

    return handler(req, context);
  };
}
