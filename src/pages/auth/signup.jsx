/**
 * Sign Up Page
 * New user registration interface
 */

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length (must match API-side requirement)
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred during signup');
        setIsLoading(false);
        return;
      }

      // Account created — prompt user to verify email
      setSuccess(true);
      setIsLoading(false);
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
      <>
        <Head>
          <title>Check Your Email | LoveEatKeepFit</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-warmwhite via-white to-beige/30 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Check your inbox</h2>
              <p className="text-gray-600 mb-2">
                We&apos;ve sent a verification link to <strong>{formData.email}</strong>.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Click the link in the email to activate your account. The link expires in 24 hours.
              </p>
              <Link
                href="/auth/signin"
                className="inline-block py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                Go to Sign In
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign Up | LoveEatKeepFit</title>
        <meta name="description" content="Create your nutrition coaching account" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-warmwhite via-white to-beige/30 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Logo/Branding */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-leafgreen mb-2">LoveEatKeepFit</h1>
            <p className="text-gray-600">Start your journey to a healthier, happier you.</p>
          </div>

          {/* Sign Up Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create Account</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                  placeholder="Jamie Smith"
                />
                <p className="mt-1 text-xs text-gray-500">Optional — used to personalise your experience</p>
              </div>

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
                  minLength={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-gray-500">Minimum 8 characters, including at least one letter and one number</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>

              {/* Legal notice — GDPR Art. 13 informed consent */}
              <p className="text-xs text-gray-500 text-center">
                By creating an account you agree to our{' '}
                <Link href="/terms" className="underline hover:text-gray-700">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link>.
                You must be at least 16 years old to register.
              </p>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Sign in
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
