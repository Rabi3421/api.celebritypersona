"use client";

import React, { useState } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeLanguage, setActiveLanguage] = useState('curl');

  const sidebarSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      subsections: [
        { id: 'overview', title: 'Overview' },
        { id: 'authentication', title: 'Authentication' },
        { id: 'rate-limits', title: 'Rate Limits' },
        { id: 'errors', title: 'Error Handling' }
      ]
    },
    {
      id: 'endpoints',
      title: 'API Endpoints',
      icon: '🔗',
      subsections: [
        { id: 'celebrities', title: 'Celebrities' },
        { id: 'search', title: 'Search' },
        { id: 'outfits', title: 'Outfits' },
        { id: 'news', title: 'News' }
      ]
    },
    {
      id: 'webhooks',
      title: 'Webhooks',
      icon: '🔔',
      subsections: [
        { id: 'webhook-setup', title: 'Setup' },
        { id: 'webhook-events', title: 'Events' },
        { id: 'webhook-security', title: 'Security' }
      ]
    },
    {
      id: 'sdks',
      title: 'SDKs & Libraries',
      icon: '📚',
      subsections: [
        { id: 'javascript', title: 'JavaScript SDK' },
        { id: 'python', title: 'Python SDK' },
        { id: 'php', title: 'PHP SDK' },
        { id: 'node', title: 'Node.js SDK' }
      ]
    },
    {
      id: 'examples',
      title: 'Code Examples',
      icon: '💻',
      subsections: [
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'advanced', title: 'Advanced Examples' },
        { id: 'integrations', title: 'Integrations' }
      ]
    }
  ];

  const languages = [
    { id: 'curl', name: 'cURL', icon: '🔧' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'php', name: 'PHP', icon: '🐘' },
    { id: 'node', name: 'Node.js', icon: '🟢' }
  ];

  const codeExamples = {
    curl: `curl -X GET "https://api.celebritypersona.com/v1/celebrities/search?query=Shah+Rukh+Khan" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    javascript: `fetch('https://api.celebritypersona.com/v1/celebrities/search?query=Shah+Rukh+Khan', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`,
    python: `import requests

url = "https://api.celebritypersona.com/v1/celebrities/search"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
params = {"query": "Shah Rukh Khan"}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(data)`,
    php: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.celebritypersona.com/v1/celebrities/search?query=Shah+Rukh+Khan');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

print_r($data);
?>`,
    node: `const axios = require('axios');

const config = {
  method: 'get',
  url: 'https://api.celebritypersona.com/v1/celebrities/search',
  params: { query: 'Shah Rukh Khan' },
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
};

axios(config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });`
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/v1/celebrities',
      description: 'Get list of celebrities',
      params: [
        { name: 'page', type: 'integer', description: 'Page number (default: 1)' },
        { name: 'limit', type: 'integer', description: 'Items per page (default: 20, max: 100)' },
        { name: 'category', type: 'string', description: 'Filter by category (actor, musician, athlete, etc.)' }
      ]
    },
    {
      method: 'GET',
      path: '/v1/celebrities/{id}',
      description: 'Get specific celebrity details',
      params: [
        { name: 'id', type: 'string', description: 'Celebrity ID (required)' },
        { name: 'include', type: 'string', description: 'Include additional data (outfits, news, social)' }
      ]
    },
    {
      method: 'GET',
      path: '/v1/celebrities/search',
      description: 'Search celebrities by name or attributes',
      params: [
        { name: 'query', type: 'string', description: 'Search query (required)' },
        { name: 'page', type: 'integer', description: 'Page number (default: 1)' },
        { name: 'limit', type: 'integer', description: 'Items per page (default: 20)' }
      ]
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Celebrity Persona API Documentation</h1>
              <p className="text-lg text-gray-600 mb-6">
                Welcome to the Celebrity Persona API! Our comprehensive API provides access to detailed information about celebrities from around the world, including their personal details, career information, outfits, and latest news.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Base URL</h3>
              <code className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono text-sm">
                https://api.celebritypersona.com/v1
              </code>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Start</h2>
              <p className="text-gray-600 mb-4">
                Get started with the Celebrity Persona API in just a few steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Sign up for an account and get your API key</li>
                <li>Make your first API request using the examples below</li>
                <li>Explore our comprehensive endpoints</li>
                <li>Integrate into your application</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Example Request</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex space-x-2 mb-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setActiveLanguage(lang.id)}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeLanguage === lang.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {lang.icon} {lang.name}
                    </button>
                  ))}
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{codeExamples[activeLanguage]}</code>
                </pre>
              </div>
            </div>
          </div>
        );

      case 'authentication':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication</h1>
              <p className="text-lg text-gray-600 mb-6">
                The Celebrity Persona API uses API keys to authenticate requests. Your API keys carry many privileges, so be sure to keep them secure!
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">⚠️ Security Notice</h3>
              <p className="text-yellow-800">
                Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Key Authentication</h2>
              <p className="text-gray-600 mb-4">
                Authentication to the API is performed via HTTP Bearer authentication. Provide your API key as the bearer token value.
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-2">Header Format:</h4>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto">
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                </pre>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Your API Key</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>Navigate to the <a href="/dashboard/api/keys" className="text-blue-600 hover:text-blue-800 underline">API Keys</a> section in your dashboard</li>
                <li>Click "Create New API Key"</li>
                <li>Give your key a descriptive name</li>
                <li>Set appropriate permissions for your use case</li>
                <li>Copy and securely store your API key</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Best Practices</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Store API keys in environment variables</li>
                  <li>• Use different keys for different environments</li>
                  <li>• Regularly rotate your API keys</li>
                  <li>• Set appropriate rate limits</li>
                  <li>• Monitor API key usage</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ What to Avoid</h3>
                <ul className="space-y-2 text-red-800 text-sm">
                  <li>• Hardcoding keys in source code</li>
                  <li>• Sharing keys in public repositories</li>
                  <li>• Using production keys in development</li>
                  <li>• Exposing keys in client-side code</li>
                  <li>• Using overly permissive key scopes</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'endpoints':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">API Endpoints</h1>
              <p className="text-lg text-gray-600 mb-6">
                Comprehensive reference for all Celebrity Persona API endpoints.
              </p>
            </div>

            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                      endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{endpoint.description}</p>
                  
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Parameters:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 px-3 font-medium text-gray-900">Name</th>
                              <th className="text-left py-2 px-3 font-medium text-gray-900">Type</th>
                              <th className="text-left py-2 px-3 font-medium text-gray-900">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {endpoint.params.map((param, paramIndex) => (
                              <tr key={paramIndex} className="border-b border-gray-100">
                                <td className="py-2 px-3 font-mono text-blue-600">{param.name}</td>
                                <td className="py-2 px-3 text-gray-600">{param.type}</td>
                                <td className="py-2 px-3 text-gray-600">{param.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Format</h3>
              <p className="text-gray-600 mb-4">All API responses are returned in JSON format with the following structure:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`{
  "success": true,
  "data": {
    // Response data here
  },
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  },
  "meta": {
    "request_id": "req_123456789",
    "timestamp": "2026-01-06T10:30:00Z"
  }
}`}
              </pre>
            </div>
          </div>
        );

      case 'rate-limits':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Rate Limits</h1>
              <p className="text-lg text-gray-600 mb-6">
                To ensure fair usage and maintain service quality, the Celebrity Persona API implements rate limiting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Current Limits</h3>
                <div className="space-y-2 text-blue-800 text-sm">
                  <div className="flex justify-between">
                    <span>Per minute:</span>
                    <span className="font-medium">69 requests</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per hour:</span>
                    <span className="font-medium">4,167 requests</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per month:</span>
                    <span className="font-medium">100,000 requests</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Rate Limit Headers</h3>
                <div className="space-y-2 text-green-800 text-sm font-mono">
                  <div>X-RateLimit-Limit: 69</div>
                  <div>X-RateLimit-Remaining: 65</div>
                  <div>X-RateLimit-Reset: 1641472800</div>
                  <div>X-RateLimit-Window: 60</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Handling Rate Limits</h2>
              <p className="text-gray-600 mb-4">
                When you exceed your rate limit, the API will return a 429 status code with details about when you can retry.
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-2">Error Response:</h4>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto">
{`{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "API rate limit exceeded",
    "retry_after": 60
  }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Best Practices</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Monitor rate limit headers in your responses</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Implement exponential backoff for retries</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Cache responses when possible to reduce API calls</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Use batch endpoints for multiple operations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Consider upgrading your plan for higher limits</span>
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Documentation Section</h2>
            <p className="text-gray-600">Select a section from the sidebar to view detailed documentation.</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-sm border-r border-gray-200 overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">API Documentation</h2>
            <p className="text-sm text-gray-600 mt-1">Comprehensive guide and reference</p>
          </div>
          
          <nav className="p-4">
            {sidebarSections.map((section) => (
              <div key={section.id} className="mb-6">
                <h3 className="flex items-center space-x-2 text-sm font-medium text-gray-900 mb-3">
                  <span>{section.icon}</span>
                  <span>{section.title}</span>
                </h3>
                <ul className="space-y-1">
                  {section.subsections.map((subsection) => (
                    <li key={subsection.id}>
                      <button
                        onClick={() => setActiveSection(subsection.id)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                          activeSection === subsection.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {subsection.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentationPage;