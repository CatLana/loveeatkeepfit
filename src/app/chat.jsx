import React from 'react';

export default function Chat() {
  return (
    <main aria-label="Chat with Coach" className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with Coach</h1>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-6">
        <p className="mb-4">Chat functionality is coming soon! In the future, you’ll be able to chat with your coach here using real-time messaging.</p>
        <form className="flex flex-col">
          <textarea className="w-full border rounded p-2 mb-2" placeholder="Type your message..." disabled></textarea>
          <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded disabled:opacity-50" disabled>Send</button>
        </form>
      </section>
      <footer className="text-xs text-gray-400 mt-8">&copy; {new Date().getFullYear()} LoveEatKeepFit</footer>
    </main>
  );
}
