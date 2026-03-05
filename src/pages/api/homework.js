import { Resend } from 'resend';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
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

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: 'You must be signed in to submit homework' });
  }

  const { limited } = await rateLimit(req, res, { requests: 10, window: '15 m' });
  if (limited) return;

  const { lessonId, lessonTitle, userName, weekendDay, workingDay, photos, comments, submittedAt } = req.body || {};

  // Validate required fields
  if (!lessonId || !lessonTitle || !weekendDay || !workingDay) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const lengthError = validateLengths(
    { lessonTitle, userName: userName || '', weekendDay, workingDay, photos: photos || '', comments: comments || '' },
    { lessonTitle: 200, userName: 100, weekendDay: 10000, workingDay: 10000, photos: 2000, comments: 5000 }
  );
  if (lengthError) return res.status(400).json({ message: lengthError });

  const safeLessonId = escapeHtml(String(lessonId));
  const safeLessonTitle = escapeHtml(lessonTitle);
  const safeUserName = escapeHtml(userName || 'Student');
  const safeWeekendDay = escapeHtmlBlock(weekendDay);
  const safeWorkingDay = escapeHtmlBlock(workingDay);
  const safePhotos = photos ? escapeHtmlBlock(photos) : null;
  const safeComments = comments ? escapeHtmlBlock(comments) : null;

  try {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <h1 style="color: #2d5a3d; border-bottom: 3px solid #e89f8e; padding-bottom: 10px;">New Homework Submission</h1>

        <div style="background: #fff8f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #e89f8e; margin-top: 0;">Lesson Details</h2>
          <p><strong>Lesson:</strong> Lesson ${safeLessonId} - ${safeLessonTitle}</p>
          <p><strong>Student:</strong> ${safeUserName}</p>
        </div>

        <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">Weekend Day Food Diary</h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safeWeekendDay}</div>

        <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">Working Day Food Diary</h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safeWorkingDay}</div>

        ${safePhotos ? `<h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">Photos / Screenshots</h2><div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safePhotos}</div>` : ''}

        ${safeComments ? `<h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">Additional Comments</h2><div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safeComments}</div>` : ''}

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="text-align: center; color: #666; font-size: 12px;">Love. Eat. Keep Fit. &bull; Homework Submission System</p>
      </div>
    `;

    const data = await resend.emails.send({
      from: sender,
      to: recipient,
      subject: `New Homework: ${safeLessonTitle} - ${safeUserName}`,
      html: emailHtml,
    });

    return res.status(200).json({ message: 'Homework submitted successfully', id: data.id });

  } catch (error) {
    console.error('[homework] Email send error:', error.message);
    return res.status(500).json({ message: 'Failed to submit homework' });
  }
}
