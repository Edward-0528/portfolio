# 📋 Task Management System - Database Setup

## 🗄️ **Supabase Database Tables**

### **1. Create `tasks` table in Supabase:**

```sql
-- Create tasks table
CREATE TABLE public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    project_name TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Create index for better performance
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX idx_tasks_project_name ON public.tasks(project_name);
CREATE INDEX idx_tasks_status ON public.tasks(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create RLS policy - users can only see their own tasks
CREATE POLICY "Users can view own tasks" ON public.tasks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON public.tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON public.tasks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON public.tasks
    FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER handle_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();
```

### **2. Create `projects` table for project organization:**

```sql
-- Create projects table
CREATE TABLE public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#3B82F6',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own projects" ON public.projects
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON public.projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON public.projects
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON public.projects
    FOR DELETE USING (auth.uid() = user_id);
```

## 🚀 **Setup Instructions:**

1. **Go to Supabase Dashboard** → Your Project
2. **SQL Editor** → New Query
3. **Copy and paste the above SQL** 
4. **Run the queries** to create tables and policies
5. **Verify tables** are created in Table Editor

## 🔐 **Security Features:**
- ✅ **Row Level Security** - Users only see their own tasks
- ✅ **Authentication Required** - Must be logged in
- ✅ **Auto User Assignment** - Tasks automatically linked to user
- ✅ **Audit Trail** - Created/updated timestamps

## 📊 **Database Structure:**

### **Tasks Table:**
- `id` - Unique task identifier
- `title` - Task name/title
- `description` - Optional task details
- `project_name` - Project organization
- `status` - pending, in_progress, completed
- `priority` - low, medium, high, urgent
- `due_date` - Optional deadline
- `user_id` - Links to authenticated user

### **Projects Table:**
- `id` - Unique project identifier  
- `name` - Project name
- `description` - Project details
- `color` - UI color coding
- `user_id` - Links to authenticated user

Ready for the next step: Creating the Task Management UI! 🎯
