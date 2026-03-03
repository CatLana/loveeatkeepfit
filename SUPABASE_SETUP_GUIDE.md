# Supabase Setup Guide for LoveEatKeepFit

This guide will walk you through setting up Supabase as the database for your nutrition coaching app.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: loveeatkeepfit (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is sufficient to start

4. Wait 2-3 minutes for project to initialize

## Step 2: Get Your Connection Details

1. In your Supabase project, go to **Settings** (gear icon) > **API**
2. Copy the following values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`
   - **service_role key**: Another long string (keep this secret!)

3. Go to **Settings** > **Database**
4. Scroll to **Connection String** section
5. Copy the **URI** connection string (it will look like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. Replace `[YOUR-PASSWORD]` with the database password from Step 1

## Step 3: Update Environment Variables

1. Open `.env.local` in your project root
2. Update these values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
   ```

3. Generate a NextAuth secret:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and add to `.env.local`:
   ```env
   NEXTAUTH_SECRET=your_generated_secret_here
   ```

## Step 4: Run Database Migrations

Once your `.env.local` is configured, run:

```bash
npx prisma generate
npx prisma db push
```

This will:
- Generate the Prisma Client
- Create all tables in your Supabase database

## Step 5: Seed Initial Lesson Data

Run the seed script to populate lessons:

```bash
npm run seed
```

This will create the 5 lessons in your database.

## Step 6: Verify Database Setup

1. Go to your Supabase project
2. Click **Table Editor** (database icon)
3. You should see these tables:
   - users
   - lessons
   - lesson_progress
   - homework_submissions
   - check_ins

## Troubleshooting

### "Can't reach database server"
- Check your `DATABASE_URL` is correct
- Verify your database password contains no special characters that need URL encoding
- Try wrapping password in quotes if it contains special characters

### "Missing environment variables"
- Make sure `.env.local` exists in project root (not in src/)
- Restart your development server after changing .env.local

### Prisma Client errors
- Run `npx prisma generate` to regenerate the client
- Check that `@prisma/client` is installed: `npm list @prisma/client`

## Free Tier Limits

Supabase free tier includes:
- 500MB database space
- Unlimited API requests
- 50,000 monthly active users
- 2GB bandwidth

This is more than enough for initial launch and first 100+ students.

## Next Steps

Once database is set up:
1. Test authentication by creating a user account
2. Verify lessons appear in the app
3. Test homework submission flow
4. Check that data saves correctly in Supabase Table Editor

## Support

If you encounter issues:
- Check [Supabase Documentation](https://supabase.com/docs)
- Visit [Supabase Discord](https://discord.supabase.com) for community help
- Review Prisma logs: `npx prisma studio` to inspect data
