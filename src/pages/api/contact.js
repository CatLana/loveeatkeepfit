export default function handler(req, res) {
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

  try {
    // Here you would typically integrate with your email service
    // For now, we'll just log the form submission
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // In a real application, you would:
    // 1. Send an email to yourself with the contact details
    // 2. Send a confirmation email to the user
    // 3. Store the submission in a database
    // 4. Integrate with services like SendGrid, Mailgun, etc.

    return res.status(200).json({ 
      message: "Contact form submitted successfully",
      success: true 
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return res.status(500).json({ 
      message: "Internal server error",
      success: false 
    });
  }
}