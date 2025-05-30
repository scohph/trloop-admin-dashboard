import { getWalletsData } from '@/lib/services';
import { TWalletsData } from '@/types';
import { useEffect, useMemo, useState } from 'react';

export function useWalletsData(updateIndex: number, mode: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [walletsData, setWalletsData] = useState<TWalletsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getWalletsData(mode);
        setWalletsData(result);
      } catch (error) {
        console.log('[useWalletsData] fetchData:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [updateIndex, mode]);

  const allChainsTotalTransactions = useMemo(() => {
    if (!walletsData?.totalTransactions) return 0;

    return walletsData.totalTransactions.reduce((chainAcc, chain) => {
      const itemsTotal = chain.items.reduce((itemAcc, item) => {
        const count =
          typeof item.totalCount === 'bigint'
            ? Number(item.totalCount)
            : item.totalCount;
        return itemAcc + count;
      }, 0);
      return chainAcc + itemsTotal;
    }, 0);
  }, [walletsData]);

  return { loading, walletsData, allChainsTotalTransactions };
}
