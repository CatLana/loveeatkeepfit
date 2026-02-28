import React from 'react';

export default function LessonPage({ id }) {
  // Mock lesson content
  const lesson = {
    title: `Lesson ${id}`,
    faq: '/app/faq',
    askCoach: '/app/chat',
    article: 'This is the main article for this lesson. Video and content go here.',
    homework: 'Complete your food diary for today.',
    googleForm: 'https://forms.gle/your-google-form-link',
  };

  return (
    <main aria-label={`Lesson ${id}`} className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
      <nav className="mb-4">
        <a href={lesson.faq} className="text-blue-600 underline mr-4">FAQ</a>
        <a href={lesson.askCoach} className="text-blue-600 underline">Ask Coach</a>
      </nav>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Article</h2>
        <p>{lesson.article}</p>
        {/* Embed video here if needed */}
      </section>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Homework</h2>
        <p>{lesson.homework}</p>
        <form className="mt-2" action="mailto:your@email.com" method="POST" encType="text/plain">
          <textarea name="homework" className="w-full border rounded p-2 mb-2" placeholder="Submit your homework here..." required></textarea>
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded">Submit Homework</button>
        </form>
      </section>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Feedback</h2>
        <iframe src={lesson.googleForm} title="Feedback Form" width="100%" height="400" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
      </section>
      <footer className="text-xs text-gray-400 mt-8">&copy; {new Date().getFullYear()} LoveEatKeepFit</footer>
    </main>
  );
}
