/**
 * Next.js Middleware
 * Protects /app routes - redirects unauthenticated users to sign in
 */

import withAuth from 'next-auth/middleware';

export default withAuth;

export const config = {
  matcher: [
    '/app/:path*',
    '/pages/app/:path*'
  ]
};
