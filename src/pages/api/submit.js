import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const recipient = process.env.CONTACT_RECIPIENT || "loveeatkeepfitblog@gmail.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, goal, why } = req.body || {};

  if (!name || !email || !goal) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const html = `
    <h2>New LoveEatKeepFit signup</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Goal:</strong> ${goal}</p>
    <p><strong>Why:</strong> ${why || "-"}</p>
  `;

  try {
    await resend.emails.send({
      from: "LoveEatKeepFit <onboarding@resend.dev>",
      to: recipient,
      replyTo: email,
      subject: "New LoveEatKeepFit signup",
      html
    });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ message: "Email failed to send" });
  }

  return res.status(200).json({ success: true });
}
