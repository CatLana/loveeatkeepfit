import { Resend } from "resend";
import { calculateFullMacros } from "../../utils/macroCalculator";

const resend = new Resend(process.env.RESEND_API_KEY);
const recipient = process.env.CONTACT_RECIPIENT || "loveeatkeepfitblog@gmail.com";
const sender =
  process.env.CONTACT_SENDER || "LoveEatKeepFit <no-reply@loveeatkeepfit.ie>";

// Convert weight to kg if needed
function convertToKg(weight, unit) {
  if (unit === "lbs") {
    return weight * 0.453592;
  }
  return weight;
}

// Convert height to cm if needed
function convertToCm(height, unit) {
  if (unit === "inches") {
    return height * 2.54;
  }
  return height;
}

// Format array data for email
function formatArray(arr) {
  return arr && arr.length > 0 ? arr.join(", ") : "-";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const formData = req.body || {};

  // Validate required fields for macro calculation
  const { name, email, age, gender, weight, weightUnit, height, heightUnit, activityLevel, primaryGoal } = formData;

  if (!name || !email || !age || !gender || !weight || !height || !activityLevel || !primaryGoal) {
    return res.status(400).json({ message: "Missing required fields for calculation" });
  }

  // Convert units and calculate macros
  const weightKg = convertToKg(parseFloat(weight), weightUnit);
  const heightCm = convertToCm(parseFloat(height), heightUnit);

  const calculations = calculateFullMacros({
    weight: weightKg,
    height: heightCm,
    age: parseInt(age),
    gender: gender,
    activityLevel: activityLevel,
    goal: primaryGoal
  });

  // Build comprehensive email
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2d5a3d; border-bottom: 3px solid #e89f8e; padding-bottom: 10px;">
        New Client Intake Form
      </h1>

      <div style="background: #fff8f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #e89f8e; margin-top: 0;">Calculated Macros</h2>
        <div style="display: grid; gap: 10px;">
          <p style="margin: 5px 0;"><strong>Daily Calories:</strong> ${calculations.calories} cal</p>
          <p style="margin: 5px 0;"><strong>Protein:</strong> ${calculations.macros.protein}g</p>
          <p style="margin: 5px 0;"><strong>Carbs:</strong> ${calculations.macros.carbs}g</p>
          <p style="margin: 5px 0;"><strong>Fats:</strong> ${calculations.macros.fats}g</p>
          <p style="margin: 5px 0; color: #666;"><em>BMR: ${calculations.bmr} cal | TDEE: ${calculations.tdee} cal</em></p>
        </div>
      </div>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
        1. Basic Information
      </h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${formData.phone || "-"}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Gender:</strong> ${gender}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
        2. Physical Measurements
      </h2>
      <p><strong>Current Weight:</strong> ${weight} ${weightUnit} (${weightKg.toFixed(1)} kg)</p>
      <p><strong>Height:</strong> ${height} ${heightUnit} (${heightCm.toFixed(1)} cm)</p>
      <p><strong>Goal Weight:</strong> ${formData.goalWeight || "-"}</p>
      <p><strong>Body Type:</strong> ${formData.bodyType || "-"}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
        3. Activity Level
      </h2>
      <p><strong>Activity Level:</strong> ${activityLevel}</p>
      <p><strong>Exercise Routine:</strong> ${formatArray(formData.exerciseRoutine)}</p>
      <p><strong>Exercise Days/Week:</strong> ${formData.exerciseDays || "-"}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
        4. Goals & Timeline
      </h2>
      <p><strong>Primary Goal:</strong> ${primaryGoal}</p>
      <p><strong>Weight to Lose:</strong> ${formData.weightToLose || "-"}</p>
      <p><strong>Timeline:</strong> ${formData.timeline || "-"}</p>
      <p><strong>Tried Before:</strong> ${formData.triedBefore || "-"}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
        5. Eating Habits & Preferences
      </h2>
      <p><strong>Dietary Preference:</strong> ${formatArray(formData.dietaryPreference)}</p>
      <p><strong>Allergies:</strong> ${formData.allergies || "-"}</p>
      <p><strong>Disliked Foods:</strong> ${formData.dislikedFoods || "-"}</p>
      <p><strong>Meals Per Day:</strong> ${formData.mealsPerDay || "-"}</p>
      <p><strong>Meal Prep:</strong> ${formData.mealPrep || "-"}</p>
      <p><strong>Cooking Time:</strong> ${formData.cookingTime || "-"}</p>
      <p><strong>Eating Out:</strong> ${formData.eatingOut || "-"}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
        6. Current Challenges
      </h2>
      <p><strong>Biggest Struggles:</strong> ${formatArray(formData.biggestStruggle)}</p>
      <p><strong>Tracked Before:</strong> ${formData.trackedBefore || "-"}</p>
      <p><strong>Tracking App:</strong> ${formData.trackingApp || "-"}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
        7. Lifestyle Factors
      </h2>
      <p><strong>Sleep Quality:</strong> ${formData.sleepQuality || "-"}</p>
      <p><strong>Stress Level:</strong> ${formData.stressLevel || "-"}</p>
      <p><strong>Schedule Type:</strong> ${formData.scheduleType || "-"}</p>
      <p><strong>Cook For Others:</strong> ${formData.cookForOthers || "-"}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
        8. Health & Medical
      </h2>
      <p><strong>Medical Conditions:</strong> ${formData.medicalConditions || "-"}</p>
      <p><strong>Medications:</strong> ${formData.medications || "-"}</p>
      <p><strong>Pregnancy Status:</strong> ${formData.pregnancyStatus || "-"}</p>
      <p><strong>Doctor Cleared:</strong> ${formData.doctorCleared || "-"}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
        9. Motivation & Support
      </h2>
      <p><strong>Why Important:</strong></p>
      <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${formData.whyImportant || "-"}</p>
      <p><strong>Success Looks Like:</strong></p>
      <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${formData.successLooks || "-"}</p>
      <p><strong>Support Needed:</strong> ${formatArray(formData.supportNeeded)}</p>
      <p><strong>Heard About:</strong> ${formData.hearAbout || "-"}</p>

      <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
        10. Commitment
      </h2>
      <p><strong>Ready to Commit:</strong> ${formData.readyToCommit || "-"}</p>
      <p><strong>Concerns:</strong> ${formData.concerns || "-"}</p>

      <div style="margin-top: 30px; padding: 15px; background: #fff8f3; border-left: 4px solid #e89f8e;">
        <p style="margin: 0; color: #666;">
          <strong>Submitted:</strong> ${new Date().toLocaleString('en-IE', { timeZone: 'Europe/Dublin' })}
        </p>
      </div>
    </div>
  `;

  // For local testing - comment out email sending if no API key
  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: sender,
        to: recipient,
        replyTo: email,
        subject: `New Intake Form - ${name}`,
        html
      });
    } catch (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ message: "Email failed to send" });
    }
  } else {
    console.log("📧 Intake form would be sent (no RESEND_API_KEY):");
    console.log("To:", recipient);
    console.log("From:", sender);
    console.log("Client:", name, email);
    console.log("Calculated Macros:", calculations);
  }

  return res.status(200).json({ success: true, calculations });
}
