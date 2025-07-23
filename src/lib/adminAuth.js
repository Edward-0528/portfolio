// Admin authentication service with Supabase integration
import { usersService } from './supabase';

class AdminAuthService {
  constructor() {
    this.currentAdmin = null;
    this.sessionKey = 'portfolio_admin_session';
    
    // Check for existing session on initialization
    this.checkExistingSession();
  }

  // Check if there's an existing valid session
  checkExistingSession() {
    try {
      const sessionData = localStorage.getItem(this.sessionKey);
      if (sessionData) {
        const { admin, timestamp } = JSON.parse(sessionData);
        
        // Check if session is less than 24 hours old
        const sessionAge = Date.now() - timestamp;
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge < maxAge) {
          this.currentAdmin = admin;
          return true;
        } else {
          // Session expired, clear it
          this.logout();
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
      this.logout();
    }
    return false;
  }

  // Authenticate admin user
  async authenticate(username, password) {
    try {
      console.log('Attempting authentication for:', username);
      
      // Authenticate using Supabase database only
      const admin = await usersService.getUserByCredentials(username);
      
      if (!admin) {
        console.error('No user found with username/email:', username);
        throw new Error('Invalid credentials');
      }

      // Check password (in production, use proper password hashing)
      console.log('Checking password for user:', admin.username);
      if (admin.password !== password) {
        console.error('Password mismatch for user:', admin.username);
        throw new Error('Invalid credentials');
      }

      console.log('Authentication successful for:', admin.username);

      // Update last login
      try {
        await usersService.updateLastLogin(admin.id);
        admin.last_login = new Date().toISOString();
      } catch (error) {
        console.warn('Could not update last login in database:', error);
      }

      // Create session
      this.currentAdmin = {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        last_login: admin.last_login
      };

      // Store session in localStorage
      const sessionData = {
        admin: this.currentAdmin,
        timestamp: Date.now()
      };
      localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));

      // Log admin activity
      await this.logAdminActivity('login', 'Admin logged in');

      return {
        success: true,
        admin: this.currentAdmin
      };

    } catch (error) {
      console.error('Authentication error:', error);
      return {
        success: false,
        error: error.message || 'Authentication failed'
      };
    }
  }

  // Check if user is currently authenticated
  isAuthenticated() {
    return this.currentAdmin !== null;
  }

  // Get current admin user
  getCurrentAdmin() {
    return this.currentAdmin;
  }

  // Get current user (alias for getCurrentAdmin for consistency)
  getCurrentUser() {
    return this.currentAdmin;
  }

  // Logout admin user
  logout() {
    if (this.currentAdmin) {
      this.logAdminActivity('logout', 'Admin logged out');
    }
    
    this.currentAdmin = null;
    localStorage.removeItem(this.sessionKey);
  }

  // Get all admin users (for management purposes)
  async getAllAdmins() {
    try {
      // Get users from Supabase database
      const users = await usersService.getAllUsers();
      return users.map(admin => ({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        created_at: admin.created_at,
        last_login: admin.last_login,
        is_active: admin.is_active
      }));
    } catch (error) {
      console.error('Error getting admin users from database:', error);
      throw new Error('Failed to retrieve admin users from database');
    }
  }

  // Log admin activity (optional logging to database)
  async logAdminActivity(action, description) {
    try {
      const logEntry = {
        admin_id: this.currentAdmin?.id || null,
        admin_username: this.currentAdmin?.username || 'unknown',
        action: action,
        description: description,
        timestamp: new Date().toISOString(),
        ip_address: 'localhost', // In production, get real IP
        user_agent: navigator.userAgent
      };

      // For now, just log to console (in production, store in database)
      console.log('Admin Activity:', logEntry);
      
    } catch (error) {
      console.error('Error logging admin activity:', error);
    }
  }

  // Validate session and refresh if needed
  async validateSession() {
    if (!this.isAuthenticated()) {
      return false;
    }

    try {
      // Check if session is still valid
      const sessionData = localStorage.getItem(this.sessionKey);
      if (!sessionData) {
        this.logout();
        return false;
      }

      const { timestamp } = JSON.parse(sessionData);
      const sessionAge = Date.now() - timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (sessionAge >= maxAge) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      this.logout();
      return false;
    }
  }

  // Change admin password (for future use)
  async changePassword(oldPassword, newPassword) {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    try {
      // Try to update in Supabase first
      const user = await usersService.getUserById(this.currentAdmin.id);
      if (!user || user.password !== oldPassword) {
        throw new Error('Invalid current password');
      }

      await usersService.updateUser(this.currentAdmin.id, { password: newPassword });
      await this.logAdminActivity('password_change', 'Admin changed password');
      
      return { success: true };
    } catch (error) {
      console.error('Error changing password:', error);
      throw new Error('Failed to change password');
    }
  }

  // Create new admin user
  async createUser(userData) {
    try {
      const newUser = await usersService.createUser(userData);
      await this.logAdminActivity('user_create', `Created user: ${userData.username}`);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update admin user
  async updateUser(id, userData) {
    try {
      const updatedUser = await usersService.updateUser(id, userData);
      await this.logAdminActivity('user_update', `Updated user ID: ${id}`);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete admin user
  async deleteUser(id) {
    try {
      await usersService.deleteUser(id);
      await this.logAdminActivity('user_delete', `Deleted user ID: ${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
export const adminAuth = new AdminAuthService();

// Export the service class for testing
export { AdminAuthService };
