"use client";

import Header from "../../layouts/partials/Header";
import Footer from "../../layouts/partials/Footer";
import SeoMeta from "../../layouts/SeoMeta";
import Link from "next/link";

export default function DocsPage() {
  const quickStartCode = `// Install our SDK
npm install celebrity-persona-api

// Initialize the client
import { CelebrityAPI } from 'celebrity-persona-api';

const api = new CelebrityAPI({
  apiKey: 'your-api-key-here',
  baseURL: 'https://api.celebritypersona.com/v1'
});

// Get celebrity profile
const celebrity = await api.celebrities.get('taylor-swift-001');
console.log(celebrity.name); // "Taylor Swift"

// Search celebrities
const results = await api.celebrities.search('Tom Hanks');

// Get celebrity news
const news = await api.news.getByCelebrity('taylor-swift-001');

// Get outfit details
const outfit = await api.outfits.get('red-carpet-2023-001');`;

  return (
    <>
      <SeoMeta title="API Documentation - Celebrity Persona API" />
      <Header />
      
      <section className="section">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              API Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete guide to integrating Celebrity Persona API into your applications. 
              Get started in minutes with our comprehensive documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow sticky top-6">
                <h3 className="font-bold text-lg mb-4">Documentation</h3>
                <nav className="space-y-2">
                  <a href="#quickstart" className="block text-primary hover:underline">Quick Start</a>
                  <a href="#authentication" className="block text-gray-600 hover:text-primary">Authentication</a>
                  <a href="#endpoints" className="block text-gray-600 hover:text-primary">API Endpoints</a>
                  <a href="#examples" className="block text-gray-600 hover:text-primary">Code Examples</a>
                  <a href="#sdks" className="block text-gray-600 hover:text-primary">SDKs & Libraries</a>
                  <a href="#errors" className="block text-gray-600 hover:text-primary">Error Handling</a>
                  <a href="#rate-limits" className="block text-gray-600 hover:text-primary">Rate Limits</a>
                  <a href="#webhooks" className="block text-gray-600 hover:text-primary">Webhooks</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Quick Start */}
              <div id="quickstart" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
                
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</div>
                      <h3 className="text-xl font-bold">Get Your API Key</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Sign up for a free account and get instant access to your API key. 
                      You'll receive 10,000 free requests per month to get started.
                    </p>
                    <Link href="/auth/signup" className="btn btn-primary">
                      Sign Up Free
                    </Link>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</div>
                      <h3 className="text-xl font-bold">Make Your First Request</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Use our REST API or SDK to start fetching celebrity data immediately.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`curl -X GET "https://api.celebritypersona.com/v1/celebrities/search?q=taylor-swift" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                      </pre>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">3</div>
                      <h3 className="text-xl font-bold">Integrate with SDKs</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Use our official SDKs for faster integration in your preferred language.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        {quickStartCode}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authentication */}
              <div id="authentication" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Authentication</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-600 mb-4">
                    All API requests require authentication using your API key in the Authorization header:
                  </p>
                  <div className="bg-gray-100 p-4 rounded border-l-4 border-primary">
                    <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                </div>
              </div>

              {/* API Endpoints */}
              <div id="endpoints" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Available APIs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-lg mb-2">Celebrity Profiles</h3>
                    <p className="text-gray-600 mb-4">Complete celebrity information and biographies</p>
                    <Link href="/apis/celebrities" className="text-primary hover:underline">
                      View API Details →
                    </Link>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-lg mb-2">Fashion & Outfits</h3>
                    <p className="text-gray-600 mb-4">Celebrity outfits with shopping links</p>
                    <Link href="/apis/outfits" className="text-primary hover:underline">
                      View API Details →
                    </Link>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-lg mb-2">Celebrity News</h3>
                    <p className="text-gray-600 mb-4">Real-time entertainment news</p>
                    <Link href="/apis/news" className="text-primary hover:underline">
                      View API Details →
                    </Link>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-lg mb-2">Movies & Reviews</h3>
                    <p className="text-gray-600 mb-4">Movie database with ratings</p>
                    <Link href="/apis/movies" className="text-primary hover:underline">
                      View API Details →
                    </Link>
                  </div>
                </div>
              </div>

              {/* SDKs */}
              <div id="sdks" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SDKs & Libraries</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded">
                      <div className="text-2xl mb-2">🟨</div>
                      <div className="font-semibold">JavaScript</div>
                      <div className="text-sm text-gray-600">Node.js & Browser</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded">
                      <div className="text-2xl mb-2">🐍</div>
                      <div className="font-semibold">Python</div>
                      <div className="text-sm text-gray-600">pip install</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded">
                      <div className="text-2xl mb-2">☕</div>
                      <div className="font-semibold">Java</div>
                      <div className="text-sm text-gray-600">Maven/Gradle</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded">
                      <div className="text-2xl mb-2">🐘</div>
                      <div className="font-semibold">PHP</div>
                      <div className="text-sm text-gray-600">Composer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-primary text-white p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
                <p className="mb-6">
                  Our developer support team is here to help you integrate successfully.
                </p>
                <div className="space-x-4">
                  <Link href="/contact" className="btn btn-white">
                    Contact Support
                  </Link>
                  <Link href="/auth/signup" className="btn btn-outline-white">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}