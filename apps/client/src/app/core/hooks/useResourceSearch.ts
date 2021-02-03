import { useEffect, useState, useCallback } from 'react';

import { Status } from './common.types';
import { useClient } from './useClient';

function useResourceSearch<T>(endpoint: string, query?: string) {
  const client = useClient();
  const [data, setData] = useState<T>(undefined);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState(null);
  const [refreshCount, setRefresh] = useState(0);

  const refresh = useCallback(() => setRefresh((value) => value + 1), []);

  useEffect(() => {
    const fetchData = async () => {
      setStatus('pending');

      try {
        const result = await client(endpoint);

        setData(result);
        setStatus('success');
      } catch (error) {
        setError(error);
        setStatus('error');
      }
    };

    fetchData();
  }, [endpoint, client, query, refreshCount]);

  return { data, error, status, isLoading: status === 'pending', refresh };
}

export { useResourceSearch };
