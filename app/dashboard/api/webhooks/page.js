"use client";

import React, { useState } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';

const WebhooksPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const webhooks = [
    {
      id: 1,
      name: 'Production Endpoint',
      url: 'https://api.myapp.com/webhooks/celebrity',
      events: ['celebrity.updated', 'celebrity.deleted', 'data.refreshed'],
      status: 'active',
      lastDelivery: '2 minutes ago',
      success: true,
      deliveries: 1247,
      failures: 3,
      createdAt: '2025-12-15',
      secret: 'whsec_1J8K2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z'
    },
    {
      id: 2,
      name: 'Development Testing',
      url: 'https://dev-api.myapp.com/webhooks/test',
      events: ['celebrity.created', 'celebrity.updated'],
      status: 'active',
      lastDelivery: '15 minutes ago',
      success: true,
      deliveries: 456,
      failures: 12,
      createdAt: '2025-12-01',
      secret: 'whsec_2A3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P'
    },
    {
      id: 3,
      name: 'Analytics Collector',
      url: 'https://analytics.myapp.com/webhook',
      events: ['api.request', 'api.error'],
      status: 'failing',
      lastDelivery: '2 hours ago',
      success: false,
      deliveries: 234,
      failures: 45,
      createdAt: '2025-11-20',
      secret: 'whsec_3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6D7E8F'
    },
    {
      id: 4,
      name: 'Mobile App Sync',
      url: 'https://mobile-sync.myapp.com/hooks',
      events: ['celebrity.updated'],
      status: 'paused',
      lastDelivery: '1 day ago',
      success: true,
      deliveries: 89,
      failures: 1,
      createdAt: '2025-10-30',
      secret: 'whsec_4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8U9V'
    }
  ];

  const availableEvents = [
    {
      name: 'celebrity.created',
      description: 'Triggered when a new celebrity is added to the database'
    },
    {
      name: 'celebrity.updated',
      description: 'Triggered when celebrity information is updated'
    },
    {
      name: 'celebrity.deleted',
      description: 'Triggered when a celebrity is removed from the database'
    },
    {
      name: 'data.refreshed',
      description: 'Triggered when celebrity data is refreshed from external sources'
    },
    {
      name: 'api.request',
      description: 'Triggered for every API request (high volume)'
    },
    {
      name: 'api.error',
      description: 'Triggered when an API error occurs'
    },
    {
      name: 'rate.limit.exceeded',
      description: 'Triggered when rate limits are exceeded'
    }
  ];

  const recentDeliveries = [
    {
      id: 1,
      webhookName: 'Production Endpoint',
      event: 'celebrity.updated',
      status: 'success',
      timestamp: '2025-01-06T10:30:00Z',
      responseCode: 200,
      attempts: 1
    },
    {
      id: 2,
      webhookName: 'Development Testing',
      event: 'celebrity.created',
      status: 'success',
      timestamp: '2025-01-06T10:15:00Z',
      responseCode: 201,
      attempts: 1
    },
    {
      id: 3,
      webhookName: 'Analytics Collector',
      event: 'api.error',
      status: 'failed',
      timestamp: '2025-01-06T08:45:00Z',
      responseCode: 500,
      attempts: 3
    },
    {
      id: 4,
      webhookName: 'Production Endpoint',
      event: 'data.refreshed',
      status: 'success',
      timestamp: '2025-01-06T08:00:00Z',
      responseCode: 200,
      attempts: 1
    },
    {
      id: 5,
      webhookName: 'Development Testing',
      event: 'celebrity.updated',
      status: 'success',
      timestamp: '2025-01-06T07:30:00Z',
      responseCode: 200,
      attempts: 1
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'failing':
        return 'bg-red-100 text-red-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeliveryStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const calculateSuccessRate = (deliveries, failures) => {
    const total = deliveries + failures;
    if (total === 0) return 100;
    return ((deliveries / total) * 100).toFixed(1);
  };

  const CreateWebhookModal = () => {
    if (!isCreateModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Create New Webhook</h2>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Production API Endpoint"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endpoint URL
              </label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://your-domain.com/webhooks/endpoint"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Events to Subscribe
              </label>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {availableEvents.map((event) => (
                  <label key={event.name} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{event.name}</div>
                      <div className="text-sm text-gray-500">{event.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret (Optional)
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter webhook secret for signature verification"
              />
              <p className="text-sm text-gray-500 mt-1">
                We'll use this to sign webhook payloads for security verification
              </p>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create Webhook
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TestWebhookModal = () => {
    if (!isTestModalOpen || !selectedWebhook) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Test Webhook</h2>
            <button
              onClick={() => setIsTestModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedWebhook.name}</h3>
              <p className="text-sm text-gray-600">{selectedWebhook.url}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Event Type
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {selectedWebhook.events.map((event) => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Sample Payload</h4>
              <pre className="text-xs text-gray-600 overflow-x-auto">
{`{
  "event": "celebrity.updated",
  "data": {
    "id": "123",
    "name": "John Doe",
    "profession": "Actor",
    "updated_at": "2025-01-06T10:30:00Z"
  },
  "timestamp": "2025-01-06T10:30:00Z"
}`}
              </pre>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={() => setIsTestModalOpen(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Send Test Event
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Webhooks</h1>
            <p className="text-gray-600 mt-2">Manage your webhook endpoints and event subscriptions</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Webhook</span>
          </button>
        </div>

        {/* Webhooks Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Webhooks</p>
                <p className="text-3xl font-bold text-gray-900">{webhooks.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {webhooks.filter(w => w.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failing</p>
                <p className="text-3xl font-bold text-red-600">
                  {webhooks.filter(w => w.status === 'failing').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
                <p className="text-3xl font-bold text-gray-900">
                  {webhooks.reduce((sum, w) => sum + w.deliveries, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Webhooks List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Webhooks</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{webhook.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(webhook.status)}`}>
                      {webhook.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedWebhook(webhook);
                        setIsTestModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Test
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Endpoint URL</p>
                      <p className="text-sm text-gray-600 break-all">{webhook.url}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Subscribed Events</p>
                      <div className="flex flex-wrap gap-2">
                        {webhook.events.map((event) => (
                          <span
                            key={event}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Success Rate</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {calculateSuccessRate(webhook.deliveries, webhook.failures)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Total Deliveries</p>
                        <p className="text-lg font-semibold text-gray-900">{webhook.deliveries}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last delivery:</span>
                      <span className={webhook.success ? 'text-green-600' : 'text-red-600'}>
                        {webhook.lastDelivery}
                        {webhook.success ? ' ✓' : ' ✗'}
                      </span>
                    </div>
                  </div>
                </div>

                {webhook.secret && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Webhook Secret</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Regenerate
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 font-mono mt-1">
                      {webhook.secret.substring(0, 20)}...
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Deliveries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Deliveries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Webhook
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attempts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {delivery.webhookName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                        {delivery.event}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getDeliveryStatusColor(delivery.status)}`}>
                        {delivery.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.responseCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.attempts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimestamp(delivery.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CreateWebhookModal />
      <TestWebhookModal />
    </DashboardLayout>
  );
};

export default WebhooksPage;