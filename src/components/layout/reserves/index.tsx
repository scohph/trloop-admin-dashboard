'use client';

import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import BreadCrumb from '@/components/common/breadcrumb';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { RESERVES } from '@/lib/contracts';
import { TReserveContract } from '@/types';
import ReserveCard from './reserve-card';
import { CHAINS_DATA } from '@/lib/chains';

const Reserves = () => {
  const { chainId } = useAppKitNetwork();
  const { address, isConnected } = useAppKitAccount();
  const settings = useSelector((state: RootState) => state.settings);
  console.log('xx');

  if (isConnected !== true) return null;
  return (
    <div className="flex flex-col space-y-12 px-5 lg:px-12">
      <div>
        <BreadCrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Reserves', href: '/reserves' },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {RESERVES[Number(chainId)]?.map(
          (item: TReserveContract, index: number) => (
            <div key={item.key + index}>
              <ReserveCard
                address={address as string}
                reserve={item}
                chain={CHAINS_DATA[Number(chainId)]}
                mode={settings.mode}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default Reserves;
