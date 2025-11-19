# Core Plus Dashboard - Quick Setup Checklist

## ✅ Completed
- [x] Dashboard component created at `/dashboard`
- [x] API services for affiliate and feedback data
- [x] Database schema SQL file created
- [x] README documentation created
- [x] Code committed and pushed to GitHub
- [x] Netlify will auto-deploy

## 🚀 Next Steps (Do These Now!)

### Step 1: Run Database Schema (5 minutes)
1. Go to https://supabase.com/dashboard
2. Select your Core Plus project
3. Click "SQL Editor" in left sidebar
4. Click "New Query"
5. Copy ALL contents from `/database/core_plus_schema.sql`
6. Paste into the editor
7. Click "Run" button
8. ✅ Should see "Success. No rows returned"

### Step 2: Grant Yourself Admin Access (2 minutes)
In the same SQL Editor, run this query:

```sql
-- First, find your user ID
SELECT id, email FROM auth.users;
```

Copy your user ID, then run:

```sql
-- Replace YOUR_USER_ID with the ID from above
INSERT INTO admin_users (user_id, role, permissions)
VALUES ('YOUR_USER_ID', 'admin', '["all"]'::jsonb)
ON CONFLICT (user_id) DO NOTHING;
```

Verify it worked:
```sql
SELECT * FROM admin_users;
```

### Step 3: Add Test Data (Optional - 3 minutes)
To see the dashboard with sample data:

```sql
-- Get your user ID first if you haven't already
SELECT id FROM auth.users LIMIT 1;

-- Add sample affiliate usage (replace 'your-user-id' with actual ID)
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
  ('your-user-id', 'BETA2025', true, true, 49.99, NOW() - INTERVAL '3 days'),
  ('your-user-id', 'TEST2025', true, true, 29.99, NOW() - INTERVAL '4 days');

-- Add sample user feedback
INSERT INTO user_feedback (
  user_id,
  feedback_type,
  subject,
  message,
  rating,
  sentiment,
  status
) VALUES
  ('your-user-id', 'praise', 'Love the app!', 'This app has completely changed how I track my nutrition. The AI scanning is incredible!', 5, 'positive', 'new'),
  ('your-user-id', 'bug', 'Scanning issue', 'Sometimes the food scanner doesn''t recognize my meals', 2, 'negative', 'new'),
  ('your-user-id', 'feature_request', 'Dark mode please', 'Would love to see a dark mode option for night time use', 4, 'positive', 'in_progress'),
  ('your-user-id', 'general', 'Question about macros', 'How are my daily macro goals calculated?', 3, 'neutral', 'resolved');
```

### Step 4: Test Locally (Optional - 2 minutes)
```bash
cd /Users/edward/PortfolioMain/portfolio
npm start
```

Then visit: http://localhost:3000/dashboard

### Step 5: Wait for Netlify Deploy (5-10 minutes)
1. Go to https://app.netlify.com
2. Find your portfolio site
3. Check "Deploys" tab
4. Wait for the build to complete
5. Once done, visit: **https://edwardgranados.me/dashboard**

## 🎯 Dashboard Features

### Overview Tab
- Total Signups from affiliate codes
- Premium Conversions and conversion rate
- Total Revenue from affiliates  
- Pending Feedback count
- Conversion Funnel visualization
- Top Performing Affiliates table
- Feedback Summary by status

### Affiliates Tab
- Complete list of all affiliate codes
- Usage statistics per code
- Signup and conversion tracking
- Revenue per affiliate
- Conversion rate calculations

### Feedback Tab
- All user feedback submissions
- Filter by: status, type, sentiment
- Quick status updates (New → In Progress → Resolved)
- Expandable view for full details
- Add admin notes

## 📱 Mobile App Integration

Once your dashboard is set up, integrate it with your Core Plus mobile app:

### Track Affiliate Usage
```javascript
// When user signs up with affiliate code
const { data, error } = await supabase
  .from('affiliate_usage')
  .insert({
    user_id: userId,
    affiliate_code: affiliateCode,
    signup_completed: true,
    used_at: new Date().toISOString()
  });
```

### Track Conversions
```javascript
// When user upgrades to premium
const { data, error } = await supabase
  .from('affiliate_usage')
  .update({
    subscription_started: true,
    subscription_start_date: new Date().toISOString(),
    subscription_amount: 29.99,
    subscription_plan: 'monthly'
  })
  .eq('user_id', userId)
  .eq('affiliate_code', affiliateCode);
```

### Submit Feedback
```javascript
// From feedback form in app
const { data, error } = await supabase
  .from('user_feedback')
  .insert({
    user_id: userId,
    feedback_type: 'general', // bug, feature_request, praise, complaint
    subject: 'Feedback subject',
    message: 'Detailed feedback message',
    rating: 5,
    platform: 'mobile',
    status: 'new'
  });
```

## 🔐 Security

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Only admin users can access dashboard data
- ✅ Regular users can only submit their own feedback
- ✅ All queries require authentication
- ✅ API keys stored in environment variables

## 🆘 Troubleshooting

### Dashboard shows "Loading..." forever
→ Check that you ran the database schema SQL
→ Verify you granted yourself admin access
→ Check browser console (F12) for errors

### "Permission denied" errors
→ Make sure you're in the admin_users table
→ Verify RLS policies were created correctly
→ Try logging out and back in to Supabase

### No data showing
→ Add test data using SQL above
→ Refresh the page
→ Check Network tab in browser DevTools

### Tables don't exist
→ Run the complete schema SQL in Supabase
→ Check SQL Editor for error messages

## 📊 What to Track

### From Your Mobile App:
1. **Affiliate Code Entry**: When user enters code during signup
2. **Signup Completion**: When user creates account
3. **Premium Conversion**: When user upgrades to paid plan
4. **Revenue**: Track subscription amount and plan
5. **User Feedback**: All feedback submissions from in-app form

### What You'll See in Dashboard:
- Real-time signup and conversion data
- Revenue tracking per affiliate
- Conversion funnel analysis
- User feedback organized and filterable
- Quick actions to manage feedback
- Performance metrics and trends

## 🎉 You're All Set!

Once you complete the steps above, your dashboard will be live at:
**https://edwardgranados.me/dashboard**

You can start tracking affiliate performance and managing user feedback right away!

---

**Questions or Issues?**
- Check the full README: `COREPLUS_DASHBOARD_README.md`
- Review SQL schema: `database/core_plus_schema.sql`
- Check Supabase logs for errors

**Last Updated**: November 19, 2025
