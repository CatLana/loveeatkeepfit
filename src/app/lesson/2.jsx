import React, { useState } from 'react';
import Link from 'next/link';

export default function Lesson2() {
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
          lessonId: 2,
          lessonTitle: 'Calories In vs Calories Out',
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
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Lesson 2: Calories In vs Calories Out</h1>
          <p className="text-gray-600 mt-1">Welcome back, {userName}!</p>
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
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8 border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Foundation of Fat Loss</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In this lesson, we'll explore the most fundamental principle of weight management: 
            <strong> Energy Balance</strong>. Understanding this concept is the key to sustainable fat loss 
            and maintaining your results long-term.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By the end of this lesson, you'll understand exactly how your body gains, loses, and maintains 
            weight—and why <em>all</em> successful weight loss approaches ultimately come down to this one simple equation.
          </p>
        </section>

        {/* The Energy Balance Equation */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Energy Balance Equation</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="bg-indigo-50 border-2 border-indigo-200 p-6 rounded-lg text-center">
              <p className="text-2xl font-bold text-indigo-900 mb-2">
                Energy IN – Energy OUT = Change in Body Weight
              </p>
              <p className="text-sm text-indigo-700">This is the fundamental law of thermodynamics applied to your body</p>
            </div>

            <p>
              Your body is like a bank account for energy. The calories you eat are deposits, and the calories 
              you burn through daily activities and exercise are withdrawals.
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="border border-green-300 bg-green-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-green-900 mb-2"><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2 align-middle"></span>Calorie Deficit</h3>
                <p className="text-sm text-green-800 mb-2">Eat LESS than you burn</p>
                <p className="text-xs text-green-700">→ Weight Loss</p>
              </div>
              
              <div className="border border-blue-300 bg-blue-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-blue-900 mb-2"><span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2 align-middle"></span>Maintenance</h3>
                <p className="text-sm text-blue-800 mb-2">Eat SAME as you burn</p>
                <p className="text-xs text-blue-700">→ Weight Stays Same</p>
              </div>

              <div className="border border-red-300 bg-red-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-red-900 mb-2"><span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2 align-middle"></span>Calorie Surplus</h3>
                <p className="text-sm text-red-800 mb-2">Eat MORE than you burn</p>
                <p className="text-xs text-red-700">→ Weight Gain</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h3 className="font-semibold text-yellow-900 mb-2">Key Insight</h3>
              <p className="text-yellow-800">
                This principle applies regardless of <em>what</em> you eat. Whether it's pizza or salad, 
                carbs or fats, organic or processed—your body ultimately responds to the total energy (calories) 
                you consume vs. expend.
              </p>
            </div>
          </div>
        </section>

        {/* Why CICO Matters */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Understanding CICO Sets You Free</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Once you grasp this principle, you'll stop wasting time on:
            </p>

            <div className="bg-gray-50 rounded-lg p-5 my-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 text-xl">✗</span>
                  <span><strong>Fad diets</strong> that demonize entire food groups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 text-xl">✗</span>
                  <span><strong>"Magic" supplements</strong> promising effortless weight loss</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 text-xl">✗</span>
                  <span><strong>Extreme restrictions</strong> that aren't sustainable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 text-xl">✗</span>
                  <span><strong>Guilt and shame</strong> about food choices</span>
                </li>
              </ul>
            </div>

            <p>
              Instead, you'll focus on what actually works: <strong>creating a sustainable calorie deficit</strong> 
              while eating foods you enjoy and maintaining your energy, mood, and health.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-5 my-4">
              <h3 className="font-semibold text-green-900 mb-3">✓ The Empowering Truth:</h3>
              <p className="text-green-800">
                No food is "forbidden." You can enjoy pizza, chocolate, or your favorite treats—as long as they 
                fit within your overall calorie target. This approach is proven to improve <strong>adherence by 78%</strong> 
                compared to restrictive diets.
              </p>
            </div>
          </div>
        </section>

        {/* Calories IN: What You Eat */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Calories In: What You Eat</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Calories In</strong> refers to all the energy you consume through food and beverages. 
              Every gram of macronutrient provides a specific amount of energy:
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-purple-600 mb-2">Protein</h3>
                <p className="text-2xl font-bold text-gray-900">4 cal/g</p>
                <p className="text-xs text-gray-600 mt-1">Chicken, fish, beans, eggs</p>
              </div>
              
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-orange-600 mb-2">Carbs</h3>
                <p className="text-2xl font-bold text-gray-900">4 cal/g</p>
                <p className="text-xs text-gray-600 mt-1">Bread, rice, pasta, fruits</p>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-600 mb-2">Fats</h3>
                <p className="text-2xl font-bold text-gray-900">9 cal/g</p>
                <p className="text-xs text-gray-600 mt-1">Oils, nuts, avocado, butter</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">Important Note:</h3>
              <p className="text-blue-800">
                Notice that fats contain more than twice the calories per gram compared to protein and carbs. 
                This is why portion control is especially important for high-fat foods like oils, nuts, and cheese—
                even healthy ones!
              </p>
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-3">Common Tracking Mistakes:</h3>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Forgetting cooking oils:</strong> 1 tablespoon = 120 calories</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Underestimating portions:</strong> Eyeballing can add 300-500 cal/day</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Not counting drinks:</strong> Lattes, juices, alcohol all count!</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Weekend amnesia:</strong> Tracking only weekdays skews results</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Calories OUT: What You Burn */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Calories Out: What You Burn</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Your <strong>Total Daily Energy Expenditure (TDEE)</strong> is made up of several components:
            </p>

            <div className="space-y-3 my-6">
              <div className="border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded">
                <h3 className="font-semibold text-indigo-900 mb-1">1. BMR (Basal Metabolic Rate) – 60-70%</h3>
                <p className="text-sm text-indigo-800">
                  Energy needed for basic functions: breathing, circulation, cell production. Burns calories 24/7.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
                <h3 className="font-semibold text-purple-900 mb-1">2. NEAT (Non-Exercise Activity) – 15-30%</h3>
                <p className="text-sm text-purple-800">
                  Daily movement: walking, cleaning, fidgeting, standing. Often overlooked but hugely important!
                </p>
              </div>

              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                <h3 className="font-semibold text-green-900 mb-1">3. Exercise Activity – 5-10%</h3>
                <p className="text-sm text-green-800">
                  Structured workouts: gym sessions, sports, classes. Smaller than most people think!
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
                <h3 className="font-semibold text-orange-900 mb-1">4. TEF (Thermic Effect of Food) – 10%</h3>
                <p className="text-sm text-orange-800">
                  Energy used to digest and process food. Protein has the highest TEF (20-30%)!
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-semibold text-green-900 mb-2">Pro Tip:</h3>
              <p className="text-green-800">
                Increasing NEAT (daily steps, taking stairs, standing more) can boost your calorie burn by 
                300-500 calories per day—without formal exercise! This is often more impactful than adding 
                extra gym sessions.
              </p>
            </div>
          </div>
        </section>

        {/* Sustainable Deficit */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Creating a Sustainable Calorie Deficit</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              For healthy, sustainable fat loss, we recommend a <strong>15-20% calorie deficit</strong> from 
              your maintenance calories (TDEE). This typically results in:
            </p>

            <div className="bg-blue-50 rounded-lg p-5 my-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>0.25-0.5 kg (0.5-1 lb) loss per week</strong> — steady and sustainable</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Minimal muscle loss</strong> — especially with adequate protein</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Maintained energy levels</strong> — you won't feel exhausted</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Better adherence</strong> — easier to stick with long-term</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Preserved metabolism</strong> — your BMR stays strong</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <h3 className="font-semibold text-red-900 mb-2">Avoid Aggressive Deficits</h3>
              <p className="text-red-800 mb-2">
                Cutting calories too drastically (30%+ deficit) leads to:
              </p>
              <ul className="text-sm text-red-700 space-y-1 ml-4">
                <li>• Extreme hunger and cravings</li>
                <li>• Muscle loss alongside fat loss</li>
                <li>• Metabolic adaptation (slower metabolism)</li>
                <li>• Low energy, poor sleep, hormonal issues</li>
                <li>• High likelihood of quitting or binge eating</li>
              </ul>
            </div>

            <p className="font-semibold text-lg mt-6">
              Remember: This isn't a race. Slow and steady wins the game. Focus on building sustainable habits, 
              not rapid results that won't last.
            </p>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-indigo-50 rounded-xl p-6 mb-8 border border-indigo-100">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">Additional Resources</h2>
          <ul className="space-y-2 text-indigo-800">
            <li>• <Link href="/app/faq" className="underline hover:text-indigo-600">Frequently Asked Questions</Link></li>
            <li>• <Link href="/app/chat" className="underline hover:text-indigo-600">Ask Your Coach a Question</Link></li>
            <li>• <Link href="/app/lessons" className="underline hover:text-indigo-600">View All Lessons</Link></li>
          </ul>
        </section>

        {/* Homework Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-indigo-200">
          <div className="flex items-center mb-6">
            <svg className="w-8 h-8 mr-3 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Lesson 2 Assignment</h2>
              <p className="text-gray-600">Track your calories and reflect on your energy balance</p>
            </div>
          </div>

          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Homework Submitted!</h3>
              <p className="text-green-800">Your coach will review your tracking and provide feedback soon.</p>
              <Link href="/app/lessons" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                Return to Lessons →
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-lg p-5 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Your Task (3-5 days):</h3>
                <p className="text-gray-700 mb-4">
                  Now that you understand CICO, track your calories for a <strong>typical weekend day</strong> and a 
                  <strong> typical working day</strong>. Use an app like MyFitnessPal, or simply write it down.
                </p>
                <p className="text-gray-700 mb-2">
                  Include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>All meals, snacks, and drinks (including oils, sauces, condiments)</li>
                  <li>Approximate portion sizes (weights/measures if possible)</li>
                  <li>Total calories for each day</li>
                  <li>Any observations about your eating patterns</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Goal:</strong> Just observe and track—no judgment! This helps us understand your baseline 
                  and create your personalized calorie target.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="weekendDay" className="block text-sm font-semibold text-gray-700 mb-2">
                    Weekend Day Calorie Tracking *
                  </label>
                  <textarea
                    id="weekendDay"
                    name="weekendDay"
                    value={formData.weekendDay}
                    onChange={handleChange}
                    required
                    rows="8"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Example:&#10;Breakfast (9am): Oatmeal 50g (190 cal), Banana (105 cal), Honey 1 tbsp (64 cal) = 359 cal&#10;Lunch (1pm): Chicken breast 150g (247 cal), Rice 100g cooked (130 cal), Vegetables 200g (60 cal), Olive oil 1 tbsp (120 cal) = 557 cal&#10;...&#10;&#10;Total: 1,850 calories"
                  />
                </div>

                <div>
                  <label htmlFor="workingDay" className="block text-sm font-semibold text-gray-700 mb-2">
                    Working Day Calorie Tracking *
                  </label>
                  <textarea
                    id="workingDay"
                    name="workingDay"
                    value={formData.workingDay}
                    onChange={handleChange}
                    required
                    rows="8"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Example:&#10;Breakfast (7am): Greek yogurt 150g (130 cal), Berries 100g (50 cal), Granola 30g (120 cal) = 300 cal&#10;Snack (10am): Apple (95 cal), Almonds 20g (115 cal) = 210 cal&#10;...&#10;&#10;Total: 1,650 calories"
                  />
                </div>

                <div>
                  <label htmlFor="photos" className="block text-sm font-semibold text-gray-700 mb-2">
                    MyFitnessPal Screenshots or Photos (Optional)
                  </label>
                  <textarea
                    id="photos"
                    name="photos"
                    value={formData.photos}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Paste links to screenshots or describe your tracking method..."
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
                    placeholder="What surprised you about your calorie intake? What patterns did you notice? Any challenges with tracking? Questions about CICO?"
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
                  Your coach will calculate your personalized calorie target and provide detailed feedback within 24-48 hours.
                </p>
              </form>
            </>
          )}
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Track your calories for 2 typical days (weekend + working day)</li>
            <li>Submit your tracking homework for review</li>
            <li>Wait for your coach to provide your personalized calorie target</li>
            <li>Move on to Lesson 3: Macros Made Simple</li>
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
