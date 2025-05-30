import { TChain } from '@/types';
import { createPublicClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';

export const BASE_CHAIN: TChain = {
  name: 'Base',
  symbol: 'ETH',
  chainId: 8453,
  explorerUrl: 'https://basescan.org',
  rpcUrl: 'https://mainnet.base.org',
};
export const BASE_SEPOLIA_CHAIN: TChain = {
  name: 'Base Sepolia Testnet',
  symbol: 'ETH',
  chainId: 84532,
  explorerUrl: 'https://sepolia.basescan.org',
  rpcUrl: 'https://sepolia.base.org',
};

export const baseClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: base,
  transport: http(BASE_CHAIN.rpcUrl),
});
export const baseSepoliaClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: baseSepolia,
  transport: http(BASE_SEPOLIA_CHAIN.rpcUrl),
});
