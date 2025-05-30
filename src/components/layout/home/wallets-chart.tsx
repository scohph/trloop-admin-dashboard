import Chart from '@/components/common/chart';
import { Button } from '@/components/ui/button';
import { TChartConfig } from '@/types';
import {
  ChevronRight,
  LoaderCircleIcon,
  RefreshCcw,
  WalletIcon,
} from 'lucide-react';
import { numberWithCommas } from '@/lib/helpers';
import { useRouter } from 'next/navigation';
import { useWalletsData } from '@/hooks/useWalletsData';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const WalletCharts = () => {
  const router = useRouter();
  const [updateIndex, setUpdateIndex] = useState<number>(0);
  const settings = useSelector((state: RootState) => state.settings);
  const { loading, walletsData, allChainsTotalTransactions } = useWalletsData(
    updateIndex,
    settings.mode
  );

  const handleRefreshFn = () => setUpdateIndex(updateIndex + 1);

  const chartData = [
    {
      data: 'Wallets',
      before: settings.mode === 'production' ? 5149 : 5,
      after:
        walletsData && walletsData.totalUsers
          ? Number(walletsData.totalUsers)
          : loading === true
          ? 0
          : 0,
    },
    {
      data: 'Transactions',
      before: settings.mode === 'production' ? 0 : 5,
      after: loading === true ? 0 : allChainsTotalTransactions!,
    },
  ];

  const chartConfig = {
    before: {
      label: '30d',
      color: '#2563eb',
    },
    after: {
      label: 'Now',
      color: '#60a5fa',
    },
  } satisfies TChartConfig;

  return (
    <>
      <div className="flex flex-col space-y-2 border rounded-xl">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:items-center w-full justify-between border-b py-4 lg:py-2 px-3">
          <div className="flex items-center space-x-2">
            <WalletIcon />
            <span className="font-bold">Wallets</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={'outline'}
              className="cursor-pointer"
              onClick={() => handleRefreshFn()}
            >
              <RefreshCcw />
              Refresh
            </Button>
            <Button
              variant={'secondary'}
              className="cursor-pointer"
              onClick={() => router.push('/wallets')}
            >
              View Details
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="flex space-y-2 flex-col lg:flex-row w-full px-3 py-2">
          <div className="w-full lg:w-1/2 flex flex-col space-y-5 h-full justify-center">
            <div className="flex flex-col justify-center items-center border border-dashed rounded-xl p-3">
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
              ) : (
                <span className="text-3xl">0</span>
              )}
            </div>
            <div className="flex flex-col justify-center items-center border border-dashed rounded-xl p-3">
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
              ) : (
                <span className="text-3xl">0</span>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-full">
            {loading === true ? (
              <div className="w-full h-full flex justify-center items-center">
                <LoaderCircleIcon className="animate-spin text-3xl" />
              </div>
            ) : (
              <>
                <Chart chartConfig={chartConfig} chartData={chartData} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default WalletCharts;
