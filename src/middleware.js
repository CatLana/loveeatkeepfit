/**
 * Next.js Middleware
 * Protects /app routes - redirects unauthenticated users to sign in.
 * Also blocks API homework/lessons routes from unauthenticated callers.
 */

import withAuth from 'next-auth/middleware';

export default withAuth;

export const config = {
  matcher: [
    '/app/:path*',
    '/api/lessons/:path*',
  ],
};
