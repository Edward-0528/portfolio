# Supabase Integration Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Click "New Project" 
3. Choose your organization and fill in:
   - Project name: `portfolio-projects`
   - Database password: Choose a strong password
   - Region: Choose closest to your users
4. Wait for the project to be created (2-3 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - **Project URL** (something like: `https://your-project-ref.supabase.co`)
   - **API Key (anon public)** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
REACT_APP_SUPABASE_URL=https://your-project-ref.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Set Up the Database

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the entire content from `database/setup.sql`
3. Paste it into the SQL Editor and click "Run"
4. This will create the `projects` table and insert your existing project data

## Step 5: Test the Integration

1. Start your development server: `npm start`
2. Navigate to your Projects section
3. Your projects should now load from Supabase!

## Step 6: Access the Admin Panel (Optional)

To manage your projects through a web interface:

1. Add this route to your App.js (for development only):

```jsx
// Add this import
import ProjectAdmin from './components/ProjectAdmin';

// Add this route (only for development)
{process.env.NODE_ENV === 'development' && (
  <Route path="/admin" element={<ProjectAdmin />} />
)}
```

2. Visit `http://localhost:3000/admin` to add, edit, or delete projects

## Database Schema

Your `projects` table includes:
- `id`: Auto-incrementing primary key
- `title`: Project title
- `category`: Project category (React, Mobile, Game Development)
- `description`: Project description
- `technologies`: Array of technology strings
- `image`: Project image URL
- `github`: GitHub repository URL
- `live`: Live demo URL
- `featured`: Boolean for featured projects
- `created_at`: Timestamp when created
- `updated_at`: Timestamp when last updated

## Security Notes

- The current setup allows public read access to projects
- Write access requires authentication (you'll need to implement auth for production)
- Never commit your `.env` file to version control
- For production, consider implementing proper authentication and authorization

## Troubleshooting

### "Invalid URL" Error
1. **Restart your development server** after updating `.env` file
2. Make sure there are **no spaces** around the `=` in your `.env` file
3. Ensure your `.env` file is in the **root directory** (same level as package.json)
4. Check that your Supabase URL starts with `https://` and ends with `.supabase.co`
5. Open browser console (F12) to see detailed error messages
6. Verify environment variables are loaded by checking the console logs

### Projects not loading from Supabase
1. Check your `.env` file has correct credentials
2. Verify the `projects` table exists in Supabase
3. Check browser console for error messages
4. Ensure your Supabase project is active
5. Make sure you've run the SQL setup script

### Database connection errors
1. Verify your Supabase URL and API key
2. Check if your project is paused (free tier limitation)
3. Ensure Row Level Security policies are set correctly
4. Test the connection in Supabase dashboard

### Environment variables not loading
1. **Restart your development server** completely (Ctrl+C then `npm start`)
2. Check `.env` file format:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-key-here
   ```
3. No quotes, no spaces around `=`
4. File must be named exactly `.env` (not `.env.txt`)

### Build/deployment issues
1. Make sure environment variables are set in your hosting platform
2. Verify that the `.env` file is not included in your build
3. Check that all Supabase dependencies are installed

## Next Steps

1. **Authentication**: Add user authentication to secure admin functions
2. **Image Upload**: Implement image upload to Supabase Storage
3. **Categories Management**: Create dynamic category management
4. **Analytics**: Track project views and interactions
5. **Backup**: Set up regular database backups

## Useful Supabase Features to Explore

- **Real-time subscriptions**: Live updates when projects change
- **Storage**: Upload and serve project images
- **Edge Functions**: Server-side logic
- **Authentication**: User management and access control
