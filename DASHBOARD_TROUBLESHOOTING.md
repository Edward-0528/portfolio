# Troubleshooting: Dashboard Not Showing Data

## Issue
Your test signup isn't appearing in the dashboard. This is likely because:
1. **Your portfolio site is connected to a different Supabase project** than your Core Plus mobile app
2. The tables need to be created in the correct Supabase project
3. You need admin access in the correct project

## Step 1: Identify Your Supabase Projects

You likely have **TWO** Supabase projects:
1. **Portfolio Project** - For your portfolio admin features
2. **Core Plus Project** - For your Core Plus mobile app

### Check Your Current Configuration

1. **Check your portfolio .env file**:
```bash
cat /Users/edward/PortfolioMain/portfolio/.env
```

Look for:
```
REACT_APP_SUPABASE_URL=https://[PROJECT_ID].supabase.co
REACT_APP_SUPABASE_ANON_KEY=...
```

2. **Check your Core Plus mobile app config**:
   - Look in your mobile app's Supabase configuration
   - Check what Supabase URL/project it's using
   - This is where your signup data is going!

## Step 2: Choose Your Approach

### Option A: Use Core Plus Supabase Project (RECOMMENDED)
Point your dashboard to the same Supabase project as your mobile app.

**Steps:**
1. Get the Supabase credentials from your Core Plus mobile app
2. Update your portfolio `.env` file with Core Plus credentials
3. Run the SQL schema in your Core Plus Supabase project
4. Grant yourself admin access in Core Plus project

### Option B: Use Portfolio Supabase Project
Have your mobile app write to your portfolio's Supabase project.

**Steps:**
1. Get credentials from your portfolio Supabase project
2. Update your mobile app to use portfolio Supabase
3. Run the SQL schema in portfolio project
4. Grant yourself admin access

## Step 3: Update Your Portfolio .env File

### For Option A (Using Core Plus Supabase):

1. **Find your Core Plus Supabase credentials**
   - Go to your Core Plus Supabase project dashboard
   - Click Settings → API
   - Copy the Project URL and anon public key

2. **Update your portfolio .env file**:
```bash
# Open .env file
nano /Users/edward/PortfolioMain/portfolio/.env

# Update these values with your Core Plus Supabase credentials:
REACT_APP_SUPABASE_URL=https://YOUR_CORE_PLUS_PROJECT_ID.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_core_plus_anon_key_here
```

3. **Save and restart your dev server**

## Step 4: Run SQL Schema in Correct Project

1. **Go to the CORRECT Supabase project** (Core Plus if using Option A)
   - Visit: https://supabase.com/dashboard
   - Select your Core Plus project

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar

3. **Run the complete schema**
   - Copy everything from `/database/core_plus_schema.sql`
   - Paste into SQL Editor
   - Click "Run"

## Step 5: Grant Yourself Admin Access

In the same SQL Editor, run these queries:

```sql
-- 1. Find your user ID in THIS project
SELECT id, email FROM auth.users;

-- 2. Grant yourself admin access (replace YOUR_USER_ID and your-email)
INSERT INTO admin_users (user_id, role, permissions)
VALUES ('YOUR_USER_ID_FROM_STEP_1', 'admin', '["all"]'::jsonb)
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

## Step 6: Verify Data Exists

Check if your signup data is in the correct project:

```sql
-- Check if affiliate_usage table exists and has data
SELECT * FROM affiliate_usage ORDER BY created_at DESC LIMIT 10;

-- Check if user_feedback table exists and has data
SELECT * FROM user_feedback ORDER BY created_at DESC LIMIT 10;

-- Check if you're an admin
SELECT * FROM admin_users WHERE user_id = auth.uid();
```

## Step 7: Add Test Data (If Tables Are Empty)

If the tables exist but are empty, add test data:

```sql
-- Get your user ID first
SELECT id FROM auth.users LIMIT 1;

-- Add test affiliate usage (replace 'your-user-id')
INSERT INTO affiliate_usage (
  user_id,
  affiliate_code,
  signup_completed,
  subscription_started,
  subscription_amount,
  used_at
) VALUES
  ('your-user-id', 'TEST2025', true, true, 29.99, NOW() - INTERVAL '1 day'),
  ('your-user-id', 'TEST2025', true, false, NULL, NOW() - INTERVAL '2 days'),
  ('your-user-id', 'BETA2025', true, true, 49.99, NOW() - INTERVAL '3 days');

-- Add test feedback
INSERT INTO user_feedback (
  user_id,
  feedback_type,
  subject,
  message,
  rating,
  sentiment,
  status
) VALUES
  ('your-user-id', 'praise', 'Love the app!', 'This app is amazing!', 5, 'positive', 'new'),
  ('your-user-id', 'bug', 'Issue with scanning', 'Scanner not working', 2, 'negative', 'new');
```

## Step 8: Test the Dashboard

1. **Restart your local server** (if running):
```bash
cd /Users/edward/PortfolioMain/portfolio
npm start
```

2. **Visit the dashboard**:
   - Local: http://localhost:3000/dashboard
   - Or wait for Netlify deploy: https://edwardgranados.me/dashboard

3. **Check browser console** (F12):
   - Look for any errors
   - Check Network tab for failed API calls

## Quick Diagnosis Commands

### Check Which Supabase Project You're Using

Run this in your browser console when on the dashboard:
```javascript
// This will show you which Supabase URL is configured
console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
```

### Check If You Have Admin Access

In Supabase SQL Editor:
```sql
-- This should return your user row
SELECT * FROM admin_users WHERE user_id = auth.uid();

-- If empty, you don't have admin access yet
```

### Check If Tables Exist

```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Should see: influencers, affiliate_usage, user_feedback, admin_users
```

## Common Issues & Solutions

### "No data showing in dashboard"
- ✅ Verify you're querying the correct Supabase project
- ✅ Check that tables exist in that project
- ✅ Confirm you have admin access
- ✅ Add test data if tables are empty

### "Permission denied" errors
- ✅ Grant yourself admin access in admin_users table
- ✅ Check RLS policies are created correctly
- ✅ Verify you're authenticated in Supabase

### "Table doesn't exist" errors
- ✅ Run the SQL schema in the correct project
- ✅ Check you're in the right Supabase dashboard

### Dashboard loads but shows 0 for everything
- ✅ Verify affiliate_usage and user_feedback tables have data
- ✅ Check browser console for SQL errors
- ✅ Confirm RLS policies allow you to view data

## Recommended Solution

**I recommend Option A: Point your dashboard to your Core Plus Supabase project**

This way:
- Your mobile app continues working as-is
- Dashboard reads from the same database as your app
- No need to change mobile app configuration
- All data is in one place

### Quick Steps:
1. Find your Core Plus Supabase URL and key
2. Update `/Users/edward/PortfolioMain/portfolio/.env`
3. Run SQL schema in Core Plus Supabase project
4. Grant yourself admin
5. Refresh dashboard

## Need Help?

If you're still stuck:
1. Check which Supabase project your mobile app is using
2. Verify that project has the auth.users table with data
3. Run the schema SQL in THAT project
4. Update your .env to point to THAT project

---

**Quick Test**: After updating .env and restarting, the dashboard should show data if everything is configured correctly!
