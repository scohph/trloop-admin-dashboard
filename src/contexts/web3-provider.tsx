'use client';

import { ReactNode } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { base, baseSepolia } from '@reown/appkit/networks';

const projectId = '47aabc4f419dc9750cb9221a8c37077c';

const metadata = {
  name: 'Trloop Token Admin Panel',
  description: 'Trloop Token Admin Panel',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
};

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [base, baseSepolia],
  projectId,
  features: {
    analytics: true,
  },
  themeMode: 'dark',
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // Metamask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase
    'e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b', // WalletConnect
    '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4', // Binance
  ],
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return children;
}
