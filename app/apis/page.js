"use client";

import Header from "../../layouts/partials/Header";
import Footer from "../../layouts/partials/Footer";
import SeoMeta from "../../layouts/SeoMeta";
import Link from "next/link";

const ApiCard = ({ title, description, endpoints, pricing, link }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    
    <div className="mb-4">
      <h4 className="font-semibold text-gray-800 mb-2">Key Endpoints:</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        {endpoints.map((endpoint, index) => (
          <li key={index} className="flex items-center">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            {endpoint}
          </li>
        ))}
      </ul>
    </div>
    
    <div className="flex items-center justify-between">
      <div className="text-sm">
        <span className="text-gray-500">Starting at</span>
        <span className="text-lg font-bold text-primary ml-1">{pricing}</span>
      </div>
      <Link
        href={link}
        className="btn btn-primary text-sm px-4 py-2"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default function APIsPage() {
  const apis = [
    {
      title: "Celebrity Profiles API",
      description: "Access comprehensive celebrity information including biography, filmography, personal details, and social media statistics.",
      endpoints: [
        "GET /celebrities - List all celebrities",
        "GET /celebrities/{id} - Get celebrity details", 
        "GET /celebrities/{id}/filmography - Get movies/shows",
        "GET /celebrities/search - Search celebrities"
      ],
      pricing: "$0.001/request",
      link: "/apis/celebrities"
    },
    {
      title: "Fashion & Outfits API", 
      description: "Decode celebrity style with detailed outfit breakdowns, brand information, and affiliate shopping links.",
      endpoints: [
        "GET /outfits - List celebrity outfits",
        "GET /outfits/{id} - Get outfit details",
        "GET /celebrities/{id}/outfits - Celebrity's outfits",
        "GET /outfits/trends - Fashion trends"
      ],
      pricing: "$0.002/request",
      link: "/apis/outfits"
    },
    {
      title: "Celebrity News API",
      description: "Real-time celebrity news, interviews, relationship updates, and entertainment industry announcements.",
      endpoints: [
        "GET /news - Latest celebrity news",
        "GET /news/{id} - Get news article",
        "GET /celebrities/{id}/news - Celebrity's news",
        "GET /news/trending - Trending stories"
      ],
      pricing: "$0.001/request", 
      link: "/apis/news"
    },
    {
      title: "Movies & Reviews API",
      description: "Complete movie database with ratings, reviews, box office data, cast information, and upcoming releases.",
      endpoints: [
        "GET /movies - List movies",
        "GET /movies/{id} - Get movie details",
        "GET /movies/{id}/reviews - Movie reviews",
        "GET /movies/upcoming - Upcoming releases"
      ],
      pricing: "$0.0015/request",
      link: "/apis/movies"
    }
  ];

  return (
    <>
      <SeoMeta title="Celebrity Data APIs - Celebrity Persona API" />
      <Header />
      
      <section className="section">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Celebrity Data APIs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access the most comprehensive celebrity database through our RESTful APIs. 
              Choose from our specialized endpoints to power your entertainment applications.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100K+</div>
              <div className="text-sm text-gray-600">Celebrities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50M+</div>
              <div className="text-sm text-gray-600">Data Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">&lt;100ms</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
          </div>

          {/* API Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {apis.map((api, index) => (
              <ApiCard key={index} {...api} />
            ))}
          </div>

          {/* Integration Example */}
          <div className="bg-gray-900 rounded-lg p-6 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Quick Integration Example</h3>
            <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -X GET "https://api.celebritypersona.com/v1/celebrities/search?q=taylor-swift" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"

{
  "success": true,
  "data": {
    "id": "taylor-swift-001",
    "name": "Taylor Swift",
    "biography": "American singer-songwriter...",
    "social_media": {
      "instagram": "@taylorswift",
      "followers": 272000000
    }
  }
}`}
            </pre>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to start building?
            </h3>
            <p className="text-gray-600 mb-6">
              Get your API key and start accessing celebrity data in minutes
            </p>
            <Link href="/auth/signup" className="btn btn-primary mr-4">
              Get API Key
            </Link>
            <Link href="/docs" className="btn btn-outline-primary">
              View Documentation
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}