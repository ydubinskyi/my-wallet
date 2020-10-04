import React from 'react';

import { useAuth } from '../../auth/hooks/useAuth';
import { client } from '../services/api-client.service';

function useClient() {
  const { user } = useAuth();
  const token = user?.access_token;
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}

export { useClient };
