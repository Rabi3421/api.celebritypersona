"use client";

import React, { useState, useEffect } from 'react';
import { AuthService } from '../../../../lib/auth';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';

const APIKeysPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [generatedKey, setGeneratedKey] = useState('');
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedKeyDetails, setSelectedKeyDetails] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  // Edit modal state
    // Reveal API key state
    const [revealModalKey, setRevealModalKey] = useState(null); // apiKey._id for which modal is open
    const [revealPassword, setRevealPassword] = useState('');
    const [revealLoading, setRevealLoading] = useState(false);
    const [revealError, setRevealError] = useState(null);
    const [revealedKeyData, setRevealedKeyData] = useState(null); // response from API
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editKeyId, setEditKeyId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAllowedDomains, setEditAllowedDomains] = useState(['']);
  const [editAllowedIPs, setEditAllowedIPs] = useState(['']);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  useEffect(() => {
    const fetchApiKeys = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const response = await AuthService.apiCall(`${baseUrl}/api/user/api-keys?includeInactive=false`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response) {
          setError('Authentication failed. Please login again.');
          setLoading(false);
          return;
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.apiKeys)) {
          setApiKeys(data.apiKeys);
        } else {
          setError('Failed to fetch API keys');
        }
      } catch (err) {
        setError('Failed to fetch API keys');
      } finally {
        setLoading(false);
      }
    };
    fetchApiKeys();
  }, []);

  const availablePermissions = [
    { id: 'celebrities:read', name: 'Read Celebrity Data', description: 'Access celebrity profiles and basic information' },
    { id: 'celebrities:write', name: 'Write Celebrity Data', description: 'Create and update celebrity profiles (Enterprise only)' },
    { id: 'outfits:read', name: 'Read Outfit Data', description: 'Access celebrity outfit information and images' },
    { id: 'outfits:write', name: 'Write Outfit Data', description: 'Submit outfit data (Partner access)' },
    { id: 'news:read', name: 'Read News Data', description: 'Access celebrity news and updates' },
    { id: 'movies:read', name: 'Read Movie Data', description: 'Access filmography and movie information' },
    { id: 'analytics:read', name: 'Read Analytics', description: 'Access usage statistics and insights' }
  ];

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const handleCreateKey = async () => {
    setCreating(true);
    setCreateError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      // For demo, hardcode tier, allowedDomains, allowedIPs, expiresInDays. You can extend modal for these fields.
      const body = {
        name: newKeyName,
        tier: 'free',
        allowedDomains: ['example.com'],
        allowedIPs: [],
        expiresInDays: 90,
      };
      const response = await AuthService.apiCall(`${baseUrl}/api/user/api-keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });
      if (!response) {
        setCreateError('Authentication failed. Please login again.');
        setCreating(false);
        return;
      }
      const data = await response.json();
      if (data.success && data.apiKey && data.apiKey.key) {
        setGeneratedKey(data.apiKey.key);
        setShowCreateModal(false);
        setShowKeyModal(true);
        // Add new key to list
        setApiKeys((prev) => [data.apiKey, ...prev]);
        // Reset form
        setNewKeyName('');
        setSelectedPermissions([]);
      } else {
        setCreateError(data.message || 'Failed to create API key');
      }
    } catch (err) {
      setCreateError('Failed to create API key');
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  // Delete (revoke) modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteKeyId, setDeleteKeyId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteKeyName, setDeleteKeyName] = useState('');
  console.log('deleteKeyId:', deleteKeyId);

  const revokeKey = (keyId, keyName) => {
    setDeleteKeyId(keyId);
    setDeleteKeyName(keyName || '');
    setDeleteError(null);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const response = await AuthService.apiCall(`${baseUrl}/api/user/api-keys/${deleteKeyId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response) {
        setDeleteError('Authentication failed. Please login again.');
        setDeleteLoading(false);
        return;
      }
      const data = await response.json();
      if (data.success) {
        setApiKeys(keys => keys.filter(k => k._id !== deleteKeyId));
        // If details modal is open for this key, close it
        if (selectedKeyDetails && selectedKeyDetails._id === deleteKeyId) {
          setDetailsModalOpen(false);
        }
        setDeleteModalOpen(false);
      } else {
        setDeleteError(data.message || 'Failed to delete API key');
      }
    } catch (err) {
      setDeleteError('Failed to delete API key');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Open edit modal with prefilled values
  const handleEditClick = (apiKey) => {
    setEditKeyId(apiKey._id);
    setEditName(apiKey.name || '');
    setEditAllowedDomains(apiKey.allowedDomains && apiKey.allowedDomains.length > 0 ? apiKey.allowedDomains : ['']);
    setEditAllowedIPs(apiKey.allowedIPs && apiKey.allowedIPs.length > 0 ? apiKey.allowedIPs : ['']);
    setEditError(null);
    setEditModalOpen(true);
  };

  // Handle edit modal field changes
  const handleEditDomainChange = (idx, value) => {
    setEditAllowedDomains(domains => {
      const arr = [...domains];
      arr[idx] = value;
      return arr;
    });
  };
  const handleEditIPChange = (idx, value) => {
    setEditAllowedIPs(ips => {
      const arr = [...ips];
      arr[idx] = value;
      return arr;
    });
  };

  // Add/remove domain/IP fields
  const addEditDomain = () => setEditAllowedDomains(domains => [...domains, '']);
  const removeEditDomain = (idx) => setEditAllowedDomains(domains => domains.length > 1 ? domains.filter((_, i) => i !== idx) : domains);
  const addEditIP = () => setEditAllowedIPs(ips => [...ips, '']);
  const removeEditIP = (idx) => setEditAllowedIPs(ips => ips.length > 1 ? ips.filter((_, i) => i !== idx) : ips);

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const body = {
        name: editName,
        allowedDomains: editAllowedDomains.filter(Boolean),
        allowedIPs: editAllowedIPs.filter(Boolean),
      };
      const response = await AuthService.apiCall(`${baseUrl}/api/user/api-keys/${editKeyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });
      if (!response) {
        setEditError('Authentication failed. Please login again.');
        setEditLoading(false);
        return;
      }
      const data = await response.json();
      if (data.success && data.apiKey) {
        // Update apiKeys list
        setApiKeys(keys => keys.map(k => k._id === data.apiKey._id ? { ...k, ...data.apiKey } : k));
        // If details modal is open and this key is selected, update it
        if (selectedKeyDetails && selectedKeyDetails._id === data.apiKey._id) {
          setSelectedKeyDetails(prev => ({ ...prev, ...data.apiKey }));
        }
        setEditModalOpen(false);
      } else {
        setEditError(data.message || 'Failed to update API key');
      }
    } catch (err) {
      setEditError('Failed to update API key');
    } finally {
      setEditLoading(false);
    }
  };

  // Card click handler (excluding buttons)
  const handleCardClick = async (e, apiKeyId) => {
    // Prevent if a button inside the card was clicked
    if (
      e.target.closest('button') ||
      e.target.closest('a') ||
      e.target.closest('input')
    ) {
      return;
    }
    setDetailsLoading(true);
    setDetailsError(null);
    setSelectedKeyDetails(null);
    setDetailsModalOpen(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const response = await AuthService.apiCall(`${baseUrl}/api/user/api-keys/${apiKeyId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response) {
        setDetailsError('Authentication failed. Please login again.');
        setDetailsLoading(false);
        return;
      }
      const data = await response.json();
      if (data.success && data.apiKey) {
        setSelectedKeyDetails(data.apiKey);
      } else {
        setDetailsError('Failed to fetch API key details');
      }
    } catch (err) {
      setDetailsError('Failed to fetch API key details');
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
            <p className="text-gray-600 mt-2">Manage your API keys and access permissions</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create New Key</span>
          </button>
        </div>

        {/* API Keys List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your API Keys</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Loading API keys...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-600">{error}</div>
            ) : apiKeys.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No API keys found.</div>
            ) : (
              <>
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey._id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    onClick={(e) => handleCardClick(e, apiKey._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        {/* ...existing code... */}
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${apiKey.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {apiKey.isActive ? 'active' : 'inactive'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                            {apiKey.key.substring(0, 20)}...
                          </code>
                          <button
                            onClick={(e) => { e.stopPropagation(); copyToClipboard(apiKey.key); }}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy to clipboard"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Tier: {apiKey.tier}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            Daily Limit: {apiKey.dailyLimit}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            Used Today: {apiKey.usedToday}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            Total Used: {apiKey.totalUsed}
                          </span>
                          {apiKey.allowedDomains && apiKey.allowedDomains.length > 0 && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              Domains: {apiKey.allowedDomains.join(', ')}
                            </span>
                          )}
                          {apiKey.allowedIPs && apiKey.allowedIPs.length > 0 && (
                            <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                              IPs: {apiKey.allowedIPs.join(', ')}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span>
                          <span>Expires: {apiKey.expiresAt ? new Date(apiKey.expiresAt).toLocaleDateString() : 'Never'}</span>
                          <span>Last Reset: {apiKey.lastResetAt ? new Date(apiKey.lastResetAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-6">
                        {/* Eye button for reveal (moved to right) */}
                        <div className="relative group">
                          <button
                            onClick={e => { e.stopPropagation(); setRevealModalKey(apiKey._id); setRevealPassword(''); setRevealError(null); setRevealedKeyData(null); }}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Reveal API Key"
                            tabIndex={0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-32 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-200">
                            Show info & reveal key
                          </div>
                        </div>
                                                {/* Reveal API Key Modal */}
                                                {revealModalKey === apiKey._id && !revealedKeyData && (
                                                  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                                                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
                                                      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                                        <h3 className="text-lg font-semibold text-gray-900">Reveal API Key</h3>
                                                        <button
                                                          type="button"
                                                          onClick={() => { setRevealModalKey(null); setRevealPassword(''); setRevealError(null); setRevealedKeyData(null); }}
                                                          className="text-gray-400 hover:text-gray-700 p-2 rounded"
                                                          title="Close"
                                                        >
                                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                          </svg>
                                                        </button>
                                                      </div>
                                                      <div className="p-6">
                                                        <div className="mb-4 text-gray-800">To reveal the full API key, please enter your password for verification.</div>
                                                        <input
                                                          type="password"
                                                          value={revealPassword}
                                                          onChange={e => setRevealPassword(e.target.value)}
                                                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                                                          placeholder="Enter your password"
                                                          autoFocus
                                                        />
                                                        {revealError && <div className="text-red-600 text-sm mb-2">{revealError}</div>}
                                                      </div>
                                                      <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                                                        <button
                                                          type="button"
                                                          onClick={() => { setRevealModalKey(null); setRevealPassword(''); setRevealError(null); setRevealedKeyData(null); }}
                                                          className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                                                          disabled={revealLoading}
                                                        >
                                                          Cancel
                                                        </button>
                                                        <button
                                                          type="button"
                                                          disabled={!revealPassword || revealLoading}
                                                          onClick={async () => {
                                                            setRevealLoading(true);
                                                            setRevealError(null);
                                                            try {
                                                              const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
                                                              const response = await AuthService.apiCall(`${baseUrl}/api/user/api-keys/${apiKey._id}/reveal`, {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ password: revealPassword }),
                                                                credentials: 'include',
                                                              });
                                                              if (!response) {
                                                                setRevealError('Authentication failed. Please login again.');
                                                                setRevealLoading(false);
                                                                return;
                                                              }
                                                              const data = await response.json();
                                                              if (data.success && data.apiKey && data.apiKey.key) {
                                                                setRevealedKeyData(data);
                                                              } else {
                                                                setRevealError(data.message || 'Failed to reveal API key');
                                                              }
                                                            } catch (err) {
                                                              setRevealError('Failed to reveal API key');
                                                            } finally {
                                                              setRevealLoading(false);
                                                            }
                                                          }}
                                                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                                                        >
                                                          {revealLoading ? 'Revealing...' : 'Reveal Key'}
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                                {/* Revealed Key Modal */}
                                                {revealModalKey === apiKey._id && revealedKeyData && (
                                                  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                                                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
                                                      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                                        <h3 className="text-lg font-semibold text-gray-900">API Key Revealed</h3>
                                                        <button
                                                          type="button"
                                                          onClick={() => { setRevealModalKey(null); setRevealPassword(''); setRevealError(null); setRevealedKeyData(null); }}
                                                          className="text-gray-400 hover:text-gray-700 p-2 rounded"
                                                          title="Close"
                                                        >
                                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                          </svg>
                                                        </button>
                                                      </div>
                                                      <div className="p-6">
                                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                                          <div className="flex">
                                                            <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            <div>
                                                              <p className="text-sm text-yellow-800 font-medium">Important Security Notice</p>
                                                              <p className="text-sm text-yellow-700 mt-1">
                                                                {revealedKeyData.warning || 'Store this key securely. Do not expose it in logs or client-side code.'}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                          <label className="block text-sm font-medium text-gray-700 mb-2">Your API Key</label>
                                                          <div className="flex items-center space-x-2">
                                                            <code className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm font-mono">
                                                              {revealedKeyData.apiKey.key}
                                                            </code>
                                                            <button
                                                              onClick={() => navigator.clipboard.writeText(revealedKeyData.apiKey.key)}
                                                              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                                                              title="Copy to clipboard"
                                                            >
                                                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                              </svg>
                                                            </button>
                                                          </div>
                                                        </div>
                                                        <div className="text-sm text-gray-700 mb-2">{revealedKeyData.message}</div>
                                                      </div>
                                                      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                                                        <button
                                                          onClick={() => { setRevealModalKey(null); setRevealPassword(''); setRevealError(null); setRevealedKeyData(null); }}
                                                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                                        >
                                                          Close
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditClick(apiKey); }}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        {/* Edit API Key Modal */}
                        {editModalOpen && (
                          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
                              <form onSubmit={handleEditSubmit}>
                                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                  <h3 className="text-lg font-semibold text-gray-900">Edit API Key</h3>
                                  <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-700 p-2 rounded"
                                    title="Close"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                                <div className="p-6 space-y-6">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Name</label>
                                    <input
                                      type="text"
                                      value={editName}
                                      onChange={e => setEditName(e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Domains</label>
                                    {editAllowedDomains.map((domain, idx) => (
                                      <div key={idx} className="flex items-center mb-2">
                                        <input
                                          type="text"
                                          value={domain}
                                          onChange={e => handleEditDomainChange(idx, e.target.value)}
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          placeholder="example.com"
                                        />
                                        <button type="button" onClick={() => removeEditDomain(idx)} className="ml-2 text-red-500 hover:text-red-700 p-1" disabled={editAllowedDomains.length === 1}>
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                      </div>
                                    ))}
                                    <button type="button" onClick={addEditDomain} className="text-blue-600 hover:underline text-sm mt-1">+ Add Domain</button>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Allowed IPs</label>
                                    {editAllowedIPs.map((ip, idx) => (
                                      <div key={idx} className="flex items-center mb-2">
                                        <input
                                          type="text"
                                          value={ip}
                                          onChange={e => handleEditIPChange(idx, e.target.value)}
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          placeholder="203.0.113.1"
                                        />
                                        <button type="button" onClick={() => removeEditIP(idx)} className="ml-2 text-red-500 hover:text-red-700 p-1" disabled={editAllowedIPs.length === 1}>
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                      </div>
                                    ))}
                                    <button type="button" onClick={addEditIP} className="text-blue-600 hover:underline text-sm mt-1">+ Add IP</button>
                                  </div>
                                  {editError && <div className="text-red-600 text-sm">{editError}</div>}
                                </div>
                                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                                  <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                                    disabled={editLoading}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    disabled={editLoading || !editName}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                                  >
                                    {editLoading ? 'Saving...' : 'Save Changes'}
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); revokeKey(apiKey._id, apiKey.name); }}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        {/* Delete API Key Modal */}
                        {deleteModalOpen && (
                          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
                              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">Delete API Key</h3>
                                <button
                                  type="button"
                                  onClick={() => setDeleteModalOpen(false)}
                                  className="text-gray-400 hover:text-gray-700 p-2 rounded"
                                  title="Close"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                              <div className="p-6">
                                <div className="mb-4 text-gray-800">
                                  Are you sure you want to delete the API key <span className="font-semibold">{deleteKeyName}</span>? This action cannot be undone.
                                </div>
                                {deleteError && <div className="text-red-600 text-sm mb-2">{deleteError}</div>}
                              </div>
                              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                                <button
                                  type="button"
                                  onClick={() => setDeleteModalOpen(false)}
                                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                                  disabled={deleteLoading}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={handleDeleteConfirm}
                                  disabled={deleteLoading}
                                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                                >
                                  {deleteLoading ? 'Deleting...' : 'Delete'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {/* API Key Details Modal */}
                {detailsModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
                      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">API Key Details</h3>
                        <button
                          onClick={() => setDetailsModalOpen(false)}
                          className="text-gray-400 hover:text-gray-700 p-2 rounded"
                          title="Close"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="p-6">
                        {detailsLoading ? (
                          <div className="text-center text-gray-500">Loading details...</div>
                        ) : detailsError ? (
                          <div className="text-center text-red-600">{detailsError}</div>
                        ) : selectedKeyDetails ? (
                          <div className="space-y-4">
                            <div>
                              <span className="font-semibold">Name:</span> {selectedKeyDetails.name}
                            </div>
                            <div>
                              <span className="font-semibold">Key:</span> <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{selectedKeyDetails.key}</code>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Tier: {selectedKeyDetails.tier}</span>
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Daily Limit: {selectedKeyDetails.dailyLimit}</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Used Today: {selectedKeyDetails.usedToday}</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Total Used: {selectedKeyDetails.totalUsed}</span>
                              {selectedKeyDetails.allowedDomains && selectedKeyDetails.allowedDomains.length > 0 && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Domains: {selectedKeyDetails.allowedDomains.join(', ')}</span>
                              )}
                              {selectedKeyDetails.allowedIPs && selectedKeyDetails.allowedIPs.length > 0 && (
                                <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">IPs: {selectedKeyDetails.allowedIPs.join(', ')}</span>
                              )}
                            </div>
                            <div className="flex flex-col gap-1 text-sm text-gray-600">
                              <span>Created: {selectedKeyDetails.createdAt ? new Date(selectedKeyDetails.createdAt).toLocaleString() : 'N/A'}</span>
                              <span>Expires: {selectedKeyDetails.expiresAt ? new Date(selectedKeyDetails.expiresAt).toLocaleString() : 'Never'}</span>
                              <span>Last Reset: {selectedKeyDetails.lastResetAt ? new Date(selectedKeyDetails.lastResetAt).toLocaleString() : 'N/A'}</span>
                              <span>Status: {selectedKeyDetails.isActive ? 'Active' : 'Inactive'}</span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                        <button
                          onClick={() => setDetailsModalOpen(false)}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Create API Key Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Create New API Key</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production App, Mobile Client"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {/* Permissions UI is kept for future, but not sent to backend yet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Permissions
                  </label>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {availablePermissions.map((permission) => (
                      <label key={permission.id} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPermissions([...selectedPermissions, permission.id]);
                            } else {
                              setSelectedPermissions(selectedPermissions.filter(p => p !== permission.id));
                            }
                          }}
                          className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                          <div className="text-xs text-gray-500">{permission.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                {createError && (
                  <div className="text-red-600 text-sm">{createError}</div>
                )}
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  disabled={creating}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  disabled={!newKeyName || creating}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                >
                  {creating ? 'Creating...' : 'Create Key'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Generated Key Modal */}
        {showKeyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">API Key Created Successfully</h3>
              </div>
              <div className="p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex">
                    <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-yellow-800 font-medium">Important Security Notice</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Copy this key now. For security reasons, we won't show it again.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your API Key</label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm font-mono">
                      {generatedKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(generatedKey)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default APIKeysPage;