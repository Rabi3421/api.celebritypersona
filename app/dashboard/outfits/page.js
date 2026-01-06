"use client";

import DashboardLayout from '../../../components/dashboard/DashboardLayout';

export default function OutfitsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Outfits</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 text-gray-400 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 5l2 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fashion Outfits</h3>
              <p className="text-gray-500">Browse through amazing celebrity outfits and fashion trends.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}