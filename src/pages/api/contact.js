import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const recipient = process.env.CONTACT_RECIPIENT || "loveeatkeepfitblog@gmail.com";
const sender = process.env.CONTACT_SENDER || "LoveEatKeepFit <no-reply@loveeatkeepfit.ie>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
  `;

  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: sender,
        to: recipient,
        replyTo: email,
        subject: `Contact Form: ${subject}`,
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
    console.log("Data:", { name, email, subject, message });
  }

  return res.status(200).json({ message: "Contact form submitted successfully", success: true });
}