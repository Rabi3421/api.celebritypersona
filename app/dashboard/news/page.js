"use client";

import DashboardLayout from '../../../components/dashboard/DashboardLayout';

export default function NewsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Celebrity News</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 text-gray-400 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Latest News</h3>
              <p className="text-gray-500">Stay updated with the latest celebrity news and gossip.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}