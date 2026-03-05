import { Resend } from 'resend';
import { escapeHtml, escapeHtmlBlock } from '@/lib/htmlEscape';
import { rateLimit } from '@/lib/rateLimit';
import { validateOrigin, validateLengths } from '@/lib/validateRequest';

const resend = new Resend(process.env.RESEND_API_KEY);
const recipient = process.env.CONTACT_RECIPIENT || 'loveeatkeepfitblog@gmail.com';
const sender = process.env.CONTACT_SENDER || 'LoveEatKeepFit <no-reply@loveeatkeepfit.ie>';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!validateOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { limited } = await rateLimit(req, res, { requests: 10, window: '15 m' });
  if (limited) return;

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const lengthError = validateLengths(
    { name, email, subject, message },
    { name: 100, email: 254, subject: 200, message: 5000 }
  );
  if (lengthError) return res.status(400).json({ message: lengthError });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtmlBlock(message);

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Subject:</strong> ${safeSubject}</p>
    <p><strong>Message:</strong><br/>${safeMessage}</p>
  `;

  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: sender,
        to: recipient,
        replyTo: email,
        subject: `Contact Form: ${safeSubject}`,
        html,
      });
    } catch (error) {
      console.error('[contact] Email send error:', error.message);
      return res.status(500).json({ message: 'Email failed to send' });
    }
  } else {
    console.log('[contact] RESEND_API_KEY not set — email skipped');
  }

  return res.status(200).json({ message: 'Contact form submitted successfully', success: true });
}