/**
 * Next.js Middleware
 * Protects /app routes - redirects unauthenticated users to sign in
 */

export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/app/:path*',
    '/pages/app/:path*'
  ]
};
