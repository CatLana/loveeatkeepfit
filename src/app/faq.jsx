'use client';
import { useState } from 'react';
import Link from 'next/link';

const FAQS = [
  {
    q: 'How do my lessons unlock?',
    a: 'Lesson 1 is open from day one. Each time you complete and submit an assignment, your coach reviews your entry and the next lesson becomes accessible. You will see the progress counter at the top of the Lessons page update automatically.',
  },
  {
    q: 'Where is my personalised calorie target?',
    a: 'Before joining you filled in a short questionnaire on our website. Your calorie target was calculated from that data and sent to your email address. Please check your inbox and your spam folder. If you cannot find it, message your coach via the Chat section and they will resend it.',
  },
  {
    q: 'Do I need MyFitnessPal Premium?',
    a: 'No. The free version of MyFitnessPal (and any other free tracker) is completely sufficient for everything in this program. You do not need to pay for any app.',
  },
  {
    q: 'How do I submit my assignment?',
    a: 'Scroll to the bottom of the lesson page. Fill in the assignment form and tap "Submit assignment". Your coach will receive it by email and get back to you within 24 to 48 hours. The next lesson will also unlock.',
  },
  {
    q: 'What happens after I submit my homework?',
    a: 'Your coach reads your submission and replies to you by email with personalised feedback and any adjustments to your plan. The next lesson becomes visible in your lesson list and your progress badge updates.',
  },
  {
    q: 'Why is the scale going up even though I am eating in a deficit?',
    a: 'This is completely normal. Your body weight fluctuates by 1 to 3 kg every single day due to water retention (from salt, carbs, and hormones), food and liquid still in your digestive system, and hydration levels. None of this is fat gain. Judge your progress over 2 to 3 weeks, not from one day to the next.',
  },
  {
    q: 'How do I message my coach?',
    a: 'Every lesson page has a "Chat with your coach" button. You can also go to the main App menu and tap Chat. Your coach aims to reply within 24 hours on weekdays.',
  },
  {
    q: 'I forgot my password. What do I do?',
    a: 'On the sign-in page, click "Forgot password". Enter your email address and you will receive a password reset link within a few minutes. Check your spam folder if you do not see it.',
  },
  {
    q: 'How is my personal data protected?',
    a: 'All data is encrypted in transit (HTTPS) and stored on a private, access-controlled database. We never share or sell your personal information. You can read the full details in our Privacy Policy.',
  },
  {
    q: 'What is the difference between the free and paid version?',
    a: 'The free version gives you full access to all 5 lessons, the assignment submission system, the cookbook, and in-app messaging with your coach. The paid version adds personalised weekly check-ins, priority coach replies, and a fully custom macro plan tailored to your body composition goals.',
  },
  {
    q: 'How many calories should I be eating to lose fat?',
    a: 'Your personalised target was sent to your email after you completed the intake questionnaire. If you have not received it, please message your coach. As a general principle, a comfortable deficit of around 300 to 500 kcal below your maintenance level produces steady fat loss of 0.25 to 0.5 kg per week without impacting your energy or muscle mass.',
  },
  {
    q: 'Can I eat the foods I love and still lose weight?',
    a: 'Yes. This programme is based on the energy balance principle (CICO), which means no food is off limits. What you eat within your calorie target is your choice. Lesson 2 covers this in full detail.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 text-sm sm:text-base">{q}</span>
        <svg
          className={`w-5 h-5 text-indigo-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 bg-white border-t border-gray-100">
          <p className="text-gray-700 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <main aria-label="FAQ" className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-500 text-sm">
            Can't find an answer?{' '}
            <Link href="/app/chat" className="text-indigo-600 underline hover:text-indigo-800">
              Message your coach
            </Link>
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="mt-10 bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
          <p className="text-indigo-900 font-medium mb-1">Still have a question?</p>
          <p className="text-indigo-700 text-sm mb-4">
            Your coach reads every message personally and replies within 24 hours on weekdays.
          </p>
          <Link
            href="/app/chat"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition-colors"
          >
            Chat with your coach
          </Link>
        </div>
      </div>

      <footer className="text-xs text-gray-400 text-center mt-12">
        &copy; {new Date().getFullYear()} LoveEatKeepFit
      </footer>
    </main>
  );
}
