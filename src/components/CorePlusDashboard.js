import React, { useState, useEffect } from 'react';
import { affiliateQueries } from '../api/affiliateQueries';
import { feedbackQueries } from '../api/feedbackQueries';
import { format } from 'date-fns';

function CorePlusDashboard() {
  const [affiliateStats, setAffiliateStats] = useState(null);
  const [feedbackStats, setFeedbackStats] = useState(null);
  const [affiliateSummary, setAffiliateSummary] = useState([]);
  const [conversionFunnel, setConversionFunnel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, affiliates, feedback

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel
      const [affiliateData, feedbackData, funnelData, summaryData] = await Promise.all([
        affiliateQueries.getAllAffiliateUsage(),
        feedbackQueries.getFeedbackStats(),
        affiliateQueries.getConversionFunnel(),
        affiliateQueries.getAffiliateSummary()
      ]);
      
      // Calculate affiliate stats
      const totalSignups = affiliateData.filter(a => a.signup_completed).length;
      const totalConversions = affiliateData.filter(a => a.subscription_started).length;
      const totalRevenue = affiliateData
        .filter(a => a.subscription_amount)
        .reduce((sum, a) => sum + parseFloat(a.subscription_amount || 0), 0);
      
      setAffiliateStats({
        totalUses: affiliateData.length,
        totalSignups,
        totalConversions,
        totalRevenue,
        conversionRate: totalSignups > 0 ? ((totalConversions / totalSignups) * 100).toFixed(1) : 0
      });
      
      setFeedbackStats(feedbackData);
      setConversionFunnel(funnelData);
      setAffiliateSummary(summaryData.slice(0, 10)); // Top 10
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Core Plus Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage affiliates and user feedback</p>
            </div>
            <a 
              href="/" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('affiliates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'affiliates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Affiliates
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'feedback'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Feedback
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <OverviewTab 
            affiliateStats={affiliateStats}
            feedbackStats={feedbackStats}
            conversionFunnel={conversionFunnel}
            affiliateSummary={affiliateSummary}
          />
        )}
        
        {activeTab === 'affiliates' && (
          <AffiliatesTab affiliateSummary={affiliateSummary} />
        )}
        
        {activeTab === 'feedback' && (
          <FeedbackTab feedbackStats={feedbackStats} />
        )}
      </main>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ affiliateStats, feedbackStats, conversionFunnel, affiliateSummary }) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Signups"
          value={affiliateStats?.totalSignups || 0}
          subtitle="Via affiliate codes"
          color="blue"
        />
        <MetricCard
          title="Premium Conversions"
          value={affiliateStats?.totalConversions || 0}
          subtitle={`${affiliateStats?.conversionRate || 0}% conversion rate`}
          color="green"
        />
        <MetricCard
          title="Total Revenue"
          value={`$${(affiliateStats?.totalRevenue || 0).toFixed(2)}`}
          subtitle="From affiliate signups"
          color="purple"
        />
        <MetricCard
          title="Pending Feedback"
          value={feedbackStats?.new || 0}
          subtitle={`${feedbackStats?.total || 0} total submissions`}
          color="orange"
        />
      </div>

      {/* Conversion Funnel */}
      {conversionFunnel && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Conversion Funnel</h2>
          <div className="space-y-3">
            <FunnelStage
              label="Codes Used"
              value={conversionFunnel.codesUsed}
              percentage={100}
            />
            <FunnelStage
              label="Signups Completed"
              value={conversionFunnel.signups}
              percentage={conversionFunnel.signupRate}
            />
            <FunnelStage
              label="Premium Conversions"
              value={conversionFunnel.conversions}
              percentage={conversionFunnel.conversionRate}
            />
          </div>
        </div>
      )}

      {/* Top Affiliates */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Top Performing Affiliates</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uses</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Signups</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {affiliateSummary.map((affiliate) => (
                <tr key={affiliate.code} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{affiliate.code}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{affiliate.totalUses}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{affiliate.signups}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{affiliate.conversions}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">${affiliate.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Summary */}
      {feedbackStats && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Feedback Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{feedbackStats.new}</div>
              <div className="text-sm text-gray-600">New</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{feedbackStats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{feedbackStats.resolved}</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{feedbackStats.avgRating}</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Affiliates Tab Component
function AffiliatesTab({ affiliateSummary }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">All Affiliate Codes</h2>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Affiliate Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Uses</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Signups</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {affiliateSummary.map((affiliate) => {
                const conversionRate = affiliate.signups > 0 
                  ? ((affiliate.conversions / affiliate.signups) * 100).toFixed(1)
                  : 0;
                
                return (
                  <tr key={affiliate.code} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{affiliate.code}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{affiliate.totalUses}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{affiliate.signups}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{affiliate.conversions}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">${affiliate.revenue.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{conversionRate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Feedback Tab Component
function FeedbackTab({ feedbackStats }) {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const filters = filter !== 'all' ? { status: filter } : {};
      const result = await feedbackQueries.getFeedback(1, 50, filters);
      setFeedback(result.data);
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Feedback</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">User Feedback</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading feedback...</div>
          ) : feedback.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No feedback found</div>
          ) : (
            feedback.map((item) => (
              <FeedbackItem key={item.id} feedback={item} onUpdate={loadFeedback} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Feedback Item Component
function FeedbackItem({ feedback, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      await feedbackQueries.updateFeedbackStatus(feedback.id, newStatus);
      onUpdate();
    } catch (error) {
      console.error('Error updating feedback:', error);
      alert('Failed to update feedback status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.new;
  };

  const getSentimentColor = (sentiment) => {
    const colors = {
      positive: 'text-green-600',
      neutral: 'text-yellow-600',
      negative: 'text-red-600'
    };
    return colors[sentiment] || 'text-gray-600';
  };

  return (
    <div className="p-6 hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
              {feedback.status.replace('_', ' ')}
            </span>
            <span className="text-xs text-gray-500">{feedback.feedback_type}</span>
            {feedback.rating && (
              <span className="text-xs text-yellow-600">★ {feedback.rating}/5</span>
            )}
            {feedback.sentiment && (
              <span className={`text-xs font-medium ${getSentimentColor(feedback.sentiment)}`}>
                {feedback.sentiment}
              </span>
            )}
          </div>
          
          <h3 className="text-sm font-medium text-gray-900 mb-1">{feedback.subject}</h3>
          
          {isExpanded && (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-gray-600">{feedback.message}</p>
              {feedback.device_info && (
                <div className="text-xs text-gray-500">
                  Device: {feedback.device_info.platform || 'Unknown'}
                </div>
              )}
            </div>
          )}
          
          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
            <span>{format(new Date(feedback.created_at), 'MMM d, yyyy')}</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          </div>
        </div>
        
        <div className="ml-4 flex space-x-2">
          {feedback.status !== 'resolved' && (
            <button
              onClick={() => handleStatusUpdate('resolved')}
              disabled={updating}
              className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Mark Resolved
            </button>
          )}
          {feedback.status === 'new' && (
            <button
              onClick={() => handleStatusUpdate('in_progress')}
              disabled={updating}
              className="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
            >
              In Progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ title, value, subtitle, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className={`mt-2 text-3xl font-bold ${colors[color]}`}>
        {value}
      </div>
      {subtitle && (
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      )}
    </div>
  );
}

// Funnel Stage Component
function FunnelStage({ label, value, percentage }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-900">
          {value} ({percentage.toFixed(1)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default CorePlusDashboard;
