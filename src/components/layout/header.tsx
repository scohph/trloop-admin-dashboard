'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { HouseIcon, LandmarkIcon, WalletIcon } from 'lucide-react';
import ConnectButton from '../common/connect-button';
import Settings from '../common/settings';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="fixed w-full right-0 bottom-0 lg:bottom-auto lg:top-0 mb-5 lg:mt-5 z-50 flex justify-center items-center">
      <div className="flex items-center border bg-background backdrop-blur-2xl rounded-md py-1 px-2 space-x-2 h-12">
        <div className="flex items-center h-full space-x-2">
          <Button
            variant={pathname === '/' ? 'outline' : 'ghost'}
            size="icon"
            onClick={() => router.push('/')}
            className="cursor-pointer"
          >
            <HouseIcon strokeWidth={1.5} />
          </Button>
          <div className="h-full border-r" />
          <Button
            variant={pathname === '/wallets' ? 'outline' : 'ghost'}
            size="icon"
            onClick={() => router.push('/wallets')}
            className="cursor-pointer"
          >
            <WalletIcon strokeWidth={1.5} />
          </Button>
          <Button
            variant={pathname === '/reserves' ? 'outline' : 'ghost'}
            size="icon"
            onClick={() => router.push('/reserves')}
            className="cursor-pointer"
          >
            <LandmarkIcon strokeWidth={1.5} />
          </Button>

          <div className="h-full border-r" />
          <Settings />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
