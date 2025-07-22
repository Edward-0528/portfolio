import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Log environment variables for debugging (remove in production)
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseKey ? 'Key loaded successfully' : 'Key not found')

// Only create client if both URL and key are available
let supabase = null
if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log('Supabase client created successfully')
  } catch (error) {
    console.error('Error creating Supabase client:', error)
  }
} else {
  console.warn('Supabase credentials not found. Using fallback data.')
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
