/**
 * Sign In Page
 * User login interface with email and password
 */

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useGuest } from '@/lib/guestSession';

// Only allow relative paths that do not start with '//' (protocol-relative)
function isSafeRedirect(url) {
  if (typeof url !== 'string') return false;
  if (!url.startsWith('/') || url.startsWith('//')) return false;
  return true;
}

export default function SignIn() {
  const router = useRouter();
  const { enterAsGuest } = useGuest();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Guest name modal state
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestName, setGuestName] = useState('');

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
        if (result.error === 'USER_NOT_FOUND') {
          // Seamless handoff to sign-up: temporarily store password in sessionStorage
          // so it can be pre-filled in the signup form. Cleared immediately after read.
          try { sessionStorage.setItem('lekf_signup_password', formData.password); } catch { /* ignore */ }
          const params = new URLSearchParams({ email: formData.email, ref: 'login' });
          router.push(`/auth/signup?${params.toString()}`);
          return;
        }
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

  const handleEnterAsGuest = (e) => {
    e.preventDefault();
    const name = guestName.trim() || 'Guest';
    enterAsGuest(name);
    router.push('/app/lesson/1');
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

            {/* ── Guest divider ──────────────────────────────────────────── */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">or</span>
              </div>
            </div>

            {!showGuestModal ? (
              <button
                type="button"
                onClick={() => setShowGuestModal(true)}
                className="mt-6 w-full py-3 px-4 border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 text-gray-600 hover:text-indigo-700 font-medium rounded-lg transition-colors duration-200 text-sm"
              >
                Continue as Guest
                <span className="block text-xs text-gray-400 mt-0.5 font-normal">
                  Access Lesson 1 without an account
                </span>
              </button>
            ) : (
              <form onSubmit={handleEnterAsGuest} className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-indigo-900 mb-1">Enter as Guest</h3>
                <p className="text-xs text-indigo-700 mb-3">
                  We&apos;ll use your name to personalise Lesson 1. Your progress won&apos;t be saved.
                </p>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-shadow mb-3 text-sm"
                  placeholder="Your first name (optional)"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Start Lesson 1 as Guest
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGuestModal(false)}
                    className="px-4 py-2.5 text-gray-500 hover:text-gray-700 text-sm rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Back to Home */}
            <div className="mt-6 text-center">
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
