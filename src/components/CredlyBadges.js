import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiAward, FiRefreshCw } from 'react-icons/fi';

const CREDLY_USERNAME = 'edward-granados';

// Both dev (CRA setupProxy) and production (Netlify Function) route through
// /api/credly-badges — no CORS issues in either environment.
const BADGES_URL = `/api/credly-badges?username=${CREDLY_USERNAME}`;

const CredlyBadges = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(BADGES_URL);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();

        // Parse and sort by issue date (newest first)
        const parsed = (json.data || [])
          .filter((b) => b.public && b.state === 'accepted')
          .map((b) => ({
            id: b.id,
            name: b.badge_template?.name || 'Badge',
            description: b.badge_template?.description || '',
            image: b.image_url || b.badge_template?.image_url,
            issuer: b.issuer?.summary || 'Coursera',
            issuedAt: b.issued_at_date,
            badgeUrl: `https://www.credly.com${b.earner_path}/badges/${b.id}`,
            skills: (b.badge_template?.skills || []).slice(0, 4).map((s) => s.name),
          }))
          .sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt));

        setBadges(parsed);
      } catch (err) {
        console.error('Credly fetch error:', err);
        setError('Could not load badges. Check back soon.');
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  // Format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-500 text-sm">
        <FiRefreshCw className="animate-spin mr-2" size={14} />
        Loading badges from Credly...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-gray-500 text-sm">
        <FiAward className="mx-auto mb-2 opacity-30" size={24} />
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-mono text-green-400 uppercase tracking-wider">
          Credly Badges
        </h3>
        <a
          href={`https://www.credly.com/users/${CREDLY_USERNAME}/badges`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-xs text-gray-500 hover:text-green-400 transition-colors duration-200"
        >
          View all ({badges.length})
          <FiExternalLink className="ml-1" size={11} />
        </a>
      </div>

      {/* Badge grid — 2 columns, larger tiles with name label */}
      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge) => (
          <motion.button
            key={badge.id}
            onClick={() => setSelected(selected?.id === badge.id ? null : badge)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center space-x-3 rounded-xl p-3 text-left cursor-pointer transition-all duration-200 ${
              selected?.id === badge.id
                ? 'bg-green-400/10 border border-green-400/30'
                : 'bg-[#0f0f1a] border border-white/5 hover:border-green-400/20'
            }`}
          >
            <img
              src={badge.image}
              alt={badge.name}
              className="w-10 h-10 object-contain flex-shrink-0"
              loading="lazy"
            />
            <span className="text-gray-300 text-xs leading-snug line-clamp-2">
              {badge.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Badge detail panel — slides in when a badge is selected */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 bg-[#0f0f1a] border border-green-400/20 rounded-xl p-4"
          >
            <div className="flex items-start space-x-4">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-16 h-16 object-contain flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm leading-tight mb-1">
                  {selected.name}
                </h4>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 text-xs">{selected.issuer}</span>
                  <span className="text-gray-500 text-xs font-mono">
                    {formatDate(selected.issuedAt)}
                  </span>
                </div>
                {selected.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {selected.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <a
                  href={selected.badgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-green-400 hover:text-green-300 transition-colors"
                >
                  Verify on Credly
                  <FiExternalLink className="ml-1" size={11} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CredlyBadges;
