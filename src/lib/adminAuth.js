// Admin authentication service

// Admin user data - In production, this should be stored securely in your database
const ADMIN_USERS = [
  {
    id: 1,
    username: 'edward',
    email: 'edward@example.com',
    password: 'admin123', // In production, this should be hashed
    role: 'super_admin',
    created_at: '2024-01-01',
    last_login: null,
    is_active: true
  },
  {
    id: 2,
    username: 'admin',
    email: 'admin@example.com',
    password: 'secure456', // In production, this should be hashed
    role: 'admin',
    created_at: '2024-01-01',
    last_login: null,
    is_active: true
  }
];

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
      // Find admin user
      const admin = ADMIN_USERS.find(
        user => (user.username === username || user.email === username) && 
                user.password === password && 
                user.is_active
      );

      if (!admin) {
        throw new Error('Invalid credentials');
      }

      // Update last login (in production, update this in database)
      admin.last_login = new Date().toISOString();

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

      // Log admin activity (optional)
      await this.logAdminActivity('login', 'Admin logged in');

      return {
        success: true,
        admin: this.currentAdmin
      };

    } catch (error) {
      console.error('Authentication error:', error);
      return {
        success: false,
        error: error.message
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

  // Logout admin user
  logout() {
    if (this.currentAdmin) {
      this.logAdminActivity('logout', 'Admin logged out');
    }
    
    this.currentAdmin = null;
    localStorage.removeItem(this.sessionKey);
  }

  // Get all admin users (for management purposes)
  getAllAdmins() {
    return ADMIN_USERS.map(admin => ({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      created_at: admin.created_at,
      last_login: admin.last_login,
      is_active: admin.is_active
    }));
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

    const admin = ADMIN_USERS.find(user => user.id === this.currentAdmin.id);
    if (!admin || admin.password !== oldPassword) {
      throw new Error('Invalid current password');
    }

    // In production, hash the password
    admin.password = newPassword;
    
    await this.logAdminActivity('password_change', 'Admin changed password');
    
    return { success: true };
  }
}

// Create and export singleton instance
export const adminAuth = new AdminAuthService();

// Export the service class for testing
export { AdminAuthService };

// Export admin data for management (remove in production)
export { ADMIN_USERS };
