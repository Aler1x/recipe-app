import { useState, useEffect } from 'react';
import { APP_URL } from '../constants';

function usePaginated<T extends any[]>(
  endpoint: string,
  size: number = 10
): { data: T | null; loading: boolean; error: Error | null, fetchMore: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(0);

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setLoading(true);
    const url = `${APP_URL}${endpoint}?page=${page}&size=${size}`;
    console.log(url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        setData(prev => {
          if (prev) {
            const currentIds = prev.map(item => item.id);
            responseData.content = responseData.content.filter((item: any) => !currentIds.includes(item.id));
            return [...prev, ...responseData.content];
          }
          return responseData.content;
        });
        setError(null);
      })
      .catch(fetchError => {
        setError(fetchError);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, page]);

  return { data, loading, error, fetchMore };
}

export default usePaginated;
