-- Core Plus Dashboard Database Schema
-- Run this in your Supabase SQL Editor to create the necessary tables

-- ============================================
-- 1. CREATE INFLUENCERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS influencers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  affiliate_code TEXT UNIQUE NOT NULL,
  commission_rate DECIMAL(5, 2) DEFAULT 10.00,
  status TEXT DEFAULT 'active',
  total_signups INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_revenue DECIMAL(10, 2) DEFAULT 0.00,
  total_commission DECIMAL(10, 2) DEFAULT 0.00,
  social_media JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_influencers_affiliate_code ON influencers(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_influencers_status ON influencers(status);

-- ============================================
-- 2. CREATE AFFILIATE_USAGE TABLE (if not exists)
-- ============================================
CREATE TABLE IF NOT EXISTS affiliate_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES influencers(id),
  affiliate_code TEXT NOT NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  signup_completed BOOLEAN DEFAULT FALSE,
  subscription_started BOOLEAN DEFAULT FALSE,
  subscription_start_date TIMESTAMPTZ,
  subscription_plan TEXT,
  subscription_amount DECIMAL(10, 2),
  commission_eligible BOOLEAN DEFAULT FALSE,
  commission_amount DECIMAL(10, 2),
  referral_source TEXT DEFAULT 'signup',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_affiliate_usage_user_id ON affiliate_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_usage_affiliate_code ON affiliate_usage(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_affiliate_usage_influencer_id ON affiliate_usage(influencer_id);

-- ============================================
-- 3. CREATE USER_FEEDBACK TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  feedback_type TEXT NOT NULL,
  category TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  sentiment TEXT,
  status TEXT DEFAULT 'new',
  platform TEXT DEFAULT 'mobile',
  app_version TEXT,
  device_info JSONB,
  screenshot_url TEXT,
  admin_notes TEXT,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_type ON user_feedback(feedback_type);
CREATE INDEX IF NOT EXISTS idx_user_feedback_status ON user_feedback(status);
CREATE INDEX IF NOT EXISTS idx_user_feedback_created_at ON user_feedback(created_at DESC);

-- ============================================
-- 4. CREATE ADMIN_USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role TEXT NOT NULL DEFAULT 'viewer',
  permissions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);

-- ============================================
-- 5. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. CREATE RLS POLICIES FOR AFFILIATE_USAGE
-- ============================================
-- Allow admins to view all affiliate usage
CREATE POLICY "Admins can view affiliate usage" ON affiliate_usage
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'manager', 'viewer')
    )
  );

-- Allow admins to update affiliate usage
CREATE POLICY "Admins can update affiliate usage" ON affiliate_usage
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'manager')
    )
  );

-- Allow admins to insert affiliate usage
CREATE POLICY "Admins can insert affiliate usage" ON affiliate_usage
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'manager')
    )
  );

-- ============================================
-- 7. CREATE RLS POLICIES FOR INFLUENCERS
-- ============================================
-- Allow admins to view all influencers
CREATE POLICY "Admins can view influencers" ON influencers
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- Allow admins to manage influencers
CREATE POLICY "Admins can manage influencers" ON influencers
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'manager')
    )
  );

-- ============================================
-- 8. CREATE RLS POLICIES FOR USER_FEEDBACK
-- ============================================
-- Users can submit their own feedback
CREATE POLICY "Users can submit feedback" ON user_feedback
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback" ON user_feedback
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all feedback
CREATE POLICY "Admins can view all feedback" ON user_feedback
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- Admins can update feedback
CREATE POLICY "Admins can update feedback" ON user_feedback
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'manager')
    )
  );

-- ============================================
-- 9. CREATE RLS POLICIES FOR ADMIN_USERS
-- ============================================
-- Only admins can view admin_users
CREATE POLICY "Admins can view admin users" ON admin_users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.user_id = auth.uid()
      AND au.role IN ('admin', 'manager')
    )
  );

-- ============================================
-- 10. CREATE SAMPLE DATA
-- ============================================
-- Insert sample influencers
INSERT INTO influencers (name, email, affiliate_code, commission_rate, status) VALUES
  ('Test Influencer 1', 'test1@example.com', 'TEST2025', 12.00, 'active'),
  ('Test Influencer 2', 'test2@example.com', 'BETA2025', 10.00, 'active')
ON CONFLICT (affiliate_code) DO NOTHING;

-- ============================================
-- 11. GRANT YOURSELF ADMIN ACCESS
-- ============================================
-- Replace 'your-email@example.com' with your actual Supabase auth email
-- First, find your user ID by running: SELECT id, email FROM auth.users;
-- Then insert yourself as an admin:

-- INSERT INTO admin_users (user_id, role, permissions)
-- SELECT id, 'admin', '["all"]'::jsonb
-- FROM auth.users
-- WHERE email = 'your-email@example.com'
-- ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- 12. USEFUL QUERIES FOR DEBUGGING
-- ============================================

-- View all affiliate usage
-- SELECT * FROM affiliate_usage ORDER BY created_at DESC;

-- View all feedback
-- SELECT * FROM user_feedback ORDER BY created_at DESC;

-- View affiliate summary
-- SELECT 
--   affiliate_code,
--   COUNT(*) as total_uses,
--   COUNT(CASE WHEN signup_completed THEN 1 END) as signups,
--   COUNT(CASE WHEN subscription_started THEN 1 END) as conversions,
--   SUM(subscription_amount) as total_revenue
-- FROM affiliate_usage
-- GROUP BY affiliate_code
-- ORDER BY total_uses DESC;

-- View feedback statistics
-- SELECT 
--   status,
--   COUNT(*) as count
-- FROM user_feedback
-- GROUP BY status;

-- ============================================
-- NOTES:
-- ============================================
-- 1. Make sure to grant yourself admin access by running query #11
-- 2. Update the email in query #11 to your Supabase auth email
-- 3. You may need to insert some test data to see the dashboard in action
-- 4. Check that RLS is working by testing queries as different users
