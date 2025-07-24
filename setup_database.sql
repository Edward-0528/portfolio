-- Supabase Database Setup for Task Management System
-- Execute these SQL commands in your Supabase SQL Editor

-- First, let's check if auth schema exists and what tables are available
-- Run this query first to check your auth setup:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'auth';

-- If you don't see 'users' table, you might need to enable authentication first
-- Go to Authentication > Settings in your Supabase dashboard and ensure it's enabled

-- Alternative: Create tables without foreign key constraints first, then add them later
-- This approach works even if auth isn't fully set up yet

-- Create projects table
-- Create projects table (without foreign key constraint initially)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table (without foreign key constraint initially)
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    project_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    due_date DATE,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add foreign key constraints (only if auth.users table exists)
-- Check if auth.users exists first:
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
        -- Add foreign key constraints if auth.users exists
        BEGIN
            ALTER TABLE public.projects 
            ADD CONSTRAINT fk_projects_user_id 
            FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
        EXCEPTION
            WHEN duplicate_object THEN
                -- Constraint already exists, ignore
                NULL;
        END;
        
        BEGIN
            ALTER TABLE public.tasks 
            ADD CONSTRAINT fk_tasks_user_id 
            FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
        EXCEPTION
            WHEN duplicate_object THEN
                -- Constraint already exists, ignore
                NULL;
        END;
        
        RAISE NOTICE 'Foreign key constraints added successfully';
    ELSE
        RAISE NOTICE 'Auth users table not found. Foreign key constraints skipped.';
        RAISE NOTICE 'Make sure to enable Authentication in your Supabase dashboard';
    END IF;
END
$$;

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tasks_updated_at ON public.tasks;
CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON public.projects;

DROP POLICY IF EXISTS "Users can view own tasks" ON public.tasks;
DROP POLICY IF EXISTS "Users can insert own tasks" ON public.tasks;
DROP POLICY IF EXISTS "Users can update own tasks" ON public.tasks;
DROP POLICY IF EXISTS "Users can delete own tasks" ON public.tasks;

-- Create RLS policies for projects table
CREATE POLICY "Users can view own projects" ON public.projects
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON public.projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON public.projects
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON public.projects
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for tasks table
CREATE POLICY "Users can view own tasks" ON public.tasks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON public.tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON public.tasks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON public.tasks
    FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at);

CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_name ON public.tasks(project_name);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON public.tasks(created_at);

-- Insert some sample projects (optional - remove if not needed)
-- Note: Replace the user_id with your actual user ID from auth.users table
-- You can get this by running: SELECT id FROM auth.users WHERE email = 'your-email@example.com';

-- INSERT INTO public.projects (name, description, color, user_id) VALUES 
-- ('Portfolio Website', 'Personal portfolio and blog website', '#3B82F6', 'your-user-id-here'),
-- ('Task Manager App', 'Todo list and project management application', '#10B981', 'your-user-id-here'),
-- ('E-commerce Platform', 'Online store with payment integration', '#F59E0B', 'your-user-id-here');

-- Insert some sample tasks (optional - remove if not needed)
-- INSERT INTO public.tasks (title, description, project_name, status, priority, due_date, user_id) VALUES 
-- ('Set up development environment', 'Install Node.js, VS Code, and project dependencies', 'Portfolio Website', 'completed', 'high', '2024-01-15', 'your-user-id-here'),
-- ('Design landing page', 'Create wireframes and mockups for the main landing page', 'Portfolio Website', 'in_progress', 'medium', '2024-01-20', 'your-user-id-here'),
-- ('Implement authentication', 'Add user login and registration functionality', 'Task Manager App', 'pending', 'high', '2024-01-25', 'your-user-id-here'),
-- ('Create task CRUD operations', 'Build create, read, update, delete functionality for tasks', 'Task Manager App', 'pending', 'medium', '2024-01-30', 'your-user-id-here');

-- Verify the setup
-- SELECT * FROM public.projects LIMIT 5;
-- SELECT * FROM public.tasks LIMIT 5;
