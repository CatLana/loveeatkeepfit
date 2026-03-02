# Homework Tracking Spreadsheet Template

## Instructions for Setting Up Your Google Sheets Tracker

1. **Create a new Google Sheet**: https://sheets.google.com
2. **Name it**: "LoveEatKeepFit - Homework Tracker"
3. **Copy the structure below**

---

## Sheet 1: Homework Submissions

### Column Headers (Row 1):
```
Student Name | Email | Lesson # | Lesson Title | Submission Date | Status | Review Notes | Follow-up Date | Coach Feedback Sent
```

### Column Descriptions:
- **Student Name**: Client's full name
- **Email**: Client's email address
- **Lesson #**: Number (1, 2, 3, etc.)
- **Lesson Title**: e.g., "Volume Eating"
- **Submission Date**: When they submitted (MM/DD/YYYY)
- **Status**: Dropdown with options:
  - ⏳ Pending Review
  - 👀 In Review
  - ✅ Feedback Sent
  - 🔄 Needs Revision
  - ✓ Completed
- **Review Notes**: Your private notes about their submission
- **Follow-up Date**: When to check in with them
- **Coach Feedback Sent**: Date you sent feedback (MM/DD/YYYY)

### Sample Data (Row 2 example):
```
Rita Johnson | rita@email.com | 1 | Volume Eating | 03/05/2026 | ⏳ Pending Review | Good detail on weekend, needs more info on working day | 03/07/2026 | 
```

---

## Sheet 2: Active Clients

### Column Headers (Row 1):
```
Client Name | Email | Start Date | Current Lesson | Last Submission | Total Submissions | Program Type | Status | Notes
```

### Column Descriptions:
- **Client Name**: Full name
- **Email**: Contact email
- **Start Date**: When they joined (MM/DD/YYYY)
- **Current Lesson**: Which lesson they're on (1, 2, 3, etc.)
- **Last Submission**: Date of most recent homework
- **Total Submissions**: Count of all homework submitted
- **Program Type**: e.g., "Individual Coaching", "Group Program"
- **Status**: Active / Paused / Completed
- **Notes**: Any important client-specific notes

---

## Sheet 3: Email Response Templates

### Template 1: Positive Feedback - Good Diary
```
Subject: Great work on your food diary! 🌟

Hi [Name],

Thank you for submitting your food diary! I can see you put a lot of effort into tracking both days.

What I loved:
• [Specific positive observation]
• [Another positive observation]

Areas to focus on:
• [Gentle suggestion 1]
• [Gentle suggestion 2]

Next steps:
[What they should do next]

You're doing great! Ready to move on to Lesson 2 when you are.

With love,
Lana 💛
```

### Template 2: Needs More Detail
```
Subject: Quick question about your food diary

Hi [Name],

Thanks for sending your diary! To give you the most helpful feedback, I need a bit more detail about [specific area].

Could you please reply with:
• [Specific request 1]
• [Specific request 2]

This will help me understand your current eating patterns better.

Looking forward to hearing from you!

Lana ♥️
```

### Template 3: Missing Submission Reminder
```
Subject: Checking in - Lesson 1 homework

Hi [Name],

Just wanted to check in! I haven't received your food diary yet for Lesson 1.

No pressure at all - take your time. When you're ready, please submit:
• One weekend day of eating
• One working day of eating

If you have any questions or need help, just reply to this email.

Here for you,
Lana 💛
```

---

## Sheet 4: Weekly Stats Dashboard

### Metrics to Track:
```
Week Starting | New Submissions | Reviews Completed | Pending Reviews | Active Clients | New Clients | Response Time (avg days)
```

This helps you see trends and workload over time.

---

## Setup Instructions:

### Step 1: Create Dropdown Lists
1. Select the "Status" column (Column F)
2. Go to Data > Data validation
3. Add list items:
   - ⏳ Pending Review
   - 👀 In Review
   - ✅ Feedback Sent
   - 🔄 Needs Revision
   - ✓ Completed

### Step 2: Set Up Color Coding (Conditional Formatting)
1. Select the Status column
2. Format > Conditional formatting
3. Add rules:
   - If text contains "Pending" → Yellow background
   - If text contains "In Review" → Light blue background
   - If text contains "Feedback Sent" → Light green background
   - If text contains "Completed" → Dark green background

### Step 3: Create Filter Views
1. Click Data > Create a filter
2. Save filter views:
   - "Pending Only" - shows only pending submissions
   - "This Week" - shows submissions from current week
   - "By Student" - sorted alphabetically by student name

### Step 4: Gmail Integration (Optional)
1. Install "Email Spreadsheet" add-on for Google Sheets
2. Set up automatic extraction of homework submissions from email
3. Or manually copy-paste from emails each day

---

## Formulas to Add:

### In Sheet 2 (Active Clients):
**Total Submissions Formula** (assuming data starts in row 2):
```
=COUNTIF('Homework Submissions'!A:A,A2)
```

**Last Submission Date Formula**:
```
=MAXIFS('Homework Submissions'!E:E,'Homework Submissions'!A:A,A2)
```

### In Sheet 4 (Weekly Stats):
**New Submissions This Week**:
```
=COUNTIFS('Homework Submissions'!E:E,">="&A2,'Homework Submissions'!E:E,"<"&A2+7)
```

**Average Response Time**:
```
=AVERAGE('Homework Submissions'!H:H-'Homework Submissions'!E:E)
```

---

## Daily Workflow:

### Morning (5 minutes):
1. Check email for new "📝 New Homework" submissions
2. Add each submission to Sheet 1 as "Pending Review"
3. Flag urgent/priority ones

### Mid-day (15-30 minutes per submission):
1. Open the detailed email
2. Read through food diaries carefully
3. Add notes to "Review Notes" column
4. Change status to "In Review"

### Afternoon (10-15 minutes per submission):
1. Write personalized feedback using templates
2. Send feedback email
3. Update status to "Feedback Sent"
4. Add date to "Coach Feedback Sent" column
5. Update client's "Current Lesson" in Sheet 2 if approved

### Weekly (Friday):
1. Review Sheet 4 stats
2. Follow up on any submissions pending >3 days
3. Check for clients who haven't submitted in 7+ days
4. Send reminder emails if needed

---

## Google Sheets Link Structure:

Once you create your sheet, share it with:
- Yourself (full edit access)
- Any assistant coaches (edit or view access)
- Keep it private (don't share publicly)

Access from:
- Desktop: sheets.google.com
- Mobile: Google Sheets app

---

## Tips for Success:

✅ **Review submissions within 24-48 hours** - keeps clients engaged
✅ **Use consistent emoji/symbols** - makes scanning easier
✅ **Set up mobile notifications** - stay responsive on the go
✅ **Back up monthly** - Download as Excel/CSV
✅ **Archive completed clients** - move to separate "Archive" sheet after 3 months
✅ **Weekly review ritual** - Every Friday, review the week's patterns

---

## When to Upgrade from Sheets:

Consider moving to Airtable or a database when:
- You have 50+ submissions (sheet becomes slow)
- You need photo/file storage (not just links)
- You want automation (auto-responses, reminders)
- You have multiple coaches reviewing homework

See HOMEWORK_SYSTEM_ACTION_PLAN.md for upgrade options.

---

*Last updated: ${new Date().toLocaleDateString()}*
