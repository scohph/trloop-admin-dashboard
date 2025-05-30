import { type ChartConfig } from '@/components/ui/chart';
import { walletAbi } from '@/lib/abis';
import { createPublicClient } from 'viem';

export type TChartConfig = ChartConfig;
export type HexString = `0x${string}`;

export type TChain = {
  name: string;
  symbol: string;
  chainId: number;
  explorerUrl: string;
  rpcUrl: string;
};
export type TPublicClient = ReturnType<typeof createPublicClient>;
export type TWalletAbi = typeof walletAbi;

export type TChainData = {
  data: TChain;
  logo: React.FC<{ size?: number }>;
  publicClient: TPublicClient;
};

export type TWalletContract = {
  contractAddress: string | HexString;
  abi: TWalletAbi;
  chainData: TChainData;
};

export type TWalletsDataTotalTransactionsItems = {
  address: string | HexString;
  totalAmount: number | bigint;
  totalCount: number | bigint;
};
export type TWalletsDataTotalTransactions = {
  chainId: string | bigint | number;
  items: TWalletsDataTotalTransactionsItems[];
};

export type TWalletsData = {
  totalTransactions: TWalletsDataTotalTransactions[];
  totalUsers: number | bigint;
};

export type TToken = {
  address: string | HexString;
  name: string;
  symbol: string;
  logo: React.FC<{ size?: number }>;
  decimals: number;
  chainId: number;
};

export type EnrichedTransactionItem = TWalletsDataTotalTransactionsItems & {
  tokenInfo?: {
    name: string;
    symbol: string;
    logo: React.FC<{ size?: number }>;
    decimals: number;
  };
};

export type EnrichedTransactionData = {
  chainId: number;
  walletContractInfo: TWalletContract;
  items: EnrichedTransactionItem[];
};

//success

export type TWalletContractTokenInfo = {
  symbol: string;
  address: string | HexString;
  value: string | bigint | number;
  count: string | bigint | number;
};
export type TWalletContractInfo = {
  chainId: number;
  contractAddress: string | HexString;
  transactionsCount: number | bigint | string;
  tokens: TWalletContractTokenInfo[];
};
export type TSliceState = {
  mode: 'production' | 'development';
};
export type TReserveContract = {
  key: string;
  name: string;
  initialOwner: string;
  address: string;
};
