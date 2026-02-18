import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const recipient = process.env.CONTACT_RECIPIENT || "loveeatkeepfitblog@gmail.com";
const sender =
  process.env.CONTACT_SENDER || "LoveEatKeepFit <no-reply@loveeatkeepfit.ie>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, goal, why } = req.body || {};

  if (!name || !email || !goal) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const html = `
    <h2>New LoveEatKeepFit signup</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "-"}</p>
    <p><strong>Goal:</strong> ${goal}</p>
    <p><strong>Why:</strong> ${why || "-"}</p>
  `;

  // For local testing - comment out email sending if no API key
  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: sender,
        to: recipient,
        replyTo: email,
        subject: "New LoveEatKeepFit signup",
        html
      });
    } catch (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ message: "Email failed to send" });
    }
  } else {
    console.log("📧 Email would be sent (no RESEND_API_KEY):");
    console.log("To:", recipient);
    console.log("From:", sender);
    console.log("Data:", { name, email, phone, goal, why });
  }

  return res.status(200).json({ success: true });
}
