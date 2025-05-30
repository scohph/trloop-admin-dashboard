import { TRLOOPLogo } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { TRLOOP_TOKEN_ADDRESS } from '@/lib/contracts';
import {
  checkReserveContractAuth,
  formatAddressDesign,
  numberWithCommas,
} from '@/lib/helpers';
import { HexString, TChainData, TReserveContract } from '@/types';
import { useAppKitProvider } from '@reown/appkit/react';
import {
  CheckCheck,
  CircleSlash,
  CopyCheck,
  CopyIcon,
  CopyX,
  ShieldAlertIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { formatEther, isAddress, parseEther } from 'viem';
import { ethers } from 'ethers';
import { reserveAbi } from '@/lib/abis';
import { GetSigner } from '@/lib/web3';

interface IReserveCardProps {
  address: string;
  reserve: TReserveContract;
  chain: TChainData;
  mode: 'production' | 'development';
}
const ReserveCard = ({ address, reserve, chain, mode }: IReserveCardProps) => {
  const { walletProvider } = useAppKitProvider('eip155');
  const [checkAuthAddress, setCheckAuthAddress] = useState<string>('');
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState<string>('');
  const [updateIndex, setUpdateIndex] = useState<number>(0);
  const { balanceData, loading } = useTokenBalance(
    reserve.address,
    TRLOOP_TOKEN_ADDRESS[Number(chain.data.chainId)],
    chain,
    updateIndex,
    mode
  );

  const handleCopy = async (text: string) => {
    const isMobile = window.innerWidth <= 768;
    try {
      await navigator.clipboard.writeText(text);
      toast('Copied to clipboard!', {
        icon: <CopyCheck />,
        position: isMobile ? 'top-center' : 'bottom-right',

        style: {
          gap: '1rem',
        },
      });
    } catch (err) {
      console.warn('[reserve-card] handleCopy:', err);
      toast('Failed to copy to clipboard', {
        icon: <CopyX />,
        position: isMobile ? 'top-center' : 'bottom-right',

        style: {
          gap: '1rem',
        },
      });
    }
  };

  const checkAuth = async () => {
    const isMobile = window.innerWidth <= 768;
    try {
      const res = await checkReserveContractAuth(
        checkAuthAddress,
        reserve.address,
        chain
      );

      if (res === true) {
        setAuthStatus(true);
        console.log('girdi');
        toast('This is an authorized wallet address', {
          icon: <ShieldAlertIcon />,
          position: isMobile ? 'top-center' : 'bottom-right',

          style: {
            gap: '1rem',
            color: 'green',
          },
        });
      } else {
        toast('This is not an authorized wallet address', {
          icon: <ShieldAlertIcon />,
          position: isMobile ? 'top-center' : 'bottom-right',

          style: {
            gap: '1rem',
            color: 'red',
          },
        });
        setAuthStatus(false);
      }
    } catch (error) {
      console.warn('[reserve-card] checkAuth:', error);
    }
  };

  const setReserveContractAuth = async (status: boolean) => {
    try {
      if (!isAddress(checkAuthAddress)) {
        return;
      }
      const signer = await GetSigner(walletProvider);
      const contract = new ethers.Contract(reserve.address, reserveAbi, signer);
      const tx = await contract.setAuthorizedCaller(status, checkAuthAddress);
      await tx.wait();
      setAuthStatus(status);
    } catch (error) {
      console.warn('[reserve-card] setReserveContractAuth:', error);
    }
  };

  const withdrawnFn = async () => {
    const isMobile = window.innerWidth <= 768;

    try {
      const signer = await GetSigner(walletProvider);
      const contract = new ethers.Contract(reserve.address, reserveAbi, signer);
      const tx = await contract.withdrawToken(
        parseEther(withdrawnAmount),
        address,
        TRLOOP_TOKEN_ADDRESS[Number(chain.data.chainId)]
      );
      await tx.wait();
      toast('Withdrawal completed successfully', {
        icon: <CheckCheck />,
        position: isMobile ? 'top-center' : 'bottom-right',

        style: {
          gap: '1rem',
          color: 'green',
        },
      });
      setUpdateIndex((prev) => prev + 1);
    } catch (error) {
      console.warn('[reserve-card] setReserveContractAuth:', error);
      toast('Withdrawal failed. Please try again.', {
        icon: <CircleSlash />,
        position: isMobile ? 'top-center' : 'bottom-right',
        style: {
          gap: '1rem',
          color: 'red',
        },
      });
    }
  };

  const handleOpenInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <>
      <div className="border flex flex-col gap-2 rounded-xl shadow-sm">
        <div className="w-full px-5 py-2 border-b flex items-center space-x-2">
          <chain.logo size={24} />
          <span className="text-sm font-semibold">{reserve.name}</span>
        </div>

        <div className="flex flex-col gap-2 px-5 w-full">
          <div className="flex items-center justify-center w-full">
            {address.toLowerCase() === reserve.initialOwner.toLowerCase() ? (
              <>
                <div className="flex lg:flex-row flex-col text-center items-center space-x-2 text-green-700 text-xs">
                  <ShieldAlertIcon />
                  <span>You are the authorized address. You can proceed.</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex lg:flex-row flex-col text-center items-center space-x-2 text-red-700 text-xs">
                  <ShieldAlertIcon size={16} />
                  <span>
                    You are not the authorized address. You cannot perform this
                    action.
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="flex lg:flex-row flex-col space-y-2 lg:space-y-0 lg:items-center w-full lg:justify-between border-b border-dashed pb-2">
            <span className="text-muted-foreground font-semibold">
              Contract Address
            </span>
            <div className="flex items-center space-x-3">
              <span className="font-mono">
                {formatAddressDesign(reserve.address as HexString)}
              </span>
              <Button
                variant={'outline'}
                size={'icon'}
                onClick={() => handleCopy(reserve.address)}
              >
                <CopyIcon aria-hidden={true} />
              </Button>
              <Button
                variant={'secondary'}
                size={'icon'}
                onClick={() =>
                  handleOpenInNewTab(
                    `${chain.data.explorerUrl}/address/${reserve.address}`
                  )
                }
              >
                <SquareArrowOutUpRightIcon aria-hidden={true} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:items-center w-full lg:justify-between border-b border-dashed pb-2">
            <div className="flex items-center space-x-2">
              <TRLOOPLogo />
              <span className="text-muted-foreground font-semibold">
                TRLOOP Balance
              </span>
            </div>
            <span className="font-mono">
              {loading ? (
                <>-.-</>
              ) : (
                <>{numberWithCommas(formatEther(BigInt(balanceData)))}</>
              )}
            </span>
          </div>

          <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:items-center w-full lg:justify-between border-b border-dashed pb-2">
            <span className="text-muted-foreground font-semibold">
              Check Authorized
            </span>

            <div className="flex w-full max-w-sm items-center gap-2">
              <Input
                type="string"
                placeholder="0x123"
                value={checkAuthAddress}
                onChange={(e) => setCheckAuthAddress(e.target.value)}
              />
              <Button
                variant="outline"
                disabled={!isAddress(checkAuthAddress)}
                onClick={() => checkAuth()}
              >
                Check
              </Button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:items-center w-full lg:justify-between border-b border-dashed pb-2">
            <span className="text-muted-foreground font-semibold">
              Set Authorized
            </span>

            <div className="flex items-center gap-2">
              {authStatus === true ? (
                <>
                  <div className="flex items-center space-x-1 text-green-700 text-sm">
                    <ShieldAlertIcon size={20} />
                    <span>Authed</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-1 text-red-700 text-sm">
                    <ShieldAlertIcon size={20} />
                    <span>Not authed</span>
                  </div>
                </>
              )}
              <Button
                variant="outline"
                disabled={
                  address.toLowerCase() !==
                    reserve.initialOwner.toLowerCase() || authStatus === false
                }
                onClick={() => setReserveContractAuth(false)}
              >
                Unauth
              </Button>
              <Button
                variant="outline"
                disabled={
                  address.toLowerCase() !==
                    reserve.initialOwner.toLowerCase() || authStatus === true
                }
                onClick={() => setReserveContractAuth(true)}
              >
                Auth
              </Button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:items-center w-full lg:justify-between pb-2">
            <span className="text-muted-foreground font-semibold">
              Withdrawn
            </span>

            <div className="flex w-full max-w-sm items-center gap-2">
              <Input
                disabled={
                  address.toLowerCase() !== reserve.initialOwner.toLowerCase()
                }
                type="string"
                placeholder="15.5"
                value={withdrawnAmount}
                onChange={(e) => setWithdrawnAmount(e.target.value)}
              />
              <Button
                disabled={
                  address.toLowerCase() !== reserve.initialOwner.toLowerCase()
                }
                onClick={() => withdrawnFn()}
                variant="outline"
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReserveCard;
