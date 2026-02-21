import { useState } from "react";

export default function IntakeForm({ content }) {
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",

    // Physical Measurements
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    goalWeight: "",
    bodyType: "",
    leanMuscleMass: "",

    // Activity Level
    activityLevel: "",
    exerciseRoutine: [],
    exerciseDays: "",

    // Goals
    primaryGoal: "",
    weightToLose: "",
    timeline: "",
    triedBefore: "",

    // Eating Habits
    dietaryPreference: [],
    allergies: "",
    dislikedFoods: "",
    mealsPerDay: "",
    mealPrep: "",
    cookingTime: "",
    eatingOut: "",

    // Challenges
    biggestStruggle: [],
    trackedBefore: "",
    trackingApp: "",

    // Lifestyle
    sleepQuality: "",
    stressLevel: "",
    scheduleType: "",
    cookForOthers: "",

    // Health
    medicalConditions: "",
    medications: "",
    pregnancyStatus: "",
    doctorCleared: "",

    // Motivation
    whyImportant: "",
    successLooks: "",
    supportNeeded: [],
    hearAbout: "",

    // Commitment
    readyToCommit: "",
    concerns: ""
  });

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const currentArray = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...currentArray, value] };
        } else {
          return {
            ...prev,
            [name]: currentArray.filter((item) => item !== value)
          };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("loading");

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const data = await response.json();
      setResults(data.calculations);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "success" && results) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-beige bg-white p-8 shadow-soft">
          <h2 className="text-3xl font-semibold text-charcoal">
            Your Personalized Results
          </h2>

          <div className="mt-6 space-y-6">
            <div className="rounded-2xl bg-warmwhite p-6">
              <h3 className="text-xl font-semibold text-darkgreen">
                Daily Calorie Target
              </h3>
              <p className="mt-2 text-4xl font-bold text-charcoal">
                {results.calories} <span className="text-xl">calories</span>
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-coral/10 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-coral">
                  Protein
                </h4>
                <p className="mt-2 text-3xl font-bold text-charcoal">
                  {results.macros.protein}g
                </p>
              </div>
              <div className="rounded-2xl bg-darkgreen/10 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-darkgreen">
                  Carbs
                </h4>
                <p className="mt-2 text-3xl font-bold text-charcoal">
                  {results.macros.carbs}g
                </p>
              </div>
              <div className="rounded-2xl bg-beige p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
                  Fats
                </h4>
                <p className="mt-2 text-3xl font-bold text-charcoal">
                  {results.macros.fats}g
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-beige bg-warmwhite p-6">
              <h3 className="text-lg font-semibold text-charcoal">
                Additional Metrics
              </h3>
              <div className="mt-4 space-y-2 text-sm text-charcoal/80">
                <p>
                  <strong>BMR (Basal Metabolic Rate):</strong> {results.bmr}{" "}
                  calories/day
                </p>
                <p>
                  <strong>TDEE (Total Daily Energy Expenditure):</strong>{" "}
                  {results.tdee} calories/day
                </p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-coral bg-coral/5 p-6">
              <h3 className="text-lg font-semibold text-charcoal">
                What&apos;s Next?
              </h3>
              <p className="mt-2 text-base leading-relaxed text-charcoal/80">
                I&apos;ve received your intake form and calculated your personalized
                macros. I&apos;ll review all your details and send you a personalized
                plan within 24 hours via email. Check your inbox for next steps!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-3xl border border-beige bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-charcoal">
          Client Intake Form
        </h1>
        <p className="mt-3 text-base leading-relaxed text-charcoal/80">
          Fill out this comprehensive form so I can calculate your personalized
          daily calories and macros, and create a tailored coaching plan for
          you.
        </p>

        <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
          {/* Section 1: Basic Information */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              1. Basic Information
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Your Name *
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Email *
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Phone (optional)
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Age *
                  <input
                    type="number"
                    name="age"
                    min="15"
                    max="100"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Gender *
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="prefer-not-say">Prefer not to say</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          {/* Section 2: Physical Measurements */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              2. Physical Measurements
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Current Weight *
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="weight"
                      step="0.1"
                      required
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="e.g., 75"
                      className="flex-1 rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                    />
                    <select
                      name="weightUnit"
                      value={formData.weightUnit}
                      onChange={handleChange}
                      className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Height *
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="height"
                      step="0.1"
                      required
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="e.g., 170"
                      className="flex-1 rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                    />
                    <select
                      name="heightUnit"
                      value={formData.heightUnit}
                      onChange={handleChange}
                      className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                    >
                      <option value="cm">cm</option>
                      <option value="inches">inches</option>
                    </select>
                  </div>
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Goal Weight (optional)
                  <input
                    type="number"
                    name="goalWeight"
                    step="0.1"
                    value={formData.goalWeight}
                    onChange={handleChange}
                    placeholder="e.g., 65 kg or 143 lbs"
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Body Type *
                  <select
                    name="bodyType"
                    required
                    value={formData.bodyType}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="ectomorph">Ectomorph (naturally thin)</option>
                    <option value="mesomorph">Mesomorph (athletic build)</option>
                    <option value="endomorph">Endomorph (gains weight easily)</option>
                    <option value="not-sure">Not sure</option>
                  </select>
                </label>
              </div>
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-charcoal">
                  Lean muscle mass (body scan data)
                </legend>
                <div className="space-y-2">
                  {[
                    { value: "under", label: "Under average" },
                    { value: "normal", label: "Normal range" },
                    { value: "over", label: "Above average" },
                    { value: "no-scan", label: "I have not done body scan" }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-charcoal cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="leanMuscleMass"
                        value={option.value}
                        checked={formData.leanMuscleMass === option.value}
                        onChange={handleChange}
                        className="h-4 w-4 border-beige text-coral focus:ring-coral"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </section>

          {/* Section 3: Activity Level */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              3. Activity Level
            </h2>
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                What best describes your typical day? *
                <select
                  name="activityLevel"
                  required
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">Select</option>
                  <option value="sedentary">
                    Sedentary (desk job, little exercise)
                  </option>
                  <option value="lightly-active">
                    Lightly active (light exercise 1-3 days/week)
                  </option>
                  <option value="moderately-active">
                    Moderately active (moderate exercise 3-5 days/week)
                  </option>
                  <option value="very-active">
                    Very active (intense exercise 6-7 days/week)
                  </option>
                  <option value="extremely-active">
                    Extremely active (physical job + daily training)
                  </option>
                </select>
              </label>
              <div>
                <p className="mb-2 text-sm font-medium text-charcoal">
                  Current Exercise Routine * (select all that apply)
                </p>
                <div className="space-y-2">
                  {[
                    { value: "none", label: "No regular exercise" },
                    { value: "walking", label: "Walking/light cardio" },
                    { value: "strength", label: "Strength training" },
                    { value: "hiit", label: "HIIT/Intense cardio" },
                    { value: "yoga", label: "Yoga/Pilates" },
                    { value: "sports", label: "Sports/recreational activities" }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-charcoal"
                    >
                      <input
                        type="checkbox"
                        name="exerciseRoutine"
                        value={option.value}
                        checked={formData.exerciseRoutine.includes(option.value)}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-beige text-coral focus:ring-coral"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                How many days per week do you exercise? *
                <select
                  name="exerciseDays"
                  required
                  value={formData.exerciseDays}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">Select</option>
                  <option value="0">0 days</option>
                  <option value="1-2">1-2 days</option>
                  <option value="3-4">3-4 days</option>
                  <option value="5-6">5-6 days</option>
                  <option value="7">7 days</option>
                </select>
              </label>
            </div>
          </section>

          {/* Section 4: Goals & Timeline */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              4. Goals & Timeline
            </h2>
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                Primary Goal *
                <select
                  name="primaryGoal"
                  required
                  value={formData.primaryGoal}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">Select</option>
                  <option value="lose-weight">Lose weight/fat</option>
                  <option value="build-muscle">Build muscle</option>
                  <option value="get-lean">Get lean/toned</option>
                  <option value="maintain-weight">Maintain current weight</option>
                  <option value="improve-energy">Improve energy and health</option>
                  <option value="learn-habits">Learn sustainable eating habits</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                If weight loss, how much do you want to lose? (optional)
                <input
                  type="text"
                  name="weightToLose"
                  value={formData.weightToLose}
                  onChange={handleChange}
                  placeholder="e.g., 10 kg or 22 lbs"
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                Timeline *
                <select
                  name="timeline"
                  required
                  value={formData.timeline}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">Select</option>
                  <option value="no-rush">No rush, sustainable approach</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="4-6-months">4-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="1-year-plus">1+ year commitment</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                Have you tried to reach this goal before? *
                <select
                  name="triedBefore"
                  required
                  value={formData.triedBefore}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">Select</option>
                  <option value="multiple">Yes, multiple times</option>
                  <option value="once-twice">Yes, once or twice</option>
                  <option value="no">No, this is my first time</option>
                </select>
              </label>
            </div>
          </section>

          {/* Section 5: Eating Habits */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              5. Eating Habits & Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-charcoal">
                  Dietary Preference * (select all that apply)
                </p>
                <div className="space-y-2">
                  {[
                    { value: "no-restrictions", label: "No restrictions" },
                    { value: "vegetarian", label: "Vegetarian" },
                    { value: "vegan", label: "Vegan" },
                    { value: "pescatarian", label: "Pescatarian" },
                    { value: "reduce-meat", label: "Reduce meat consumption" },
                    { value: "low-carb", label: "Low carb" },
                    { value: "gluten-free", label: "Gluten-free" },
                    { value: "dairy-free", label: "Dairy-free" }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-charcoal"
                    >
                      <input
                        type="checkbox"
                        name="dietaryPreference"
                        value={option.value}
                        checked={formData.dietaryPreference.includes(option.value)}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-beige text-coral focus:ring-coral"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                Food Allergies or Intolerances (optional)
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g., nuts, shellfish, lactose"
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                Foods you dislike or won&apos;t eat (optional)
                <input
                  type="text"
                  name="dislikedFoods"
                  value={formData.dislikedFoods}
                  onChange={handleChange}
                  placeholder="e.g., mushrooms, fish, tofu"
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Meals per day *
                  <select
                    name="mealsPerDay"
                    required
                    value={formData.mealsPerDay}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="1-2">1-2 meals</option>
                    <option value="3">3 meals</option>
                    <option value="4-5">4-5 meals</option>
                    <option value="grazing">Constant grazing/snacking</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Do you meal prep? *
                  <select
                    name="mealPrep"
                    required
                    value={formData.mealPrep}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="regularly">Yes, regularly</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="rarely">Rarely</option>
                    <option value="never">Never</option>
                    <option value="want-to-learn">Want to learn</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Cooking time available per day *
                  <select
                    name="cookingTime"
                    required
                    value={formData.cookingTime}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="less-15">Less than 15 minutes</option>
                    <option value="15-30">15-30 minutes</option>
                    <option value="30-60">30-60 minutes</option>
                    <option value="1-plus">1+ hours</option>
                    <option value="varies">Varies day to day</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  How often do you eat out? *
                  <select
                    name="eatingOut"
                    required
                    value={formData.eatingOut}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="rarely">Rarely (0-1/week)</option>
                    <option value="sometimes">Sometimes (2-3/week)</option>
                    <option value="often">Often (4-5/week)</option>
                    <option value="very-often">Very often (6+/week)</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          {/* Section 6: Challenges */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              6. Current Challenges
            </h2>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-charcoal">
                  Biggest struggles * (select all that apply)
                </p>
                <div className="space-y-2">
                  {[
                    { value: "time-to-cook", label: "Finding time to cook" },
                    { value: "meal-planning", label: "Planning meals and groceries" },
                    { value: "consistency", label: "Staying consistent" },
                    { value: "cravings", label: "Cravings and overeating" },
                    { value: "boring-food", label: "Eating boring/bland food" },
                    { value: "tracking", label: "Tracking calories/macros" },
                    { value: "eating-out", label: "Eating out/social situations" },
                    { value: "emotional-eating", label: "Emotional eating" },
                    { value: "energy-crashes", label: "Energy crashes" }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-charcoal"
                    >
                      <input
                        type="checkbox"
                        name="biggestStruggle"
                        value={option.value}
                        checked={formData.biggestStruggle.includes(option.value)}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-beige text-coral focus:ring-coral"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                Have you tracked calories or macros before? *
                <select
                  name="trackedBefore"
                  required
                  value={formData.trackedBefore}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">Select</option>
                  <option value="currently">Yes, currently tracking</option>
                  <option value="stopped">Yes, but stopped</option>
                  <option value="briefly">Tried briefly</option>
                  <option value="never">Never tried</option>
                  <option value="no-idea">No idea what macros are</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                If yes, what tracking app did you use? (optional)
                <input
                  type="text"
                  name="trackingApp"
                  value={formData.trackingApp}
                  onChange={handleChange}
                  placeholder="e.g., MyFitnessPal, Cronometer"
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
            </div>
          </section>

          {/* Section 7: Lifestyle */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              7. Lifestyle Factors
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Sleep Quality *
                  <select
                    name="sleepQuality"
                    required
                    value={formData.sleepQuality}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="good">Good (7-9 hours, restful)</option>
                    <option value="fair">Fair (6-7 hours, sometimes restless)</option>
                    <option value="poor">Poor (less than 6 hours or restless)</option>
                    <option value="irregular">Irregular schedule</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Stress Level *
                  <select
                    name="stressLevel"
                    required
                    value={formData.stressLevel}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="very-high">Very high/chronic</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Schedule Type *
                  <select
                    name="scheduleType"
                    required
                    value={formData.scheduleType}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="consistent">Consistent schedule</option>
                    <option value="sometimes">Sometimes unpredictable</option>
                    <option value="very-busy">Very busy and irregular</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Do you cook for others? *
                  <select
                    name="cookForOthers"
                    required
                    value={formData.cookForOthers}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="myself">No, just for myself</option>
                    <option value="partner">Yes, for a partner</option>
                    <option value="family">Yes, for family/children</option>
                    <option value="large">Yes, for a large household</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          {/* Section 8: Health & Medical */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              8. Health & Medical
            </h2>
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                Any medical conditions? (optional)
                <input
                  type="text"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  placeholder="e.g., PCOS, thyroid issues, diabetes"
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                Current medications? (optional)
                <input
                  type="text"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  placeholder="List any relevant medications"
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Pregnancy Status *
                  <select
                    name="pregnancyStatus"
                    required
                    value={formData.pregnancyStatus}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="no">No</option>
                    <option value="pregnant">Pregnant</option>
                    <option value="breastfeeding">Breastfeeding</option>
                    <option value="planning">Planning pregnancy</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  Doctor cleared for diet changes? *
                  <select
                    name="doctorCleared"
                    required
                    value={formData.doctorCleared}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="not-applicable">Not applicable/no issues</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          {/* Section 9: Motivation */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              9. Motivation & Support
            </h2>
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                Why is reaching this goal important to you right now? *
                <textarea
                  name="whyImportant"
                  rows={4}
                  required
                  value={formData.whyImportant}
                  onChange={handleChange}
                  placeholder="Share what&apos;s driving you to make this change"
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                What would success look like in 2-3 months? *
                <textarea
                  name="successLooks"
                  rows={4}
                  required
                  value={formData.successLooks}
                  onChange={handleChange}
                  placeholder="Describe how you'd like to feel and what you'd like to achieve"
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <div>
                <p className="mb-2 text-sm font-medium text-charcoal">
                  Support needed * (select all that apply)
                </p>
                <div className="space-y-2">
                  {[
                    { value: "accountability", label: "Accountability" },
                    { value: "motivation", label: "Motivation" },
                    { value: "education", label: "Education about nutrition" },
                    { value: "meal-planning", label: "Meal planning guidance" },
                    { value: "recipes", label: "Recipe ideas" },
                    { value: "community", label: "Community support" },
                    { value: "1-on-1", label: "1:1 guidance" }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-charcoal"
                    >
                      <input
                        type="checkbox"
                        name="supportNeeded"
                        value={option.value}
                        checked={formData.supportNeeded.includes(option.value)}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-beige text-coral focus:ring-coral"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                How did you hear about us? (optional)
                <select
                  name="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">Select</option>
                  <option value="instagram">Instagram</option>
                  <option value="referral">Friend/family referral</option>
                  <option value="google">Google search</option>
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">TikTok</option>
                  <option value="other-social">Other social media</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
          </section>

          {/* Section 10: Commitment */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              10. Commitment
            </h2>
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                Ready to commit for at least 2 months? *
                <select
                  name="readyToCommit"
                  required
                  value={formData.readyToCommit}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">Select</option>
                  <option value="yes-absolutely">Yes, absolutely</option>
                  <option value="yes-concerns">Yes, but I have concerns</option>
                  <option value="not-sure">Not sure yet</option>
                  <option value="no">No</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                If you have concerns, what are they? (optional)
                <textarea
                  name="concerns"
                  rows={3}
                  value={formData.concerns}
                  onChange={handleChange}
                  placeholder="Share any worries or questions"
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
            </div>
          </section>

          {status === "error" && (
            <p className="text-sm text-coral">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-darkgreen px-8 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-coral disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Submitting..." : "Submit Intake Form"}
          </button>
        </form>
      </div>
    </div>
  );
}
