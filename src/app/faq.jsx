import React from 'react';

export default function FAQ() {
  return (
    <main aria-label="FAQ" className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-6">
        <ul className="list-disc pl-5">
          <li>How do I access my lessons?</li>
          <li>How do I submit my homework?</li>
          <li>How do I contact my coach?</li>
          <li>How is my data protected?</li>
        </ul>
      </section>
      <footer className="text-xs text-gray-400 mt-8">&copy; {new Date().getFullYear()} LoveEatKeepFit</footer>
    </main>
  );
}
