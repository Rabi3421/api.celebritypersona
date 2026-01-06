import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the request is for a dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check for access token in cookies
    const accessToken = request.cookies.get('accessToken');
    
    if (!accessToken) {
      // Redirect to login if no token found
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check if the request is for auth routes when already authenticated
  if (request.nextUrl.pathname.startsWith('/auth/')) {
    const accessToken = request.cookies.get('accessToken');
    
    if (accessToken) {
      // Redirect to dashboard if already authenticated
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
};