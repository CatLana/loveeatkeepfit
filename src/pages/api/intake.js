import { Resend } from 'resend';
import { calculateFullMacros } from '../../utils/macroCalculator';
import { escapeHtml } from '@/lib/htmlEscape';
import { rateLimit } from '@/lib/rateLimit';
import { validateOrigin, validateLengths } from '@/lib/validateRequest';

const resend = new Resend(process.env.RESEND_API_KEY);
const recipient = process.env.CONTACT_RECIPIENT || 'loveeatkeepfitblog@gmail.com';
const sender = process.env.CONTACT_SENDER || 'LoveEatKeepFit <no-reply@loveeatkeepfit.ie>';

function convertToKg(weight, unit) {
  return unit === 'lbs' ? weight * 0.453592 : weight;
}

function convertToCm(height, unit) {
  return unit === 'inches' ? height * 2.54 : height;
}

function formatArray(arr) {
  if (!arr || !Array.isArray(arr)) return '-';
  return arr.map(v => escapeHtml(String(v))).join(', ') || '-';
}

function sf(value) {
  return value ? escapeHtml(String(value)) : '-';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!validateOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { limited } = await rateLimit(req, res, { requests: 10, window: '15 m' });
  if (limited) return;

  const formData = req.body || {};

  const { name, email, age, gender, weight, weightUnit, height, heightUnit, activityLevel, primaryGoal } = formData;

  if (!name || !email || !age || !gender || !weight || !height || !activityLevel || !primaryGoal) {
    return res.status(400).json({ message: 'Missing required fields for calculation' });
  }

  const lengthError = validateLengths(
    { name, email },
    { name: 100, email: 254 }
  );
  if (lengthError) return res.status(400).json({ message: lengthError });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Server-side age gate — Irish GDPR minimum age is 16
  const parsedAge = parseInt(age, 10);
  if (isNaN(parsedAge) || parsedAge < 16 || parsedAge > 120) {
    return res.status(400).json({ message: 'You must be at least 16 years old to use this service' });
  }

  const weightKg = convertToKg(parseFloat(weight), weightUnit);
  const heightCm = convertToCm(parseFloat(height), heightUnit);

  const calculations = calculateFullMacros({
    weight: weightKg,
    height: heightCm,
    age: parsedAge,
    gender,
    activityLevel,
    goal: primaryGoal,
  });

  // Build comprehensive email — all user values escaped via sf() / formatArray()
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2d5a3d; border-bottom: 3px solid #e89f8e; padding-bottom: 10px;">New Client Intake Form</h1>

      <div style="background: #fff8f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #e89f8e; margin-top: 0;">Calculated Macros</h2>
        <p style="margin: 5px 0;"><strong>Daily Calories:</strong> ${calculations.calories} cal</p>
        <p style="margin: 5px 0;"><strong>Protein:</strong> ${calculations.macros.protein}g</p>
        <p style="margin: 5px 0;"><strong>Carbs:</strong> ${calculations.macros.carbs}g</p>
        <p style="margin: 5px 0;"><strong>Fats:</strong> ${calculations.macros.fats}g</p>
        <p style="margin: 5px 0; color: #666;"><em>BMR: ${calculations.bmr} cal | TDEE: ${calculations.tdee} cal</em></p>
      </div>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">1. Basic Information</h2>
      <p><strong>Name:</strong> ${sf(name)}</p>
      <p><strong>Email:</strong> ${sf(email)}</p>
      <p><strong>Phone:</strong> ${sf(formData.phone)}</p>
      <p><strong>Age:</strong> ${parsedAge}</p>
      <p><strong>Gender:</strong> ${sf(gender)}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">2. Physical Measurements</h2>
      <p><strong>Current Weight:</strong> ${sf(weight)} ${sf(weightUnit)} (${weightKg.toFixed(1)} kg)</p>
      <p><strong>Height:</strong> ${sf(height)} ${sf(heightUnit)} (${heightCm.toFixed(1)} cm)</p>
      <p><strong>Goal Weight:</strong> ${sf(formData.goalWeight)}</p>
      <p><strong>Body Type:</strong> ${sf(formData.bodyType)}</p>
      <p><strong>Lean Muscle Mass:</strong> ${sf(formData.leanMuscleMass)}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">3. Activity Level</h2>
      <p><strong>Activity Level:</strong> ${sf(activityLevel)}</p>
      <p><strong>Exercise Routine:</strong> ${formatArray(formData.exerciseRoutine)}</p>
      <p><strong>Exercise Days/Week:</strong> ${sf(formData.exerciseDays)}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">4. Goals &amp; Timeline</h2>
      <p><strong>Primary Goal:</strong> ${sf(primaryGoal)}</p>
      <p><strong>Weight to Lose:</strong> ${sf(formData.weightToLose)}</p>
      <p><strong>Timeline:</strong> ${sf(formData.timeline)}</p>
      <p><strong>Tried Before:</strong> ${sf(formData.triedBefore)}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">5. Eating Habits &amp; Preferences</h2>
      <p><strong>Dietary Preference:</strong> ${formatArray(formData.dietaryPreference)}</p>
      <p><strong>Allergies:</strong> ${sf(formData.allergies)}</p>
      <p><strong>Disliked Foods:</strong> ${sf(formData.dislikedFoods)}</p>
      <p><strong>Meals Per Day:</strong> ${sf(formData.mealsPerDay)}</p>
      <p><strong>Meal Prep:</strong> ${sf(formData.mealPrep)}</p>
      <p><strong>Cooking Time:</strong> ${sf(formData.cookingTime)}</p>
      <p><strong>Eating Out:</strong> ${sf(formData.eatingOut)}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">6. Current Challenges</h2>
      <p><strong>Biggest Struggles:</strong> ${formatArray(formData.biggestStruggle)}</p>
      <p><strong>Tracked Before:</strong> ${sf(formData.trackedBefore)}</p>
      <p><strong>Tracking App:</strong> ${sf(formData.trackingApp)}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">7. Lifestyle Factors</h2>
      <p><strong>Sleep Quality:</strong> ${sf(formData.sleepQuality)}</p>
      <p><strong>Stress Level:</strong> ${sf(formData.stressLevel)}</p>
      <p><strong>Schedule Type:</strong> ${sf(formData.scheduleType)}</p>
      <p><strong>Cook For Others:</strong> ${sf(formData.cookForOthers)}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">8. Health &amp; Medical</h2>
      <p><strong>Medical Conditions:</strong> ${sf(formData.medicalConditions)}</p>
      <p><strong>Medications:</strong> ${sf(formData.medications)}</p>
      <p><strong>Pregnancy Status:</strong> ${sf(formData.pregnancyStatus)}</p>
      <p><strong>Doctor Cleared:</strong> ${sf(formData.doctorCleared)}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">9. Motivation &amp; Support</h2>
      <p><strong>Why Important:</strong></p>
      <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${sf(formData.whyImportant)}</p>
      <p><strong>Success Looks Like:</strong></p>
      <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${sf(formData.successLooks)}</p>
      <p><strong>Support Needed:</strong> ${formatArray(formData.supportNeeded)}</p>
      <p><strong>Heard About:</strong> ${sf(formData.hearAbout)}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">10. Commitment</h2>
      <p><strong>Ready to Commit:</strong> ${sf(formData.readyToCommit)}</p>
      <p><strong>Concerns:</strong> ${sf(formData.concerns)}</p>

      <div style="margin-top: 30px; padding: 15px; background: #fff8f3; border-left: 4px solid #e89f8e;">
        <p style="margin: 0; color: #666;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-IE', { timeZone: 'Europe/Dublin' })}</p>
      </div>
    </div>
  `;

  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: sender,
        to: recipient,
        replyTo: email,
        subject: `New Intake Form - ${sf(name)}`,
        html,
      });
    } catch (error) {
      console.error('[intake] Email send error:', error.message);
      return res.status(500).json({ message: 'Email failed to send' });
    }
  } else {
    console.log('[intake] RESEND_API_KEY not set — email skipped');
  }

  return res.status(200).json({ success: true, calculations });
}
