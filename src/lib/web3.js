import { BrowserProvider } from 'ethers';
export async function GetSigner(wallet) {
  const provider = new BrowserProvider(wallet);
  return await provider.getSigner();
}
