"use client";

import Header from "../../../layouts/partials/Header";
import Footer from "../../../layouts/partials/Footer";
import SeoMeta from "../../../layouts/SeoMeta";
import Link from "next/link";

export default function CelebritiesAPIPage() {
  const endpoints = [
    {
      method: "GET",
      endpoint: "/celebrities",
      description: "Get list of all celebrities with pagination",
      parameters: ["page", "limit", "category", "sort"]
    },
    {
      method: "GET",
      endpoint: "/celebrities/{id}",
      description: "Get detailed celebrity profile",
      parameters: ["include_social", "include_filmography"]
    },
    {
      method: "GET",
      endpoint: "/celebrities/search",
      description: "Search celebrities by name or attributes",
      parameters: ["q", "category", "age_range", "nationality"]
    },
    {
      method: "GET",
      endpoint: "/celebrities/{id}/filmography",
      description: "Get celebrity's complete filmography",
      parameters: ["type", "year", "sort"]
    }
  ];

  return (
    <>
      <SeoMeta title="Celebrity Profiles API - Celebrity Persona" />
      <Header />
      
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Celebrity Profiles API
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive celebrity profiles including biography, filmography, 
              personal details, social media stats, and career information.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">100K+ Celebrities</h3>
              <p className="text-gray-600">Comprehensive database of actors, musicians, athletes, and public figures</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">Real-time Updates</h3>
              <p className="text-gray-600">Information updated daily from verified entertainment sources</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">Rich Metadata</h3>
              <p className="text-gray-600">Awards, nominations, relationships, social media metrics, and more</p>
            </div>
          </div>

          {/* Endpoints */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow border-l-4 border-primary">
                  <div className="flex items-center mb-2">
                    <span className="bg-primary text-white px-2 py-1 rounded text-sm font-mono mr-3">
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono">{endpoint.endpoint}</code>
                  </div>
                  <p className="text-gray-600 mb-2">{endpoint.description}</p>
                  <div className="text-sm text-gray-500">
                    <strong>Parameters:</strong> {endpoint.parameters.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Example Response */}
          <div className="bg-gray-900 rounded-lg p-6 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Example Response</h3>
            <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "taylor-swift-001",
    "name": "Taylor Swift",
    "biography": "American singer-songwriter known for...",
    "birth_date": "1989-12-13",
    "nationality": "American",
    "profession": ["Singer", "Songwriter", "Actress"],
    "awards": [
      {
        "name": "Grammy Award",
        "category": "Album of the Year",
        "year": 2021
      }
    ],
    "social_media": {
      "instagram": "@taylorswift",
      "followers": 272000000,
      "verified": true
    },
    "net_worth": "$740 million",
    "latest_projects": [
      {
        "title": "Midnights",
        "type": "Album",
        "release_date": "2022-10-21"
      }
    ]
  }
}`}
            </pre>
          </div>

          {/* Pricing */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Pricing</h3>
            <p className="text-3xl font-bold text-primary mb-2">$0.001 per request</p>
            <p className="text-gray-600">Volume discounts available for 1M+ requests</p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/auth/signup" className="btn btn-primary mr-4">
              Get Started
            </Link>
            <Link href="/docs" className="btn btn-outline-primary">
              View Full Documentation
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}