import { BaseLogo } from '@/components/common/icons';
import { TChainData, TPublicClient } from '@/types';
import {
  BASE_CHAIN,
  BASE_SEPOLIA_CHAIN,
  baseClient,
  baseSepoliaClient,
} from './clients';

export const CHAINS_DATA: Record<number, TChainData> = {
  8453: {
    data: BASE_CHAIN,
    logo: BaseLogo,
    publicClient: baseClient as TPublicClient,
  },
  84532: {
    data: BASE_SEPOLIA_CHAIN,
    logo: BaseLogo,
    publicClient: baseSepoliaClient as TPublicClient,
  },
};
