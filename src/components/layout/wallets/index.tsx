'use client';
import BreadCrumb from '@/components/common/breadcrumb';
import { WALLETS_DEPLOYER_ADDRESS } from '@/lib/constants';
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { LoaderCircleIcon, ShieldAlertIcon } from 'lucide-react';
import { isAddressEqual } from 'viem';
import ChainCard from './chain-card';
import { EnrichedTransactionData } from '@/types';
import { useMemo, useState } from 'react';
import { useWalletsData } from '@/hooks/useWalletsData';
import {
  getTransactionTokensWithChainDataArray,
  numberWithCommas,
} from '@/lib/helpers';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Wallets = () => {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const settings = useSelector((state: RootState) => state.settings);
  console.log(chainId);
  const isDeployer =
    isConnected === true &&
    address &&
    isAddressEqual(
      address as `0x${string}`,
      WALLETS_DEPLOYER_ADDRESS[Number(chainId)] as `0x${string}`
    );

  const [updateIndex, setUpdateIndex] = useState<number>(0);
  const { loading, walletsData, allChainsTotalTransactions } = useWalletsData(
    updateIndex,
    settings.mode
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRefreshFn = () => setUpdateIndex(updateIndex + 1);

  console.log(walletsData);
  const data = useMemo(() => {
    if (!walletsData || walletsData.totalTransactions.length === 0) return null;
    return getTransactionTokensWithChainDataArray(
      walletsData.totalTransactions
    );
  }, [walletsData]);

  console.log(walletsData);
  return (
    <div className="flex flex-col space-y-12 px-5 lg:px-12">
      <div>
        <BreadCrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Walets', href: '/wallets' },
          ]}
        />
      </div>
      <div className="grid grid-cols-5 gap-12">
        <div className="flex flex-col justify-center font-semibold items-center border rounded-xl p-4">
          <span className="text-xl text-muted-foreground">
            Total Created Wallets
          </span>
          {loading === true ? (
            <>
              <LoaderCircleIcon className="animate-spin text-3xl" />
            </>
          ) : walletsData ? (
            <>
              <span className="text-3xl">
                {numberWithCommas(Number(walletsData.totalUsers))}
              </span>
            </>
          ) : null}
        </div>
        <div className="flex flex-col justify-center font-semibold items-center border rounded-xl p-4">
          <span className="text-xl text-muted-foreground">
            Total Transactions
          </span>
          {loading === true ? (
            <>
              <LoaderCircleIcon className="animate-spin text-3xl" />
            </>
          ) : allChainsTotalTransactions ? (
            <>
              <span className="text-3xl">
                {numberWithCommas(Number(allChainsTotalTransactions))}
              </span>
            </>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12">
        <div className="flex flex-col space-y-1 border p-4 rounded-xl">
          <span className="text-sm font-medium text-muted-foreground">
            Wallet Contracts Deployer Address:
          </span>
          <span className="font-mono text-md">
            {WALLETS_DEPLOYER_ADDRESS[Number(chainId)]}
          </span>

          {isConnected && (
            <div className="mt-6 flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">
                Your Connected Wallet:
              </span>
              <span className="font-mono text-md">{address}</span>
            </div>
          )}

          {isDeployer ? (
            <div className="mt-3 flex items-start space-x-2 border border-green-700 text-green-700 p-4 rounded-md">
              <ShieldAlertIcon className="mt-0.5" size={20} />
              <p className="text-sm">
                Your account matches the deployer wallet.
                <br />
                You can perform actions on this page.
              </p>
            </div>
          ) : (
            <div className="mt-3 flex items-start space-x-2 border border-red-700 text-red-700 p-4 rounded-md">
              <ShieldAlertIcon className="mt-0.5" size={20} />
              <p className="text-sm">
                You have read-only access to this page.
                <br />
                To perform any actions, please switch to the authorized deployer
                wallet.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {data !== null &&
          data.length > 0 &&
          data.map((item: EnrichedTransactionData, index: number) => (
            <div key={'wallets_chain_data_key_' + index.toString()}>
              <ChainCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Wallets;
