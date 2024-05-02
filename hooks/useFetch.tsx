import { useState, useEffect } from 'react';
import { API_URL } from '../constants';
import { getStoreData } from '../store/asyncStore';

// A custom hook that can fetch any data given a URL and returns typed data
function useFetch<T>(endpoint: string): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    console.log(API_URL + endpoint);
    getStoreData('jwtToken').then(token => {
      fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(responseData => {
          setData(responseData);
          setError(null);
        })
        .catch(fetchError => {
          setError(fetchError);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [endpoint, trigger]);

  return {
    data,
    loading,
    error,
    refetch: () => {
      setData(null);
      setTrigger(prev => prev + 1);
    },
  };
}

export default useFetch;
