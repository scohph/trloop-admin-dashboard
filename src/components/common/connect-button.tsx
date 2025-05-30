import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { Button } from '../ui/button';

export default function ConnectButton() {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  return (
    <>
      {isConnected === true ? (
        <>
          <div className="hidden lg:flex">
            <appkit-button />
          </div>
          <div className="flex lg:hidden">
            <Button
              variant={'outline'}
              onClick={() => open()}
              className="cursor-pointer"
            >
              Connected
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button
            variant={'outline'}
            onClick={() => open()}
            className="cursor-pointer"
          >
            Connect
          </Button>
        </>
      )}
    </>
  );
}
