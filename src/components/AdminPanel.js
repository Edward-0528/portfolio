import React, { useState } from 'react';
import Header from './Header';
import ProjectAdmin from './ProjectAdmin';
import UserAdmin from './UserAdmin';
import Analytics from './Analytics';
import TaskManager from './TaskManager';

const AdminPanel = ({ onLogout, currentAdmin }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Debug log to see what currentAdmin contains
  console.log('AdminPanel currentAdmin:', currentAdmin);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'tasks', name: 'Tasks', icon: '✅' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Admin stats/overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Project Management
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Active
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Database Status
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Connected
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Security Level
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Secure
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            
          </>
        );
      case 'analytics':
        return <Analytics />;
      case 'tasks':
        return <TaskManager />;
      case 'projects':
        return (
          <div className="bg-gray-50 rounded-lg p-6">
            <ProjectAdmin />
          </div>
        );
      case 'users':
        return <UserAdmin />;
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Settings</h3>
            <p className="text-gray-600">Settings functionality coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAdmin={true} onLogout={onLogout} />
      
      {/* Main admin content */}
      <div className="pt-16"> {/* Account for fixed header */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-8">
              <div className="mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">
                      Welcome back, <span className="font-semibold text-emerald-700">
                        {currentAdmin?.username || currentAdmin?.email || 'Admin'}
                      </span>! Here you can manage your portfolio content.
                    </p>
                    {currentAdmin?.last_login && (
                      <p className="text-sm text-gray-500 mt-1">
                        Last login: {new Date(currentAdmin.last_login).toLocaleDateString()}
                      </p>
                    )}
                    {currentAdmin?.role && (
                      <p className="text-sm text-emerald-600 mt-1">
                        Role: {currentAdmin.role}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } transition duration-200`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
