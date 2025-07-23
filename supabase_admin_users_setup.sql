-- SQL script to create admin_users table in Supabase
-- Run this in your Supabase SQL Editor

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- In production, store hashed passwords
    role VARCHAR(20) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);

-- Insert default admin users (you can modify these)
INSERT INTO admin_users (username, email, password, role, is_active)
VALUES 
    ('edward', 'edward@example.com', 'admin123', 'super_admin', true),
    ('admin', 'admin@example.com', 'secure456', 'admin', true)
ON CONFLICT (username) DO NOTHING;

-- Set up Row Level Security (RLS) - Optional but recommended
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (you may want to modify this based on your needs)
CREATE POLICY "Allow all operations for admin_users" ON admin_users
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for safe user data (without passwords)
CREATE OR REPLACE VIEW admin_users_safe AS
SELECT 
    id,
    username,
    email,
    role,
    is_active,
    created_at,
    updated_at,
    last_login
FROM admin_users;

COMMENT ON TABLE admin_users IS 'Admin users table for portfolio application';
COMMENT ON COLUMN admin_users.role IS 'User role: admin or super_admin';
COMMENT ON COLUMN admin_users.is_active IS 'Whether the user account is active';
COMMENT ON COLUMN admin_users.last_login IS 'Timestamp of last successful login';
