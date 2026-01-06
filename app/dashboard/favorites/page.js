"use client";

import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';

export default function FavoritesPage() {
  const { user } = useAuth();

  const EmptyState = ({ type, icon, message }) => (
    <div className="text-center py-12">
      <div className="mx-auto w-12 h-12 text-gray-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No {type} yet</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Your Favorites</h3>
          </div>
        </div>

        {/* Favorite Celebrities */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Favorite Celebrities ({user?.favorites?.celebrities?.length || 0})
            </h3>
          </div>
          <div className="p-6">
            {!user?.favorites?.celebrities?.length ? (
              <EmptyState
                type="favorite celebrities"
                message="Start exploring and add celebrities to your favorites list."
                icon={
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.favorites.celebrities.map((celebrity, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">{celebrity}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Favorite Outfits */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Favorite Outfits ({user?.favorites?.outfits?.length || 0})
            </h3>
          </div>
          <div className="p-6">
            {!user?.favorites?.outfits?.length ? (
              <EmptyState
                type="favorite outfits"
                message="Discover amazing outfits and save them to your favorites."
                icon={
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 5l2 2" />
                  </svg>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.favorites.outfits.map((outfit, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">{outfit}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Favorite News */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Favorite News ({user?.favorites?.news?.length || 0})
            </h3>
          </div>
          <div className="p-6">
            {!user?.favorites?.news?.length ? (
              <EmptyState
                type="favorite news"
                message="Stay updated with the latest news and save interesting articles."
                icon={
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.favorites.news.map((news, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">{news}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}