import { supabase } from '../lib/supabase';

export const feedbackQueries = {
  // Get all feedback with pagination and filters
  getFeedback: async (page = 1, limit = 20, filters = {}) => {
    let query = supabase
      .from('user_feedback')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);
    
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.type) {
      query = query.eq('feedback_type', filters.type);
    }
    if (filters.sentiment) {
      query = query.eq('sentiment', filters.sentiment);
    }
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    return { data: data || [], count: count || 0 };
  },

  // Get feedback statistics
  getFeedbackStats: async () => {
    const { data, error } = await supabase
      .from('user_feedback')
      .select('status, feedback_type, sentiment, rating');
    
    if (error) throw error;
    
    const stats = {
      total: data?.length || 0,
      new: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0,
      avgRating: 0,
      positive: 0,
      neutral: 0,
      negative: 0,
      byType: {}
    };
    
    let ratingSum = 0;
    let ratingCount = 0;
    
    data?.forEach(item => {
      // Status counts
      if (item.status === 'new') stats.new++;
      if (item.status === 'in_progress') stats.inProgress++;
      if (item.status === 'resolved') stats.resolved++;
      if (item.status === 'closed') stats.closed++;
      
      // Sentiment counts
      if (item.sentiment === 'positive') stats.positive++;
      if (item.sentiment === 'neutral') stats.neutral++;
      if (item.sentiment === 'negative') stats.negative++;
      
      // Rating average
      if (item.rating) {
        ratingSum += item.rating;
        ratingCount++;
      }
      
      // Type counts
      if (item.feedback_type) {
        stats.byType[item.feedback_type] = (stats.byType[item.feedback_type] || 0) + 1;
      }
    });
    
    stats.avgRating = ratingCount > 0 ? (ratingSum / ratingCount).toFixed(1) : 0;
    
    return stats;
  },

  // Get feedback by type breakdown
  getFeedbackByType: async () => {
    const { data, error } = await supabase
      .from('user_feedback')
      .select('feedback_type');
    
    if (error) throw error;
    
    // Count by type
    const typeCounts = {};
    data?.forEach(item => {
      typeCounts[item.feedback_type] = (typeCounts[item.feedback_type] || 0) + 1;
    });
    
    return Object.entries(typeCounts).map(([type, count]) => ({
      type,
      count
    }));
  },

  // Get sentiment distribution
  getSentimentDistribution: async () => {
    const { data, error } = await supabase
      .from('user_feedback')
      .select('sentiment')
      .not('sentiment', 'is', null);
    
    if (error) throw error;
    
    const sentimentCounts = {
      positive: 0,
      neutral: 0,
      negative: 0
    };
    
    data?.forEach(item => {
      if (item.sentiment) {
        sentimentCounts[item.sentiment]++;
      }
    });
    
    return sentimentCounts;
  },

  // Update feedback status
  updateFeedbackStatus: async (id, status, adminNotes) => {
    const updates = { 
      status, 
      updated_at: new Date().toISOString() 
    };
    
    if (status === 'resolved') {
      updates.resolved_at = new Date().toISOString();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        updates.resolved_by = user.id;
      }
    }
    
    if (adminNotes) {
      updates.admin_notes = adminNotes;
    }
    
    const { data, error } = await supabase
      .from('user_feedback')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Submit new feedback
  submitFeedback: async (feedback) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('user_feedback')
      .insert({
        ...feedback,
        user_id: user?.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
