'use client';

import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from '@reown/appkit/react';
import { isWhitelistedAddress } from '@/lib/helpers';
import { ShieldAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Login() {
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { address, isConnected, status } = useAppKitAccount();

  const walletNotConnected = status === 'disconnected';
  const walletConnectedButUnauthorized =
    isConnected && address && !isWhitelistedAddress(address);

  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center space-y-3">
        <ShieldAlertIcon size={50} className="text-[var(--color-red-600)]" />
        <h1 className="text-3xl font-semibold text-red-600 mb-3">
          Access Denied
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Your wallet address is not authorized to access this platform.
          <br />
          Please connect an approved wallet or contact the administrator.
        </p>
      </div>
      <div className="mt-6">
        {walletNotConnected && (
          <p className="text-sm mb-3">
            Please connect your wallet to continue.
          </p>
        )}
        {walletConnectedButUnauthorized && (
          <p className="text-sm mb-3">
            Please connect an authorized wallet to proceed.
          </p>
        )}

        {walletNotConnected ? (
          <Button onClick={() => open()} variant={'outline'}>
            Connect Wallet
          </Button>
        ) : (
          <Button onClick={() => disconnect()} variant={'destructive'}>
            Disconnect Wallet
          </Button>
        )}
      </div>
    </div>
  );
}
