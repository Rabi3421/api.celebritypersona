"use client";

import React, { useState } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';

const RateLimitsPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const currentUsage = {
    requests: 45230,
    limit: 100000,
    resetTime: '2026-01-07T00:00:00Z',
    burstUsed: 1250,
    burstLimit: 2000
  };

  const rateLimitHistory = [
    { time: '00:00', requests: 1250, limit: 1667 },
    { time: '01:00', requests: 890, limit: 1667 },
    { time: '02:00', requests: 645, limit: 1667 },
    { time: '03:00', requests: 423, limit: 1667 },
    { time: '04:00', requests: 567, limit: 1667 },
    { time: '05:00', requests: 789, limit: 1667 },
    { time: '06:00', requests: 1123, limit: 1667 },
    { time: '07:00', requests: 1456, limit: 1667 },
    { time: '08:00', requests: 1634, limit: 1667 },
    { time: '09:00', requests: 1589, limit: 1667 },
    { time: '10:00', requests: 1445, limit: 1667 },
    { time: '11:00', requests: 1567, limit: 1667 },
    { time: '12:00', requests: 1689, limit: 1667, exceeded: true },
    { time: '13:00', requests: 1723, limit: 1667, exceeded: true },
    { time: '14:00', requests: 1598, limit: 1667 },
    { time: '15:00', requests: 1234, limit: 1667 }
  ];

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      price: '₹499/month',
      limits: {
        monthly: '10,000',
        hourly: '417',
        minute: '7',
        burst: '500'
      },
      features: ['Basic endpoints', 'Email support', 'Standard SLA']
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '₹1,999/month',
      limits: {
        monthly: '100,000',
        hourly: '4,167',
        minute: '69',
        burst: '2,000'
      },
      features: ['All endpoints', 'Priority support', 'Enhanced SLA', 'Webhooks'],
      popular: true
    },
    {
      id: 'business',
      name: 'Business Plan',
      price: '₹5,999/month',
      limits: {
        monthly: '500,000',
        hourly: '20,833',
        minute: '347',
        burst: '10,000'
      },
      features: ['All endpoints', 'Dedicated support', '99.9% SLA', 'Custom integrations']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom pricing',
      limits: {
        monthly: 'Unlimited',
        hourly: 'Custom',
        minute: 'Custom',
        burst: 'Custom'
      },
      features: ['Unlimited access', '24/7 support', 'Custom SLA', 'On-premise options']
    }
  ];

  const apiKeys = [
    {
      id: 1,
      name: 'Production App',
      currentUsage: 45230,
      monthlyLimit: 100000,
      hourlyUsage: 1598,
      hourlyLimit: 4167,
      status: 'active',
      lastRateLimit: null
    },
    {
      id: 2,
      name: 'Development',
      currentUsage: 1250,
      monthlyLimit: 100000,
      hourlyUsage: 45,
      hourlyLimit: 4167,
      status: 'active',
      lastRateLimit: null
    },
    {
      id: 3,
      name: 'Mobile App Beta',
      currentUsage: 8950,
      monthlyLimit: 100000,
      hourlyUsage: 234,
      hourlyLimit: 4167,
      status: 'warning',
      lastRateLimit: '2 hours ago'
    }
  ];

  const getUsageColor = (usage, limit) => {
    const percentage = (usage / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getUsagePercentage = (usage, limit) => {
    return Math.min((usage / limit) * 100, 100);
  };

  const formatTimeRemaining = (resetTime) => {
    const now = new Date();
    const reset = new Date(resetTime);
    const diff = reset - now;
    
    if (diff < 0) return 'Resetting...';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rate Limits & Usage</h1>
            <p className="text-gray-600 mt-2">Monitor your API usage and manage rate limits</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Request Limit Increase
          </button>
        </div>

        {/* Current Usage Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Current Usage Overview</h2>
            <div className="text-sm text-gray-500">
              Resets in: {formatTimeRemaining(currentUsage.resetTime)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Monthly Usage */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Monthly Requests</h3>
                <span className="text-sm text-gray-500">
                  {currentUsage.requests.toLocaleString()} / {currentUsage.limit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full ${getUsageColor(currentUsage.requests, currentUsage.limit)}`}
                  style={{ width: `${getUsagePercentage(currentUsage.requests, currentUsage.limit)}%` }}
                />
              </div>
              <div className="text-sm text-gray-600">
                {getUsagePercentage(currentUsage.requests, currentUsage.limit).toFixed(1)}% used
                • {(currentUsage.limit - currentUsage.requests).toLocaleString()} remaining
              </div>
            </div>

            {/* Burst Usage */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Burst Capacity</h3>
                <span className="text-sm text-gray-500">
                  {currentUsage.burstUsed.toLocaleString()} / {currentUsage.burstLimit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full ${getUsageColor(currentUsage.burstUsed, currentUsage.burstLimit)}`}
                  style={{ width: `${getUsagePercentage(currentUsage.burstUsed, currentUsage.burstLimit)}%` }}
                />
              </div>
              <div className="text-sm text-gray-600">
                Available for traffic spikes
              </div>
            </div>
          </div>
        </div>

        {/* Rate Limit History Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">24-Hour Usage Pattern</h2>
          <div className="h-64 flex items-end space-x-2">
            {rateLimitHistory.map((hour, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full">
                  {/* Limit line */}
                  <div className="absolute top-0 w-full h-1 bg-red-300 rounded opacity-50" />
                  
                  {/* Usage bar */}
                  <div
                    className={`w-full rounded-t ${
                      hour.exceeded ? 'bg-red-500' : 'bg-blue-500'
                    } transition-all duration-300 hover:opacity-80`}
                    style={{
                      height: `${(hour.requests / hour.limit) * 200}px`,
                      minHeight: '4px'
                    }}
                    title={`${hour.time}: ${hour.requests} requests ${hour.exceeded ? '(exceeded)' : ''}`}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                  {hour.time}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Normal usage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Exceeded limits</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-red-300 rounded"></div>
                <span>Rate limit threshold</span>
              </div>
            </div>
          </div>
        </div>

        {/* API Keys Usage */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Usage by API Key</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{key.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      key.status === 'active' ? 'bg-green-100 text-green-800' :
                      key.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {key.status}
                    </span>
                    {key.lastRateLimit && (
                      <span className="text-sm text-gray-500">
                        Last rate limited: {key.lastRateLimit}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Monthly Usage */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Monthly Usage</span>
                      <span className="text-sm text-gray-500">
                        {key.currentUsage.toLocaleString()} / {key.monthlyLimit.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getUsageColor(key.currentUsage, key.monthlyLimit)}`}
                        style={{ width: `${getUsagePercentage(key.currentUsage, key.monthlyLimit)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {getUsagePercentage(key.currentUsage, key.monthlyLimit).toFixed(1)}% used
                    </div>
                  </div>

                  {/* Hourly Usage */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Current Hour</span>
                      <span className="text-sm text-gray-500">
                        {key.hourlyUsage.toLocaleString()} / {key.hourlyLimit.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getUsageColor(key.hourlyUsage, key.hourlyLimit)}`}
                        style={{ width: `${getUsagePercentage(key.hourlyUsage, key.hourlyLimit)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {getUsagePercentage(key.hourlyUsage, key.hourlyLimit).toFixed(1)}% used
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Plans */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Available Plans</h2>
            <div className="text-sm text-gray-500">
              Current plan: <span className="font-medium text-blue-600">Pro Plan</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-md ${
                  plan.id === selectedPlan
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.popular ? 'ring-2 ring-blue-200' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                      Current Plan
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{plan.price}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly:</span>
                    <span className="font-medium">{plan.limits.monthly}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Per hour:</span>
                    <span className="font-medium">{plan.limits.hourly}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Per minute:</span>
                    <span className="font-medium">{plan.limits.minute}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Burst:</span>
                    <span className="font-medium">{plan.limits.burst}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    plan.id === selectedPlan
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  disabled={plan.id === selectedPlan}
                >
                  {plan.id === selectedPlan ? 'Current Plan' : 'Upgrade'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RateLimitsPage;