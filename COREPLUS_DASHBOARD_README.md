# Core Plus Dashboard Setup Guide

## Overview
This dashboard allows you to track affiliate code usage and manage user feedback for your Core Plus mobile app. The dashboard is accessible at **https://edwardgranados.me/dashboard**.

## Features

### Affiliate Tracking
- View all affiliate code usage in real-time
- Track signups and premium conversions
- Monitor revenue by affiliate code
- Conversion funnel analysis
- Top performing affiliates

### User Feedback Management
- View all user feedback submissions
- Filter by status, type, and sentiment
- Update feedback status (new → in progress → resolved)
- Add admin notes to feedback
- Track average ratings and sentiment distribution

## Setup Instructions

### 1. Database Setup

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `/database/core_plus_schema.sql`
4. Paste and run the SQL script
5. This will create all necessary tables, indexes, and RLS policies

### 2. Grant Yourself Admin Access

After running the schema, you need to grant yourself admin access:

```sql
-- First, find your user ID
SELECT id, email FROM auth.users;

-- Then grant admin access (replace with your actual email)
INSERT INTO admin_users (user_id, role, permissions)
SELECT id, 'admin', '["all"]'::jsonb
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id) DO NOTHING;
```

### 3. Test the Dashboard

1. Start your development server: `npm start`
2. Navigate to: http://localhost:3000/dashboard
3. You should see the dashboard with empty data

### 4. Add Test Data (Optional)

To see the dashboard in action with sample data:

```sql
-- Add sample affiliate usage
INSERT INTO affiliate_usage (
  user_id,
  affiliate_code,
  signup_completed,
  subscription_started,
  subscription_amount,
  used_at
) VALUES
  (auth.uid(), 'TEST2025', true, true, 29.99, NOW() - INTERVAL '1 day'),
  (auth.uid(), 'TEST2025', true, false, NULL, NOW() - INTERVAL '2 days'),
  (auth.uid(), 'BETA2025', true, true, 49.99, NOW() - INTERVAL '3 days');

-- Add sample feedback
INSERT INTO user_feedback (
  user_id,
  feedback_type,
  subject,
  message,
  rating,
  sentiment,
  status
) VALUES
  (auth.uid(), 'praise', 'Love the app!', 'This app is amazing!', 5, 'positive', 'new'),
  (auth.uid(), 'bug', 'Issue with scanning', 'Food scanner not working properly', 2, 'negative', 'new'),
  (auth.uid(), 'feature_request', 'Add dark mode', 'Would love to see a dark mode option', 4, 'positive', 'in_progress');
```

## Dashboard Tabs

### Overview Tab
- **Key Metrics**: Total signups, conversions, revenue, pending feedback
- **Conversion Funnel**: Visual representation of user journey
- **Top Affiliates**: Best performing affiliate codes
- **Feedback Summary**: Status breakdown of all feedback

### Affiliates Tab
- Complete list of all affiliate codes
- Detailed statistics per affiliate
- Sortable columns for easy analysis

### Feedback Tab
- All user feedback submissions
- Filter by status (new, in_progress, resolved, closed)
- Quick actions to update status
- Expandable view for full details

## Mobile App Integration

To enable feedback submission from your Core Plus mobile app, add this to your mobile app code:

### Create Feedback Service

```javascript
// services/feedbackService.js
import { supabase } from '../supabaseConfig';

export const submitFeedback = async ({
  type,
  subject,
  message,
  rating
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('user_feedback')
    .insert({
      user_id: user.id,
      feedback_type: type,
      subject: subject,
      message: message,
      rating: rating,
      platform: 'mobile',
      status: 'new'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};
```

### Use in Your App

```javascript
import { submitFeedback } from './services/feedbackService';

// In your feedback form submit handler
const handleSubmit = async () => {
  try {
    await submitFeedback({
      type: 'general',
      subject: 'Test Feedback',
      message: 'This is a test message',
      rating: 5
    });
    alert('Feedback submitted successfully!');
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit feedback');
  }
};
```

## Tracking Affiliate Codes

When a user signs up with an affiliate code in your mobile app:

```javascript
// When user enters affiliate code during signup
const trackAffiliateUsage = async (affiliateCode, userId) => {
  const { data, error } = await supabase
    .from('affiliate_usage')
    .insert({
      user_id: userId,
      affiliate_code: affiliateCode,
      signup_completed: true,
      used_at: new Date().toISOString()
    });

  if (error) console.error('Error tracking affiliate:', error);
};

// When user completes premium subscription
const trackConversion = async (userId, affiliateCode, amount, plan) => {
  const { data, error } = await supabase
    .from('affiliate_usage')
    .update({
      subscription_started: true,
      subscription_start_date: new Date().toISOString(),
      subscription_plan: plan,
      subscription_amount: amount,
      commission_eligible: true,
      commission_amount: amount * 0.10 // 10% commission
    })
    .eq('user_id', userId)
    .eq('affiliate_code', affiliateCode);

  if (error) console.error('Error tracking conversion:', error);
};
```

## Security Notes

- ✅ Row Level Security (RLS) is enabled on all tables
- ✅ Only authenticated admin users can access the dashboard data
- ✅ Regular users can only submit and view their own feedback
- ✅ API keys are stored in environment variables
- ✅ All database queries require authentication

## Troubleshooting

### Dashboard Shows "Loading..." Forever
- Check that you've run the database schema SQL
- Verify you've granted yourself admin access
- Check browser console for errors
- Ensure your Supabase credentials are in `.env` file

### "Permission Denied" Errors
- Make sure you're logged in to Supabase
- Verify your user is in the `admin_users` table with proper role
- Check RLS policies are correctly set up

### No Data Showing
- Add test data using the SQL queries above
- Check that tables exist in Supabase dashboard
- Verify API calls in browser Network tab

### Tables Don't Exist
- Run the full schema SQL in Supabase SQL Editor
- Check for any error messages during execution
- Ensure you have proper permissions in Supabase

## Deployment

The dashboard is already configured to deploy with your portfolio site:

1. Commit your changes:
```bash
git add .
git commit -m "Add Core Plus admin dashboard"
git push origin master
```

2. Netlify will automatically deploy
3. Dashboard will be available at: https://edwardgranados.me/dashboard

## Environment Variables

Make sure these are set in Netlify (they should already be there):

```
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

## Next Steps

1. Run the database schema SQL in Supabase
2. Grant yourself admin access
3. Add test data (optional)
4. Test locally at http://localhost:3000/dashboard
5. Deploy to production
6. Integrate with your Core Plus mobile app

## Support

For issues or questions:
- Check Supabase logs in dashboard
- Review browser console errors
- Check Network tab for failed API calls
- Verify RLS policies are working correctly

---

**Dashboard URL**: https://edwardgranados.me/dashboard

Last Updated: November 19, 2025
