import { formatUnits, getContract, isAddress } from 'viem';
import { WHITELIST } from './constants';
import {
  EnrichedTransactionData,
  EnrichedTransactionItem,
  HexString,
  TChainData,
  TWalletsDataTotalTransactions,
} from '@/types';

import { TOKENS, WALLET_CONTRACTS } from './contracts';
import { erc20Abi, reserveAbi } from './abis';

export function numberWithCommas(x: number | string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function isWhitelistedAddress(address: string): boolean {
  if (!address || !isAddress(address)) return false;
  return WHITELIST.includes(address.toLowerCase());
}
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}
export function format6DecimalsAsEth(value: string | number | bigint): string {
  if (!value) return '0.00';
  const bigValue = BigInt(value);
  return formatUnits(bigValue, 6);
}

export function formatAddressDesign(
  address: HexString,
  startChars = 6,
  endChars = 6
) {
  if (address.length <= startChars + endChars) {
    return address;
  }

  const visiblePart =
    address.substring(0, startChars) +
    '...' +
    address.substring(address.length - endChars);
  return visiblePart;
}

export function getTransactionTokensWithChainDataArray(
  txArray: TWalletsDataTotalTransactions[]
): EnrichedTransactionData[] {
  return txArray
    .map((txData) => {
      const chainId =
        typeof txData.chainId === 'bigint'
          ? Number(txData.chainId)
          : +txData.chainId;

      const walletContractInfo = WALLET_CONTRACTS[chainId];
      if (!walletContractInfo) return null;

      const tokens = TOKENS[chainId] ?? [];

      const enrichedItems: EnrichedTransactionItem[] = txData.items.map(
        (item) => {
          const token = tokens.find(
            (t) =>
              t.address.toLowerCase() === item.address.toString().toLowerCase()
          );

          return {
            ...item,
            tokenInfo: token
              ? {
                  name: token.name,
                  symbol: token.symbol,
                  logo: token.logo,
                  decimals: token.decimals,
                }
              : undefined,
          };
        }
      );

      return {
        chainId,
        items: enrichedItems,
        walletContractInfo,
      };
    })
    .filter((item): item is EnrichedTransactionData => item !== null);
}

export async function getTokenBalance(
  address: string,
  tokenAddress: string,
  chain: TChainData
): Promise<string> {
  try {
    const client = chain.publicClient;
    if (!client || !isAddress(address) || !isAddress(tokenAddress)) {
      return '0';
    }
    const contract = getContract({
      address: tokenAddress,
      abi: erc20Abi,
      client: {
        public: client,
      },
    });
    const res = await contract.read.balanceOf([address]);
    return res.toString();
  } catch (ex) {
    console.log('[helpers] getTokenBalance:', ex);
    return '0';
  }
}
export async function checkReserveContractAuth(
  address: string,
  reserveAddress: string,
  chain: TChainData
): Promise<boolean> {
  try {
    const client = chain.publicClient;
    const contract = getContract({
      address: reserveAddress as HexString,
      abi: reserveAbi,
      client: {
        public: client,
      },
    });
    const res = await contract.read.getAuthorizedCaller([address as HexString]);
    return res;
  } catch (error) {
    console.warn('[helpers] checkReserveContractAuth:', error);
    return false;
  }
}
