import { ethers } from 'ethers';

export interface Ethereum extends ethers.Eip1193Provider {
  isMetaMask?: boolean;
  request: (...args: any[]) => Promise<any>;
}

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}
