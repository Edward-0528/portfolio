// Supabase Auth-based admin authentication service
import { authService } from './supabase';

class SupabaseAuthAdminService {
  constructor() {
    this.currentUser = null;
    this.currentSession = null;
    this.sessionKey = 'portfolio_admin_session';
    
    // Initialize auth state
    this.initializeAuth();
  }

  // Initialize authentication state
  async initializeAuth() {
    try {
      // Check for existing session
      const session = await authService.getCurrentSession();
      if (session) {
        this.currentSession = session;
        this.currentUser = session.user;
        console.log('Existing session found for:', session.user.email);
      }

      // Listen to auth changes
      authService.onAuthStateChange((event, session) => {
        console.log('Auth event:', event);
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          this.currentSession = session;
          this.currentUser = session?.user || null;
        } else if (event === 'SIGNED_OUT') {
          this.currentSession = null;
          this.currentUser = null;
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  // Authenticate admin user using Supabase Auth
  async authenticate(email, password) {
    try {
      console.log('Attempting Supabase Auth authentication for:', email);
      
      const result = await authService.signIn(email, password);
      
      if (!result.success) {
        throw new Error(result.error || 'Authentication failed');
      }

      this.currentUser = result.user;
      this.currentSession = result.session;

      console.log('Authentication successful for:', result.user.email);

      return {
        success: true,
        admin: {
          id: result.user.id,
          username: result.user.user_metadata?.username || result.user.email.split('@')[0],
          email: result.user.email,
          role: result.user.user_metadata?.role || 'admin',
          last_login: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('Authentication error:', error);
      return {
        success: false,
        error: error.message || 'Authentication failed'
      };
    }
  }

  // Alias for authenticate method for consistency with auth patterns
  async signIn(email, password) {
    return this.authenticate(email, password);
  }

  // Get current admin user
  getCurrentAdmin() {
    if (!this.currentUser) return null;
    
    return {
      id: this.currentUser.id,
      username: this.currentUser.user_metadata?.username || this.currentUser.email.split('@')[0],
      email: this.currentUser.email,
      role: this.currentUser.user_metadata?.role || 'admin',
      last_login: this.currentUser.last_sign_in_at
    };
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!(this.currentUser && this.currentSession);
  }

  // Logout admin user
  async logout() {
    try {
      const result = await authService.signOut();
      if (result.success) {
        this.currentUser = null;
        this.currentSession = null;
        console.log('Logout successful');
      }
      return result;
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all admin users (placeholder - you might want to implement this differently)
  async getAllAdmins() {
    try {
      // Note: This would require a custom function or different approach
      // since Supabase Auth users are not directly queryable from client
      console.log('getAllAdmins called - this needs backend implementation');
      return [];
    } catch (error) {
      console.error('Error getting admin users:', error);
      throw new Error('Failed to retrieve admin users');
    }
  }
}

// Create and export singleton instance
export const supabaseAuthAdmin = new SupabaseAuthAdminService();
export default supabaseAuthAdmin;
