"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';

const APIStatusPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const systemStatus = {
    overall: 'operational',
    uptime: '99.97%',
    lastIncident: '2 days ago',
    responseTime: '142ms'
  };

  const services = [
    {
      name: 'Celebrity Profiles API',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '125ms',
      lastCheck: '30 seconds ago',
      endpoint: '/v1/celebrities',
      description: 'Core celebrity data and profile information'
    },
    {
      name: 'Outfit Data API',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '156ms',
      lastCheck: '45 seconds ago',
      endpoint: '/v1/outfits',
      description: 'Celebrity outfit and fashion data'
    },
    {
      name: 'News & Updates API',
      status: 'degraded',
      uptime: '98.2%',
      responseTime: '340ms',
      lastCheck: '1 minute ago',
      endpoint: '/v1/news',
      description: 'Real-time celebrity news and updates'
    },
    {
      name: 'Movie Database API',
      status: 'operational',
      uptime: '99.88%',
      responseTime: '178ms',
      lastCheck: '20 seconds ago',
      endpoint: '/v1/movies',
      description: 'Filmography and movie information'
    },
    {
      name: 'Search & Filter API',
      status: 'operational',
      uptime: '99.92%',
      responseTime: '89ms',
      lastCheck: '15 seconds ago',
      endpoint: '/v1/search',
      description: 'Advanced search and filtering capabilities'
    },
    {
      name: 'Authentication System',
      status: 'maintenance',
      uptime: '99.85%',
      responseTime: 'N/A',
      lastCheck: 'Maintenance',
      endpoint: '/v1/auth',
      description: 'API key validation and rate limiting'
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Increased response times for News API',
      status: 'investigating',
      severity: 'minor',
      startTime: '2026-01-06T14:30:00Z',
      description: 'We are investigating reports of increased response times for the News API endpoints.',
      updates: [
        {
          time: '2026-01-06T14:45:00Z',
          message: 'Issue identified. Implementing fix to optimize database queries.',
          status: 'investigating'
        },
        {
          time: '2026-01-06T14:30:00Z',
          message: 'We are investigating reports of increased response times for News API.',
          status: 'investigating'
        }
      ]
    },
    {
      id: 2,
      title: 'Scheduled maintenance for Authentication System',
      status: 'scheduled',
      severity: 'maintenance',
      startTime: '2026-01-06T16:00:00Z',
      endTime: '2026-01-06T17:00:00Z',
      description: 'Scheduled maintenance to upgrade authentication infrastructure for better performance.',
      updates: []
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'maintenance':
        return 'text-blue-600 bg-blue-100';
      case 'outage':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'degraded':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'maintenance':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API Status Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time monitoring of all API services and infrastructure</p>
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {currentTime.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${getStatusColor(systemStatus.overall)}`}>
              {getStatusIcon(systemStatus.overall)}
              <span className="ml-2 font-medium capitalize">{systemStatus.overall}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">System Uptime: {systemStatus.uptime}</p>
          </div>
        </div>

        {/* Overall System Health */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{systemStatus.uptime}</div>
              <div className="text-gray-600 text-sm mt-1">Overall Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{systemStatus.responseTime}</div>
              <div className="text-gray-600 text-sm mt-1">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">6</div>
              <div className="text-gray-600 text-sm mt-1">Total Services</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{systemStatus.lastIncident}</div>
              <div className="text-gray-600 text-sm mt-1">Last Incident</div>
            </div>
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Service Status</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {services.map((service, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(service.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                      {service.endpoint}
                    </code>
                  </div>
                  <div className="text-right space-y-1 ml-6">
                    <div className="text-sm">
                      <span className="text-gray-500">Uptime:</span>
                      <span className="font-medium ml-1">{service.uptime}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Response:</span>
                      <span className="font-medium ml-1">{service.responseTime}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Last check: {service.lastCheck}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Incidents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Current Incidents</h2>
          </div>
          <div className="p-6">
            {incidents.length > 0 ? (
              <div className="space-y-6">
                {incidents.map((incident) => (
                  <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            incident.severity === 'major' ? 'bg-red-100 text-red-800' :
                            incident.severity === 'minor' ? 'bg-yellow-100 text-yellow-800' :
                            incident.severity === 'maintenance' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {incident.severity}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            incident.status === 'investigating' ? 'bg-orange-100 text-orange-800' :
                            incident.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {incident.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{incident.description}</p>
                        <div className="text-xs text-gray-500">
                          Started: {new Date(incident.startTime).toLocaleString()}
                          {incident.endTime && (
                            <> • Scheduled end: {new Date(incident.endTime).toLocaleString()}</>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {incident.updates.length > 0 && (
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Updates</h4>
                        <div className="space-y-2">
                          {incident.updates.map((update, updateIndex) => (
                            <div key={updateIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-700">{update.message}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(update.time).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">No active incidents</p>
                <p className="text-gray-500 text-sm mt-1">All systems are operating normally</p>
              </div>
            )}
          </div>
        </div>

        {/* Status History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">90-Day Status History</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View full history →
            </button>
          </div>
          <div className="grid grid-cols-90 gap-1">
            {Array.from({ length: 90 }, (_, i) => (
              <div
                key={i}
                className={`h-8 rounded-sm ${
                  Math.random() > 0.05 
                    ? 'bg-green-200 hover:bg-green-300' 
                    : 'bg-red-200 hover:bg-red-300'
                }`}
                title={`Day ${90-i}: ${Math.random() > 0.05 ? 'Operational' : 'Issues'}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
            <span>90 days ago</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
                <span>Operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-200 rounded-sm"></div>
                <span>Issues</span>
              </div>
            </div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default APIStatusPage;