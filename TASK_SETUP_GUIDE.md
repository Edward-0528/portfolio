# Task Management System Setup Instructions

## Database Setup

### 1. Create Database Tables

1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `setup_database.sql`
4. Execute the SQL script

This will create:
- `projects` table for organizing tasks
- `tasks` table for todo items
- Row Level Security (RLS) policies
- Performance indexes
- Automatic `updated_at` triggers

### 2. Verify Database Setup

Run these queries in the SQL Editor to verify:

```sql
-- Check if tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'tasks');

-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('projects', 'tasks');

-- Check policies exist
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('projects', 'tasks');
```

### 3. Get Your User ID (Important!)

To use the task management system, you need your Supabase user ID:

```sql
-- Find your user ID (replace with your email)
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';
```

## Frontend Setup

### 1. Install Dependencies

The required dependencies should already be installed:
- `@supabase/supabase-js` - For database operations
- React and supporting libraries

### 2. Environment Variables

Ensure your `.env` file has:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Component Integration

The task management system has been integrated into your admin panel:

1. **TaskManager.js** - Main task management component
2. **taskService.js** - Database service layer
3. **AdminPanel.js** - Updated with Tasks tab

## Features Included

### Task Management
- ✅ Create, edit, and delete tasks
- ✅ Task status tracking (Pending, In Progress, Completed)
- ✅ Priority levels (Low, Medium, High, Urgent)
- ✅ Due date management
- ✅ Project organization
- ✅ Search and filtering
- ✅ Bulk operations (complete/delete multiple tasks)

### Project Management
- ✅ Create and manage projects
- ✅ Color coding for projects
- ✅ Project-based task organization

### Security Features
- ✅ Row Level Security (RLS) policies
- ✅ User-specific data isolation
- ✅ Secure CRUD operations
- ✅ SQL injection protection

### Performance Features
- ✅ Database indexes for fast queries
- ✅ Optimized React components
- ✅ Efficient state management

## Usage Instructions

### 1. Access Task Manager

1. Log into your admin panel
2. Navigate to the "Tasks" tab
3. You'll see the task management dashboard

### 2. Create Your First Project

1. Click "New Project" button
2. Enter project name and description
3. Choose a color for easy identification
4. Click "Create Project"

### 3. Add Tasks

1. Click "New Task" button
2. Fill out task details:
   - Title (required)
   - Description (optional)
   - Project (required - select from dropdown)
   - Status (Pending, In Progress, Completed)
   - Priority (Low, Medium, High, Urgent)
   - Due Date (optional)
3. Click "Create Task"

### 4. Manage Tasks

- **Complete tasks**: Click "Complete" button or bulk complete
- **Edit tasks**: Click "Edit" to modify task details
- **Delete tasks**: Click "Delete" or use bulk delete
- **Filter tasks**: Use project, status, and priority filters
- **Search tasks**: Type in the search box to find specific tasks

### 5. Task Statistics

The dashboard shows:
- Total tasks count
- Tasks by status (Pending, In Progress, Completed)
- High priority tasks count
- Number of projects

## Troubleshooting

### Common Issues

1. **Tasks not showing**: Check that RLS policies are properly set up
2. **Permission denied**: Verify your user ID matches the authenticated user
3. **Database errors**: Check Supabase logs in the dashboard

### Debug Steps

1. Check browser console for errors
2. Verify Supabase connection in Network tab
3. Test database access in Supabase SQL Editor
4. Ensure authentication is working

### Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase configuration
3. Test database connectivity
4. Review RLS policies in Supabase dashboard

## Security Notes

- All data is isolated per user through RLS policies
- API keys are client-safe (anon key with RLS)
- No direct database access from frontend
- All operations go through Supabase Auth

## Future Enhancements

Potential features to add:
- Task comments and attachments
- Team collaboration
- Time tracking
- Task templates
- Calendar integration
- Email notifications
- Mobile app support

## Database Schema Reference

### Projects Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR(255), Required)
- `description` (TEXT, Optional)
- `color` (VARCHAR(7), Default: #3B82F6)
- `user_id` (UUID, Foreign Key to auth.users)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Tasks Table
- `id` (UUID, Primary Key)
- `title` (VARCHAR(500), Required)
- `description` (TEXT, Optional)
- `project_name` (VARCHAR(255), Required)
- `status` (ENUM: pending, in_progress, completed)
- `priority` (ENUM: low, medium, high, urgent)
- `due_date` (DATE, Optional)
- `user_id` (UUID, Foreign Key to auth.users)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)
