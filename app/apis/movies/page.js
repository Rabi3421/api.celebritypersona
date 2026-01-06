"use client";

import Header from "../../../layouts/partials/Header";
import Footer from "../../../layouts/partials/Footer";
import SeoMeta from "../../../layouts/SeoMeta";
import Link from "next/link";

export default function MoviesAPIPage() {
  return (
    <>
      <SeoMeta title="Movies & Reviews API - Celebrity Persona" />
      <Header />
      
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Movies & Reviews API
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete movie database with ratings, reviews, box office data, 
              cast information, and upcoming releases. Your alternative to expensive IMDb API.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-800 mb-2">💡 Cost Comparison</h3>
            <p className="text-yellow-700">
              Save up to 90% compared to IMDb API pricing while getting the same comprehensive movie data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-primary">500K+</div>
              <div className="text-sm text-gray-600">Movies & TV Shows</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-primary">10M+</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-primary">Daily</div>
              <div className="text-sm text-gray-600">Updates</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-primary">$0.0015</div>
              <div className="text-sm text-gray-600">Per Request</div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/auth/signup" className="btn btn-primary mr-4">
              Start Free Trial
            </Link>
            <Link href="/docs" className="btn btn-outline-primary">
              API Reference
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}