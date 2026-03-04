import React, { useState } from 'react';
import Link from 'next/link';

export default function Lesson4() {
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
          lessonId: 4,
          lessonTitle: 'Protein Power',
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
    setFormData({ ...formData

, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/app/lessons" className="text-indigo-600 hover:text-indigo-800 text-sm mb-2 inline-block">
            ← Back to Lessons
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Lesson 4: Protein Power</h1>
          <p className="text-gray-600 mt-1">Let's master the MVP macro, {userName}! 💪</p>
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
        <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-8 border border-purple-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Protein is Non-Negotiable 🥩</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If there's <em>one</em> macro you must prioritize during fat loss, it's <strong>protein</strong>. 
            No other macronutrient has as profound an impact on your hunger, metabolism, muscle preservation, 
            and overall success.
          </p>
          <p className="text-gray-700 leading-relaxed">
            In this lesson, you'll learn exactly why protein is the MVP, how much you need, when to eat it, 
            and how to hit your targets consistently—even if you're currently struggling.
          </p>
        </section>

        {/* Why Protein is Essential */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The 5 Superpowers of Protein</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 bg-purple-50 p-5 rounded">
              <h3 className="font-bold text-purple-900 mb-2">1. 💪 Preserves Muscle During Fat Loss</h3>
              <p className="text-purple-800">
                When in a calorie deficit, your body can break down both fat <em>and</em> muscle for energy. 
                Adequate protein intake signals your body to preserve muscle mass and burn fat instead. 
                <strong> Studies show 93% muscle retention</strong> with high protein vs. significant loss with low protein.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 bg-pink-50 p-5 rounded">
              <h3 className="font-bold text-pink-900 mb-2">2. 🍽️ Highest Satiety of All Macros</h3>
              <p className="text-pink-800">
                Protein is the most filling macronutrient. Research shows high-protein meals <strong>reduce hunger by 
                60%</strong> and decrease late-night snacking cravings by 50%. You'll naturally eat less without feeling deprived.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-5 rounded">
              <h3 className="font-bold text-orange-900 mb-2">3. 🔥 Highest Thermic Effect (Burns Calories)</h3>
              <p className="text-orange-800">
                Your body burns <strong>20-30% of protein calories</strong> just digesting it (vs. 5-10% for carbs/fats). 
                Eating 100g protein burns 20-30 calories automatically. This adds up to a 15-30% metabolic boost!
              </p>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-5 rounded">
              <h3 className="font-bold text-green-900 mb-2">4. 🏃‍♀️ Supports Recovery & Performance</h3>
              <p className="text-green-800">
                Whether you work out or just stay active, protein repairs muscle tissue and supports recovery. 
                Better recovery means better energy, mood, and ability to stay consistent with your plan.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded">
              <h3 className="font-bold text-blue-900 mb-2">5. 🎯 Makes Adherence Easier</h3>
              <p className="text-blue-800">
                When you're full, energized, and seeing results (muscle definition, strength), sticking to your 
                plan becomes effortless. <strong>78% better long-term adherence</strong> with adequate protein intake.
              </p>
            </div>
          </div>
        </section>

        {/* How Much Protein */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How Much Protein Do You Need?</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="bg-indigo-50 border-2 border-indigo-200 p-6 rounded-lg text-center">
              <p className="text-sm text-indigo-700 mb-2">OPTIMAL PROTEIN INTAKE FOR FAT LOSS:</p>
              <p className="text-3xl font-bold text-indigo-900 mb-2">
                1.6-2.2g per kg bodyweight
              </p>
              <p className="text-sm text-indigo-700">or 0.7-1g per lb bodyweight</p>
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-3">Quick Examples:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Person A: 60kg (132 lbs)</h4>
                <p className="text-sm text-gray-700">
                  60kg × 1.6-2.2 = <strong className="text-purple-600">96-132g protein/day</strong>
                </p>
                <p className="text-xs text-gray-600 mt-1">Target: ~110-120g</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Person B: 80kg (176 lbs)</h4>
                <p className="text-sm text-gray-700">
                  80kg × 1.6-2.2 = <strong className="text-purple-600">128-176g protein/day</strong>
                </p>
                <p className="text-xs text-gray-600 mt-1">Target: ~140-160g</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-6">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Common Mistake:</h3>
              <p className="text-yellow-800">
                Most people eat only <strong>0.8-1.2g/kg</strong> (half of what's optimal!). If you're constantly 
                hungry, losing muscle definition, or struggling with cravings, low protein is likely the culprit.
              </p>
            </div>
          </div>
        </section>

        {/* Best Protein Sources */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Best Protein Sources</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-purple-900 mb-3">🍗 Animal Sources (Complete Proteins)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center p-2 bg-purple-50 rounded">
                    <span>Chicken breast (100g)</span>
                    <span className="font-bold">31g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Turkey breast (100g)</span>
                    <span className="font-bold">29g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-purple-50 rounded">
                    <span>Salmon (100g)</span>
                    <span className="font-bold">25g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Lean beef (100g)</span>
                    <span className="font-bold">26g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-purple-50 rounded">
                    <span>Eggs (2 large)</span>
                    <span className="font-bold">12g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Greek yogurt (150g)</span>
                    <span className="font-bold">15g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-purple-50 rounded">
                    <span>Cottage cheese (100g)</span>
                    <span className="font-bold">11g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Whey protein (1 scoop)</span>
                    <span className="font-bold">20-25g</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-green-900 mb-3">🌱 Plant Sources</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span>Tofu (100g)</span>
                    <span className="font-bold">8g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Tempeh (100g)</span>
                    <span className="font-bold">19g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span>Lentils (100g cooked)</span>
                    <span className="font-bold">9g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Chickpeas (100g cooked)</span>
                    <span className="font-bold">9g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span>Edamame (100g)</span>
                    <span className="font-bold">11g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Quinoa (100g cooked)</span>
                    <span className="font-bold">4g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span>Plant protein powder (1 scoop)</span>
                    <span className="font-bold">20-25g</span>
                  </li>
                  <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Seitan (100g)</span>
                    <span className="font-bold">25g</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mt-6">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tip:</h3>
              <p className="text-blue-800">
                Aim for <strong>20-40g protein per meal</strong>. This keeps muscle protein synthesis elevated throughout 
                the day and makes hitting your daily target much easier than trying to "catch up" in one meal.
              </p>
            </div>
          </div>
        </section>

        {/* Meal Timing */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">When Should You Eat Protein?</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              While <strong>total daily protein</strong> is most important, distribution matters for optimal results:
            </p>

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Ideal Protein Distribution:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-bold text-orange-600 mr-3">Breakfast:</span>
                  <span>25-35g — Reduces hunger and cravings throughout the day</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-yellow-600 mr-3">Lunch:</span>
                  <span>30-40g — Maintains energy and prevents afternoon slumps</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-blue-600 mr-3">Dinner:</span>
                  <span>30-40g — Supports overnight recovery and muscle repair</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-green-600 mr-3">Snacks:</span>
                  <span>10-20g — Fills gaps and maintains steady protein intake</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-semibold text-green-900 mb-2">✓ Research Shows:</h3>
              <p className="text-green-800">
                Spreading protein across 3-4 meals is more effective for muscle preservation than eating most of 
                it in one or two large meals. Aim for at least <strong>20g per meal</strong> to maximize muscle protein synthesis.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Strategies */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Practical Strategies to Hit Your Protein Target</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="bg-purple-50 rounded-lg p-5">
              <h3 className="font-semibold text-purple-900 mb-3">Strategy 1: Build Meals Around Protein</h3>
              <p className="text-purple-800 mb-2">
                Choose your protein source first, then add carbs and fats:
              </p>
              <ul className="text-sm text-purple-700 space-y-1 ml-4">
                <li>• "I'm having chicken breast... with rice and vegetables"</li>
                <li>• "I'm having Greek yogurt... with berries and granola"</li>
                <li>• "I'm having salmon... with quinoa and avocado"</li>
              </ul>
            </div>

            <div className="bg-pink-50 rounded-lg p-5">
              <h3 className="font-semibold text-pink-900 mb-3">Strategy 2: Use Protein Powder Strategically</h3>
              <p className="text-pink-800 mb-2">
                Protein powder is convenient and versatile:
              </p>
              <ul className="text-sm text-pink-700 space-y-1 ml-4">
                <li>• Add to oatmeal (instant 20g+ boost)</li>
                <li>• Blend into smoothies</li>
                <li>• Mix into yogurt or cottage cheese</li>
                <li>• Bake into muffins or pancakes</li>
                <li>• Quick post-workout shake</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-5">
              <h3 className="font-semibold text-orange-900 mb-3">Strategy 3: Prep Protein in Bulk</h3>
              <p className="text-orange-800 mb-2">
                Make hitting your target effortless:
              </p>
              <ul className="text-sm text-orange-700 space-y-1 ml-4">
                <li>• Grill 5-7 chicken breasts on Sunday</li>
                <li>• Hard-boil a dozen eggs</li>
                <li>• Cook a big batch of ground turkey or beef</li>
                <li>• Pre-portion Greek yogurt and cottage cheese</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-5">
              <h3 className="font-semibold text-blue-900 mb-3">Strategy 4: Smart Protein Swaps</h3>
              <p className="text-blue-800 mb-2">
                Small changes = big protein gains:
              </p>
              <ul className="text-sm text-blue-700 space-y-1 ml-4">
                <li>• Regular yogurt → Greek yogurt (+10-15g)</li>
                <li>• Regular pasta → Protein pasta (+10-15g)</li>
                <li>• Regular milk → Fairlife/protein milk (+8g)</li>
                <li>• Rice → Rice + lentils (+5-7g)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Challenges */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overcoming Common Challenges</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded">
              <h3 className="font-semibold text-red-900 mb-2">❓ "I get full too quickly with high protein"</h3>
              <p className="text-sm text-red-800">
                Start gradually. Add 10-20g more per day weekly. Your appetite will adapt. Use protein shakes 
                if whole foods feel too filling.
              </p>
            </div>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded">
              <h3 className="font-semibold text-yellow-900 mb-2">❓ "Protein sources are expensive"</h3>
              <p className="text-sm text-yellow-800">
                Budget options: eggs, canned tuna, Greek yogurt, cottage cheese, chicken thighs, ground turkey, 
                lentils, beans. Buy in bulk and freeze.
              </p>
            </div>

            <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded">
              <h3 className="font-semibold text-green-900 mb-2">❓ "I'm vegetarian/vegan"</h3>
              <p className="text-sm text-green-800">
                Totally doable! Focus on tofu, tempeh, seitan, legumes, and high-quality plant protein powder. 
                You may need slightly more (2-2.2g/kg) since plant proteins are less bioavailable.
              </p>
            </div>

            <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">❓ "I'm always traveling/eating out"</h3>
              <p className="text-sm text-blue-800">
                Order double protein at restaurants. Pack protein bars and shakes for travel. Most places 
                have grilled chicken, fish, or eggs available.
              </p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-indigo-50 rounded-xl p-6 mb-8 border border-indigo-100">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">📖 Additional Resources</h2>
          <ul className="space-y-2 text-indigo-800">
            <li>• <Link href="/app/cookbook" className="underline hover:text-indigo-600">High-Protein Recipes</Link></li>
            <li>• <Link href="/app/faq" className="underline hover:text-indigo-600">Frequently Asked Questions</Link></li>
            <li>• <Link href="/app/chat" className="underline hover:text-indigo-600">Ask Your Coach a Question</Link></li>
          </ul>
        </section>

        {/* Homework Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-indigo-200">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-3">📝</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Lesson 4 Assignment</h2>
              <p className="text-gray-600">Focus on hitting your protein target consistently</p>
            </div>
          </div>

          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <span className="text-5xl mb-4 block">✅</span>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Homework Submitted!</h3>
              <p className="text-green-800">Your coach will review your protein tracking and provide feedback.</p>
              <Link href="/app/lessons" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                Return to Lessons →
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-lg p-5 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">📋 Your Task (5-7 days):</h3>
                <p className="text-gray-700 mb-4">
                  Forone full week, focus specifically on <strong>hitting your protein target</strong> every day. 
                  Track protein at each meal and for the full day. Your coach will calculate your personalized target based on your previous homework.
                </p>
                <p className="text-gray-700 mb-2">
                  Document:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Daily protein totals (aim for 1.6-2.2g/kg bodyweight)</li>
                  <li>Protein distribution across meals (breakfast, lunch, dinner, snacks)</li>
                  <li>Sources used (animal/plant)</li>
                  <li>Any strategies that worked well</li>
                  <li>Challenges you faced</li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="weekendDay" className="block text-sm font-semibold text-gray-700 mb-2">
                    Protein Tracking - Days 1-4 *
                  </label>
                  <textarea
                    id="weekendDay"
                    name="weekendDay"
                    value={formData.weekendDay}
                    onChange={handleChange}
                    required
                    rows="10"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Example:&#10;Day 1:&#10;Breakfast: Greek yogurt + protein powder = 35g&#10;Lunch: Chicken breast + rice = 45g&#10;Snack: Protein bar = 20g&#10;Dinner: Salmon + vegetables = 35g&#10;TOTAL: 135g protein&#10;&#10;Day 2:&#10;..."
                  />
                </div>

                <div>
                  <label htmlFor="workingDay" className="block text-sm font-semibold text-gray-700 mb-2">
                    Protein Tracking - Days 5-7 *
                  </label>
                  <textarea
                    id="workingDay"
                    name="workingDay"
                    value={formData.workingDay}
                    onChange={handleChange}
                    required
                    rows="10"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Continue tracking for days 5-7..."
                  />
                </div>

                <div>
                  <label htmlFor="photos" className="block text-sm font-semibold text-gray-700 mb-2">
                    Screenshots or Photos (Optional)
                  </label>
                  <textarea
                    id="photos"
                    name="photos"
                    value={formData.photos}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Links to MFP screenshots or meal photos..."
                  />
                </div>

                <div>
                  <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-2">
                    Reflections & Questions *
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What strategies helped you hit your protein target? What challenges did you face? Did you notice any changes in hunger, energy, or cravings? Any questions about protein timing or sources?"
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
                  Your coach will review your protein tracking and provide feedback within 24-48 hours.
                </p>
              </form>
            </>
          )}
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">🎯 Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Calculate your personal protein target (1.6-2.2g/kg)</li>
            <li>Track protein daily for one week</li>
            <li>Submit your tracking and reflections</li>
            <li>Move on to Lesson 5: Carbs & Fats Without Fear</li>
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
