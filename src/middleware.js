/**
 * Next.js Middleware
 * Protects /app routes — redirects unauthenticated users to sign in.
 * Exception: /app/lesson/1 is accessible to guest users (lekf_guest cookie).
 * API /api/lessons/* routes require a full JWT session.
 */

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Verify a real authenticated session (JWT)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token) {
    return NextResponse.next();
  }

  // Lesson 1 and the lessons list are accessible to guest users — check for the presence cookie
  const guestPaths = ['/app/lesson/1', '/app/lessons'];
  if (guestPaths.includes(pathname)) {
    const guestCookie = req.cookies.get('lekf_guest');
    if (guestCookie?.value === '1') {
      return NextResponse.next();
    }
  }

  // No session and not a qualifying guest — redirect to sign in
  const signInUrl = new URL('/auth/signin', req.url);
  signInUrl.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    '/app/:path*',
    '/api/lessons/:path*',
  ],
};
