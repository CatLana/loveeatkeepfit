import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function AppHome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/app/service-worker.js', { scope: '/app/' });
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/app/lessons');
    } else if (status === 'unauthenticated') {
      router.replace('/auth/signin?callbackUrl=%2Fapp%2Flessons');
    }
  }, [status, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </main>
  );
}
