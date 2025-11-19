import { supabase } from '../lib/supabase';

export const affiliateQueries = {
  // Get all influencers
  getInfluencers: async () => {
    const { data, error } = await supabase
      .from('influencers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get affiliate usage for a specific code
  getAffiliateUsage: async (affiliateCode) => {
    const { data, error } = await supabase
      .from('affiliate_usage')
      .select(`
        *,
        influencers (
          name,
          email,
          commission_rate
        )
      `)
      .eq('affiliate_code', affiliateCode)
      .order('used_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get all affiliate usage data
  getAllAffiliateUsage: async () => {
    const { data, error } = await supabase
      .from('affiliate_usage')
      .select('*')
      .order('used_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get conversion funnel data
  getConversionFunnel: async (startDate, endDate) => {
    let query = supabase
      .from('affiliate_usage')
      .select('signup_completed, subscription_started');
    
    if (startDate) {
      query = query.gte('used_at', startDate);
    }
    if (endDate) {
      query = query.lte('used_at', endDate);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    // Calculate funnel metrics
    const totalCodes = data?.length || 0;
    const totalSignups = data?.filter(d => d.signup_completed).length || 0;
    const totalConversions = data?.filter(d => d.subscription_started).length || 0;
    
    return {
      codesUsed: totalCodes,
      signups: totalSignups,
      conversions: totalConversions,
      signupRate: totalCodes > 0 ? (totalSignups / totalCodes) * 100 : 0,
      conversionRate: totalSignups > 0 ? (totalConversions / totalSignups) * 100 : 0
    };
  },

  // Get summary statistics
  getAffiliateSummary: async () => {
    const { data, error } = await supabase
      .from('affiliate_usage')
      .select('affiliate_code, signup_completed, subscription_started, subscription_amount');
    
    if (error) throw error;
    
    // Group by affiliate code
    const summary = {};
    
    data?.forEach(item => {
      if (!summary[item.affiliate_code]) {
        summary[item.affiliate_code] = {
          code: item.affiliate_code,
          totalUses: 0,
          signups: 0,
          conversions: 0,
          revenue: 0
        };
      }
      
      summary[item.affiliate_code].totalUses++;
      if (item.signup_completed) summary[item.affiliate_code].signups++;
      if (item.subscription_started) summary[item.affiliate_code].conversions++;
      if (item.subscription_amount) summary[item.affiliate_code].revenue += parseFloat(item.subscription_amount);
    });
    
    return Object.values(summary);
  },

  // Create new influencer
  createInfluencer: async (influencer) => {
    const { data, error } = await supabase
      .from('influencers')
      .insert(influencer)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update influencer
  updateInfluencer: async (id, updates) => {
    const { data, error } = await supabase
      .from('influencers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
