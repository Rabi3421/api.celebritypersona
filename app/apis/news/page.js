"use client";

import Header from "../../../layouts/partials/Header";
import Footer from "../../../layouts/partials/Footer";
import SeoMeta from "../../../layouts/SeoMeta";
import Link from "next/link";

export default function NewsAPIPage() {
  return (
    <>
      <SeoMeta title="Celebrity News API - Celebrity Persona" />
      <Header />
      
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Celebrity News API
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time celebrity news, exclusive interviews, relationship updates, 
              and entertainment industry announcements from verified sources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">Real-time Updates</h3>
              <p className="text-gray-600">Breaking news delivered within minutes of publication</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">Verified Sources</h3>
              <p className="text-gray-600">Only trusted entertainment publications and official statements</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">Sentiment Analysis</h3>
              <p className="text-gray-600">AI-powered sentiment scoring for each news article</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/auth/signup" className="btn btn-primary mr-4">
              Get API Access
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