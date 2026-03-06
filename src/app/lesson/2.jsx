/**
 * Lesson 2 â€” Calories In vs Calories Out
 */

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LessonTemplate from '@/components/LessonTemplate';
import Quiz from '@/components/Quiz';
import RecipeCard from '@/components/RecipeCard';
import SOSButton from '@/components/SOSButton';
import lessonsData from '@/data/lessons.json';

const lesson = lessonsData.lessons.find((l) => l.id === 2);

// â”€â”€â”€ Quiz â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const QUIZ_QUESTIONS = [
  {
    question: 'What happens when you consistently eat more calories than your body uses?',
    options: [
      'Your metabolism speeds up to burn the excess',
      'The surplus energy is stored, mostly as body fat',
      'The extra calories are expelled through digestion',
    ],
    correct: 1,
  },
  {
    question: 'Which statement about CICO (Calories In, Calories Out) is most accurate?',
    options: [
      'It means all calories are identical and food quality does not matter',
      'It is the fundamental energy law, but food quality affects hunger, hormones and health',
      'It only applies to people who exercise regularly',
    ],
    correct: 1,
  },
  {
    question: 'Why is tracking what you eat for a few days so useful?',
    options: [
      'It forces you to eat less because you feel ashamed',
      'It gives your coach real data to work out your actual calorie intake and identify patterns',
      'It is only useful if you are already eating perfectly',
    ],
    correct: 1,
  },
];

// â”€â”€â”€ Recipe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const RECIPE = {
  title: 'Turkey and Vegetable Stir-Fry with Brown Rice',
  intro: 'High protein, low effort, and straightforward to log in any food tracker.',
  videoUrl: '',
  ingredients: [
    { name: 'Turkey breast mince or strips', qty: '200 g' },
    { name: 'Brown rice (dry weight)', qty: '70 g' },
    { name: 'Courgette', qty: '1 medium' },
    { name: 'Red bell pepper', qty: '1 large' },
    { name: 'Broccoli florets', qty: '100 g' },
    { name: 'Soy sauce (low sodium)', qty: '2 tbsp' },
    { name: 'Garlic cloves', qty: '2, minced' },
    { name: 'Olive oil', qty: '1 tsp' },
    { name: 'Fresh ginger (optional)', qty: '1 tsp, grated' },
  ],
  steps: [
    'Cook brown rice according to packet instructions.',
    'Heat oil in a large pan or wok over medium-high heat.',
    'Add garlic and ginger, stir 30 seconds until fragrant.',
    'Add turkey, break up and cook through (5 to 6 min).',
    'Add broccoli and cook 2 min, then add courgette and pepper.',
    'Stir-fry 3 to 4 min until vegetables are tender but still have bite.',
    'Add soy sauce, toss everything together and serve over rice.',
  ],
  macrosPerPortion: {
    calories: 455,
    protein: 42,
    carbs: 48,
    fat: 8,
  },
};

// â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Lesson2() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({ calorieAnswer: '', trackerUsed: '', comments: '' });
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
          lessonId: 2,
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

  // â”€â”€â”€ Sections for LessonTemplate sticky nav â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const sections = [
    { id: 'article', label: 'Article' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'recipe', label: 'Recipe' },
    { id: 'assignment', label: 'Assignment' },
  ];

  return (
    <LessonTemplate
      lesson={lesson}
      sections={sections}
      userName={session?.user?.name}
    >
      {/* â”€â”€ Article â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="article" className="space-y-8">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why calories matter</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Every food and drink you consume carries energy, measured in kilocalories (kcal), commonly called
            calories. Your body runs on that energy to keep your heart beating, your brain thinking, and your
            muscles moving. What you cannot use right away gets stored, mostly as body fat.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This is not a fad or a trend. It is the first law of thermodynamics applied to human physiology,
            and every credible nutrition framework agrees on it.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The three states of energy balance</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-sm font-semibold text-green-800 mb-1">Calories in &lt; Calories out</p>
              <p className="text-xs text-green-700">Deficit â€” body draws on stored fat</p>
              <p className="mt-2 font-bold text-green-900">Fat loss</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm font-semibold text-blue-800 mb-1">Calories in = Calories out</p>
              <p className="text-xs text-blue-700">Balance â€” weight stays stable</p>
              <p className="mt-2 font-bold text-blue-900">Maintenance</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-sm font-semibold text-red-800 mb-1">Calories in &gt; Calories out</p>
              <p className="text-xs text-red-700">Surplus â€” excess stored as fat</p>
              <p className="mt-2 font-bold text-red-900">Fat gain</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What CICO does not mean</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Knowing that calories drive weight change does not mean all foods are identical. Protein keeps you
            full longer and costs your body more energy to digest. Vegetables add volume and micronutrients for
            very few calories. Ultra-processed foods are engineered to override your natural fullness signals.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Your calorie target is the foundation. The quality of food you put inside that target determines
            your energy, your hunger, your health, and how sustainable the whole thing feels day to day.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Why tracking your intake matters</h2>
          <p className="text-gray-700 leading-relaxed">
            Research consistently shows that people underestimate their calorie intake by 20 to 50 percent,
            often without realising it. Cooking oils, sauces, handfuls of nuts, a few bites while cooking:
            these invisible calories add up fast.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Tracking for even a short period gives your coach real data to set your personal target accurately
            and helps you build an intuitive sense of what is in the food you eat every day.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
            <p className="text-amber-900 font-medium">A note on the scales</p>
            <p className="text-amber-800 text-sm mt-1">
              Body weight fluctuates by 1 to 3 kg day to day due to water retention, food in transit, hormones,
              and salt intake. One heavy morning does not mean you gained fat overnight. Judge your progress over
              weeks, not days.
            </p>
          </div>
        </div>
      </section>

      {/* â”€â”€ Quiz â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="quiz" className="pt-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Check your understanding</h2>
        <Quiz questions={QUIZ_QUESTIONS} />
      </section>

      {/* â”€â”€ Recipe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="recipe" className="pt-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">This week's recipe</h2>
        <RecipeCard recipe={RECIPE} />
      </section>

      {/* â”€â”€ MyFitnessPal Tutorial â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Using a food tracker</h2>
        <p className="text-gray-700 leading-relaxed">
          The easiest way to track calories is with a free app. One of the most popular and well-stocked
          options is{' '}
          <a
            href="https://www.myfitnesspal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            MyFitnessPal
          </a>
          . Here is how to get started:
        </p>
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-xs text-indigo-700">
          <strong>Disclaimer:</strong> This is not an advertisement or sponsored mention. MyFitnessPal is
          listed only because its food database is large and well-known. You do not need the premium version;
          the free tier is fully sufficient for calorie tracking.
        </div>
        <ol className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">1</span>
            <span>Download the free MyFitnessPal app from the App Store or Google Play, then create a free account.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">2</span>
            <span>Tap <strong>Diary</strong> at the bottom of the screen and select the correct meal (Breakfast, Lunch, Dinner, or Snacks).</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">3</span>
            <span>Tap <strong>Add Food</strong>. You can search by name, scan a barcode, or type a description.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">4</span>
            <span>Adjust the quantity to match your actual portion. Weigh or measure where possible, especially for oils, nuts, and grains.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">5</span>
            <span>Tap the <strong>tick / checkmark</strong> to save the entry. Repeat for every food and drink throughout the day, including cooking oils and sauces.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">6</span>
            <span>At the end of the day, note your <strong>total calories</strong> from the diary summary and record them in your assignment below.</span>
          </li>
        </ol>
        <p className="text-sm text-gray-600">
          You do not need to fill in a calorie goal inside the app; just use the diary feature to log and
          view your totals. Ignore any suggestions from the app about your target.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-800 mb-2">Prefer a different tracker? That is fine.</p>
          <ul className="text-sm text-gray-700 space-y-1.5">
            <li className="flex gap-2">
              <span className="text-gray-400">-</span>
              <span><strong>Apple Health</strong> with the native Food log (iPhone and Apple Watch users)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">-</span>
              <span><strong>Fitbit app</strong> (if you already use a Fitbit device)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">-</span>
              <span><strong>Samsung Health</strong> (built in on Samsung phones)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">-</span>
              <span><strong>Cronometer</strong> â€” free, minimal, accurate micro-nutrient data</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">-</span>
              <span><strong>Nutracheck</strong> â€” popular in the UK with a large British food database</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">-</span>
              <span><strong>Written diary</strong> â€” pen and paper works perfectly well if you prefer it</span>
            </li>
          </ul>
        </div>
      </section>

      {/* â”€â”€ Assignment â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="assignment" className="bg-white rounded-xl shadow-lg p-8 border-2 border-indigo-200">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-8 h-8 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your assignment</h2>
            <p className="text-gray-600 text-sm">Track your food for 3 to 5 days, then answer the question below.</p>
          </div>
        </div>

        {submitSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Assignment submitted</h3>
            <p className="text-green-800">Your coach will review your tracking and reply within 24 to 48 hours.</p>
            <Link href="/app/lessons" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
              Back to lessons
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="calorieAnswer" className="block text-sm font-semibold text-gray-700 mb-1">
                What did you notice about your calorie expenditure when you tracked? <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Share anything: total calories logged, whether it was higher or lower than you expected,
                any foods that surprised you, or patterns you spotted between days.
              </p>
              <textarea
                id="calorieAnswer"
                name="calorieAnswer"
                value={formData.calorieAnswer}
                onChange={handleChange}
                required
                rows={6}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                placeholder="For example: I tracked for 4 days. My average was around 2,100 kcal. I was surprised by how many calories were in the cooking oil I use..."
              />
            </div>

            <div>
              <label htmlFor="trackerUsed" className="block text-sm font-semibold text-gray-700 mb-1">
                Which tracker did you use? (optional)
              </label>
              <input
                type="text"
                id="trackerUsed"
                name="trackerUsed"
                value={formData.trackerUsed}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                placeholder="MyFitnessPal, Apple Health, written diary..."
              />
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-1">
                Questions or comments for your coach (optional)
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                placeholder="Anything you found confusing, want to ask about, or want to flag..."
              />
            </div>

            {/* Reflection */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <h3 className="font-semibold text-blue-900 mb-2">Reflection</h3>
              <p className="text-sm text-blue-800 mb-3">
                Based on what you have read today, what is one thing you want to be more aware of about
                your eating habits going forward?
              </p>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                rows={3}
                className="w-full border border-blue-200 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
                placeholder="For example: I want to weigh my cooking oil instead of pouring it freely..."
              />
            </div>

            {/* Win */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-semibold text-green-900 mb-2">Your win this week</h3>
              <p className="text-sm text-green-800 mb-3">
                What is one positive thing you did for your health this week, however small?
              </p>
              <textarea
                value={win}
                onChange={(e) => setWin(e.target.value)}
                rows={2}
                className="w-full border border-green-200 rounded-lg p-3 bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                placeholder="I drank more water, I cooked at home instead of ordering takeaway..."
              />
            </div>

            <SOSButton />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              {isSubmitting ? 'Submitting...' : 'Submit assignment'}
            </button>
          </form>
        )}
      </section>

      {/* â”€â”€ Completion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 text-center">
        <p className="text-gray-700 font-medium mb-2">Well done for completing Lesson 2.</p>
        <p className="text-gray-600 text-sm mb-4">
          Once your coach has reviewed your tracking, Lesson 3 will unlock.
        </p>
        <Link href="/app/lessons" className="inline-block text-indigo-600 hover:text-indigo-800 font-medium text-sm underline">
          Back to all lessons
        </Link>
      </section>
    </LessonTemplate>
  );
}
