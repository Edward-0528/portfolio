// Simple client-side analytics tracking for portfolio
// This tracks basic visitor data without external dependencies

class PortfolioAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.pageViews = [];
    this.sectionViews = new Set();
    this.storageKey = 'portfolio_analytics';
    
    this.init();
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Initialize tracking
  init() {
    // Track page load
    this.trackPageView(window.location.pathname);
    
    // Track section scrolling
    this.initSectionTracking();
    
    // Track visitor info
    this.trackVisitorInfo();
    
    // Save data periodically
    setInterval(() => this.saveData(), 30000); // Save every 30 seconds
    
    // Save on page unload
    window.addEventListener('beforeunload', () => this.saveData());
  }

  // Track page views
  trackPageView(path = window.location.pathname) {
    const pageView = {
      path,
      timestamp: Date.now(),
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      sessionId: this.sessionId
    };
    
    this.pageViews.push(pageView);
    console.log('Page view tracked:', path);
  }

  // Track section views using Intersection Observer
  initSectionTracking() {
    const sections = document.querySelectorAll('[data-section]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const sectionName = entry.target.getAttribute('data-section');
          if (sectionName && !this.sectionViews.has(sectionName)) {
            this.sectionViews.add(sectionName);
            this.trackSectionView(sectionName);
          }
        }
      });
    }, {
      threshold: [0.5] // Trigger when 50% of section is visible
    });

    sections.forEach(section => observer.observe(section));
  }

  // Track individual section views
  trackSectionView(sectionName) {
    const sectionView = {
      section: sectionName,
      timestamp: Date.now(),
      sessionId: this.sessionId
    };
    
    // Store in session storage for immediate access
    const currentViews = JSON.parse(sessionStorage.getItem('section_views') || '[]');
    currentViews.push(sectionView);
    sessionStorage.setItem('section_views', JSON.stringify(currentViews));
    
    console.log('Section view tracked:', sectionName);
  }

  // Track visitor information
  trackVisitorInfo() {
    const visitorInfo = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer
    };

    // Detect device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?=.*Tablet)|Tablet/i.test(navigator.userAgent);
    
    visitorInfo.deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    
    // Store visitor info
    localStorage.setItem('visitor_info_' + this.sessionId, JSON.stringify(visitorInfo));
  }

  // Save analytics data to localStorage
  saveData() {
    const analyticsData = {
      sessionId: this.sessionId,
      startTime: this.startTime,
      lastUpdate: Date.now(),
      timeOnSite: Date.now() - this.startTime,
      pageViews: this.pageViews,
      sectionViews: Array.from(this.sectionViews),
      totalSections: this.sectionViews.size
    };

    try {
      // Get existing data
      const existingData = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      
      // Update or add current session
      const sessionIndex = existingData.findIndex(session => session.sessionId === this.sessionId);
      if (sessionIndex >= 0) {
        existingData[sessionIndex] = analyticsData;
      } else {
        existingData.push(analyticsData);
      }
      
      // Keep only last 100 sessions to prevent localStorage bloat
      const recentData = existingData.slice(-100);
      
      localStorage.setItem(this.storageKey, JSON.stringify(recentData));
    } catch (error) {
      console.warn('Failed to save analytics data:', error);
    }
  }

  // Get analytics data for admin dashboard
  static getAnalyticsData() {
    try {
      const data = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
      // Note: sectionViews data is processed within calculateSectionEngagement
      
      // Process data for dashboard
      const processed = {
        totalSessions: data.length,
        totalPageViews: data.reduce((sum, session) => sum + session.pageViews.length, 0),
        uniqueVisitors: new Set(data.map(session => session.sessionId)).size,
        averageTimeOnSite: data.length > 0 ? 
          data.reduce((sum, session) => sum + (session.timeOnSite || 0), 0) / data.length : 0,
        sectionEngagement: this.calculateSectionEngagement(data),
        deviceBreakdown: this.calculateDeviceBreakdown(),
        dailyViews: this.calculateDailyViews(data),
        recentSessions: data.slice(-10).reverse()
      };
      
      return processed;
    } catch (error) {
      console.error('Error retrieving analytics data:', error);
      return null;
    }
  }

  // Calculate section engagement percentages
  static calculateSectionEngagement(sessions) {
    const sectionCounts = {};
    const totalSessions = sessions.length;
    
    sessions.forEach(session => {
      if (session.sectionViews) {
        session.sectionViews.forEach(section => {
          sectionCounts[section] = (sectionCounts[section] || 0) + 1;
        });
      }
    });
    
    // Convert to percentages
    const engagement = {};
    Object.keys(sectionCounts).forEach(section => {
      engagement[section] = totalSessions > 0 ? 
        Math.round((sectionCounts[section] / totalSessions) * 100) : 0;
    });
    
    return engagement;
  }

  // Calculate device type breakdown
  static calculateDeviceBreakdown() {
    try {
      const visitorKeys = Object.keys(localStorage).filter(key => key.startsWith('visitor_info_'));
      const deviceCounts = { desktop: 0, mobile: 0, tablet: 0 };
      
      visitorKeys.forEach(key => {
        try {
          const visitorInfo = JSON.parse(localStorage.getItem(key));
          if (visitorInfo.deviceType) {
            deviceCounts[visitorInfo.deviceType]++;
          }
        } catch (e) {
          // Skip invalid entries
        }
      });
      
      const total = Object.values(deviceCounts).reduce((sum, count) => sum + count, 0);
      
      if (total === 0) return { desktop: 0, mobile: 0, tablet: 0 };
      
      return {
        desktop: Math.round((deviceCounts.desktop / total) * 100),
        mobile: Math.round((deviceCounts.mobile / total) * 100),
        tablet: Math.round((deviceCounts.tablet / total) * 100)
      };
    } catch (error) {
      return { desktop: 0, mobile: 0, tablet: 0 };
    }
  }

  // Calculate daily page views for the last 7 days
  static calculateDailyViews(sessions) {
    const dailyViews = new Array(7).fill(0);
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    sessions.forEach(session => {
      session.pageViews.forEach(pageView => {
        const daysDiff = Math.floor((now - pageView.timestamp) / oneDayMs);
        if (daysDiff >= 0 && daysDiff < 7) {
          dailyViews[6 - daysDiff]++;
        }
      });
    });
    
    return dailyViews;
  }

  // Clean up old data (call this occasionally)
  static cleanupOldData() {
    try {
      // Remove visitor info older than 30 days
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('visitor_info_')) {
          try {
            const visitorInfo = JSON.parse(localStorage.getItem(key));
            if (visitorInfo.timestamp < thirtyDaysAgo) {
              localStorage.removeItem(key);
            }
          } catch (e) {
            localStorage.removeItem(key); // Remove invalid entries
          }
        }
      });
      
    } catch (error) {
      console.warn('Error cleaning up analytics data:', error);
    }
  }
}

// Auto-initialize when script loads (unless in admin mode)
if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin')) {
  window.portfolioAnalytics = new PortfolioAnalytics();
}

export default PortfolioAnalytics;
