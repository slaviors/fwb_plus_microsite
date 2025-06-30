'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function Home() {
  const [microsite, setMicrosite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const refreshIntervalRef = useRef(null);
  const lastUserActivityRef = useRef(Date.now());
  const isDocumentVisibleRef = useRef(true);

  const STATIC_TITLE = 'FWB+';
  const STATIC_ICON = '🔗';

  const REFRESH_INTERVAL = 30000; const USER_ACTIVITY_THRESHOLD = 5000; const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_DELAY = 5000;
  const socialIcons = {
    website: '🌐',
    whatsapp: '📱',
    instagram: '📷',
    facebook: '👥',
    twitter: '🐦'
  };

  const updateUserActivity = useCallback(() => {
    lastUserActivityRef.current = Date.now();
  }, []);

  const handleVisibilityChange = useCallback(() => {
    isDocumentVisibleRef.current = !document.hidden;

    if (!document.hidden) {
      const timeSinceLastUpdate = Date.now() - (lastUpdated || 0);
      if (timeSinceLastUpdate > REFRESH_INTERVAL) {
        fetchMicrositeData(true);
      }
    }
  }, [lastUpdated]);

  const fetchMicrositeData = useCallback(async (isBackgroundRefresh = false) => {
    if (isBackgroundRefresh && !loading) {
      const timeSinceActivity = Date.now() - lastUserActivityRef.current;
      if (timeSinceActivity < USER_ACTIVITY_THRESHOLD) {
        return;
      }
    }

    if (isBackgroundRefresh && !isDocumentVisibleRef.current) {
      return;
    }

    if (isBackgroundRefresh) {
      setIsRefreshing(true);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const response = await fetch('/api/microsite_data_fetch', {
        signal: controller.signal,
        cache: 'no-store'
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.microsite) {
        const newDataString = JSON.stringify(data.microsite);
        const currentDataString = JSON.stringify(microsite);

        if (newDataString !== currentDataString) {
          setMicrosite(data.microsite);
          setLastUpdated(Date.now());
        }

        setError(null);
        setRetryCount(0);
      } else {
        throw new Error(data.error || 'Failed to load microsite data');
      }
    } catch (err) {
      console.error('Error fetching microsite:', err);

      if (!isBackgroundRefresh || retryCount >= MAX_RETRY_ATTEMPTS) {
        setError(err.name === 'AbortError' ? 'Request timeout' : 'Failed to load microsite data');
      }

      if (isBackgroundRefresh && retryCount < MAX_RETRY_ATTEMPTS) {
        setRetryCount(prev => prev + 1);
        const delay = RETRY_DELAY * Math.pow(2, retryCount);
        setTimeout(() => fetchMicrositeData(true), delay);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [microsite, loading, retryCount]);

  useEffect(() => {
    fetchMicrositeData();

    refreshIntervalRef.current = setInterval(() => {
      fetchMicrositeData(true);
    }, REFRESH_INTERVAL);

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateUserActivity, { passive: true });
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, updateUserActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchMicrositeData, updateUserActivity, handleVisibilityChange]);

  const handleManualRefresh = () => {
    updateUserActivity();
    fetchMicrositeData(false);
  };

  const handleLinkClick = (url) => {
    updateUserActivity();
    const finalUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSocialClick = (platform, url) => {
    updateUserActivity();
    let finalUrl = url;

    if (platform === 'whatsapp' && !url.startsWith('https://wa.me/')) {
      finalUrl = `https://wa.me/${url.replace(/[^0-9]/g, '')}`;
    } else if (!url.startsWith('http')) {
      finalUrl = `https://${url}`;
    }

    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return '';
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading microsite...</div>
          <div className="text-gray-400 text-sm mt-2">Please wait</div>
        </div>
      </div>
    );
  }

  if (error && !microsite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={handleManualRefresh}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Try Again
          </button>
          <div className="text-gray-400 text-xs mt-2">
            Auto-retry in progress...
          </div>
        </div>
      </div>
    );
  }

  if (!microsite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="text-gray-500">No microsite data available</div>
          <button
            onClick={handleManualRefresh}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const sortedLinks = microsite.links ?
    [...microsite.links].sort((a, b) => (a.order || 0) - (b.order || 0)) : [];

  const activeSocialMedia = microsite.socialMedia ?
    Object.entries(microsite.socialMedia).filter(([platform, url]) => url && platform !== '_id') : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            {isRefreshing && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                {/* <span>Updating...</span> */}
              </div>
            )}
            {error && (
              <div className="flex items-center space-x-1 text-amber-600">
                <span>⚠️</span>
                <span>Connection issues</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {/* <button
              onClick={handleManualRefresh}
              className="p-1 hover:bg-white/50 rounded transition-colors"
              title="Refresh"
              disabled={isRefreshing}
            >
              <svg className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button> */}
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">{STATIC_ICON}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{STATIC_TITLE}</h1>
          {microsite.isPublished && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Live
            </div>
          )}
        </div>

        {sortedLinks.length > 0 && (
          <div className="space-y-4 mb-8">
            {sortedLinks.map((link, index) => (
              <button
                key={link.id || index}
                onClick={() => handleLinkClick(link.url)}
                className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center font-medium text-gray-900 transition-all duration-200 hover:shadow-lg hover:scale-105 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>{link.title}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeSocialMedia.length > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-center text-gray-700 font-medium mb-4">Connect with us</h3>
            <div className="flex justify-center space-x-6">
              {activeSocialMedia.map(([platform, url]) => (
                <button
                  key={platform}
                  onClick={() => handleSocialClick(platform, url)}
                  className="text-3xl hover:scale-110 transition-transform duration-200 opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1"
                  title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                >
                  {socialIcons[platform] || '🔗'}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by FWB+ Microsite</p>
        </div>
      </div>
    </div>
  );
}