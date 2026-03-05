import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const recipient = process.env.CONTACT_RECIPIENT || "loveeatkeepfitblog@gmail.com";
const sender = process.env.CONTACT_SENDER || "LoveEatKeepFit <no-reply@loveeatkeepfit.ie>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { lessonId, lessonTitle, userName, weekendDay, workingDay, photos, comments, submittedAt } = req.body;

  // Validate required fields
  if (!lessonId || !lessonTitle || !weekendDay || !workingDay) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Send email to coach
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <h1 style="color: #2d5a3d; border-bottom: 3px solid #e89f8e; padding-bottom: 10px;">
          New Homework Submission
        </h1>

        <div style="background: #fff8f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #e89f8e; margin-top: 0;">Lesson Details</h2>
          <p><strong>Lesson:</strong> Lesson ${lessonId} - ${lessonTitle}</p>
          <p><strong>Student:</strong> ${userName || 'Guest'}</p>
          <p><strong>Submitted:</strong> ${new Date(submittedAt).toLocaleString()}</p>
        </div>

        <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
          Weekend Day Food Diary
        </h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">
          ${weekendDay}
        </div>

        <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
          Working Day Food Diary
        </h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">
          ${workingDay}
        </div>

        ${photos ? `
        <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
          Photos / Screenshots
        </h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">
          ${photos}
        </div>
        ` : ''}

        ${comments ? `
        <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">
          Additional Comments
        </h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">
          ${comments}
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding: 15px; background: #e8f5e9; border-radius: 8px;">
          <p style="margin: 0; color: #2d5a3d;">
            <strong>Next Steps:</strong> Review the student's food diary and provide personalized feedback.
            You can reply directly to this email or use the coaching dashboard.
          </p>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        
        <p style="text-align: center; color: #666; font-size: 12px;">
          Love. Eat. Keep Fit. • Homework Submission System <br>
          © ${new Date().getFullYear()} LoveEatKeepFit
        </p>
      </div>
    `;

    // Send via Resend
    const data = await resend.emails.send({
      from: sender,
      to: recipient,
      subject: `New Homework: ${lessonTitle} - ${userName || 'Guest'}`,
      html: emailHtml,
    });

    console.log("Homework email sent:", data);

    return res.status(200).json({ 
      message: "Homework submitted successfully",
      id: data.id 
    });

  } catch (error) {
    console.error("Error sending homework email:", error);
    return res.status(500).json({ 
      message: "Failed to submit homework",
      error: error.message 
    });
  }
}
