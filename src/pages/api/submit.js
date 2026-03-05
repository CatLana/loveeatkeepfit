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

  const { name, email, phone, goal, why } = req.body || {};

  if (!name || !email || !goal) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const lengthError = validateLengths(
    { name, email, phone: phone || '', goal, why: why || '' },
    { name: 100, email: 254, phone: 30, goal: 500, why: 2000 }
  );
  if (lengthError) return res.status(400).json({ message: lengthError });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : '-';
  const safeGoal = escapeHtmlBlock(goal);
  const safeWhy = why ? escapeHtmlBlock(why) : '-';

  const html = `
    <h2>New LoveEatKeepFit Enquiry</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Phone:</strong> ${safePhone}</p>
    <p><strong>Goal:</strong> ${safeGoal}</p>
    <p><strong>Why:</strong> ${safeWhy}</p>
  `;

  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: sender,
        to: recipient,
        replyTo: email,
        subject: 'New LoveEatKeepFit Enquiry',
        html,
      });
    } catch (error) {
      console.error('[submit] Email send error:', error.message);
      return res.status(500).json({ message: 'Email failed to send' });
    }
  } else {
    console.log('[submit] RESEND_API_KEY not set — email skipped');
  }

  return res.status(200).json({ success: true });
}
