# Supabase Database Setup Troubleshooting Guide

## Issue: "Column user_id doesn't exist"

This error typically occurs when the `auth.users` table isn't properly set up in your Supabase instance.

## Solution Steps:

### Step 1: Check Authentication Setup

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **Settings**
3. Make sure **Enable email confirmations** is enabled
4. Ensure authentication is properly configured

### Step 2: Check if Auth Tables Exist

Run this query in your Supabase SQL Editor:

```sql
-- Check if auth schema and users table exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'auth';
```

**Expected result:** You should see tables like `users`, `sessions`, etc.

### Step 3: Use the Simple Setup Script

If the auth tables don't exist or you're still getting errors, use the `simple_database_setup.sql` file instead:

1. Copy the contents of `simple_database_setup.sql`
2. Paste it into your Supabase SQL Editor
3. Run the script

This version creates tables without foreign key constraints initially.

### Step 4: Verify Tables Were Created

Run this query to confirm:

```sql
-- Check if your tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'tasks');
```

### Step 5: Get Your User ID

After logging into your app, run this to get your user ID:

```sql
-- Get your user ID (this will only work after you've logged in)
SELECT auth.uid() as my_user_id;
```

Or if you know your email:

```sql
-- Alternative: Find user by email
SELECT id, email 
FROM auth.users 
WHERE email = 'your-email@example.com';
```

### Step 6: Test the Setup

Create a test project:

```sql
-- Replace 'your-user-id-here' with your actual user ID
INSERT INTO public.projects (name, description, user_id) 
VALUES ('Test Project', 'This is a test project', 'your-user-id-here');
```

### Step 7: Verify RLS Policies

Check if Row Level Security is working:

```sql
-- This should only show projects for the current user
SELECT * FROM public.projects;
```

## Alternative Approach: Manual Table Creation

If you're still having issues, create the tables step by step:

### 1. Create Projects Table
```sql
CREATE TABLE public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Create Tasks Table
```sql
CREATE TABLE public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    project_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(50) DEFAULT 'medium',
    due_date DATE,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Enable RLS
```sql
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
```

### 4. Create Basic Policies
```sql
-- Projects policies
CREATE POLICY "Users can manage own projects" ON public.projects
    USING (auth.uid() = user_id);

-- Tasks policies  
CREATE POLICY "Users can manage own tasks" ON public.tasks
    USING (auth.uid() = user_id);
```

## Common Issues and Solutions:

### Issue: "auth.uid() returns null"
**Solution:** Make sure you're logged into your application first, then try the queries.

### Issue: "RLS policies not working"
**Solution:** 
1. Ensure RLS is enabled on both tables
2. Make sure you're using the correct user ID
3. Test policies with a known user ID

### Issue: "Permission denied"
**Solution:**
1. Check if you're using the correct Supabase URL and API key
2. Verify your user has the necessary permissions
3. Make sure RLS policies are correctly configured

## Testing Your Setup:

Once everything is working, you should be able to:

1. Log into your admin panel
2. Navigate to the Tasks tab
3. Create a new project
4. Add tasks to the project
5. See your tasks in the dashboard

## Need Help?

If you're still experiencing issues:

1. Check the browser console for error messages
2. Look at the Supabase logs in your dashboard
3. Verify your environment variables are correct
4. Make sure your Supabase project is active and not paused

## Contact Support:

If none of these solutions work, the issue might be with your specific Supabase setup. Consider:

1. Creating a new Supabase project
2. Checking Supabase documentation
3. Contacting Supabase support

Remember: The task management system will work as soon as the database tables are properly created and RLS is configured!
