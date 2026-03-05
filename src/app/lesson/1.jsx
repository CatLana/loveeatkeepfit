import React, { useState } from 'react';
import Link from 'next/link';

export default function Lesson1() {
  const [userName, setUserName] = useState('Guest'); // TODO: Replace with actual auth user name
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    weekendDay: '',
    workingDay: '',
    photos: '',
    comments: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: 1,
          lessonTitle: 'Volume Eating',
          userName,
          ...formData,
          submittedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ weekendDay: '', workingDay: '', photos: '', comments: '' });
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/app/lessons" className="text-indigo-600 hover:text-indigo-800 text-sm mb-2 inline-block">
            ← Back to Lessons
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Lesson 1: Volume Eating</h1>
          <p className="text-gray-600 mt-1">Welcome, {userName}!</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quick Links */}
        <div className="flex gap-4 mb-8">
          <Link href="/app/faq" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            FAQ
          </Link>
          <Link href="/app/chat" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            Ask Your Coach
          </Link>
        </div>

        {/* Introduction */}
        <section className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-6 mb-8 border border-pink-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Your Journey</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to <strong>Love. Eat. Keep Fit.</strong> — a unique programme designed to help you build small, 
            sustainable habits and gently reshape your approach to food throughout your weight‑loss journey.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This lesson introduces you to <strong>Volume Eating</strong> — a foundational concept that will help you 
            feel full and satisfied while losing weight steadily and sustainably.
          </p>
        </section>

        {/* Understanding Your Metabolism */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Understanding Your Metabolism</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">Your Base Metabolism (BMR)</h3>
              <p className="text-blue-800">
                Your BMR is the amount of energy your body needs simply to function — breathing, thinking, and keeping you alive — 
                without any additional movement. <strong>Never eat below this number.</strong>
              </p>
            </div>

            <p>
              When you eat too little, your metabolism can adapt downward. This means you may find yourself eating the 
              same foods as before but gaining weight instead of losing it. One of our key goals is to 
              <strong> keep your metabolism strong and responsive</strong> while you lose weight.
            </p>

            <p>
              This makes the process far more enjoyable, because you'll still have room for plenty of food while making progress.
            </p>
          </div>
        </section>

        {/* What is Volume Eating? */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is Volume Eating?</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Volume eating</strong> is a strategy where you prioritize foods that are low in calories but high in volume. 
              This means you can eat larger portions that physically fill your stomach, keeping you satisfied, without consuming 
              too many calories.
            </p>

            <div className="bg-green-50 rounded-lg p-5 my-4">
              <h3 className="font-semibold text-green-900 mb-3">Key Principles:</h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Choose foods with <strong>high water content</strong> (fruits, vegetables, soups)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Prioritize <strong>fiber-rich foods</strong> that promote fullness</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Include <strong>lean protein</strong> to support satiety and muscle preservation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Enjoy <strong>larger portions</strong> without the guilt</span>
                </li>
              </ul>
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-3">Practical Examples:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-600 mb-2"><span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2 align-middle"></span>Lower Volume</h4>
                <p className="text-sm">100g of chips = ~540 calories</p>
                <p className="text-xs text-gray-600 mt-1">Small handful, high calories</p>
              </div>
              <div className="border border-green-500 rounded-lg p-4 bg-green-50">
                <h4 className="font-semibold text-green-700 mb-2"><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2 align-middle"></span>Higher Volume</h4>
                <p className="text-sm">400g of roasted vegetables = ~200 calories</p>
                <p className="text-xs text-gray-600 mt-1">Large plate, fewer calories</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Volume Eating Matters */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why This Matters for Your Journey</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              For slow, steady fat loss (around 0.25–0.5 kg per week), a gentle <strong>15–20% calorie deficit</strong> 
              from your maintenance intake is recommended.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded my-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Important Note</h3>
              <p className="text-yellow-800">
                There is no need to follow a calorie deficit <em>yet</em>. For now, continue eating normally. 
                We'll make adjustments together based on your food diary and how your body responds.
              </p>
            </div>

            <p>
              Volume eating allows you to create this deficit while still enjoying satisfying meals. By choosing 
              nutrient-dense, high-volume foods, you'll avoid the excessive hunger and fatigue that often derail 
              weight loss efforts.
            </p>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-indigo-50 rounded-xl p-6 mb-8 border border-indigo-100">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">Additional Resources</h2>
          <ul className="space-y-2 text-indigo-800">
            <li>• <Link href="/app/cookbook" className="underline hover:text-indigo-600">Browse Volume Eating Recipes</Link></li>
            <li>• <Link href="/app/faq" className="underline hover:text-indigo-600">Frequently Asked Questions</Link></li>
            <li>• <Link href="/app/chat" className="underline hover:text-indigo-600">Ask Your Coach a Question</Link></li>
          </ul>
        </section>

        {/* Homework Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-indigo-200">
          <div className="flex items-center mb-6">
            <svg className="w-8 h-8 mr-3 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your First Assignment</h2>
              <p className="text-gray-600">Help us understand your current eating patterns</p>
            </div>
          </div>

          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Homework Submitted!</h3>
              <p className="text-green-800">Your coach will review your diary and provide feedback soon.</p>
              <Link href="/app/lessons" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                Return to Lessons →
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-lg p-5 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Your Task (2-3 days):</h3>
                <p className="text-gray-700 mb-4">
                  Track your food and show what a typical <strong>weekend day</strong> and <strong>working day</strong> look like for you.
                </p>
                <p className="text-gray-700 mb-2">
                  Please submit a short diary with as much detail as possible about what you eat. This can be:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Text descriptions of meals</li>
                  <li>Photos of your food</li>
                  <li>Screenshots from tracking apps (MyFitnessPal, etc.)</li>
                  <li>Your own comments and observations</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Note:</strong> You don't have to use an app if you don't want to — simple notes and pictures are perfectly fine.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="weekendDay" className="block text-sm font-semibold text-gray-700 mb-2">
                    Weekend Day Food Diary *
                  </label>
                  <textarea
                    id="weekendDay"
                    name="weekendDay"
                    value={formData.weekendDay}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Example:&#10;Breakfast (9am): 2 eggs, toast with avocado, coffee&#10;Lunch (1pm): Chicken salad with olive oil dressing&#10;Dinner (7pm): Pasta with vegetables..."
                  />
                </div>

                <div>
                  <label htmlFor="workingDay" className="block text-sm font-semibold text-gray-700 mb-2">
                    Working Day Food Diary *
                  </label>
                  <textarea
                    id="workingDay"
                    name="workingDay"
                    value={formData.workingDay}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Example:&#10;Breakfast (7am): Oatmeal with berries&#10;Snack (10am): Apple and almonds&#10;Lunch (12:30pm): Sandwich and soup..."
                  />
                </div>

                <div>
                  <label htmlFor="photos" className="block text-sm font-semibold text-gray-700 mb-2">
                    Photo Links or App Screenshots (Optional)
                  </label>
                  <textarea
                    id="photos"
                    name="photos"
                    value={formData.photos}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Paste links to photos or describe screenshots you've taken..."
                  />
                </div>

                <div>
                  <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Comments or Questions
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Any observations, challenges, or questions about your current eating habits..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Homework'}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  Your coach will review your submission and provide personalized feedback within 24-48 hours.
                </p>
              </form>
            </>
          )}
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Complete and submit your food diary homework</li>
            <li>Continue eating normally (no deficit yet)</li>
            <li>Wait for your coach's personalized feedback</li>
            <li>Once approved, move on to Lesson 2: Macros</li>
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            Questions? <Link href="/app/chat" className="text-indigo-600 underline hover:text-indigo-800">Message your coach anytime</Link>
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-8 border-t mt-12">
        <p>With love,</p>
        <p className="font-semibold text-gray-700 mt-1">Lana • Food Coach @ Love. Eat. Keep Fit. ♥</p>
        <p className="mt-4 text-xs">&copy; {new Date().getFullYear()} LoveEatKeepFit</p>
      </footer>
    </main>
  );
}
