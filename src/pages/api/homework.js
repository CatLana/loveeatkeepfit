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

  const {
    lessonId, lessonTitle, userName,
    // Legacy fields (kept for backward compat)
    weekendDay, workingDay,
    // New 3-day diary fields
    day1, day2, day3,
    photos, comments,
    reflection, win,
    submittedAt
  } = req.body || {};

  // Support both old (weekendDay/workingDay) and new (day1/day2/day3) formats
  const diary1 = day1 || weekendDay;
  const diary2 = day2 || workingDay;
  const diary3 = day3 || null;

  // Validate required fields
  if (!lessonId || !lessonTitle || !diary1 || !diary2) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const lengthError = validateLengths(
    {
      lessonTitle,
      userName: userName || '',
      diary1,
      diary2,
      diary3: diary3 || '',
      photos: photos || '',
      comments: comments || '',
      reflection: reflection || '',
      win: win || '',
    },
    {
      lessonTitle: 200, userName: 100,
      diary1: 10000, diary2: 10000, diary3: 10000,
      photos: 2000, comments: 5000,
      reflection: 3000, win: 3000,
    }
  );
  if (lengthError) return res.status(400).json({ message: lengthError });

  const safeLessonId = escapeHtml(String(lessonId));
  const safeLessonTitle = escapeHtml(lessonTitle);
  const safeUserName = escapeHtml(userName || 'Student');
  const safeDiary1 = escapeHtmlBlock(diary1);
  const safeDiary2 = escapeHtmlBlock(diary2);
  const safeDiary3 = diary3 ? escapeHtmlBlock(diary3) : null;
  const safePhotos = photos ? escapeHtmlBlock(photos) : null;
  const safeComments = comments ? escapeHtmlBlock(comments) : null;
  const safeReflection = reflection ? escapeHtmlBlock(reflection) : null;
  const safeWin = win ? escapeHtmlBlock(win) : null;

  // Legacy aliases for email template
  const safeWeekendDay = safeDiary1;
  const safeWorkingDay = safeDiary2;

  try {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <h1 style="color: #2d5a3d; border-bottom: 3px solid #e89f8e; padding-bottom: 10px;">New Homework Submission</h1>

        <div style="background: #fff8f3; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #e89f8e; margin-top: 0;">Lesson Details</h2>
          <p><strong>Lesson:</strong> Lesson ${safeLessonId} - ${safeLessonTitle}</p>
          <p><strong>Student:</strong> ${safeUserName}</p>
        </div>

        <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">Day 1 Food Diary</h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safeDiary1}</div>

        <h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">Day 2 Food Diary</h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safeDiary2}</div>

        ${safeDiary3 ? `<h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">Day 3 Food Diary</h2><div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safeDiary3}</div>` : ''}

        ${safePhotos ? `<h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">Photos / App Screenshots</h2><div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safePhotos}</div>` : ''}

        ${safeComments ? `<h2 style="color: #2d5a3d; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">Comments &amp; Questions</h2><div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safeComments}</div>` : ''}

        ${safeReflection ? `<h2 style="color: #7c6daa; border-bottom: 2px solid #e5d5c8; padding-bottom: 8px;">Reflection: What I Learned</h2><div style="background: #f5f0ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safeReflection}</div>` : ''}

        ${safeWin ? `<h2 style="color: #b45309; border-bottom: 2px solid #fde68a; padding-bottom: 8px;">My Win</h2><div style="background: #fffbeb; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap;">${safeWin}</div>` : ''}

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
