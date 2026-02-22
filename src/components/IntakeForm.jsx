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
            {content.intake?.results?.title || "Your Personalized Results"}
          </h2>

          <div className="mt-6 space-y-6">
            <div className="rounded-2xl bg-warmwhite p-6">
              <h3 className="text-xl font-semibold text-darkgreen">
                {content.intake?.results?.dailyCalories || "Daily Calorie Target"}
              </h3>
              <p className="mt-2 text-4xl font-bold text-charcoal">
                {results.calories} <span className="text-xl">{content.intake?.results?.calories || "calories"}</span>
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-coral/10 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-coral">
                  {content.intake?.results?.protein || "Protein"}
                </h4>
                <p className="mt-2 text-3xl font-bold text-charcoal">
                  {results.macros.protein}g
                </p>
              </div>
              <div className="rounded-2xl bg-darkgreen/10 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-darkgreen">
                  {content.intake?.results?.carbs || "Carbs"}
                </h4>
                <p className="mt-2 text-3xl font-bold text-charcoal">
                  {results.macros.carbs}g
                </p>
              </div>
              <div className="rounded-2xl bg-beige p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
                  {content.intake?.results?.fats || "Fats"}
                </h4>
                <p className="mt-2 text-3xl font-bold text-charcoal">
                  {results.macros.fats}g
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-beige bg-warmwhite p-6">
              <h3 className="text-lg font-semibold text-charcoal">
                {content.intake?.results?.additionalMetrics || "Additional Metrics"}
              </h3>
              <div className="mt-4 space-y-2 text-sm text-charcoal/80">
                <p>
                  <strong>{content.intake?.results?.bmr || "BMR (Basal Metabolic Rate)"}:</strong> {results.bmr}{" "}
                  {content.intake?.results?.caloriesPerDay || "calories/day"}
                </p>
                <p>
                  <strong>{content.intake?.results?.tdee || "TDEE (Total Daily Energy Expenditure)"}:</strong>{" "}
                  {results.tdee} {content.intake?.results?.caloriesPerDay || "calories/day"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-coral bg-coral/5 p-6">
              <h3 className="text-lg font-semibold text-charcoal">
                {content.intake?.results?.whatsNext || "What's Next?"}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-charcoal/80">
                {content.intake?.results?.nextStepsMessage || "I've received your intake form and generated an approximate automatic calculation above. This is just a starting point - I'll review all your details personally and get back to you with my personalized recommendations within 24 hours via email. Check your inbox for next steps!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-16">
      <div className="rounded-3xl border border-beige bg-white p-4 sm:p-8 shadow-soft">
        <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal break-words">
          {content.intake?.title || "Client Intake Form"}
        </h1>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-charcoal/80 break-words">
          {content.intake?.description || "Fill out this comprehensive form so I can calculate your personalized daily calories and macros, and create a tailored coaching plan for you."}
        </p>

        <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
          {/* Section 1: Basic Information */}
          <section>
            <h2 className="mb-4 text-lg sm:text-xl font-semibold text-darkgreen break-words">
              {content.intake?.sections?.basicInfo?.title || "1. Basic Information"}
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal break-words">
                  {content.intake?.sections?.basicInfo?.fields?.name || "Your Name"} {content.intake?.required || "*"}
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal break-words">
                  {content.intake?.sections?.basicInfo?.fields?.email || "Email"} {content.intake?.required || "*"}
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
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal break-words">
                  {content.intake?.sections?.basicInfo?.fields?.phone || "Phone (optional)"}
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal break-words">
                  {content.intake?.sections?.basicInfo?.fields?.age || "Age"} {content.intake?.required || "*"}
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
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal break-words">
                  {content.intake?.sections?.basicInfo?.fields?.gender || "Gender"} {content.intake?.required || "*"}
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.sections?.basicInfo?.fields?.genderOptions?.[""] || "Select"}</option>
                    <option value="female">{content.intake?.sections?.basicInfo?.fields?.genderOptions?.female || "Female"}</option>
                    <option value="male">{content.intake?.sections?.basicInfo?.fields?.genderOptions?.male || "Male"}</option>
                    <option value="prefer-not-say">{content.intake?.sections?.basicInfo?.fields?.genderOptions?.["prefer-not-to-say"] || "Prefer not to say"}</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          {/* Section 2: Physical Measurements */}
          <section>
            <h2 className="mb-4 text-lg sm:text-xl font-semibold text-darkgreen break-words">
              {content.intake?.sections?.physicalMeasurements?.title || "2. Physical Measurements"}
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.physicalMeasurements?.fields?.weight || "Current Weight"} {content.intake?.required || "*"}
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="weight"
                      step="0.1"
                      required
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder={content.intake?.sections?.physicalMeasurements?.fields?.weightPlaceholder || "e.g., 75"}
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
                  {content.intake?.sections?.physicalMeasurements?.fields?.height || "Height"} {content.intake?.required || "*"}
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="height"
                      step="0.1"
                      required
                      value={formData.height}
                      onChange={handleChange}
                      placeholder={content.intake?.sections?.physicalMeasurements?.fields?.heightPlaceholder || "e.g., 170"}
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
                  {content.intake?.sections?.physicalMeasurements?.fields?.goalWeight || "Goal Weight (optional)"}
                  <input
                    type="number"
                    name="goalWeight"
                    step="0.1"
                    value={formData.goalWeight}
                    onChange={handleChange}
                    placeholder={content.intake?.sections?.physicalMeasurements?.fields?.goalWeightPlaceholder || "e.g., 65 kg or 143 lbs"}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.physicalMeasurements?.fields?.bodyType || "Body Type"} {content.intake?.required || "*"}
                  <select
                    name="bodyType"
                    required
                    value={formData.bodyType}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.sections?.physicalMeasurements?.fields?.bodyTypeOptions?.[""] || "Select"}</option>
                    <option value="ectomorph">{content.intake?.sections?.physicalMeasurements?.fields?.bodyTypeOptions?.ectomorph || "Ectomorph (naturally thin)"}</option>
                    <option value="mesomorph">{content.intake?.sections?.physicalMeasurements?.fields?.bodyTypeOptions?.mesomorph || "Mesomorph (athletic build)"}</option>
                    <option value="endomorph">{content.intake?.sections?.physicalMeasurements?.fields?.bodyTypeOptions?.endomorph || "Endomorph (gains weight easily)"}</option>
                    <option value="not-sure">{content.intake?.sections?.physicalMeasurements?.fields?.bodyTypeOptions?.["not-sure"] || "Not sure"}</option>
                  </select>
                </label>
              </div>
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-charcoal">
                  {content.intake?.sections?.physicalMeasurements?.fields?.leanMuscleMass || "Lean muscle mass (body scan data)"}
                </legend>
                <div className="space-y-2">
                  {[
                    { value: "under", label: content.intake?.sections?.physicalMeasurements?.fields?.leanMuscleMassOptions?.under || "Under average" },
                    { value: "normal", label: content.intake?.sections?.physicalMeasurements?.fields?.leanMuscleMassOptions?.normal || "Normal range" },
                    { value: "over", label: content.intake?.sections?.physicalMeasurements?.fields?.leanMuscleMassOptions?.over || "Above average" },
                    { value: "no-scan", label: content.intake?.sections?.physicalMeasurements?.fields?.leanMuscleMassOptions?.["no-scan"] || "I have not done body scan" }
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
            <h2 className="mb-4 text-lg sm:text-xl font-semibold text-darkgreen break-words">
              {content.intake?.sections?.activityLevel?.title || "3. Activity Level"}
            </h2>
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal break-words">
                {content.intake?.sections?.activityLevel?.fields?.activityLevel || "What best describes your typical day?"} {content.intake?.required || "*"}
                <select
                  name="activityLevel"
                  required
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">{content.intake?.sections?.activityLevel?.fields?.activityOptions?.[""] || "Select"}</option>
                  <option value="sedentary">
                    {content.intake?.sections?.activityLevel?.fields?.activityOptions?.sedentary || "Sedentary (desk job, little exercise)"}
                  </option>
                  <option value="lightly-active">
                    {content.intake?.sections?.activityLevel?.fields?.activityOptions?.["lightly-active"] || "Lightly active (light exercise 1-3 days/week)"}
                  </option>
                  <option value="moderately-active">
                    {content.intake?.sections?.activityLevel?.fields?.activityOptions?.["moderately-active"] || "Moderately active (moderate exercise 3-5 days/week)"}
                  </option>
                  <option value="very-active">
                    {content.intake?.sections?.activityLevel?.fields?.activityOptions?.["very-active"] || "Very active (intense exercise 6-7 days/week)"}
                  </option>
                  <option value="extremely-active">
                    {content.intake?.sections?.activityLevel?.fields?.activityOptions?.["extremely-active"] || "Extremely active (physical job + daily training)"}
                  </option>
                </select>
              </label>
              <div>
                <p className="mb-2 text-sm font-medium text-charcoal break-words">
                  {content.intake?.sections?.activityLevel?.fields?.exerciseRoutine || "Current Exercise Routine"} {content.intake?.required || "*"} ({content.intake?.common?.selectAllThatApply || "select all that apply"})
                </p>
                <div className="space-y-2">
                  {[
                    { value: "strength", label: content.intake?.sections?.activityLevel?.fields?.exerciseOptions?.strength || "Strength training / weight lifting" },
                    { value: "cardio", label: content.intake?.sections?.activityLevel?.fields?.exerciseOptions?.cardio || "Cardio (running, cycling, swimming)" },
                    { value: "yoga", label: content.intake?.sections?.activityLevel?.fields?.exerciseOptions?.yoga || "Yoga or Pilates" },
                    { value: "walking", label: content.intake?.sections?.activityLevel?.fields?.exerciseOptions?.walking || "Walking or light movement" },
                    { value: "sports", label: content.intake?.sections?.activityLevel?.fields?.exerciseOptions?.sports || "Sports/recreational activities" }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-charcoal break-words"
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
                {content.intake?.sections?.activityLevel?.fields?.exerciseDays || "How many days per week do you exercise?"} {content.intake?.required || "*"}
                <select
                  name="exerciseDays"
                  required
                  value={formData.exerciseDays}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">{content.intake?.sections?.activityLevel?.fields?.exerciseDaysOptions?.[""] || "Select"}</option>
                  <option value="0">{content.intake?.sections?.activityLevel?.fields?.exerciseDaysOptions?.["0"] || "0 days"}</option>
                  <option value="1">{content.intake?.sections?.activityLevel?.fields?.exerciseDaysOptions?.["1"] || "1 day"}</option>
                  <option value="2">{content.intake?.sections?.activityLevel?.fields?.exerciseDaysOptions?.["2"] || "2 days"}</option>
                  <option value="3">{content.intake?.sections?.activityLevel?.fields?.exerciseDaysOptions?.["3"] || "3 days"}</option>
                  <option value="4">{content.intake?.sections?.activityLevel?.fields?.exerciseDaysOptions?.["4"] || "4 days"}</option>
                  <option value="5">{content.intake?.sections?.activityLevel?.fields?.exerciseDaysOptions?.["5"] || "5 days"}</option>
                  <option value="6">{content.intake?.sections?.activityLevel?.fields?.exerciseDaysOptions?.["6"] || "6 days"}</option>
                  <option value="7">{content.intake?.sections?.activityLevel?.fields?.exerciseDaysOptions?.["7"] || "7 days"}</option>
                </select>
              </label>
            </div>
          </section>

          {/* Section 4: Goals & Timeline */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              {content.intake?.sections?.goals?.title || "4. Goals"}
            </h2>
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.intake?.sections?.goals?.fields?.primaryGoal || "What's your primary goal?"} {content.intake?.required || "*"}
                <select
                  name="primaryGoal"
                  required
                  value={formData.primaryGoal}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">{content.intake?.sections?.goals?.fields?.primaryGoalOptions?.[""] || "Select"}</option>
                  <option value="lose-fat">{content.intake?.sections?.goals?.fields?.primaryGoalOptions?.["lose-fat"] || "Lose fat/weight"}</option>
                  <option value="build-muscle">{content.intake?.sections?.goals?.fields?.primaryGoalOptions?.["build-muscle"] || "Build muscle"}</option>
                  <option value="maintain-weight">{content.intake?.sections?.goals?.fields?.primaryGoalOptions?.["maintain-weight"] || "Maintain current weight"}</option>
                  <option value="improve-health">{content.intake?.sections?.goals?.fields?.primaryGoalOptions?.["improve-health"] || "Improve overall health"}</option>
                  <option value="increase-energy">{content.intake?.sections?.goals?.fields?.primaryGoalOptions?.["increase-energy"] || "Increase energy levels"}</option>
                  <option value="learn-cooking">{content.intake?.sections?.goals?.fields?.primaryGoalOptions?.["learn-cooking"] || "Learn healthy cooking habits"}</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.intake?.sections?.goals?.fields?.weightToLose || "How much weight do you want to lose? (optional)"}
                <input
                  type="text"
                  name="weightToLose"
                  value={formData.weightToLose}
                  onChange={handleChange}
                  placeholder={content.intake?.sections?.goals?.fields?.weightToLosePlaceholder || "e.g., 5-10 kg or 10-20 lbs"}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.intake?.sections?.goals?.fields?.timeline || "What's your realistic timeline for reaching your goal?"} {content.intake?.required || "*"}
                <select
                  name="timeline"
                  required
                  value={formData.timeline}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">{content.intake?.sections?.goals?.fields?.timelineOptions?.[""] || "Select"}</option>
                  <option value="1-3-months">{content.intake?.sections?.goals?.fields?.timelineOptions?.["1-3-months"] || "1-3 months"}</option>
                  <option value="3-6-months">{content.intake?.sections?.goals?.fields?.timelineOptions?.["3-6-months"] || "3-6 months"}</option>
                  <option value="6-12-months">{content.intake?.sections?.goals?.fields?.timelineOptions?.["6-12-months"] || "6-12 months"}</option>
                  <option value="1-year-plus">{content.intake?.sections?.goals?.fields?.timelineOptions?.["1-year-plus"] || "More than 1 year"}</option>
                  <option value="no-rush">{content.intake?.sections?.goals?.fields?.timelineOptions?.["no-rush"] || "No specific timeline"}</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.intake?.sections?.goals?.fields?.triedBefore || "Have you tried losing weight/getting fit before? What happened?"}
                <select
                  name="triedBefore"
                  value={formData.triedBefore}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">{content.intake?.sections?.goals?.fields?.primaryGoalOptions?.[""] || "Select"}</option>
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
              {content.intake?.sections?.eatingHabits?.title || "5. Eating Habits & Preferences"}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.eatingHabits?.fields?.dietaryPreference || "Do you follow any specific diet or have dietary restrictions?"} {content.intake?.required || "*"} ({content.intake?.common?.selectAllThatApply || "select all that apply"})
                </p>
                <div className="space-y-2">
                  {[
                    { value: "omnivore", label: content.intake?.sections?.eatingHabits?.fields?.dietaryOptions?.omnivore || "Omnivore (eat everything)" },
                    { value: "vegetarian", label: content.intake?.sections?.eatingHabits?.fields?.dietaryOptions?.vegetarian || "Vegetarian (no meat)" },
                    { value: "vegan", label: content.intake?.sections?.eatingHabits?.fields?.dietaryOptions?.vegan || "Vegan (no animal products)" },
                    { value: "pescatarian", label: content.intake?.sections?.eatingHabits?.fields?.dietaryOptions?.pescatarian || "Pescatarian (fish but no meat)" },
                    { value: "keto", label: content.intake?.sections?.eatingHabits?.fields?.dietaryOptions?.keto || "Keto/Low-carb" },
                    { value: "paleo", label: content.intake?.sections?.eatingHabits?.fields?.dietaryOptions?.paleo || "Paleo" },
                    { value: "mediterranean", label: content.intake?.sections?.eatingHabits?.fields?.dietaryOptions?.mediterranean || "Mediterranean" },
                    { value: "intermittent-fasting", label: content.intake?.sections?.eatingHabits?.fields?.dietaryOptions?.["intermittent-fasting"] || "Intermittent fasting" },
                    { value: "other", label: content.intake?.sections?.eatingHabits?.fields?.dietaryOptions?.other || "Other dietary restrictions" }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-charcoal break-words"
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
                {content.intake?.sections?.eatingHabits?.fields?.allergies || "Food allergies or intolerances (optional)"}
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder={content.intake?.sections?.eatingHabits?.fields?.allergiesPlaceholder || "e.g., gluten, dairy, nuts"}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.intake?.sections?.eatingHabits?.fields?.dislikedFoods || "Foods you dislike or won't eat (optional)"}
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
                  {content.intake?.sections?.eatingHabits?.fields?.mealsPerDay || "How many meals do you typically eat per day?"} {content.intake?.required || "*"}
                  <select
                    name="mealsPerDay"
                    required
                    value={formData.mealsPerDay}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.sections?.eatingHabits?.fields?.mealsOptions?.[""] || "Select"}</option>
                    <option value="1">{content.intake?.sections?.eatingHabits?.fields?.mealsOptions?.["1"] || "1 meal"}</option>
                    <option value="2">{content.intake?.sections?.eatingHabits?.fields?.mealsOptions?.["2"] || "2 meals"}</option>
                    <option value="3">{content.intake?.sections?.eatingHabits?.fields?.mealsOptions?.["3"] || "3 meals"}</option>
                    <option value="4">{content.intake?.sections?.eatingHabits?.fields?.mealsOptions?.["4"] || "4 meals"}</option>
                    <option value="5">{content.intake?.sections?.eatingHabits?.fields?.mealsOptions?.["5"] || "5+ meals"}</option>
                    <option value="varies">{content.intake?.sections?.eatingHabits?.fields?.mealsOptions?.varies || "It varies"}</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.eatingHabits?.fields?.mealPrep || "Do you meal prep or prefer cooking fresh daily?"} {content.intake?.required || "*"}
                  <select
                    name="mealPrep"
                    required
                    value={formData.mealPrep}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.sections?.eatingHabits?.fields?.mealPrepOptions?.[""] || "Select"}</option>
                    <option value="meal-prep">{content.intake?.sections?.eatingHabits?.fields?.mealPrepOptions?.["meal-prep"] || "I meal prep for the week"}</option>
                    <option value="daily-cooking">{content.intake?.sections?.eatingHabits?.fields?.mealPrepOptions?.["daily-cooking"] || "I cook fresh meals daily"}</option>
                    <option value="mix">{content.intake?.sections?.eatingHabits?.fields?.mealPrepOptions?.mix || "Mix of both"}</option>
                    <option value="minimal-cooking">{content.intake?.sections?.eatingHabits?.fields?.mealPrepOptions?.["minimal-cooking"] || "I do minimal cooking"}</option>
                    <option value="takeout-mostly">{content.intake?.sections?.eatingHabits?.fields?.mealPrepOptions?.["takeout-mostly"] || "I rely mostly on takeout/prepared foods"}</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.eatingHabits?.fields?.cookingTime || "How much time can you realistically spend cooking per day?"} {content.intake?.required || "*"}
                  <select
                    name="cookingTime"
                    required
                    value={formData.cookingTime}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.sections?.eatingHabits?.fields?.cookingTimeOptions?.[""] || "Select"}</option>
                    <option value="15-min">{content.intake?.sections?.eatingHabits?.fields?.cookingTimeOptions?.["15-min"] || "15 minutes or less"}</option>
                    <option value="15-30-min">{content.intake?.sections?.eatingHabits?.fields?.cookingTimeOptions?.["15-30-min"] || "15-30 minutes"}</option>
                    <option value="30-60-min">{content.intake?.sections?.eatingHabits?.fields?.cookingTimeOptions?.["30-60-min"] || "30-60 minutes"}</option>
                    <option value="60-plus-min">{content.intake?.sections?.eatingHabits?.fields?.cookingTimeOptions?.["60-plus-min"] || "More than 1 hour"}</option>
                    <option value="varies">{content.intake?.sections?.eatingHabits?.fields?.cookingTimeOptions?.varies || "It varies by day"}</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.eatingHabits?.fields?.eatingOut || "How often do you eat out or order takeout?"} {content.intake?.required || "*"}
                  <select
                    name="eatingOut"
                    required
                    value={formData.eatingOut}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.sections?.eatingHabits?.fields?.eatingOutOptions?.[""] || "Select"}</option>
                    <option value="daily">{content.intake?.sections?.eatingHabits?.fields?.eatingOutOptions?.daily || "Daily"}</option>
                    <option value="few-times-week">{content.intake?.sections?.eatingHabits?.fields?.eatingOutOptions?.["few-times-week"] || "A few times a week"}</option>
                    <option value="once-week">{content.intake?.sections?.eatingHabits?.fields?.eatingOutOptions?.["once-week"] || "Once a week"}</option>
                    <option value="few-times-month">{content.intake?.sections?.eatingHabits?.fields?.eatingOutOptions?.["few-times-month"] || "A few times a month"}</option>
                    <option value="rarely">{content.intake?.sections?.eatingHabits?.fields?.eatingOutOptions?.rarely || "Rarely"}</option>
                    <option value="never">{content.intake?.sections?.eatingHabits?.fields?.eatingOutOptions?.never || "Never"}</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          {/* Section 6: Challenges */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              {content.intake?.sections?.challenges?.title || "6. Challenges & Habits"}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.challenges?.fields?.biggestStruggle || "What's your biggest struggle with eating healthy?"} {content.intake?.required || "*"} ({content.intake?.common?.selectAllThatApply || "select all that apply"})
                </p>
                <div className="space-y-2">
                  {[
                    { value: "time", label: content.intake?.sections?.challenges?.fields?.challengeOptions?.time || "Not enough time to cook" },
                    { value: "planning", label: content.intake?.sections?.challenges?.fields?.challengeOptions?.planning || "Poor planning/meal prep" },
                    { value: "cravings", label: content.intake?.sections?.challenges?.fields?.challengeOptions?.cravings || "Cravings for unhealthy foods" },
                    { value: "emotional-eating", label: content.intake?.sections?.challenges?.fields?.challengeOptions?.["emotional-eating"] || "Emotional eating" },
                    { value: "portion-control", label: content.intake?.sections?.challenges?.fields?.challengeOptions?.["portion-control"] || "Portion control" },
                    { value: "knowledge", label: content.intake?.sections?.challenges?.fields?.challengeOptions?.knowledge || "Lack of nutrition knowledge" },
                    { value: "motivation", label: content.intake?.sections?.challenges?.fields?.challengeOptions?.motivation || "Lack of motivation/consistency" },
                    { value: "budget", label: content.intake?.sections?.challenges?.fields?.challengeOptions?.budget || "Budget constraints" },
                    { value: "family", label: content.intake?.sections?.challenges?.fields?.challengeOptions?.family || "Family/household preferences" },
                    { value: "eating-out", label: content.intake?.sections?.challenges?.fields?.challengeOptions?.["eating-out"] || "Social eating/dining out" }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-charcoal break-words"
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
                {content.intake?.sections?.challenges?.fields?.trackedBefore || "Have you tracked your food/calories before?"} {content.intake?.required || "*"}
                <select
                  name="trackedBefore"
                  required
                  value={formData.trackedBefore}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">{content.intake?.sections?.challenges?.fields?.trackedBeforeOptions?.[""] || "Select"}</option>
                  <option value="never">{content.intake?.sections?.challenges?.fields?.trackedBeforeOptions?.never || "Never tracked before"}</option>
                  <option value="tried-gave-up">{content.intake?.sections?.challenges?.fields?.trackedBeforeOptions?.["tried-gave-up"] || "Tried but gave up"}</option>
                  <option value="on-off">{content.intake?.sections?.challenges?.fields?.trackedBeforeOptions?.["on-off"] || "On and off tracking"}</option>
                  <option value="regularly">{content.intake?.sections?.challenges?.fields?.trackedBeforeOptions?.regularly || "Yes, I track regularly"}</option>
                  <option value="used-to">{content.intake?.sections?.challenges?.fields?.trackedBeforeOptions?.["used-to"] || "Used to track consistently"}</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.intake?.sections?.challenges?.fields?.trackingApp || "If you've tracked before, which app did you use? (optional)"}
                <input
                  type="text"
                  name="trackingApp"
                  value={formData.trackingApp}
                  onChange={handleChange}
                  placeholder={content.intake?.sections?.challenges?.fields?.trackingAppPlaceholder || "e.g., MyFitnessPal, Cronometer, Lose It"}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
            </div>
          </section>

          {/* Section 7: Lifestyle */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              {content.intake?.sections?.lifestyle?.title || "7. Lifestyle & Context"}
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.lifestyle?.fields?.sleepQuality || "How would you rate your sleep quality?"} {content.intake?.required || "*"}
                  <select
                    name="sleepQuality"
                    required
                    value={formData.sleepQuality}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.sections?.lifestyle?.fields?.sleepOptions?.[""] || "Select"}</option>
                    <option value="excellent">{content.intake?.sections?.lifestyle?.fields?.sleepOptions?.excellent || "Excellent (7-9 hrs, wake refreshed)"}</option>
                    <option value="good">{content.intake?.sections?.lifestyle?.fields?.sleepOptions?.good || "Good (decent sleep most nights)"}</option>
                    <option value="fair">{content.intake?.sections?.lifestyle?.fields?.sleepOptions?.fair || "Fair (some good nights, some bad)"}</option>
                    <option value="poor">{content.intake?.sections?.lifestyle?.fields?.sleepOptions?.poor || "Poor (often tired/unrested)"}</option>
                    <option value="very-poor">{content.intake?.sections?.lifestyle?.fields?.sleepOptions?.["very-poor"] || "Very poor (chronic sleep issues)"}</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.lifestyle?.fields?.stressLevel || "What's your typical stress level?"} {content.intake?.required || "*"}
                  <select
                    name="stressLevel"
                    required
                    value={formData.stressLevel}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.sections?.lifestyle?.fields?.stressOptions?.[""] || "Select"}</option>
                    <option value="very-low">{content.intake?.sections?.lifestyle?.fields?.stressOptions?.["very-low"] || "Very low"}</option>
                    <option value="low">{content.intake?.sections?.lifestyle?.fields?.stressOptions?.low || "Low"}</option>
                    <option value="moderate">{content.intake?.sections?.lifestyle?.fields?.stressOptions?.moderate || "Moderate"}</option>
                    <option value="high">{content.intake?.sections?.lifestyle?.fields?.stressOptions?.high || "High"}</option>
                    <option value="very-high">{content.intake?.sections?.lifestyle?.fields?.stressOptions?.["very-high"] || "Very high"}</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.lifestyle?.fields?.scheduleType || "Which best describes your daily schedule?"} {content.intake?.required || "*"}
                  <select
                    name="scheduleType"
                    required
                    value={formData.scheduleType}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.sections?.lifestyle?.fields?.scheduleOptions?.[""] || "Select"}</option>
                    <option value="consistent">{content.intake?.sections?.lifestyle?.fields?.scheduleOptions?.consistent || "Consistent routine (same schedule daily)"}</option>
                    <option value="somewhat-consistent">{content.intake?.sections?.lifestyle?.fields?.scheduleOptions?.["somewhat-consistent"] || "Somewhat consistent (mostly predictable)"}</option>
                    <option value="variable">{content.intake?.sections?.lifestyle?.fields?.scheduleOptions?.variable || "Variable (changes week to week)"}</option>
                    <option value="unpredictable">{content.intake?.sections?.lifestyle?.fields?.scheduleOptions?.unpredictable || "Unpredictable (shift work, travel, etc.)"}</option>
                    <option value="chaotic">{content.intake?.sections?.lifestyle?.fields?.scheduleOptions?.chaotic || "Chaotic (no real routine)"}</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.lifestyle?.fields?.cookForOthers || "Are you cooking for other people? (family, roommates, etc.)"} {content.intake?.required || "*"}
                  <select
                    name="cookForOthers"
                    required
                    value={formData.cookForOthers}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.sections?.lifestyle?.fields?.cookForOthersOptions?.[""] || "Select"}</option>
                    <option value="just-me">{content.intake?.sections?.lifestyle?.fields?.cookForOthersOptions?.["just-me"] || "Just for myself"}</option>
                    <option value="partner">{content.intake?.sections?.lifestyle?.fields?.cookForOthersOptions?.partner || "Partner/spouse"}</option>
                    <option value="family-kids">{content.intake?.sections?.lifestyle?.fields?.cookForOthersOptions?.["family-kids"] || "Family with children"}</option>
                    <option value="roommates">{content.intake?.sections?.lifestyle?.fields?.cookForOthersOptions?.roommates || "Roommates"}</option>
                    <option value="varies">{content.intake?.sections?.lifestyle?.fields?.cookForOthersOptions?.varies || "It varies"}</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          {/* Section 8: Health & Medical */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              {content.intake?.sections?.health?.title || "8. Health & Medical"}
            </h2>
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.intake?.sections?.health?.fields?.medicalConditions || "Any medical conditions? (optional)"}
                <input
                  type="text"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  placeholder={content.intake?.sections?.health?.placeholders?.medicalConditions || "e.g., PCOS, thyroid issues, diabetes"}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.intake?.sections?.health?.fields?.medications || "Current medications? (optional)"}
                <input
                  type="text"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  placeholder={content.intake?.sections?.health?.placeholders?.medications || "List any relevant medications"}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.health?.fields?.pregnancyStatus || "Pregnancy Status *"}
                  <select
                    name="pregnancyStatus"
                    required
                    value={formData.pregnancyStatus}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.common?.select || "Select"}</option>
                    <option value="no">{content.intake?.sections?.health?.options?.pregnancyStatus?.no || "No"}</option>
                    <option value="pregnant">{content.intake?.sections?.health?.options?.pregnancyStatus?.pregnant || "Pregnant"}</option>
                    <option value="breastfeeding">{content.intake?.sections?.health?.options?.pregnancyStatus?.breastfeeding || "Breastfeeding"}</option>
                    <option value="planning">{content.intake?.sections?.health?.options?.pregnancyStatus?.planning || "Planning pregnancy"}</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal break-words">
                  {content.intake?.sections?.health?.fields?.doctorCleared || "Doctor cleared for diet changes? *"}
                  <select
                    name="doctorCleared"
                    required
                    value={formData.doctorCleared}
                    onChange={handleChange}
                    className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                  >
                    <option value="">{content.intake?.common?.select || "Select"}</option>
                    <option value="yes">{content.intake?.common?.yes || "Yes"}</option>
                    <option value="no">{content.intake?.common?.no || "No"}</option>
                    <option value="not-applicable">{content.intake?.sections?.health?.options?.doctorCleared?.notApplicable || "Not applicable/no issues"}</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          {/* Section 9: Motivation */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              {content.intake?.sections?.motivation?.title || "9. Motivation & Support"}
            </h2>
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal break-words">
                {content.intake?.sections?.motivation?.fields?.whyImportant || "Why is reaching this goal important to you right now? *"}
                <textarea
                  name="whyImportant"
                  rows={4}
                  required
                  value={formData.whyImportant}
                  onChange={handleChange}
                  placeholder={content.intake?.sections?.motivation?.placeholders?.whyImportant || "Share what's driving you to make this change"}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal break-words">
                {content.intake?.sections?.motivation?.fields?.successLooks || "What would success look like in 2-3 months? *"}
                <textarea
                  name="successLooks"
                  rows={4}
                  required
                  value={formData.successLooks}
                  onChange={handleChange}
                  placeholder={content.intake?.sections?.motivation?.placeholders?.successLooks || "Describe how you'd like to feel and what you'd like to achieve"}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
              <div>
                <p className="mb-2 text-sm font-medium text-charcoal">
                  {content.intake?.sections?.motivation?.fields?.supportNeeded || "Support needed"} {content.intake?.required || "*"} ({content.intake?.common?.selectAllThatApply || "select all that apply"})
                </p>
                <div className="space-y-2">
                  {[
                    { value: "accountability", label: content.intake?.sections?.motivation?.options?.supportNeeded?.accountability || "Accountability" },
                    { value: "motivation", label: content.intake?.sections?.motivation?.options?.supportNeeded?.motivation || "Motivation" },
                    { value: "education", label: content.intake?.sections?.motivation?.options?.supportNeeded?.education || "Education about nutrition" },
                    { value: "meal-planning", label: content.intake?.sections?.motivation?.options?.supportNeeded?.mealPlanning || "Meal planning guidance" },
                    { value: "recipes", label: content.intake?.sections?.motivation?.options?.supportNeeded?.recipes || "Recipe ideas" },
                    { value: "community", label: content.intake?.sections?.motivation?.options?.supportNeeded?.community || "Community support" },
                    { value: "1-on-1", label: content.intake?.sections?.motivation?.options?.supportNeeded?.oneOnOne || "1:1 guidance" }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-charcoal break-words"
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
                {content.intake?.sections?.motivation?.fields?.hearAbout || "How did you hear about us? (optional)"}
                <select
                  name="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">{content.intake?.common?.select || "Select"}</option>
                  <option value="instagram">{content.intake?.sections?.motivation?.options?.hearAbout?.instagram || "Instagram"}</option>
                  <option value="referral">{content.intake?.sections?.motivation?.options?.hearAbout?.referral || "Friend/family referral"}</option>
                  <option value="google">{content.intake?.sections?.motivation?.options?.hearAbout?.google || "Google search"}</option>
                  <option value="facebook">{content.intake?.sections?.motivation?.options?.hearAbout?.facebook || "Facebook"}</option>
                  <option value="tiktok">{content.intake?.sections?.motivation?.options?.hearAbout?.tiktok || "TikTok"}</option>
                  <option value="other-social">{content.intake?.sections?.motivation?.options?.hearAbout?.otherSocial || "Other social media"}</option>
                  <option value="other">{content.intake?.sections?.motivation?.options?.hearAbout?.other || "Other"}</option>
                </select>
              </label>
            </div>
          </section>

          {/* Section 10: Commitment */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-darkgreen">
              {content.intake?.sections?.commitment?.title || "10. Commitment"}
            </h2>
            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.intake?.sections?.commitment?.fields?.readyToCommit || "Ready to commit for at least 2 months? *"}
                <select
                  name="readyToCommit"
                  required
                  value={formData.readyToCommit}
                  onChange={handleChange}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                >
                  <option value="">{content.intake?.common?.select || "Select"}</option>
                  <option value="yes-absolutely">{content.intake?.sections?.commitment?.options?.readyToCommit?.yesAbsolutely || "Yes, absolutely"}</option>
                  <option value="yes-concerns">{content.intake?.sections?.commitment?.options?.readyToCommit?.yesConcerns || "Yes, but I have concerns"}</option>
                  <option value="not-sure">{content.intake?.sections?.commitment?.options?.readyToCommit?.notSure || "Not sure yet"}</option>
                  <option value="no">{content.intake?.common?.no || "No"}</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                {content.intake?.sections?.commitment?.fields?.concerns || "If you have concerns, what are they? (optional)"}
                <textarea
                  name="concerns"
                  rows={3}
                  value={formData.concerns}
                  onChange={handleChange}
                  placeholder={content.intake?.sections?.commitment?.placeholders?.concerns || "Share any worries or questions"}
                  className="rounded-xl border border-beige bg-warmwhite px-4 py-3 text-sm outline-none focus:border-coral"
                />
              </label>
            </div>
          </section>

          {status === "error" && (
            <p className="text-sm text-coral">{content.intake?.messages?.error || error}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-darkgreen px-8 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-coral disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? (content.intake?.submitting || "Submitting...") : (content.intake?.submitButton || "Submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
