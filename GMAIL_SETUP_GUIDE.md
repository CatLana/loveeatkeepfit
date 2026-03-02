# Gmail Setup Guide for Homework Submissions

## Quick Setup (5 minutes)

### Step 1: Create a Label for Homework

1. Open Gmail: https://mail.google.com
2. Click the **Settings gear** icon (top right)
3. Select **See all settings**
4. Go to the **Labels** tab
5. Scroll down to **Create new label**
6. Name it: `LoveEatKeepFit/Homework`
7. Click **Create**

Optional: Create sublabels:
- `LoveEatKeepFit/Homework/Pending`
- `LoveEatKeepFit/Homework/Reviewed`
- `LoveEatKeepFit/Homework/Completed`

---

### Step 2: Create an Automatic Filter

1. In Gmail, click the **search box** at the top
2. Click the **Show search options** icon (filter funnel)
3. Fill in these fields:
   - **From**: `no-reply@loveeatkeepfit.ie`
   - **Subject**: `New Homework`
   - **Has the words**: (leave blank)
4. Click **Create filter**
5. Check these boxes:
   - ☑ **Apply the label**: Select `LoveEatKeepFit/Homework`
   - ☑ **Mark as important**
   - ☑ **Never send it to Spam**
   - ☐ Star it (optional - if you want all homework starred)
6. Check: ☑ **Also apply filter to matching conversations**
7. Click **Create filter**

---

### Step 3: Set Up Email Notifications

#### Option A: Browser Notifications (Desktop)
1. Gmail Settings > General tab
2. Scroll to **Desktop notifications**
3. Select **New mail notifications on**
4. Click **Click here to enable** (allow browser notifications)

#### Option B: Mobile Push Notifications
1. Install **Gmail app** on your phone
2. Open app > tap menu (☰) > Settings
3. Select your email account
4. Tap **Notifications**
5. Turn on **All** or **High priority only**
6. Customize notification sound

#### Option C: Email Forwarding to Another Account (if you check a different email more often)
1. Gmail Settings > Forwarding and POP/IMAP
2. Click **Add a forwarding address**
3. Enter your other email
4. Confirm via verification email
5. Choose: **Forward a copy of incoming mail** to that address
6. Select filter: **Only for emails labeled** `LoveEatKeepFit/Homework`

---

### Step 4: Create Quick Reply Templates (Canned Responses)

1. Gmail Settings > Advanced tab
2. Find **Templates** (formerly "Canned Responses")
3. Enable it
4. Click **Save Changes**
5. Scroll to the bottom and click **Save Changes** again

#### To Create a Template:
1. Click **Compose** (new email)
2. Write your template message (e.g., "Thanks for submitting! I'll review within 24 hours.")
3. Click the **three dots** (⋮) at bottom right of compose window
4. Select **Templates** > **Save draft as template** > **Save as new template**
5. Name it: e.g., "Homework - Quick Acknowledgment"

#### Common Templates to Create:
1. **Homework Received**: "Thanks! I'll review this within 24 hours."
2. **Homework Approved**: "Great work! You can move to Lesson 2."
3. **Homework - Need More Info**: "Thanks! Could you provide more detail about..."
4. **Homework - Schedule Call**: "Let's discuss this on a quick call."

---

## Advanced Setup (Optional)

### Multiple Inboxes View

Show homework in a separate pane:

1. Gmail Settings > Advanced tab
2. Enable **Multiple Inboxes**
3. Settings > Inbox tab > Scroll to **Multiple Inboxes**
4. Configure:
   - **Panel 1**: `label:LoveEatKeepFit/Homework/Pending`
   - **Panel title**: "Homework - Pending Review"
   - **Position**: Right of Inbox
5. Save changes

Your inbox will now show pending homework in a dedicated panel!

---

### Smart Compose for Faster Replies

1. Gmail Settings > General
2. Scroll to **Smart Compose**
3. Select **Writing suggestions on**
4. Smart Compose will auto-suggest personalized responses based on your writing style

---

### Keyboard Shortcuts (Speed Up Your Workflow)

#### Enable Shortcuts:
1. Gmail Settings > General
2. Scroll to **Keyboard shortcuts**
3. Select **Keyboard shortcuts on**

#### Useful Shortcuts:
- **C**: Compose new email
- **R**: Reply
- **A**: Reply all
- **E**: Archive email
- **L**: Label email (then type to find label)
- **Shift + U**: Mark as unread
- **Shift + I**: Mark as read
- **G then L**: Go to label (then type label name)

---

## Color Coding for Visual Organization

### Stars System:
1. Gmail Settings > General > Stars
2. Enable different colored stars/symbols:
   - ⭐ Yellow star: Urgent (needs response today)
   - 🔵 Blue info: Reviewed, waiting for follow-up
   - ✅ Green check: Feedback sent, completed
   - ❗ Red exclamation: Needs immediate attention

### To Apply Stars:
- Click the star icon next to any email
- Click again to cycle through colors
- Or use keyboard: **S** (cycles through star types)

---

## Search Operators (Find Homework Quickly)

Use these in the Gmail search box:

### By Status:
- `label:LoveEatKeepFit/Homework is:unread` - New, unreviewed homework
- `label:LoveEatKeepFit/Homework is:starred` - Flagged homework
- `label:LoveEatKeepFit/Homework -is:starred` - Non-flagged homework

### By Date:
- `label:LoveEatKeepFit/Homework after:2026/03/01` - This month's homework
- `label:LoveEatKeepFit/Homework newer_than:1d` - Last 24 hours
- `label:LoveEatKeepFit/Homework older_than:3d` - Older than 3 days (needs attention!)

### By Student:
- `label:LoveEatKeepFit/Homework from:rita@email.com` - Rita's homework only
- `label:LoveEatKeepFit/Homework subject:"Volume Eating"` - Lesson 1 only

### Save Important Searches:
After searching, click the dropdown arrow in search box > **Create filter** > apply label

---

## Workflow Integration

### Daily Email Routine:

#### Morning (First check - 5 min):
1. Open Gmail
2. Go to label: `LoveEatKeepFit/Homework/Pending`
3. Quick scan: how many new submissions?
4. Star any urgent ones
5. Send quick "received, will review soon" replies

#### Midday (Review time - 20-40 min):
1. Open each homework email
2. Read thoroughly
3. Copy details to Google Sheets
4. Move email to `Homework/Reviewed` label
5. Draft feedback responses

#### Afternoon (Send feedback - 10-15 min):
1. Send personalized feedback emails
2. Move to `Homework/Completed` label
3. Archive emails (or keep in inbox if awaiting student reply)

---

## Troubleshooting

### Issue: Not receiving homework emails
**Check:**
- Spam folder: search for "homework" or "loveeatkeepfit"
- Filters: make sure you didn't accidentally filter to trash
- API settings: verify RESEND_API_KEY is correct in .env.local

**Fix:**
- If in spam: open email, click **Not spam**
- Add sender to contacts: no-reply@loveeatkeepfit.ie

### Issue: Too many notification emails
**Fix:**
- Settings > Notifications
- Change to **High priority only**
- Or set specific hours for notifications

### Issue: Can't find old homework submissions
**Use search:**
```
from:no-reply@loveeatkeepfit.ie subject:homework
```
All homework emails will appear.

---

## Gmail App Tips (Mobile)

### Best Settings for Coaching On-the-Go:

1. **Swipe Actions**:
   - Settings > Swipe actions
   - Right swipe: Archive
   - Left swipe: Mark as read

2. **Priority Inbox**:
   - Settings > Inbox type > Priority Inbox
   - Gmail will learn which homework emails are important

3. **Vacation Responder** (when you're away):
   - Settings > Vacation responder
   - Turn on with dates
   - Message: "I'm away until [date]. Homework submissions will be reviewed when I return."

---

## Security & Privacy

### Important:
- **Never** share homework submissions publicly
- Don't forward to non-secure email addresses
- If printing homework, shred after reviewing
- GDPR compliance: clients can request deletion (archive & delete from trash)

### Secure Your Account:
1. Enable **2-Step Verification**:
   - Gmail Settings > Accounts > Google Account > Security
   - 2-Step Verification > Turn on
2. Review **Account Activity**:
   - Check regularly for suspicious logins
3. App Passwords:
   - If using email clients (Outlook, Apple Mail), use app-specific passwords

---

## Backup Strategy

### Weekly Backup:
1. Select all homework emails: `label:LoveEatKeepFit/Homework`
2. Click **⋮ More** > **Forward as attachment**
3. Send to yourself or a backup email
4. OR use **Google Takeout**:
   - https://takeout.google.com
   - Select **Mail** > Select specific labels
   - Download as MBOX file

---

## Next Steps After Setup

1. ✅ Test your setup:
   - Submit test homework from Lesson 1 page
   - Check if email arrives with correct label
   - Verify notifications work

2. ✅ Create response templates (at least 3)

3. ✅ Set up Google Sheets tracker (see GOOGLE_SHEETS_TEMPLATE.md)

4. ✅ Practice your workflow for 1 week

5. ✅ Adjust filters/labels based on what works for you

---

## Questions?

If something doesn't work:
1. Check Gmail Help: https://support.google.com/mail
2. Review filter settings (Settings > Filters and Blocked Addresses)
3. Test with a personal email first before going live

---

*Setup time: 10-15 minutes*
*Last updated: ${new Date().toLocaleDateString()}*
