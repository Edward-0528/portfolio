import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Only create client if both URL and key are available
let supabase = null
if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log('Supabase client initialized successfully')
  } catch (error) {
    console.error('Error creating Supabase client:', error)
  }
} else {
  console.error('Supabase credentials not found. Please check your .env file.')
}

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
    if (!supabase) {
      throw new Error('Supabase not initialized')
    }
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      return data[0]
    } catch (error) {
      console.error('Error adding project:', error)
      throw error
    }
  },

  // Update project
  async updateProject(id, updates) {
    if (!supabase) {
      throw new Error('Supabase not initialized')
    }
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      return data[0]
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  },

  // Delete project
  async deleteProject(id) {
    if (!supabase) {
      throw new Error('Supabase not initialized')
    }
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      return true
    } catch (error) {
      console.error('Error deleting project:', error)
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
      const { data, error } = await supabase
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
    if (!supabase) {
      throw new Error('Database not available')
    }
    
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Database error:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Error fetching users:', error)
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
