/**
 * Sign In Page
 * User login interface with email and password
 */

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

// Only allow relative paths that do not start with '//' (protocol-relative)
function isSafeRedirect(url) {
  if (typeof url !== 'string') return false;
  if (!url.startsWith('/') || url.startsWith('//')) return false;
  return true;
}

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pre-populate email if redirected from signup
  const verifiedSuccess = router.query.verified === 'true';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUnverifiedEmail('');
    setResendStatus('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === 'EMAIL_NOT_VERIFIED') {
          setUnverifiedEmail(formData.email);
        } else {
          setError(result.error);
        }
        setIsLoading(false);
      } else {
        const callbackUrl = router.query.callbackUrl || '/app/lessons';
        router.push(isSafeRedirect(callbackUrl) ? callbackUrl : '/app/lessons');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendStatus('sending');
    try {
      await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: unverifiedEmail }),
      });
      setResendStatus('sent');
    } catch {
      setResendStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Sign In | LoveEatKeepFit</title>
        <meta name="description" content="Sign in to your nutrition coaching account" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-warmwhite via-white to-beige/30 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Logo/Branding */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-leafgreen mb-2">LoveEatKeepFit</h1>
            <p className="text-gray-600">Welcome back! Sign in to continue your journey.</p>
          </div>

          {/* Sign In Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sign In</h2>

            {/* Email verified success banner */}
            {verifiedSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium">Email verified! You can now sign in.</p>
              </div>
            )}

            {/* Generic error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Email not verified banner */}
            {unverifiedEmail && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-lg">
                <p className="text-amber-900 text-sm font-medium mb-2">Please verify your email before signing in.</p>
                <p className="text-amber-800 text-sm mb-3">Check your inbox for a verification link.</p>
                {resendStatus === 'sent' ? (
                  <p className="text-green-700 text-sm font-medium">A new verification email has been sent.</p>
                ) : (
                  <button
                    onClick={handleResendVerification}
                    disabled={resendStatus === 'sending'}
                    className="text-sm text-amber-800 underline hover:text-amber-900 disabled:opacity-50"
                  >
                    {resendStatus === 'sending' ? 'Sending...' : 'Resend verification email'}
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
