// Debug component to test Supabase Auth
import React, { useState, useEffect } from 'react';
import { authService } from '../lib/supabase';
import { supabaseAuthAdmin } from '../lib/supabaseAuth';

const AuthDebugger = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [testCredentials, setTestCredentials] = useState({
    email: '',
    password: ''
  });
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    
    // Listen to auth changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, session);
      setSession(session);
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentSession = await authService.getCurrentSession();
      const currentUser = await authService.getCurrentUser();
      
      setSession(currentSession);
      setUser(currentUser);
      
      console.log('Current session:', currentSession);
      console.log('Current user:', currentUser);
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const handleTestLogin = async () => {
    setLoading(true);
    setTestResult('');
    
    try {
      console.log('Testing login with:', testCredentials.email);
      const result = await supabaseAuthAdmin.signIn(testCredentials.email, testCredentials.password);
      
      setTestResult(JSON.stringify(result, null, 2));
      console.log('Login test result:', result);
    } catch (error) {
      setTestResult(`Error: ${error.message}`);
      console.error('Login test error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const result = await authService.signOut();
      console.log('Sign out result:', result);
      setTestResult('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      setTestResult(`Sign out error: ${error.message}`);
    }
  };

  if (!window.location.search.includes('debug=auth')) {
    return null; // Only show when ?debug=auth is in URL
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      border: '2px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '400px',
      maxHeight: '80vh',
      overflow: 'auto',
      zIndex: 10000,
      fontSize: '12px'
    }}>
      <h3>🔍 Auth Debugger</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Session Status:</strong>
        <div style={{ background: '#f5f5f5', padding: '5px', marginTop: '5px' }}>
          {session ? '✅ Active' : '❌ No session'}
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>User:</strong>
        <div style={{ background: '#f5f5f5', padding: '5px', marginTop: '5px', fontSize: '10px' }}>
          {user ? user.email : 'Not logged in'}
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Test Login:</strong>
        <input
          type="email"
          placeholder="Email"
          value={testCredentials.email}
          onChange={(e) => setTestCredentials({...testCredentials, email: e.target.value})}
          style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={testCredentials.password}
          onChange={(e) => setTestCredentials({...testCredentials, password: e.target.value})}
          style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
        />
        <button 
          onClick={handleTestLogin} 
          disabled={loading}
          style={{ marginRight: '5px', padding: '5px 10px' }}
        >
          {loading ? 'Testing...' : 'Test Login'}
        </button>
        <button 
          onClick={handleSignOut}
          style={{ padding: '5px 10px' }}
        >
          Sign Out
        </button>
      </div>

      {testResult && (
        <div style={{ marginBottom: '15px' }}>
          <strong>Result:</strong>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '5px', 
            marginTop: '5px', 
            fontSize: '10px',
            whiteSpace: 'pre-wrap',
            maxHeight: '200px',
            overflow: 'auto'
          }}>
            {testResult}
          </pre>
        </div>
      )}

      <div style={{ fontSize: '10px', color: '#666' }}>
        💡 Add ?debug=auth to URL to show this debugger
      </div>
    </div>
  );
};

export default AuthDebugger;
