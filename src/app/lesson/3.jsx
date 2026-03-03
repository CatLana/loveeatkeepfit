import React, { useState } from 'react';
import Link from 'next/link';

export default function Lesson3() {
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
          lessonId: 3,
          lessonTitle: 'Macros Made Simple',
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
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Lesson 3: Macros Made Simple</h1>
          <p className="text-gray-600 mt-1">Let's dive deeper, {userName}!  🍖🍞🥑</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quick Links */}
        <div className="flex gap-4 mb-8">
          <Link href="/app/faq" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            📚 FAQ
          </Link>
          <Link href="/app/chat" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            💬 Ask Your Coach
          </Link>
        </div>

        {/* Introduction */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border border-purple-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Beyond Calories: The Power of Macros 🧬</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You now understand that <strong>calories determine weight loss</strong>. But <strong>macronutrients (macros)</strong>—
            protein, carbs, and fats—determine what <em>kind</em> of weight you lose, and how you <em>feel</em> during the process.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Get your macros right, and you'll preserve muscle, maintain energy, control hunger, and feel amazing. 
            Get them wrong, and you might lose weight but feel exhausted, hungry, and lose muscle along with fat.
          </p>
        </section>

        {/* The Three Macronutrients */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Three Macronutrients</h2>
          
          <div className="space-y-6 text-gray-700">
            {/* Protein */}
            <div className="border-l-4 border-purple-500 bg-purple-50 rounded-lg p-5">
              <h3 className="text-xl font-bold text-purple-900 mb-3">🍖 Protein: The MVP Macro</h3>
              <p className="text-purple-800 mb-3">
                <strong>4 calories per gram</strong>
              </p>
              <p className="text-purple-900 mb-3">
                Protein is your best friend during fat loss. Here's why:
              </p>
              <ul className="space-y-2 text-purple-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Preserves muscle mass</strong> during calorie deficit (crucial!)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Highest satiety</strong> — keeps you fuller longer</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Highest thermic effect</strong> — burns 20-30% of its calories during digestion</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Supports recovery</strong> from workouts and daily activities</span>
                </li>
              </ul>
              <div className="bg-purple-100 rounded p-3 mt-3">
                <p className="text-sm text-purple-900">
                  <strong>Sources:</strong> Chicken, turkey, fish, lean beef, eggs, Greek yogurt, cottage cheese, tofu, tempeh, legumes, protein powder
                </p>
              </div>
            </div>

            {/* Carbohydrates */}
            <div className="border-l-4 border-orange-500 bg-orange-50 rounded-lg p-5">
              <h3 className="text-xl font-bold text-orange-900 mb-3">🍞 Carbohydrates: Your Energy Source</h3>
              <p className="text-orange-800 mb-3">
                <strong>4 calories per gram</strong>
              </p>
              <p className="text-orange-900 mb-3">
                Carbs are NOT the enemy! They are your body's preferred fuel for:
              </p>
              <ul className="space-y-2 text-orange-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Brain function</strong> — glucose is your brain's primary fuel</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Workout performance</strong> — glycogen powers intense exercise</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Mood and energy</strong> — adequate carbs prevent fatigue and irritability</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Hormone regulation</strong> — supports thyroid and reproductive hormones</span>
                </li>
              </ul>
              <div className="bg-orange-100 rounded p-3 mt-3">
                <p className="text-sm text-orange-900">
                  <strong>Sources:</strong> Rice, pasta, bread, quinoa, oats, potatoes, fruits, vegetables, legumes
                </p>
              </div>
            </div>

            {/* Fats */}
            <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-lg p-5">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">🥑 Fats: Essential for Health</h3>
              <p className="text-yellow-800 mb-3">
                <strong>9 calories per gram</strong> (more than double protein and carbs!)
              </p>
              <p className="text-yellow-900 mb-3">
                Despite the name, dietary fats are essential for:
              </p>
              <ul className="space-y-2 text-yellow-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Hormone production</strong> — including testosterone and estrogen</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Vitamin absorption</strong> — A, D, E, K are fat-soluble</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Cell membrane health</strong> — every cell needs fats</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Satiety</strong> — helps meals feel more satisfying</span>
                </li>
              </ul>
              <div className="bg-yellow-100 rounded p-3 mt-3">
                <p className="text-sm text-yellow-900">
                  <strong>Sources:</strong> Olive oil, avocados, nuts, seeds, fatty fish, eggs, cheese, nut butters
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Macros Matter for Fat Loss */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Macros Matter for Fat Loss</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Two people can eat the same number of calories and have completely different results based on their macro split.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="border border-red-300 bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-3">❌ Poor Macro Balance</h3>
                <p className="text-sm text-red-800 mb-2">1,800 calories/day:</p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Low protein (50g)</li>
                  <li>• High carbs + fats</li>
                  <li>• Result: Constant hunger</li>
                  <li>• Muscle loss</li>
                  <li>• Poor workout recovery</li>
                  <li>• Difficult to maintain</li>
                </ul>
              </div>
              
              <div className="border border-green-500 bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3">✓ Optimal Macro Balance</h3>
                <p className="text-sm text-green-800 mb-2">1,800 calories/day:</p>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• High protein (130g)</li>
                  <li>• Moderate carbs/fats</li>
                  <li>• Result: Better satiety</li>
                  <li>• Muscle preservation</li>
                  <li>• Good energy levels</li>
                  <li>• Sustainable long-term</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h3 className="font-semibold text-blue-900 mb-2">📊 Research Insight:</h3>
              <p className="text-blue-800">
                Studies show that higher protein intake (1.6-2.2g per kg bodyweight) during fat loss helps 
                preserve <strong>93% of muscle mass</strong> compared to lower protein diets, while also 
                <strong> reducing hunger by 60%</strong> and boosting metabolism by 15-30%.
              </p>
            </div>
          </div>
        </section>

        {/* Recommended Macro Split */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recommended Macro Split for Fat Loss</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Here's a general framework that works for most people. Your coach will personalize this based on 
              your individual needs, activity level, and preferences.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 my-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">General Macro Framework:</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-purple-600 text-center mb-2">PROTEIN</h4>
                  <p className="text-3xl font-bold text-center text-purple-900 mb-2">30-35%</p>
                  <p className="text-sm text-gray-600 text-center">or 1.6-2.2g per kg bodyweight</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-orange-600 text-center mb-2">CARBS</h4>
                  <p className="text-3xl font-bold text-center text-orange-900 mb-2">35-45%</p>
                  <p className="text-sm text-gray-600 text-center">adjust based on activity</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-yellow-600 text-center mb-2">FATS</h4>
                  <p className="text-3xl font-bold text-center text-yellow-900 mb-2">20-30%</p>
                  <p className="text-sm text-gray-600 text-center">minimum 0.5g per kg</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h3 className="font-semibold text-yellow-900 mb-2">💡 Important Notes:</h3>
              <ul className="text-yellow-800 space-y-2 text-sm">
                <li>• <strong>Protein is non-negotiable</strong> — prioritize this first</li>
                <li>• <strong>Fats shouldn't go too low</strong> — minimum 0.5g/kg for hormone health</li>
                <li>• <strong>Carbs are flexible</strong> — adjust based on activity, preference, and energy levels</li>
                <li>• <strong>Individual variation</strong> — some people feel better with more carbs, others with more fats</li>
              </ul>
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-3">Example Macro Calculation:</h3>
            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-sm text-gray-700 mb-3">
                <strong>Scenario:</strong> 70kg woman with 1,800 calorie target
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Protein (30%):</strong> 1,800 × 0.30 = 540 cal ÷ 4 = <span className="font-bold text-purple-600">135g protein</span></li>
                <li>• <strong>Fats (25%):</strong> 1,800 × 0.25 = 450 cal ÷ 9 = <span className="font-bold text-yellow-600">50g fats</span></li>
                <li>• <strong>Carbs (45%):</strong> 1,800 × 0.45 = 810 cal ÷ 4 = <span className="font-bold text-orange-600">202g carbs</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Tips */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Practical Tips for Hitting Your Macros</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="bg-purple-50 rounded-lg p-5">
              <h3 className="font-semibold text-purple-900 mb-3">🍖 Getting Enough Protein:</h3>
              <ul className="space-y-2 text-purple-800 text-sm">
                <li>• Include protein at every meal (20-40g per meal)</li>
                <li>• Choose lean sources: chicken breast, fish, egg whites, Greek yogurt</li>
                <li>• Use protein powder for convenience (shakes, oatmeal, recipes)</li>
                <li>• Don't forget plant proteins: tofu, tempeh, legumes</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-5">
              <h3 className="font-semibold text-orange-900 mb-3">🍞 Managing Carbs:</h3>
              <ul className="space-y-2 text-orange-800 text-sm">
                <li>• Time carbs around workouts for better energy and recovery</li>
                <li>• Choose whole grains, fruits, and starchy vegetables for nutrients</li>
                <li>• Don't fear carbs! They support metabolism, mood, and performance</li>
                <li>• Adjust amounts based on your activity level and how you feel</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-5">
              <h3 className="font-semibold text-yellow-900 mb-3">🥑 Controlling Fats:</h3>
              <ul className="space-y-2 text-yellow-800 text-sm">
                <li>• Measure oils, nuts, and nut butters — they're very calorie-dense</li>
                <li>• 1 tablespoon oil = 120 calories (easy to over-pour!)</li>
                <li>• Choose fatty fish for omega-3s (salmon, mackerel, sardines)</li>
                <li>• Don't eliminate fats — aim for the minimum, then add as you like</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Flexibility */}
        <section className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-8 border border-green-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">🌟 Flexibility is Key</h2>
          <p className="text-gray-700 mb-4">
            Don't stress about hitting your macros <em>perfectly</em> every single day. Aim for consistency 
            over the week, not perfection each day.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span><strong>Within 5-10g</strong> of your targets is totally fine</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span><strong>Some days will be higher</strong>, some lower — it averages out</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span><strong>Protein is the priority</strong> — hit this consistently</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span><strong>Carbs and fats can flex</strong> based on meals and preferences</span>
            </li>
          </ul>
        </section>

        {/* Resources */}
        <section className="bg-indigo-50 rounded-xl p-6 mb-8 border border-indigo-100">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">📖 Additional Resources</h2>
          <ul className="space-y-2 text-indigo-800">
            <li>• <Link href="/app/cookbook" className="underline hover:text-indigo-600">High-Protein Recipe Ideas</Link></li>
            <li>• <Link href="/app/faq" className="underline hover:text-indigo-600">Frequently Asked Questions</Link></li>
            <li>• <Link href="/app/chat" className="underline hover:text-indigo-600">Ask Your Coach a Question</Link></li>
          </ul>
        </section>

        {/* Homework Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-indigo-200">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-3">📝</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Lesson 3 Assignment</h2>
              <p className="text-gray-600">Track your macros and see where you are now</p>
            </div>
          </div>

          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <span className="text-5xl mb-4 block">✅</span>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Homework Submitted!</h3>
              <p className="text-green-800">Your coach will review your macro tracking and provide personalized targets.</p>
              <Link href="/app/lessons" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                Return to Lessons →
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-lg p-5 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">📋 Your Task (3-5 days):</h3>
                <p className="text-gray-700 mb-4">
                  Track your <strong>macronutrients</strong> (protein, carbs, fats) for a typical <strong>weekend day</strong> and 
                  a <strong>working day</strong>. Use MyFitnessPal or similar app for accurate tracking.
                </p>
                <p className="text-gray-700 mb-2">
                  Include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Total grams of protein, carbs, and fats for each day</li>
                  <li>Total calories</li>
                  <li>Example meals showing how you're currently eating</li>
                  <li>Any observations about your current macro balance</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Goal:</strong> Understand your current eating patterns so we can create your personalized macro targets.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="weekendDay" className="block text-sm font-semibold text-gray-700 mb-2">
                    Weekend Day Macro Tracking *
                  </label>
                  <textarea
                    id="weekendDay"
                    name="weekendDay"
                    value={formData.weekendDay}
                    onChange={handleChange}
                    required
                    rows="8"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Example:&#10;Breakfast: Eggs (2) + Toast + Avocado = 25g P / 40g C / 20g F&#10;Lunch: Chicken salad with dressing = 35g P / 15g C / 18g F&#10;Dinner: Salmon + Rice + Vegetables = 40g P / 60g C / 15g F&#10;Snacks: Greek yogurt + Berries = 15g P / 25g C / 3g F&#10;&#10;TOTALS: 115g Protein / 140g Carbs / 56g Fats = 1,520 calories"
                  />
                </div>

                <div>
                  <label htmlFor="workingDay" className="block text-sm font-semibold text-gray-700 mb-2">
                    Working Day Macro Tracking *
                  </label>
                  <textarea
                    id="workingDay"
                    name="workingDay"
                    value={formData.workingDay}
                    onChange={handleChange}
                    required
                    rows="8"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Example:&#10;Breakfast: Oatmeal + Protein powder = 30g P / 45g C / 8g F&#10;Snack: Apple + Almonds = 4g P / 20g C / 12g F&#10;Lunch: Chicken wrap = 40g P / 50g C / 15g F&#10;Dinner: Pasta with turkey meatballs = 35g P / 75g C / 12g F&#10;&#10;TOTALS: 109g Protein / 190g Carbs / 47g Fats = 1,615 calories"
                  />
                </div>

                <div>
                  <label htmlFor="photos" className="block text-sm font-semibold text-gray-700 mb-2">
                    MyFitnessPal Screenshots (Optional)
                  </label>
                  <textarea
                    id="photos"
                    name="photos"
                    value={formData.photos}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Paste links to your MFP diary screenshots..."
                  />
                </div>

                <div>
                  <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-2">
                    Reflections & Questions
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="How does your current macro split feel? Do you stay full? Are you getting enough protein? Any challenges finding high-protein foods? Questions?"
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
                  Your coach will provide your personalized macro targets based on this tracking within 24-48 hours.
                </p>
              </form>
            </>
          )}
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">🎯 Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Track your macros for 2 typical days (weekend + working day)</li>
            <li>Submit your macro tracking homework</li>
            <li>Wait for your coach to provide personalized macro targets</li>
            <li>Move on to Lesson 4: Protein Power</li>
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            Questions? <Link href="/app/chat" className="text-indigo-600 underline hover:text-indigo-800">Message your coach anytime</Link>
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-8 border-t mt-12">
        <p>With love,</p>
        <p className="font-semibold text-gray-700 mt-1">Lana • Food Coach @ Love. Eat. Keep Fit. ♥️</p>
        <p className="mt-4 text-xs">&copy; {new Date().getFullYear()} LoveEatKeepFit</p>
      </footer>
    </main>
  );
}
