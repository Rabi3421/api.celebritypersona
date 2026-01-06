"use client";

import Header from "../../../layouts/partials/Header";
import Footer from "../../../layouts/partials/Footer";
import SeoMeta from "../../../layouts/SeoMeta";
import Link from "next/link";

export default function OutfitsAPIPage() {
  return (
    <>
      <SeoMeta title="Fashion & Outfits API - Celebrity Persona" />
      <Header />
      
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Fashion & Outfits API
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Decode celebrity style with detailed outfit breakdowns, brand information, 
              affiliate links, and fashion trend analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">What You Get</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                  Complete outfit breakdowns with item details
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                  Brand identification and pricing information
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                  Affiliate shopping links for monetization
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                  Event and occasion context (red carpet, street style)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                  Fashion trend analysis and styling tips
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-bold mb-4">Perfect For:</h3>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="bg-white p-3 rounded">Fashion Apps</div>
                <div className="bg-white p-3 rounded">E-commerce Platforms</div>
                <div className="bg-white p-3 rounded">Style Blogs & Magazines</div>
                <div className="bg-white p-3 rounded">Affiliate Marketing</div>
                <div className="bg-white p-3 rounded">Trend Analysis Tools</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/auth/signup" className="btn btn-primary mr-4">
              Start Building
            </Link>
            <Link href="/docs" className="btn btn-outline-primary">
              API Documentation
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}