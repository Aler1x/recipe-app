import { useState, useEffect } from 'react';
import { APP_URL } from '../constants';

// A custom hook that can fetch any data given a URL and returns typed data
function useFetch<T>(
  endpoint: string 
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    console.log(APP_URL + endpoint);
    fetch(`${APP_URL}${endpoint}`)
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
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;
