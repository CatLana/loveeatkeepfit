/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * @param {number} weight - in kg
 * @param {number} height - in cm
 * @param {number} age - in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories
 */
export function calculateBMR(weight, height, age, gender) {
  const baseCalc = 10 * weight + 6.25 * height - 5 * age;

  if (gender.toLowerCase() === 'male') {
    return baseCalc + 5;
  } else {
    return baseCalc - 161;
  }
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - activity level
 * @returns {number} TDEE in calories
 */
export function calculateTDEE(bmr, activityLevel) {
  const activityMultipliers = {
    sedentary: 1.2,
    'lightly-active': 1.375,
    'moderately-active': 1.55,
    'very-active': 1.725,
    'extremely-active': 1.9
  };

  return Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));
}

/**
 * Calculate daily calorie target based on goal
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {string} goal - primary goal
 * @returns {number} target calories
 */
export function calculateCalorieTarget(tdee, goal) {
  switch (goal.toLowerCase()) {
    case 'lose-weight':
    case 'get-lean':
      // 15-20% deficit for fat loss
      return Math.round(tdee * 0.85);

    case 'build-muscle':
      // 10% surplus for muscle gain
      return Math.round(tdee * 1.1);

    case 'maintain-weight':
    case 'improve-energy':
    case 'learn-habits':
    default:
      // Maintenance
      return Math.round(tdee);
  }
}

/**
 * Calculate macros based on goal and calorie target
 * @param {number} calories - daily calorie target
 * @param {number} weight - body weight in kg
 * @param {string} goal - primary goal
 * @returns {object} macros in grams
 */
export function calculateMacros(calories, weight, goal) {
  let proteinGrams, fatGrams, carbGrams;

  // Protein: 1.6-2.2g per kg body weight depending on goal
  if (goal === 'lose-weight' || goal === 'get-lean') {
    proteinGrams = Math.round(weight * 2.0); // Higher protein for fat loss
  } else if (goal === 'build-muscle') {
    proteinGrams = Math.round(weight * 2.2); // Highest protein for muscle gain
  } else {
    proteinGrams = Math.round(weight * 1.6); // Moderate protein for maintenance
  }

  // Fat: 25-30% of calories
  const fatPercentage = 0.25;
  fatGrams = Math.round((calories * fatPercentage) / 9);

  // Carbs: remaining calories
  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;
  const remainingCalories = calories - proteinCalories - fatCalories;
  carbGrams = Math.round(remainingCalories / 4);

  return {
    protein: proteinGrams,
    carbs: carbGrams,
    fats: fatGrams
  };
}

/**
 * Full macro calculation
 * @param {object} data - form data
 * @returns {object} complete calculation results
 */
export function calculateFullMacros(data) {
  const { weight, height, age, gender, activityLevel, goal } = data;

  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const calories = calculateCalorieTarget(tdee, goal);
  const macros = calculateMacros(calories, weight, goal);

  return {
    bmr: Math.round(bmr),
    tdee,
    calories,
    macros
  };
}
