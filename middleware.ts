import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Check if accessing admin dashboard routes
  const isAdminDashboard = request.nextUrl.pathname.startsWith('/admin/dashboard');
  
  if (isAdminDashboard) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token) {
      // Not authenticated, redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Protect all admin dashboard routes
export const config = {
  matcher: ['/admin/dashboard/:path*'],
};

