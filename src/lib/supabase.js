import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Create Supabase client with auth persistence
let supabase = null
if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
    console.log('Supabase client initialized successfully with auth')
  } catch (error) {
    console.error('Error creating Supabase client:', error)
  }
} else {
  console.error('Supabase credentials not found. Please check your .env file.')
}

// Export the supabase client
export { supabase };

// 🔒 SECURITY: Now using Supabase Auth + RLS for secure operations
// Users authenticate through Supabase, RLS policies control access

// Authentication service using Supabase Auth
export const authService = {
  // Sign in with email/password
  async signIn(email, password) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    try {
      console.log('Attempting Supabase Auth sign in for:', email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        console.error('Sign in error:', error)
        throw error
      }
      
      console.log('Sign in successful:', data.user?.email)
      return { success: true, user: data.user, session: data.session }
    } catch (error) {
      console.error('Auth sign in failed:', error)
      return { success: false, error: error.message }
    }
  },

  // Sign out
  async signOut() {
    if (!supabase) throw new Error('Supabase not initialized')
    
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      console.log('Sign out successful')
      return { success: true }
    } catch (error) {
      console.error('Sign out error:', error)
      return { success: false, error: error.message }
    }
  },

  // Get current user
  async getCurrentUser() {
    if (!supabase) throw new Error('Supabase not initialized')
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  },

  // Get current session
  async getCurrentSession() {
    if (!supabase) throw new Error('Supabase not initialized')
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error) {
      console.error('Get current session error:', error)
      return null
    }
  },

  // Listen to auth changes
  onAuthStateChange(callback) {
    if (!supabase) throw new Error('Supabase not initialized')
    
    return supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)
      callback(event, session)
    })
  }
};

// Database functions for projects
export const projectsService = {
  // Get all projects
  async getAllProjects() {
    if (!supabase) {
      console.warn('Supabase not initialized. Returning empty array.')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  },

  // Get featured projects
  async getFeaturedProjects() {
    if (!supabase) {
      console.warn('Supabase not initialized. Returning empty array.')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Error fetching featured projects:', error)
      return []
    }
  },

  // Add new project
  async addProject(project) {
    console.log('Supabase addProject: Starting add...');
    console.log('Supabase addProject: Project data:', project);
    
    if (!supabase) {
      console.error('Supabase addProject: No Supabase client available');
      throw new Error('Supabase not initialized')
    }
    
    try {
      console.log('Supabase addProject: Executing insert...');
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
      
      if (error) {
        console.error('Supabase addProject: Database error:', error)
        throw error
      }
      console.log('Supabase addProject: Success, returned data:', data);
      return data[0]
    } catch (error) {
      console.error('Supabase addProject: Error adding project:', error)
      throw error
    }
  },

  // Update project
  async updateProject(id, updates) {
    console.log('Supabase updateProject: Starting update...');
    console.log('Supabase updateProject: ID:', id);
    console.log('Supabase updateProject: Updates:', updates);
    
    if (!supabase) {
      console.error('Supabase updateProject: No Supabase client available');
      throw new Error('Supabase not initialized')
    }
    
    try {
      console.log('Supabase updateProject: Executing query...');
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) {
        console.error('Supabase updateProject: Database error:', error)
        throw error
      }
      console.log('Supabase updateProject: Success, returned data:', data);
      return data[0]
    } catch (error) {
      console.error('Supabase updateProject: Error updating project:', error)
      throw error
    }
  },

  // Delete project
  async deleteProject(id) {
    console.log('Supabase deleteProject: Starting delete...');
    console.log('Supabase deleteProject: ID:', id);
    
    if (!supabase) {
      console.error('Supabase deleteProject: No Supabase client available');
      throw new Error('Supabase not initialized')
    }
    
    try {
      console.log('Supabase deleteProject: Executing delete...');
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Supabase deleteProject: Database error:', error)
        throw error
      }
      console.log('Supabase deleteProject: Success');
      return true
    } catch (error) {
      console.error('Supabase deleteProject: Error deleting project:', error)
      throw error
    }
  },

  // Get projects by category
  async getProjectsByCategory(category) {
    if (!supabase) {
      console.warn('Supabase not initialized. Returning empty array.')
      return []
    }
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Error fetching projects by category:', error)
      return []
    }
  }
}

// Database functions for admin users
export const usersService = {
  // Test database connection
  async testConnection() {
    if (!supabase) {
      throw new Error('Supabase not initialized')
    }
    
    try {
      const { error } = await supabase
        .from('admin_users')
        .select('id')
        .limit(1);
      
      if (error) {
        throw new Error(`Database connection failed: ${error.message}`);
      }
      
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      throw error;
    }
  },
  // Get all admin users
  async getAllUsers() {
    console.log('Supabase getAllUsers: Starting...');
    if (!supabase) {
      console.error('Supabase getAllUsers: Database not available');
      throw new Error('Database not available')
    }
    
    try {
      console.log('Supabase getAllUsers: Querying admin_users table...');
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase getAllUsers: Database error:', error)
        throw error
      }
      console.log('Supabase getAllUsers: Query successful, data:', data);
      return data || []
    } catch (error) {
      console.error('Supabase getAllUsers: Error fetching users:', error)
      throw error
    }
  },

  // Get user by ID
  async getUserById(id) {
    if (!supabase) {
      throw new Error('Database not available')
    }
    
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        console.error('Database error:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  },

  // Get user by username or email (for authentication)
  async getUserByCredentials(usernameOrEmail) {
    if (!supabase) {
      throw new Error('Database not available')
    }
    
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .or(`username.eq.${usernameOrEmail},email.eq.${usernameOrEmail}`)
        .eq('is_active', true)
        .single()
      
      if (error) {
        console.error('Database error:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Error fetching user by credentials:', error)
      throw error
    }
  },

  // Create new user
  async createUser(userData) {
    if (!supabase) {
      throw new Error('Database not available')
    }
    
    try {
      const insertData = {
        ...userData,
        created_at: new Date().toISOString(),
        last_login: null
      };
      
      const { data, error } = await supabase
        .from('admin_users')
        .insert([insertData])
        .select()
        .single()
      
      if (error) {
        console.error('Database error creating user:', error)
        throw error
      }
      
      return data
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  },

  // Update user
  async updateUser(id, userData) {
    if (!supabase) {
      throw new Error('Database not available')
    }
    
    try {
      const updateData = {
        ...userData,
        updated_at: new Date().toISOString()
      }

      // Don't update password if it's empty
      if (!updateData.password || updateData.password.trim() === '') {
        delete updateData.password
      }

      const { data, error } = await supabase
        .from('admin_users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('Database error:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  },

  // Delete user
  async deleteUser(id) {
    if (!supabase) {
      throw new Error('Database not available')
    }
    
    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Database error:', error)
        throw error
      }
      return true
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  },

  // Update last login
  async updateLastLogin(id) {
    if (!supabase) {
      console.warn('Database not available for login update')
      return
    }
    
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', id)
      
      if (error) {
        console.error('Database error updating last login:', error)
      }
    } catch (error) {
      console.error('Error updating last login:', error)
    }
  }
}
