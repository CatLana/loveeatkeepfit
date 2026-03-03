# Database Setup Instructions

Follow these steps to set up your Supabase database before proceeding with lesson implementation.

## Prerequisites
- A Supabase account (free tier is sufficient)
- Node.js installed on your machine

---

## Step-by-Step Setup

### 1. Create Supabase Project (5 minutes)

1. Visit [supabase.com](https://supabase.com) and sign up or log in
2. Click **"New Project"**
3. Enter project details:
   - **Name**: `loveeatkeepfit`
   - **Database Password**: Create a strong password ⚠️ **SAVE THIS PASSWORD**
   - **Region**: Choose the closest to your target users
   - **Plan**: Free
4. Click **"Create new project"**
5. Wait 2-3 minutes for initialization

### 2. Get Your Credentials (2 minutes)

#### Get API Keys:
1. In your Supabase dashboard, click **Settings** (⚙️ gear icon) → **API**
2. Find and copy these values:
   - **Project URL**: `https://[project-id].supabase.co`
   - **anon public**: Starts with `eyJ...`
   - **service_role**: Another long key (keep secret!)

#### Get Database Connection String:
1. Go to **Settings** → **Database**
2. Scroll to **Connection String** → **URI**
3. Copy the connection string:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[project-id].supabase.co:5432/postgres
   ```
4. Replace `[YOUR-PASSWORD]` with your actual database password from Step 1

### 3. Configure Environment Variables (3 minutes)

1. Copy the `.env.example` file to `.env.local`:
   ```powershell
   Copy-Item .env.example .env.local
   ```

2. Open `.env.local` and fill in your values:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
   SUPABASE_SERVICE_ROLE_KEY="eyJ..."
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate_this_next"
   ```

3. Generate a secure NextAuth secret:
   ```powershell
   # Option 1: Using openssl (if available)
   openssl rand -base64 32
   
   # Option 2: Use Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

4. Copy the generated string and paste it as `NEXTAUTH_SECRET` in `.env.local`

### 4. Install Dependencies (1 minute)

Run:
```powershell
npm install
```

### 5. Initialize Database (2 minutes)

Run these commands in order:

```powershell
# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Seed initial lesson data
npm run seed
```

You should see output confirming tables were created and lessons were seeded.

### 6. Verify Setup (2 minutes)

#### Check in Supabase Dashboard:
1. Go to your Supabase project
2. Click **Table Editor** (🗂️ icon)
3. Verify these tables exist:
   - `users`
   - `lessons`
   - `lesson_progress`
   - `homework_submissions`
   - `check_ins`

4. Click on **lessons** table
5. You should see 5 lesson records

#### Test Locally:
```powershell
# Start development server
npm run dev
```

Visit `http://localhost:3000` - your app should load without database errors.

---

## Troubleshooting

### Error: "Can't reach database server"
- Verify `DATABASE_URL` in `.env.local` is correct
- Check password has no unencoded special characters
- If password has special chars like `@`, `#`, `%`, URL-encode them

### Error: "Environment authentication failed"
- Make sure `.env.local` exists in **project root** (not in `src/` or `prisma/`)
- Restart your terminal after creating `.env.local`

### Error: "Prisma Client not found"
- Run: `npx prisma generate`
- Then restart your dev server

### Seed script fails
- Make sure `npx prisma db push` completed successfully first
- Check that your `DATABASE_URL` is correct

---

## What Gets Created

Your database will have these tables:

| Table | Purpose |
|-------|---------|
| `users` | User accounts and authentication |
| `lessons` | Lesson metadata (title, themes, description) |
| `lesson_progress` | Tracks which lessons users have unlocked/completed |
| `homework_submissions` | Stores homework answers |
| `check_ins` | Daily check-in entries |

---

## Security Notes

⚠️ **Never commit `.env.local` to git** - it contains secrets
✅ `.gitignore` already excludes this file
✅ Only share credentials through secure channels

---

## Next Steps

Once setup is complete:
1. ✅ Confirm you can access the app at `http://localhost:3000`
2. ✅ Tell me setup is complete
3. 🚀 I'll proceed with implementing Tasks 5-6 (lesson content creation)

---

## Quick Reference

**View your data**: `npx prisma studio` (opens database browser at http://localhost:5555)

**Reset database** (careful!):
```powershell
npx prisma db push --force-reset
npm run seed
```

**Regenerate Prisma Client** (after schema changes):
```powershell
npx prisma generate
```
