"use client";

import React, { useState } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('requests');

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' }
  ];

  const metrics = [
    { value: 'requests', label: 'API Requests', icon: '📊' },
    { value: 'errors', label: 'Error Rate', icon: '⚠️' },
    { value: 'latency', label: 'Response Time', icon: '⚡' },
    { value: 'bandwidth', label: 'Bandwidth', icon: '📈' }
  ];

  const topEndpoints = [
    { endpoint: '/v1/celebrities/search', requests: 45230, percentage: 35.2 },
    { endpoint: '/v1/celebrities/{id}', requests: 32100, percentage: 25.0 },
    { endpoint: '/v1/outfits/trending', requests: 18450, percentage: 14.4 },
    { endpoint: '/v1/news/latest', requests: 15670, percentage: 12.2 },
    { endpoint: '/v1/movies/{celebrity_id}', requests: 12340, percentage: 9.6 },
    { endpoint: '/v1/outfits/{id}', requests: 4560, percentage: 3.6 }
  ];

  const geographicData = [
    { country: 'United States', requests: 42340, percentage: 33.1 },
    { country: 'India', requests: 28450, percentage: 22.2 },
    { country: 'United Kingdom', requests: 18230, percentage: 14.2 },
    { country: 'Canada', requests: 12560, percentage: 9.8 },
    { country: 'Australia', requests: 9870, percentage: 7.7 },
    { country: 'Germany', requests: 8340, percentage: 6.5 },
    { country: 'Others', requests: 8210, percentage: 6.5 }
  ];

  const errorBreakdown = [
    { type: '4xx Client Errors', count: 1234, percentage: 65.2 },
    { type: '5xx Server Errors', count: 456, percentage: 24.1 },
    { type: 'Rate Limit Exceeded', count: 203, percentage: 10.7 }
  ];

  const MockChart = ({ title, data, height = "200px" }) => (
    <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
      <div className="text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xs text-gray-400 mt-1">Interactive chart would be rendered here</p>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Usage Analytics</h1>
            <p className="text-gray-600 mt-2">Monitor your API usage, performance, and insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Export Data
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">128,543</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-500 text-sm font-medium">+15.3%</span>
              <span className="text-gray-600 text-sm ml-2">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Error Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">1.2%</p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-red-500 text-sm font-medium">+0.3%</span>
              <span className="text-gray-600 text-sm ml-2">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">145ms</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-500 text-sm font-medium">-12ms</span>
              <span className="text-gray-600 text-sm ml-2">improvement</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Bandwidth Used</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">2.4GB</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-blue-500 text-sm font-medium">+8.2%</span>
              <span className="text-gray-600 text-sm ml-2">vs last period</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Requests Over Time */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Requests Over Time</h2>
              <div className="flex space-x-2">
                {metrics.map((metric) => (
                  <button
                    key={metric.value}
                    onClick={() => setSelectedMetric(metric.value)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedMetric === metric.value
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {metric.icon} {metric.label}
                  </button>
                ))}
              </div>
            </div>
            <MockChart title="API Requests Timeline" />
          </div>

          {/* Response Time Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Response Time Distribution</h2>
            <MockChart title="Response Time Histogram" />
          </div>
        </div>

        {/* Top Endpoints */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top API Endpoints</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Endpoint</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Requests</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Percentage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topEndpoints.map((endpoint, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                        {endpoint.endpoint}
                      </code>
                    </td>
                    <td className="py-3 px-4 font-medium">{endpoint.requests.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600">{endpoint.percentage}%</td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${endpoint.percentage}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geographic Usage & Error Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Geographic Usage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Geographic Usage</h2>
            <div className="space-y-4">
              {geographicData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{country.country.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <span className="font-medium text-gray-900">{country.country}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600 text-sm">{country.requests.toLocaleString()}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-500 text-sm w-10">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Error Breakdown</h2>
            <div className="space-y-4">
              {errorBreakdown.map((error, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">{error.type}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600 text-sm">{error.count.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm">{error.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <div className="flex">
                <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Alert: High Error Rate</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    4xx errors increased by 23% in the last hour. Consider checking your integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;