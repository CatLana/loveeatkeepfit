/**
 * Lesson 1 — First Steps with the Program and Calories Target
 */

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LessonTemplate from '@/components/LessonTemplate';
import Quiz from '@/components/Quiz';
import RecipeCard from '@/components/RecipeCard';
import SOSButton from '@/components/SOSButton';
import lessonsData from '@/data/lessons.json';

const lesson = lessonsData.lessons.find((l) => l.id === 1);

// ─── Quiz ────────────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    question: 'What does TDEE stand for?',
    options: [
      'Total Diet and Exercise Evaluation',
      'Total Daily Energy Expenditure',
      'Timed Daily Eating Estimate',
    ],
    correct: 1,
  },
  {
    question: 'What can happen when you consistently eat far below your BMR?',
    options: [
      'You lose weight faster and keep it off permanently',
      'Your metabolism can slow down and you risk losing muscle',
      'Your body adapts and automatically burns more fat',
    ],
    correct: 1,
  },
  {
    question: 'What is the purpose of the 3-day food diary this week?',
    options: [
      'To start cutting calories and eating less straight away',
      'To track your real, everyday eating habits without any changes',
      'To identify which foods to eliminate first',
    ],
    correct: 1,
  },
];

// ─── Recipe ───────────────────────────────────────────────────────────────────
const RECIPE = {
  title: 'Baked Salmon with Roasted Vegetables',
  intro: 'An easy, whole-food meal that is wonderfully simple to calorie-track.',
  videoUrl: '', // add a YouTube or Instagram URL when ready
  ingredients: [
    { name: 'Salmon fillet', qty: '180 g' },
    { name: 'Sweet potato', qty: '150 g' },
    { name: 'Broccoli florets', qty: '150 g' },
    { name: 'Olive oil', qty: '1 tbsp' },
    { name: 'Garlic, salt, pepper', qty: 'to taste' },
    { name: 'Lemon', qty: '½ (to serve)' },
  ],
  steps: [
    'Preheat oven to 200 °C.',
    'Cube sweet potato, toss with half the oil and seasoning.',
    'Roast sweet potato 15 min.',
    'Add broccoli, drizzle remaining oil, roast 15 min more.',
    'Season salmon, add to tray, bake 12–15 min until flaky.',
    'Squeeze lemon over everything and serve.',
  ],
  macrosPerPortion: {
    calories: 420,
    protein: 36,
    carbs: 22,
    fat: 18,
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Lesson1() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({ day1: '', day2: '', day3: '', photos: '', comments: '' });
  const [reflection, setReflection] = useState('');
  const [win, setWin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: 1,
          lessonTitle: lesson.title,
          userName: session?.user?.name || 'Student',
          ...formData,
          reflection,
          win,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        const body = await res.json().catch(() => ({}));
        alert(body.message || 'Submission failed. Please try again.');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LessonTemplate lesson={lesson}>
      {/* ──────────────────────────────────────────────────────────────────────
       * 1. ARTICLE
       * ──────────────────────────────────────────────────────────────────── */}
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8" aria-label="Lesson content">

        {/* Welcome */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to the programme</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You've taken the first step, and that matters more than you know. <strong>Love. Eat. Keep Fit.</strong> is not
            a diet. It is a coaching programme built around small, sustainable habits that add up to real, lasting results.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A new lesson becomes available to you every day, as long as you have submitted all the required answers
            to the questions at the end of the previous lesson and completed any exercises set. Each lesson unlocks
            once per day because you need time to absorb, apply, and reflect on what you have just learned before
            moving on.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We do not believe in overwhelming the brain with large amounts of information at once. When we try to
            take in too much too quickly, very little of it actually sticks. Each lesson is short by design. Reading
            the content and completing the tasks should take you no more than 15 minutes a day.
          </p>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
            <p className="text-green-800 font-medium">
              <svg className="inline w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V6M6 9c0-3.314 2.686-6 6-6 3.314 0 6 2.686 6 6-2 0-4 1-6 3-2-2-4-3-6-3z" /></svg>{' '}One important rule for this week: <strong>do not change anything about the way you eat yet.</strong>
              Just observe. We start with information, not restriction.
            </p>
          </div>
        </section>

        {/* Atomic habits */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Small habits, lasting change</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This programme is built on a simple but powerful idea: lasting change does not come from dramatic
            overhauls. It comes from small improvements, repeated consistently over time. The concept is often
            called <strong>atomic habits</strong> and it is the foundation of everything we do here.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            An atomic habit is a tiny behaviour that seems almost too small to matter. On its own, eating one
            more vegetable, drinking one extra glass of water, or understanding how a single nutrient works in
            your body feels insignificant. But these small actions compound. Over weeks and months, they reshape
            the way you think about food and the way your body responds to it.
          </p>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-4">
            <h3 className="font-semibold text-indigo-900 mb-3">How atomic habits work</h3>
            <ul className="space-y-3 text-sm text-indigo-800">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Make it tiny.</strong> A new behaviour should require almost no willpower to start. If it feels hard, it is still too big.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Build on knowledge.</strong> Every small habit here is grounded in how food actually works in your body, not in rules someone invented.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Let them stack.</strong> Each lesson introduces one idea. That idea becomes a habit. The next lesson adds another layer on top, slowly building a way of eating that fits your life.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Consistency beats intensity.</strong> Showing up for 15 minutes every day will always produce better results than an intense week followed by burnout.</span>
              </li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Our goal is not to give you a meal plan to follow for 30 days and then abandon. Our goal is to help
            you understand food well enough that you no longer need a plan. That understanding is built one
            small lesson at a time.
          </p>
        </section>

        {/* What are calories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What are calories?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A calorie is simply a unit of energy: the fuel your body uses to do everything from breathing to thinking
            to taking a walk. Every food and drink (except plain water) contains calories.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Calories are not the enemy. They are <strong>information</strong>. When we understand how much energy we
            are taking in versus how much our body needs, we gain the clarity to make choices that feel good rather
            than choices driven by guilt or confusion.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Too few calories</p>
              <p className="text-sm text-blue-800">Tiredness, hunger, muscle loss, a metabolism that adapts downward</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
              <p className="text-xs font-bold text-rose-600 uppercase tracking-wide mb-1">Too many calories</p>
              <p className="text-sm text-rose-800">Energy stored as body fat over time, even from &ldquo;healthy&rdquo; foods</p>
            </div>
          </div>
        </section>

        {/* BMR */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Base Metabolism (BMR)</h2>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-4">
            <h3 className="font-semibold text-indigo-900 mb-2">Basal Metabolic Rate</h3>
            <p className="text-indigo-800 leading-relaxed">
              Your BMR is the number of calories your body burns just to stay alive: keeping your heart beating,
              your lungs breathing, your organs functioning, <em>without any movement at all</em>.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-3">
            This number is personal to you. It depends on your age, height, weight, and sex. A common
            rough guide: BMR for women is typically 1,300–1,600 kcal/day; for men 1,600–2,000 kcal/day.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
            <p className="text-amber-900 font-semibold">
              <svg className="inline w-4 h-4 mr-1 text-amber-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{' '}Never eat below your BMR. Consistently eating under it sends your body into a conservation
              mode where it slows metabolism and breaks down muscle for fuel, the opposite of what we want.
            </p>
          </div>
        </section>

        {/* TDEE */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your total energy needs (TDEE)</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Total Daily Energy Expenditure (TDEE)</strong> is your BMR plus all the energy you burn
            through movement: walking, working, exercising, even fidgeting. This is how much you need to eat
            to maintain your current weight.
          </p>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">TDEE = BMR × Activity Multiplier</p>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                ['Mostly desk-based, little movement', '× 1.2'],
                ['Light activity 1–3 days/week', '× 1.375'],
                ['Moderate activity 3–5 days/week', '× 1.55'],
                ['Active or physical job + training', '× 1.725'],
              ].map(([label, mult]) => (
                <li key={label} className="flex justify-between gap-4">
                  <span>{label}</span>
                  <span className="font-semibold text-gray-900 whitespace-nowrap">{mult}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed mt-4">
            Your coach will help you find your personal TDEE based on your intake diary. That is exactly
            what the assignment below is for.
          </p>
        </section>

        {/* Calorie deficit */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The calorie deficit: slow and steady</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To lose fat, you need to eat slightly less than your TDEE, creating a calorie deficit. The key
            word is <em>slightly</em>. Research consistently shows that a deficit of <strong>15–20%</strong>
            below TDEE is the sweet spot for sustainable fat loss of roughly 0.25–0.5 kg per week.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-2xl font-bold text-red-600 mb-1">−50%</p>
              <p className="text-red-700 font-medium">Crash diet</p>
              <p className="text-red-600 text-xs mt-1">Muscle loss, fatigue, rebound weight gain</p>
            </div>
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-700 mb-1">−15–20%</p>
              <p className="text-green-700 font-semibold">Recommended</p>
              <p className="text-green-600 text-xs mt-1">Steady fat loss, good energy, no hunger spiral</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-500 mb-1">0%</p>
              <p className="text-gray-600 font-medium">Maintenance</p>
              <p className="text-gray-500 text-xs mt-1">Eating at TDEE, weight stays stable</p>
            </div>
          </div>
          <div className="mt-5 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
            <p className="text-yellow-900">
              <strong>Not yet.</strong> There is no need to calculate or apply any deficit right now.
              Your only job this week is to record what you already eat. We will work out the numbers together
              from there.
            </p>
          </div>
        </section>
      </article>

      {/* ──────────────────────────────────────────────────────────────────────
       * 2. KNOWLEDGE CHECK QUIZ
       * ──────────────────────────────────────────────────────────────────── */}
      <section aria-labelledby="quiz-heading">
        <div className="mb-4">
          <h2 id="quiz-heading" className="text-2xl font-bold text-gray-900">Quick knowledge check</h2>
          <p className="text-gray-500 text-sm mt-1">3 questions, one at a time. See how much you have picked up.</p>
        </div>
        <Quiz questions={QUIZ_QUESTIONS} />
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
       * 3. RECIPE
       * ──────────────────────────────────────────────────────────────────── */}
      <section aria-labelledby="recipe-heading">
        <div className="mb-4">
          <h2 id="recipe-heading" className="text-2xl font-bold text-gray-900">Try this recipe</h2>
          <p className="text-gray-500 text-sm mt-1">Whole foods, balanced macros, and easy to track. Perfect for getting started.</p>
        </div>
        <RecipeCard recipe={RECIPE} />
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
       * 4. REFLECTION
       * ──────────────────────────────────────────────────────────────────── */}
      <section aria-labelledby="reflection-heading" className="bg-purple-50 rounded-2xl border border-purple-100 p-8">
        <h2 id="reflection-heading" className="text-2xl font-bold text-gray-900 mb-2">What did you learn today?</h2>
        <p className="text-gray-600 text-sm mb-5">Write one thing that was new to you, surprised you, or that you want to remember.</p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={4}
          className="w-full border border-purple-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
          placeholder="e.g. I didn't realise TDEE includes activity level — not just resting metabolism…"
        />
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
       * 5. ASSIGNMENT
       * ──────────────────────────────────────────────────────────────────── */}
      <section aria-labelledby="assignment-heading" className="bg-white rounded-2xl shadow-sm border-2 border-indigo-200 p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h2 id="assignment-heading" className="text-2xl font-bold text-gray-900">Your assignment</h2>
            <p className="text-gray-500 text-sm mt-0.5">Track your food for 3 real days</p>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-6 mb-6 space-y-3 text-gray-700 leading-relaxed">
          <p>Over the next 3 days, record everything you eat and drink. You can use any method you like:</p>
          <ul className="list-none space-y-1.5 ml-2">
            {[
              'A food tracking app like MyFitnessPal — screenshots or export are fine',
              'Photos of your plates',
              'A written diary — please include approximate quantities (e.g. "200g chicken, handful of rice")',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-indigo-200 pt-4">
            <p className="font-semibold text-indigo-900 mb-2">Please — do NOT change anything about how you eat this week.</p>
            <p>
              Show me your real life. The stress days, the no-time-to-cook days, the junk food days,
              even the kilo-of-chocolate day. All of it is welcome here.
            </p>
            <p className="mt-2">
              <strong>There is no judgement.</strong> We learn far more from our imperfect days than our
              perfect ones. When everything goes to plan there is nothing to improve — and we improve by
              looking honestly at what actually happens, not what we wish happened. Imperfection is where
              real growth lives.
            </p>
          </div>
        </div>

        {submitSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Assignment submitted!</h3>
            <p className="text-green-700">Your coach will review your diary and get back to you with personalised feedback within 24–48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: 'day1', label: 'Day 1 food diary *', required: true, placeholder: 'Breakfast (8am): porridge with berries and honey\nLunch (1pm): chicken wrap, apple\nDinner (7pm): pasta bolognese\nSnacks: biscuits, coffee with milk' },
              { name: 'day2', label: 'Day 2 food diary *', required: true, placeholder: 'Breakfast: skipped\nLunch (2pm): takeaway burger and fries\nDinner (8pm): scrambled eggs on toast…' },
              { name: 'day3', label: 'Day 3 food diary (optional — add if you have a third day)', required: false, placeholder: '' },
            ].map(({ name, label, required, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                <textarea
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required={required}
                  rows={name === 'day3' ? 4 : 6}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-400"
                  placeholder={placeholder}
                />
              </div>
            ))}

            <div>
              <label htmlFor="photos" className="block text-sm font-semibold text-gray-700 mb-1.5">Photo links or app screenshots (optional)</label>
              <textarea id="photos" name="photos" value={formData.photos} onChange={handleChange} rows={3}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-400"
                placeholder="Paste links to photos or describe screenshots you've taken…" />
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-1.5">Comments or questions (optional)</label>
              <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} rows={3}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-400"
                placeholder="Anything on your mind — questions, observations, things that felt hard to track…" />
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white text-base font-semibold rounded-xl transition-colors shadow-md">
              {isSubmitting ? 'Submitting…' : 'Submit assignment'}
            </button>
            <p className="text-xs text-gray-400 text-center">Your coach will review your submission and provide personalised feedback within 24–48 hours.</p>
          </form>
        )}
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
       * 6. WIN SECTION
       * ──────────────────────────────────────────────────────────────────── */}
      <section aria-labelledby="win-heading" className="bg-amber-50 rounded-2xl border border-amber-100 p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" aria-hidden="true">🏆</span>
          <h2 id="win-heading" className="text-2xl font-bold text-gray-900">What&rsquo;s your win?</h2>
        </div>
        <p className="text-gray-700 mb-5 leading-relaxed">
          Did you make any small step towards a better you recently? Even the tiniest thing counts —
          choosing water over a fizzy drink, getting an extra 15 minutes of sleep, going for a short walk.
          Share it here. We want to celebrate it with you!
        </p>
        <textarea
          value={win}
          onChange={(e) => setWin(e.target.value)}
          rows={3}
          className="w-full border border-amber-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
          placeholder="My win this week was…"
        />
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
       * 7. SOS BUTTON
       * ──────────────────────────────────────────────────────────────────── */}
      <SOSButton />

      {/* ──────────────────────────────────────────────────────────────────────
       * 8. COMPLETION & NEXT LESSON
       * ──────────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white text-center shadow-lg">
        <div className="text-4xl mb-4" aria-hidden="true">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Well done for completing Lesson 1!</h2>
        <p className="text-indigo-100 leading-relaxed max-w-lg mx-auto mb-6">
          You&rsquo;ve laid the groundwork. Once you submit your 3-day diary assignment above, Lesson 2 will
          unlock and your coach will be in touch with personal feedback.
        </p>
        <div className="bg-white/15 rounded-xl p-5 mb-6 text-left max-w-md mx-auto">
          <p className="text-indigo-100 text-sm leading-relaxed">
            <strong className="text-white">Lesson 2 unlocks 24 hours after you complete this one.</strong>{' '}
            We would love for the ideas you&rsquo;ve just learned to settle in your mind before you move on.
            In the meantime, explore the recipe above or browse the{' '}
            <Link href="/app/cookbook" className="underline text-white font-medium hover:text-indigo-200">Cookbook</Link>{' '}
            for something that catches your eye.
          </p>
        </div>
        <Link href="/app/lessons"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow">
          Back to all lessons
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </LessonTemplate>
  );
}
