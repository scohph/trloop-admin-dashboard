'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isWhitelistedAddress } from '@/lib/helpers';
import { getOrRefreshClientCredential } from '@/lib/services';

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { address, isConnected, status } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthAndToken = async () => {
      console.log('[DataProvider] status:', status);
      if (status === 'connecting') {
        setIsLoading(true);
        return;
      }

      setIsLoading(false);

      if (status === 'disconnected' || !isConnected) {
        document.cookie = 'wallet-address=; path=/; max-age=0; samesite=lax';
        document.cookie = 'is-connected=; path=/; max-age=0; samesite=lax';
        router.push('/login');
        return;
      }

      if (
        status === 'connected' &&
        isConnected &&
        address &&
        isWhitelistedAddress(address)
      ) {
        console.log('girdi');
        document.cookie = `wallet-address=${address}; path=/; max-age=3600; samesite=lax`;
        document.cookie = `is-connected=true; path=/; max-age=3600; samesite=lax`;

        if (pathname.startsWith('/login')) {
          const redirectTo = searchParams.get('redirectTo') || '/';
          router.push(redirectTo);
        }
        await getOrRefreshClientCredential();
      }
    };
    void handleAuthAndToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (isLoading) return null;

  return children;
};
export default DataProvider;
