import React, { useEffect } from 'react';

const gdprText = `By using this app, you consent to the collection and processing of your personal data for communication and coaching purposes, in accordance with the General Data Protection Regulation (GDPR) (EU) 2016/679. Your data will be used solely for the purposes of providing coaching services, communication, and app functionality. You have the right to access, rectify, or erase your data at any time. For more information, please see our Privacy Policy. By continuing, you agree to these terms.`;

export default function AppHome() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/app/service-worker.js', { scope: '/app/' });
    }
  }, []);

  return (
    <main aria-label="LoveEatKeepFit Coaching App" className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">LoveEatKeepFit Coaching App</h1>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-6" aria-labelledby="login-heading">
        <h2 id="login-heading" className="text-xl font-semibold mb-2">Sign In</h2>
        <p className="mb-4 text-gray-600">Login and registration are in development. Please enter as a guest for now.</p>
        <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded disabled:opacity-50 mb-2" disabled>Sign In</button>
        <button
          className="w-full py-2 px-4 bg-blue-600 text-black rounded font-semibold shadow border-2 border-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-150"
          aria-label="Enter as guest"
          onClick={() => window.location.href='/app/lessons'}
        >
          Enter as Guest
        </button>
      </section>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-6" aria-labelledby="gdpr-heading">
        <h2 id="gdpr-heading" className="text-lg font-semibold mb-2">GDPR Consent</h2>
        <p className="text-gray-700 text-sm" aria-live="polite">{gdprText}</p>
      </section>
      <footer className="text-xs text-gray-400 mt-8">&copy; {new Date().getFullYear()} LoveEatKeepFit. All rights reserved.</footer>
    </main>
  );
}
