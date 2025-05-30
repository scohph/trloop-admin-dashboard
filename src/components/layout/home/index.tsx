'use client';

import BreadCrumb from '@/components/common/breadcrumb';
import WalletCharts from './wallets-chart';

const Home = () => {
  return (
    <>
      <div className="flex flex-col space-y-12 px-5 lg:px-12">
        <div>
          <BreadCrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Dashboard', href: '/' },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <WalletCharts />
        </div>
      </div>
    </>
  );
};
export default Home;
