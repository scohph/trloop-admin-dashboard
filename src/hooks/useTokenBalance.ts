import { getTokenBalance } from '@/lib/helpers';
import { TChainData } from '@/types';

import { useEffect, useState } from 'react';

export function useTokenBalance(
  address: string,
  tokenAddress: string,
  chain: TChainData,
  updateIndex: number,
  mode: string
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [balanceData, setBalanceData] = useState<string>('0');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getTokenBalance(address, tokenAddress, chain);
        setBalanceData(result);
      } catch (error) {
        console.log('[useTokenBalance] fetchData:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, tokenAddress, chain, updateIndex, mode]);

  return { loading, balanceData };
}
