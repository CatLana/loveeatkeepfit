# Testing Your Lesson 1 Implementation

## Quick Test Checklist ✅

Follow these steps to test your new Lesson 1 and homework submission system.

---

## Step 1: Access Your App

1. Make sure your dev server is running:
   ```
   npm run dev
   ```

2. Open your browser and go to:
   ```
   http://localhost:3000/app/lessons
   ```

3. **✅ Expected Result**: 
   - You should see 2 lessons listed
   - Lesson 1: "Volume Eating" (clickable, white background)
   - Lesson 2: "Macros" (greyed out, shows "Locked")

---

## Step 2: Navigate to Lesson 1

1. Click on **"Volume Eating"** (Lesson 1)

2. **✅ Expected Result**:
   - Page loads at: `http://localhost:3000/app/lesson/1`
   - You see a professional lesson page with:
     - Header: "Welcome, Guest! 💛"
     - Navigation: "Back to Lessons" link
     - Quick links to FAQ and Ask Coach
     - Educational content about Volume Eating
     - Homework submission form at the bottom

---

## Step 3: Review the Lesson Content

Scroll through the lesson and verify these sections appear:

- [ ] **Welcome** section (pink/orange gradient box)
- [ ] **Understanding Your Metabolism** (blue info box)
- [ ] **What is Volume Eating?** (with green principles box)
- [ ] **Practical Examples** (comparison cards: chips vs vegetables)
- [ ] **Why This Matters** (with yellow warning box)
- [ ] **Additional Resources** (purple box with links)
- [ ] **Your First Assignment** (homework section with form)

---

## Step 4: Test Homework Submission

### Part A: Fill Out the Form

1. Scroll to the **"Your First Assignment"** section
2. Fill in the homework form:

   **Weekend Day Diary** (required):
   ```
   Saturday
   Breakfast (9am): 2 scrambled eggs, whole wheat toast, coffee
   Lunch (1pm): Grilled chicken salad with olive oil dressing
   Snack (4pm): Apple and almonds
   Dinner (7pm): Baked salmon, roasted vegetables, quinoa
   Snack (9pm): Greek yogurt with berries
   ```

   **Working Day Diary** (required):
   ```
   Monday
   Breakfast (7am): Oatmeal with banana and walnuts
   Snack (10am): Protein bar
   Lunch (12:30pm): Turkey sandwich on whole grain, carrot sticks
   Snack (3pm): Cheese and crackers
   Dinner (6pm): Chicken stir-fry with brown rice
   ```

   **Photos/Screenshots** (optional):
   ```
   MyFitnessPal screenshots: [links would go here]
   ```

   **Additional Comments** (optional):
   ```
   I noticed I'm more hungry on weekends. Is this normal?
   Also, I struggle with evening snacking after dinner.
   ```

### Part B: Submit the Form

1. Click **"Submit Homework"** button
2. Button should show "Submitting..." briefly
3. **✅ Expected Result**:
   - Form disappears
   - Green success message appears: "✅ Homework Submitted!"
   - Message says: "Your coach will review your diary..."
   - Link to return to lessons page

---

## Step 5: Verify Email Delivery

### Check Your Email

1. Open your email: **loveeatkeepfitblog@gmail.com**
2. Look for new email with subject: **"📝 New Homework: Volume Eating - Guest"**
3. **✅ Expected Email Content**:
   - Sender: `LoveEatKeepFit <no-reply@loveeatkeepfit.ie>`
   - Subject includes student name and lesson title
   - Email has sections:
     - Lesson Details (lesson number, student name, submission time)
     - Weekend Day Food Diary (your test text)
     - Working Day Food Diary (your test text)
     - Photos/Screenshots (if you filled it in)
     - Additional Comments (if you filled it in)
     - Next Steps suggestion box

4. **If email doesn't arrive within 2 minutes:**
   - Check spam/junk folder
   - Verify `.env.local` has correct `RESEND_API_KEY`
   - Check terminal for error messages

---

## Step 6: Test Navigation Links

### From Lesson 1 Page:

1. Click **"← Back to Lessons"** (top left)
   - Should return to lessons list page

2. Click **"📚 FAQ"** link
   - Should navigate to `/app/faq` (FAQ page)

3. Click **"💬 Ask Your Coach"** link
   - Should navigate to `/app/chat` (chat/messaging page)

4. Click **"Browse Volume Eating Recipes"** (in Resources section)
   - Should navigate to `/app/cookbook`

---

## Step 7: Test Mobile Responsiveness

1. Open browser Developer Tools (F12)
2. Click **"Toggle device toolbar"** or press `Ctrl+Shift+M` (Windows) or `Cmd+Shift+M` (Mac)
3. Select device: iPhone 12 Pro or similar
4. **✅ Expected Result**:
   - Content stacks vertically
   - Text is readable without zooming
   - Form fields are easy to tap
   - Buttons are properly sized
   - No horizontal scrolling

---

## Step 8: Test Lesson 2 (Locked State)

1. Go back to: `http://localhost:3000/app/lessons`
2. Try to click on **Lesson 2: Macros**
3. **✅ Expected Result**:
   - Lesson is greyed out (opacity-50)
   - "(Locked)" label is visible
   - Click does nothing (pointer-events-none)
   - Cannot tab to it with keyboard

---

## Troubleshooting Common Issues

### Issue: App crashes when clicking Lesson 1

**Possible Causes:**
- React import error
- Missing dependencies

**Fix:**
```bash
npm install
```

### Issue: Homework submission fails

**Check:**
1. Browser console (F12) for JavaScript errors
2. Network tab for API call status
3. Terminal for backend errors

**Common Fixes:**
- Verify `.env.local` file exists with correct keys
- Check `RESEND_API_KEY` is valid
- Ensure `/api/homework` endpoint is working

**Test API directly:**
Open browser and visit: `http://localhost:3000/api/homework`
- Should return: `{"message":"Method not allowed"}` (this is correct - means API exists)

### Issue: Email formatting looks broken

**Check:**
- Open email in different email clients (Gmail web, Outlook, etc.)
- Some clients strip certain HTML - this is normal
- The content should still be readable

### Issue: "Guest" name doesn't change

**Expected Behavior:**
- This is normal until you implement authentication
- Will be replaced with real user names once auth is added

---

## Performance Checklist

### Page Load Speed:
- [ ] Lesson 1 page loads in < 3 seconds
- [ ] No console errors in browser DevTools
- [ ] Images load properly (if any added)

### Form Validation:
- [ ] Cannot submit with empty "Weekend Day" field
- [ ] Cannot submit with empty "Working Day" field
- [ ] Can submit with optional fields empty
- [ ] Success message appears after valid submission

---

## Security Testing

### Verify Environment Variables:
```bash
# Check .env.local file exists
ls .env.local

# Should contain (don't share these values!):
# RESEND_API_KEY=re_xxxxx
# CONTACT_RECIPIENT=loveeatkeepfitblog@gmail.com
# CONTACT_SENDER=LoveEatKeepFit <no-reply@loveeatkeepfit.ie>
```

### Never Commit:
- ❌ `.env.local` file
- ❌ Real API keys
- ❌ Customer data

These should be in `.gitignore` already.

---

## Next Steps After Testing

Once everything works:

1. **✅ Set up Gmail** (see GMAIL_SETUP_GUIDE.md)
   - Create homework label
   - Set up email filter
   - Enable notifications

2. **✅ Set up Google Sheets** (see GOOGLE_SHEETS_TEMPLATE.md)
   - Create tracking spreadsheet
   - Set up formulas
   - Create response templates

3. **✅ Test with a real user** (beta tester)
   - Ask a friend/family member to test
   - Have them submit homework
   - Practice your feedback workflow

4. **✅ Customize user greeting**
   - When auth is ready, replace "Guest" with real names
   - See LESSON1_IMPLEMENTATION_SUMMARY.md for instructions

---

## Test Results Log

Use this checklist to track your testing:

```
Date: _____________
Tester: _____________

Core Functionality:
[ ] Lesson list page loads
[ ] Lesson 1 loads completely
[ ] All content sections visible
[ ] Homework form appears
[ ] Form validation works
[ ] Submission successful
[ ] Email received
[ ] Email formatting correct
[ ] Navigation links work

Appearance:
[ ] Design looks professional
[ ] Colors/fonts correct
[ ] Mobile responsive
[ ] No layout issues

Performance:
[ ] Page loads fast
[ ] No errors in console
[ ] No network errors

Notes:
_________________________________
_________________________________
_________________________________
```

---

## Support & Questions

If you encounter issues:
1. Check terminal output for error messages
2. Check browser console (F12) for JavaScript errors
3. Review the API logs in terminal
4. Refer to LESSON1_IMPLEMENTATION_SUMMARY.md for troubleshooting

---

*Testing should take: 15-20 minutes*
*Last updated: ${new Date().toLocaleDateString()}*
