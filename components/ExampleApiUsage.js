// Example usage of the enhanced authentication system

import React from 'react';
import { useAuthenticatedApi, createApiCall } from '../hooks/useAuthenticatedApi';

const ExampleApiUsage = () => {
  const { apiCall, loading, error } = useAuthenticatedApi();
  const [data, setData] = React.useState(null);
  
  // Create API helper with base URL
  const api = createApiCall(process.env.NEXT_PUBLIC_API_BASE_URL);

  // Example 1: Using the hook
  const fetchUserProfile = async () => {
    try {
      const result = await apiCall('/api/auth/me');
      setData(result);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  // Example 2: Using the API helper directly
  const fetchCelebrities = async () => {
    try {
      const response = await api.get('/api/celebrities');
      if (response) {
        const result = await response.json();
        setData(result);
      }
    } catch (err) {
      console.error('Failed to fetch celebrities:', err);
    }
  };

  // Example 3: POST request
  const createFavorite = async (celebrityId) => {
    try {
      const response = await api.post('/api/favorites', { celebrityId });
      if (response) {
        const result = await response.json();
        console.log('Favorite created:', result);
      }
    } catch (err) {
      console.error('Failed to create favorite:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">API Usage Examples</h2>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      
      <div className="space-y-4">
        <button 
          onClick={fetchUserProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch User Profile
        </button>
        
        <button 
          onClick={fetchCelebrities}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Fetch Celebrities
        </button>
        
        <button 
          onClick={() => createFavorite('celebrity123')}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Create Favorite
        </button>
      </div>
      
      {data && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Response Data:</h3>
          <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ExampleApiUsage;