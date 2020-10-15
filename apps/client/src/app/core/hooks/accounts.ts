import { useResourceSearch } from './useResourceSearch';

function useAccountsSearch(query?: string) {
  return useResourceSearch<any[]>('accounts', query);
}

export { useAccountsSearch };
