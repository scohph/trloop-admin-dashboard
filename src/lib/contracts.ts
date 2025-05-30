import { TReserveContract, TToken, TWalletContract } from '@/types';
import { walletAbi } from './abis';
import { CHAINS_DATA } from './chains';
import { EthereumLogo, TRLOOPLogo, USDCLogo } from '@/components/common/icons';

export const TRLOOP_TOKEN_ADDRESS: Record<number, string> = {
  8453: '0x0000000000000000000000000000000000000000',
  84532: '0x3642C252dc14e243f99Acbe54F8509D6B17558dD',
};
export const WALLET_CONTRACTS: Record<number, TWalletContract> = {
  8453: {
    contractAddress: '0x0000000000000000000000000000000000000000',
    abi: walletAbi,
    chainData: CHAINS_DATA[8453],
  },
  84532: {
    contractAddress: '0xF99F5a3756004cc524b1abD98E7fA82DF7244641',
    abi: walletAbi,
    chainData: CHAINS_DATA[84532],
  },
} as const;

export const TOKENS: Record<number, TToken[]> = {
  8453: [
    {
      address: '0x0000000000000000000000000000000000000000',
      name: 'ETH',
      symbol: 'ETH',
      logo: EthereumLogo,
      decimals: 18,
      chainId: 8453,
    },
  ],
  84532: [
    {
      address: '0x0000000000000000000000000000000000000000',
      name: 'ETH',
      symbol: 'ETH',
      logo: EthereumLogo,
      decimals: 18,
      chainId: 84532,
    },
    {
      address: '0x3642C252dc14e243f99Acbe54F8509D6B17558dD',
      name: 'TRLOOP',
      symbol: 'TRLOOP',
      logo: TRLOOPLogo,
      decimals: 18,
      chainId: 84532,
    },
    {
      address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      name: 'USDC',
      symbol: 'USDC',
      logo: USDCLogo,
      decimals: 6,
      chainId: 84532,
    },
  ],
} as const;

export const RESERVES: Record<number, TReserveContract[]> = {
  84532: [
    {
      key: 'platformTreasury',
      name: 'TRLOOP: Platform Treasury Reserve Contract',
      initialOwner: '0xb935967D3aD93bb4b170111E0759B4b03EB35292',
      address: '0x19257b5aC08391cD3aC6Eb14D76880cAD7876457',
    },
    {
      key: 'stakingAndRewardsPool',
      name: 'TRLOOP: Staking And Rewards Pool Reserve Contract',
      initialOwner: '0xb935967D3aD93bb4b170111E0759B4b03EB35292',
      address: '0xAEa902172A02fDC53A566d7472200a0B72a16DC2',
    },
    {
      key: 'teamAndAdvisors',
      name: 'TRLOOP: Team And Advisors Reserve Contract',
      initialOwner: '0xb935967D3aD93bb4b170111E0759B4b03EB35292',
      address: '0x7D25F7E3991923566dEA83E3E9522eAD3F432cd1',
    },
    {
      key: 'liquidityPool',
      name: 'TRLOOP: Liquidity Pool Reserve Contract',
      initialOwner: '0xb935967D3aD93bb4b170111E0759B4b03EB35292',
      address: '0x9c06a803cC202917731738d20961710B1b0f27c9',
    },
    {
      key: 'ecosystemFund',
      name: 'TRLOOP: Ecosystem Fund Reserve Contract',
      initialOwner: '0xb935967D3aD93bb4b170111E0759B4b03EB35292',
      address: '0x5796285Cf698530256eC318Ceee780E2233FE810',
    },
    {
      key: 'privateSale',
      name: 'TRLOOP: Private Sale Reserve Contract',
      initialOwner: '0xb935967D3aD93bb4b170111E0759B4b03EB35292',
      address: '0x7459B5c3aC0d4f9b44C7416A47641AAc33e05a9a',
    },
    {
      key: 'wallet',
      name: 'TRLOOP: Wallet Reserve Contract',
      initialOwner: '0xb935967D3aD93bb4b170111E0759B4b03EB35292',
      address: '0x6c5f17cac54dFA54D3Dc00C4F6d57dD73ccB1c02',
    },
  ],
};
