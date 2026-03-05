/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent browsers from sniffing MIME types
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Block clickjacking
  { key: 'X-Frame-Options', value: 'DENY' },
  // Force HTTPS for 1 year, include subdomains
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  // Control Referer header leakage
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restrict browser feature access
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // Legacy XSS filter (for older IE/Edge)
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Content Security Policy
  // - default: self only
  // - scripts: self + Vercel analytics
  // - styles: self + unsafe-inline (Tailwind)
  // - fonts: self (next/font self-hosts from /_next/static/media/)
  // - connect: self + Vercel analytics + Supabase
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://va.vercel-scripts.com https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
