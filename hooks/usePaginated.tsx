import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../constants';
import { getStoreData } from '../store/asyncStore';

function usePaginated<T extends any[]>(
  endpoint: string,
  size: number = 10,
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchMore: () => void;
  refetch: () => void;
  addCategory: (query: string) => void;
  removeCategory: (query: string) => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const refetch = () => {
    setData(null);
    setPage(0);
  };

  const addCategory = useCallback((add: string) => {
    if (categories.includes(add)) return;
    setCategories([...categories, add]);
  }, [categories]);
 
  const removeCategory = useCallback((remove: string) => {
    if (!categories.includes(remove)) return;
    setCategories(categories.filter(item => item !== remove));
  }, [categories]);

  useEffect(() => {
    setLoading(true);
    let url = '';
    if (categories.length === 0) {
      url = `${API_URL}${endpoint}?page=${page}&size=${size}`;
    } else {
      url = `${API_URL}${endpoint}/category?page=${page}&size=${size}&categories=${categories.join(',')}`;
    }
    console.log(url);
    getStoreData('jwtToken').then(token => {
      fetch(url, {
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
          setData(prev => {
            if (prev) {
              const currentIds = prev.map(item => item.id);
              responseData.content = responseData.content.filter(
                (item: any) => !currentIds.includes(item.id),
              );
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
    });
  }, [endpoint, page, size, categories]);

  return { data, loading, error, fetchMore, refetch, addCategory, removeCategory};
}

export default usePaginated;
