-- Create projects table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    technologies TEXT[], -- Array of technology strings
    image VARCHAR(500),
    github VARCHAR(500),
    live VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);

-- Create an index on featured for faster featured project queries
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows public read access
CREATE POLICY "Allow public read access" ON public.projects
    FOR SELECT USING (true);

-- Create a policy for authenticated users to insert/update/delete
-- (You can modify this based on your security needs)
CREATE POLICY "Allow authenticated users full access" ON public.projects
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert your existing projects data
INSERT INTO public.projects (title, category, description, technologies, image, github, live, featured) VALUES
(
    'Budget App',
    'React',
    'A comprehensive budget management application featuring intuitive UI/UX design and interactive MUI graphs for visualizing incoming and outgoing transactions. Perfect for personal financial tracking.',
    ARRAY['React JS', 'Tailwind CSS', 'MUI', 'Local Storage'],
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    'https://github.com/Edward-0528/budget-app',
    'https://budgetappedward.netlify.app',
    true
),
(
    'Weather App',
    'React',
    'A modern weather application that provides real-time weather data using Open Mateo API with automatic location detection. Features clean UI design and responsive mobile-first approach.',
    ARRAY['React JS', 'Tailwind CSS', 'Open Mateo API', 'Geolocation API'],
    'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    'https://github.com/Edward-0528/weather-app',
    'https://weatherappedward.netlify.app',
    true
),
(
    'E-Commerce Platform',
    'React',
    'A full-featured e-commerce application built with AI assistance for UI/UX design. Includes shopping cart functionality, user authentication, and persistent cart data using Supabase database.',
    ARRAY['React JS', 'Tailwind CSS', 'Supabase', 'Gemini AI'],
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    'https://github.com/Edward-0528/ecommerce-app',
    'https://ecomedward.netlify.app',
    true
),
(
    'Portfolio Website',
    'React',
    'This very portfolio website showcasing my projects and skills, built with React and Tailwind CSS. Features responsive design, smooth animations, and modern UI components.',
    ARRAY['React', 'Tailwind CSS', 'Responsive Design', 'React Icons'],
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    'https://github.com/Edward-0528/portfolio',
    'https://edwardgranados.netlify.app',
    false
),
(
    'Android Mobile Apps',
    'Mobile',
    'Collection of Android applications developed using Android Studio, showcasing mobile development skills and understanding of Android ecosystem.',
    ARRAY['Android Studio', 'Java', 'XML', 'Material Design'],
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    'https://github.com/Edward-0528/android-projects',
    '#',
    false
),
(
    'Unity Game Projects',
    'Game Development',
    'Educational game development projects created while teaching middle school students app development and video game creation using Unity.',
    ARRAY['Unity', 'C#', 'Game Development', 'Educational Tools'],
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    'https://github.com/Edward-0528/unity-games',
    '#',
    false
);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.projects TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
