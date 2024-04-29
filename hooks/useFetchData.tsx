import { useState, useEffect } from 'react';
import { APP_URL } from '../constants';
import App from '../App';

async function fetchData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// A custom hook that can fetch any data given a URL and returns typed data
function useFetchData<T>(
  endpoint: string,
  paginated?: boolean,
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    console.log(APP_URL + endpoint);
    fetchData(APP_URL + endpoint)
      .then(responseData => {
        paginated ? setData(responseData.content) : setData(responseData);
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

export default useFetchData;
