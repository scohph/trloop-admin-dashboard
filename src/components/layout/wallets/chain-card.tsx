import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { format6DecimalsAsEth, formatAddressDesign } from '@/lib/helpers';
import {
  EnrichedTransactionData,
  EnrichedTransactionItem,
  HexString,
} from '@/types';
import { CopyIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import { useState } from 'react';
import { formatEther } from 'viem';

interface IChainCard {
  data: EnrichedTransactionData;
}
const ChainCard: React.FC<IChainCard> = ({ data }) => {
  const [contractIsActive, setContractIsActive] = useState<boolean>(true);

  return (
    <>
      <div className="flex flex-col border rounded-xl">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center space-x-2">
            <data.walletContractInfo.chainData.logo />
            <span>{data.walletContractInfo.chainData.data.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{contractIsActive === true ? 'Active' : 'Paused'}</span>
            <Switch
              checked={contractIsActive}
              onCheckedChange={(checked) => setContractIsActive(checked)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-3 p-4">
          <div className="flex items-center w-full justify-between border-b border-dashed pb-2">
            <span className="text-muted-foreground font-semibold">
              Contract Address
            </span>
            <div className="flex items-center space-x-3">
              <span className="font-mono">
                {formatAddressDesign(
                  data.walletContractInfo.contractAddress as HexString
                )}
              </span>
              <Button variant={'outline'} size={'icon'}>
                <CopyIcon aria-hidden={true} />
              </Button>
              <Button variant={'secondary'} size={'icon'}>
                <SquareArrowOutUpRightIcon aria-hidden={true} />
              </Button>
            </div>
          </div>
          {data.items.map((item: EnrichedTransactionItem, index: number) => (
            <div
              key={'EnrichedTransactionItem_key_' + index.toString()}
              className="flex flex-col space-y-2 font-semibold"
            >
              <div className="flex items-center space-x-2">
                {item.tokenInfo && item.tokenInfo.logo && (
                  <div>
                    <item.tokenInfo.logo />
                  </div>
                )}
                <span>{item.tokenInfo?.symbol}</span>
              </div>
              <div className="flex items-center w-full justify-between">
                <span className="text-muted-foreground">
                  Transactions Value
                </span>
                <div className="flex items-center space-x-3">
                  {item.tokenInfo && item.tokenInfo?.decimals && (
                    <span className="font-semibold">
                      {item.tokenInfo.decimals === 6
                        ? format6DecimalsAsEth(item.totalAmount)
                        : formatEther(BigInt(item.totalAmount))}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center w-full justify-between border-b border-dashed pb-1">
                <span className="text-muted-foreground font-semibold">
                  Transactions Count
                </span>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold">{item.totalCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ChainCard;
