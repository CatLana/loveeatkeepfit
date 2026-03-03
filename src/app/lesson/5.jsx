import React, { useState } from 'react';
import Link from 'next/link';

export default function Lesson5() {
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
          lessonId: 5,
          lessonTitle: 'Carbs & Fats Without Fear',
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
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Lesson 5: Carbs & Fats Without Fear</h1>
          <p className="text-gray-600 mt-1">Let's end the food fear, {userName}! 🍞🥑</p>
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
        <section className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-8 border border-green-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Release the Food Fear 🌟</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You've likely heard conflicting advice: <em>"Carbs make you fat!" "No,  fats make you fat!" "Avoid both!"</em> 
            The truth? <strong>Neither carbs nor fats are the enemy</strong>. Both play essential roles in your health, 
            energy, and satisfaction.
          </p>
          <p className="text-gray-700 leading-relaxed">
            In this final foundational lesson, you'll learn how to enjoy carbs and fats strategically—for energy, 
            hormones, brain function, and pure enjoyment—while still reaching your fat loss goals.
          </p>
        </section>

        {/* The Truth About Carbs */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">🍞 Carbs: Your Body's Preferred Fuel</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Carbohydrates have been unfairly demonized by fad diets. Here's what carbs <em>actually</em> do for you:
            </p>

            <div className="space-y-3 my-6">
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
                <h3 className="font-semibold text-orange-900 mb-1">1. 🧠 Brain & Cognitive Function</h3>
                <p className="text-sm text-orange-800">
                  Your brain uses ~120g of glucose daily. Low carbs can lead to brain fog, poor concentration, 
                  and mood swings.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                <h3 className="font-semibold text-yellow-900 mb-1">2. ⚡ Energy & Performance</h3>
                <p className="text-sm text-yellow-800">
                  Carbs fuel high-intensity exercise and daily activities. Without adequate carbs, workouts 
                  feel harder and you'll struggle to maintain intensity.
                </p>
              </div>

              <div className="border-l-4 border-pink-500 bg-pink-50 p-4 rounded">
                <h3 className="font-semibold text-pink-900 mb-1">3. 😊 Mood & Serotonin Production</h3>
                <p className="text-sm text-pink-800">
                  Carbs boost serotonin, the "feel-good" neurotransmitter. Very low-carb diets often cause 
                  irritability, anxiety, and low mood.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
                <h3 className="font-semibold text-purple-900 mb-1">4. 🔥 Metabolic Health</h3>
                <p className="text-sm text-purple-800">
                  Adequate carbs support thyroid function and keep your metabolism running optimally. Too-low 
                  carbs can slow metabolism down.
                </p>
              </div>

              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                <h3 className="font-semibold text-green-900 mb-1">5. 💪 Recovery & Glycogen</h3>
                <p className="text-sm text-green-800">
                  After workouts, carbs replenish muscle glycogen, supporting recovery and preventing muscle 
                  breakdown.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h3 className="font-semibold text-blue-900 mb-2">💡 The Bottom Line:</h3>
              <p className="text-blue-800">
                Carbs don't make you fat. <strong>Excess calories</strong> make you fat. You can lose weight eating 
                200g+ carbs per day if you're in a calorie deficit. Carbs are your friend, not your enemy!
              </p>
            </div>
          </div>
        </section>

        {/* Types of Carbs */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Carbs: What to Prioritize</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-300 rounded-lg p-5">
                <h3 className="font-semibold text-green-900 mb-3">🟢 Complex Carbs (Prioritize)</h3>
                <p className="text-sm text-green-800 mb-3">
                  Fiber-rich, nutrient-dense, slower digesting. Keep you full longer.
                </p>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Oats, quinoa, brown rice</li>
                  <li>• Sweet potatoes, potatoes</li>
                  <li>• Whole grain bread, pasta</li>
                  <li>• Legumes (beans, lentils)</li>
                  <li>• Fruits (whole, not juice)</li>
                  <li>• Vegetables</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-5">
                <h3 className="font-semibold text-yellow-900 mb-3">🟡 Simple Carbs (In Moderation)</h3>
                <p className="text-sm text-yellow-800 mb-3">
                  Faster digesting, less filling. Fine in moderation, especially around workouts.
                </p>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• White rice, white bread</li>
                  <li>•Regular pasta</li>
                  <li>• Honey, maple syrup</li>
                  <li>• Dried fruit</li>
                  <li>• Rice cakes, crackers</li>
                  <li>• Sports drinks (for workouts)</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
              <h3 className="font-semibold text-orange-900 mb-2">⚠️ Treats & Refined Carbs</h3>
              <p className="text-sm text-orange-800">
                Cookies, cakes, candy, soda—these are fine <strong>in moderation</strong> if they fit your 
                calories. The 80/20 rule: 80% nutrient-dense foods, 20% flexibility for treats. Don't deprive 
                yourself completely or you'll be more likely to binge later!
              </p>
            </div>
          </div>
        </section>

        {/* The Truth About Fats */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">🥑 Fats: Essential for Health & Hormones</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Dietary fats are <strong>essential</strong>—your body literally cannot function without them. Here's why:
            </p>

            <div className="space-y-3 my-6">
              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                <h3 className="font-semibold text-yellow-900 mb-1">1. 🧬 Hormone Production</h3>
                <p className="text-sm text-yellow-800">
                  Fats are required to produce testosterone, estrogen, and other hormones. Too-low fat intake 
                  can disrupt menstrual cycles, reduce libido, and impact mood.
                </p>
              </div>

              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                <h3 className="font-semibold text-green-900 mb-1">2. 💊 Vitamin Absorption</h3>
                <p className="text-sm text-green-800">
                  Vitamins A, D, E, and K are fat-soluble—you need dietary fat to absorb them. Low-fat diets 
                  can lead to nutrient deficiencies.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-1">3. 🧠 Brain Health</h3>
                <p className="text-sm text-blue-800">
                  Your brain is 60% fat! Omega-3 fatty acids (from fish, walnuts, flaxseeds) support cognitive 
                  function, memory, and mental health.
                </p>
              </div>

              <div className="border-l-4 border-pink-500 bg-pink-50 p-4 rounded">
                <h3 className="font-semibold text-pink-900 mb-1">4. 🍽️ Satiety & Satisfaction</h3>
                <p className="text-sm text-pink-800">
                  Fats slow digestion, keeping you fuller longer. They also make food taste better and more 
                  satisfying (important for adherence!).
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
                <h3 className="font-semibold text-purple-900 mb-1">5. 🛡️ Cell Membranes & Inflammation</h3>
                <p className="text-sm text-purple-800">
                  Every cell in your body has a membrane made of fats. Healthy fats (especially omega-3s) 
                  reduce inflammation and support overall health.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <h3 className="font-semibold text-red-900 mb-2">⚠️ Minimum Fat Intake:</h3>
              <p className="text-red-800">
                Never go below <strong>0.5g per kg bodyweight</strong> (e.g., 35g for a 70kg person). Going too 
                low can cause hormone disruption, hair loss, dry skin, low energy, and mood issues.
              </p>
            </div>
          </div>
        </section>

        {/* Types of Fats */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Fats: Understanding the Difference</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">🟢 Unsaturated Fats</h3>
                <p className="text-xs text-green-800 mb-3">(Prioritize these)</p>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Olive oil</li>
                  <li>• Avocados</li>
                  <li>• Nuts & seeds</li>
                  <li>• Fatty fish (salmon)</li>
                  <li>• Nut butters</li>
                </ul>
                <p className="text-xs text-green-600 mt-3">Heart-healthy, anti-inflammatory</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">🟡 Saturated Fats</h3>
                <p className="text-xs text-yellow-800 mb-3">(Moderate amounts OK)</p>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• Butter</li>
                  <li>• Coconut oil</li>
                  <li>• Cheese</li>
                  <li>• Fatty meats</li>
                  <li>• Full-fat dairy</li>
                </ul>
                <p className="text-xs text-yellow-600 mt-3">Fine in moderation</p>
              </div>

              <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">🔴 Trans Fats</h3>
                <p className="text-xs text-red-800 mb-3">(Avoid when possible)</p>
                <ul className="space-y-1 text-sm text-red-700">
                  <li>• Hydrogenated oils</li>
                  <li>• Some margarines</li>
                  <li>• Fried fast food</li>
                  <li>• Packaged baked goods</li>
                  <li>• Some crackers</li>
                </ul>
                <p className="text-xs text-red-600 mt-3">Harmful to health</p>
              </div>
            </div>
          </div>
        </section>

        {/* Portion Control for Fats */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Portion Control Matters for Fats</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="bg-red-50 border-2 border-red-200 p-5 rounded-lg">
              <p className="text-lg font-semibold text-red-900 mb-2">
                Remember: Fats = 9 calories per gram (more than double protein/carbs!)
              </p>
              <p className="text-red-800">
                This makes fats the <strong>easiest macro to overconsume</strong>. Many people unknowingly eat 
                300-500 hidden fat calories daily, sabotaging their deficit.
              </p>
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-3">Common "Fat Traps" & How to Avoid Them:</h3>
            
            <div className="space-y-3">
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">🔸 Cooking Oils</h4>
                <p className="text-sm text-yellow-800 mb-2">
                  1 tablespoon olive oil = 120 calories. Easy to pour 2-3 tablespoons without thinking!
                </p>
                <p className="text-xs text-yellow-700">
                  <strong>Solution:</strong> Measure oil with a spoon or use spray. Use non-stick pans to reduce oil needed.
                </p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-2">🔸 Nuts & Nut Butters</h4>
                <p className="text-sm text-orange-800 mb-2">
                  A "handful" of almonds can be 200-300 calories. 2 tablespoons peanut butter = 190 calories.
                </p>
                <p className="text-xs text-orange-700">
                  <strong>Solution:</strong> Pre-portion nuts into small bags. Measure nut butter with a tablespoon.
                </p>
              </div>

              <div className="bg-pink-50 rounded-lg p-4">
                <h4 className="font-semibold text-pink-900 mb-2">🔸 Cheese</h4>
                <p className="text-sm text-pink-800 mb-2">
                  "A little cheese" can easily be 150-250 calories. Parmesan, feta, cheddar—all adds up fast.
                </p>
                <p className="text-xs text-pink-700">
                  <strong>Solution:</strong> Weigh cheese. Use stronger flavors (like parmesan) so a little goes further.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">🔸 Salad Dressings & Sauces</h4>
                <p className="text-sm text-purple-800 mb-2">
                  2 tablespoons ranch dressing = 140 calories. Mayo, aioli, creamy sauces—all very calorie-dense.
                </p>
                <p className="text-xs text-purple-700">
                  <strong>Solution:</strong> Use lighter options (balsamic, mustard, yogurt-based). Measure dressing portions.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">🔸 Avocados</h4>
                <p className="text-sm text-blue-800 mb-2">
                  One whole avocado = 240-320 calories. Healthy, yes—but still needs to be tracked!
                </p>
                <p className="text-xs text-blue-700">
                  <strong>Solution:</strong> Enjoy ¼-½ avocado per meal. Weigh it to track accurately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Balancing Carbs & Fats */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Balance Carbs & Fats</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Once you've set your <strong>protein target</strong> (non-negotiable) and <strong>minimum fat intake</strong> 
              (0.5g/kg), the remaining calories can be split between carbs and fats based on:
            </p>

            <div className="bg-indigo-50 rounded-lg p-5 my-4">
              <h3 className="font-semibold text-indigo-900 mb-3">Factors to Consider:</h3>
              <ul className="space-y-2 text-indigo-800 text-sm">
                <li>• <strong>Activity level:</strong> More active? Higher carbs for energy.</li>
                <li>• <strong>Personal preference:</strong> Some people feel better with more fats, others with more carbs.</li>
                <li>• <strong>Hunger management:</strong> Fats = sustained fullness. Carbs = immediate energy.</li>
                <li>• <strong>Training type:</strong> Intense workouts? Need more carbs for glycogen.</li>
                <li>• <strong>Hormonal health:</strong> Women may need slightly higher fats for hormone balance.</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-orange-50 border border-orange-300 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-3">Higher Carb Approach</h3>
                <p className="text-sm text-orange-800 mb-2">
                  <strong>45-50% carbs / 20-25% fats</strong>
                </p>
                <p className="text-sm text-orange-700">Good for:</p>
                <ul className="text-xs text-orange-700 space-y-1 ml-4 mt-2">
                  <li>• Very active people</li>
                  <li>• Intense training</li>
                  <li>• Those who love carbs</li>
                  <li>• Better workout performance</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-3">Higher Fat Approach</h3>
                <p className="text-sm text-yellow-800 mb-2">
                  <strong>35-40% carbs / 30-35% fats</strong>
                </p>
                <p className="text-sm text-yellow-700">Good for:</p>
                <ul className="text-xs text-yellow-700 space-y-1 ml-4 mt-2">
                  <li>• Less active people</li>
                  <li>• Those who love fats</li>
                  <li>• Better satiety for some</li>
                  <li>• Hormone optimization</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-semibold text-green-900 mb-2">✓ The Truth:</h3>
              <p className="text-green-800">
                Both approaches work! The "best" macro split is the one <strong>you can stick to</strong> long-term. 
                Your coach will help you find your sweet spot based on your goals, preferences, and lifestyle.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Tips */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Practical Tips for Success</h2>
          
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-5">
              <h3 className="font-semibold text-purple-900 mb-3">1. Track Everything (Especially Fats!)</h3>
              <p className="text-purple-800 text-sm">
                Hidden fats are the #1 reason people unknowingly exceed their calorie targets. Weigh oils, measure 
                nut butters, and don't guesstimate portions.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-5">
              <h3 className="font-semibold text-blue-900 mb-3">2. Don't Fear Carbs—Enjoy Them!</h3>
              <p className="text-blue-800 text-sm">
                Carbs support energy, mood, and metabolism. Eat them around workouts for best performance and 
                recovery. Enjoy a variety: fruits, whole grains, potatoes, rice.
              </p>
            </div>

            <div className="bg-pink-50 rounded-lg p-5">
              <h3 className="font-semibold text-pink-900 mb-3">3. Prioritize Quality, But Enjoy Treats</h3>
              <p className="text-pink-800 text-sm">
                Aim for 80% nutrient-dense foods (whole grains, fruits, vegetables, nuts, seeds, healthy oils). 
                The other 20% can be treats—chocolate, pizza, wine—whatever fits your calories!
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-5">
              <h3 className="font-semibold text-orange-900 mb-3">4. Adjust Based on Feel</h3>
              <p className="text-orange-800 text-sm">
                Low energy pre-workout? Add more carbs. Always hungry? Try slightly more fats. Your coach will 
                help you fine-tune based on how you feel and your results.
              </p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-indigo-50 rounded-xl p-6 mb-8 border border-indigo-100">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">📖 Additional Resources</h2>
          <ul className="space-y-2 text-indigo-800">
            <li>• <Link href="/app/cookbook" className="underline hover:text-indigo-600">Balanced Macro Recipes</Link></li>
            <li>• <Link href="/app/faq" className="underline hover:text-indigo-600">Frequently Asked Questions</Link></li>
            <li>• <Link href="/app/chat" className="underline hover:text-indigo-600">Ask Your Coach a Question</Link></li>
          </ul>
        </section>

        {/* Homework Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-indigo-200">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-3">📝</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Lesson 5 Assignment</h2>
              <p className="text-gray-600">Track your full macro balance and portion sizes</p>
            </div>
          </div>

          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <span className="text-5xl mb-4 block">✅</span>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Homework Submitted!</h3>
              <p className="text-green-800 mb-4">Your coach will review your tracking and provide your finalized macro targets.</p>
              <p className="text-green-900 font-semibold">🎉 Congratulations on completing all 5 foundational lessons!</p>
              <Link href="/app/lessons" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                Return to Lessons →
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-lg p-5 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">📋 Your Task (5-7 days):</h3>
                <p className="text-gray-700 mb-4">
                  Track your <strong>complete macro breakdown</strong> (protein, carbs, fats) for one full week. 
                  Pay special attention to <strong>portion sizes of fats</strong>—oils, nuts, cheese, dressings.
                </p>
                <p className="text-gray-700 mb-2">
                  Document:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Daily totals for protein, carbs, and fats</li>
                  <li>Weigh/measure fats carefully (oils, nuts, avocado, cheese)</li>
                  <li>Note energy levels, hunger, and mood throughout the day</li>
                  <li>Identify any "fat traps" you discovered</li>
                  <li>Reflect on which macro balance felt best</li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="weekendDay" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Macro Tracking - Days 1-4 *
                  </label>
                  <textarea
                    id="weekendDay"
                    name="weekendDay"
                    value={formData.weekendDay}
                    onChange={handleChange}
                    required
                    rows="10"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Example:&#10;Day 1:&#10;Breakfast: Oats (40g C), Protein powder (25g P), Banana (20g C), Peanut butter - measured! (8g F) = 25g P / 60g C / 8g F&#10;...&#10;Daily totals: 130g P / 180g C / 55g F = 1,735 cal&#10;Energy: Good, Hunger: Satisfied, Mood: Happy&#10;&#10;Day 2:..."
                  />
                </div>

                <div>
                  <label htmlFor="workingDay" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Macro Tracking - Days 5-7 *
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
                    placeholder="Links to MFP screenshots or food photos..."
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
                    placeholder="What fat sources did you underestimate before? Did you discover any hidden calories? Which macro balance felt best (higher carb vs higher fat)? How were your energy, hunger, and mood? Any patterns you noticed? Questions about creating your personalized plan?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Final Homework'}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  Your coach will provide your personalized, finalized macro plan within 24-48 hours!
                </p>
              </form>
            </>
          )}
        </section>

        {/* Congratulations */}
        <section className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-xl p-8 border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">🎉 You've Completed the Foundation!</h2>
          <p className="text-gray-700 text-center mb-6">
            You now understand the science and strategy behind sustainable fat loss. You're ready to implement 
            your personalized plan with confidence!
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">What You've Learned:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>Lesson 1:</strong> Volume eating for satisfaction and fullness</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>Lesson 2:</strong> Energy balance and the CICO principle</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>Lesson 3:</strong> Macro fundamentals and why they matter</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>Lesson 4:</strong> Protein as your non-negotiable MVP</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>Lesson 5:</strong> Enjoying carbs and fats without fear</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-2">🎯 Next Steps:</p>
            <p className="text-gray-700">
              Your coach will review all your homework and create your personalized macro plan. Once you 
              receive it, you'll start your fat loss phase with clarity, confidence, and all the tools you 
              need for lifelong success!
            </p>
          </div>
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
