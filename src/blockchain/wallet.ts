import { useState, useEffect, useCallback } from 'react';
import type { Ethereum } from '../types';

declare const window: { ethereum?: Ethereum };

// Ethereum window object interface
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      selectedAddress: string | null;
      chainId: string;
    };
  }
}

export interface WalletState {
  walletAddress: string | null;
  isWalletInstalled: boolean;
  isMetaMask: boolean;
  chainId: string | null;
  isConnecting: boolean;
  error: string | null;
}

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [isMetaMask, setIsMetaMask] = useState(false);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detect MetaMask wallet
  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        setIsWalletInstalled(true);
        setIsMetaMask(window.ethereum.isMetaMask || false);
        
        // Get current chain ID
        try {
          const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
          setChainId(currentChainId);
        } catch (err) {
          console.error('Failed to get chain ID:', err);
        }

        // Check if already connected
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (err) {
          console.error('Failed to get accounts:', err);
        }
      } else {
        setIsWalletInstalled(false);
        setIsMetaMask(false);
      }
    };

    checkWallet();
  }, []);

  // Connect to MetaMask wallet
  const connectWallet = useCallback(async () => {
    setError(null);
    setIsConnecting(true);

    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      setIsConnecting(false);
      return;
    }

    if (!window.ethereum.isMetaMask) {
      setError('Please use MetaMask wallet for the best experience.');
      setIsConnecting(false);
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        
        // Get chain ID after connection
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(currentChainId);
        
        // Verify we're on the correct network (Ethereum mainnet = 0x1)
        if (currentChainId !== '0x1') {
          console.warn('Not connected to Ethereum mainnet. Consider switching networks.');
        }
      }
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      if (err.code === 4001) {
        setError('Connection request was rejected. Please try again.');
      } else if (err.code === -32002) {
        setError('MetaMask is already processing a request. Please check your wallet.');
      } else {
        setError('Failed to connect to MetaMask. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
    setChainId(null);
    setError(null);
  }, []);

  // Switch to Ethereum mainnet
  const switchToMainnet = useCallback(async () => {
    if (!window.ethereum) return;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }], // Ethereum mainnet
      });
    } catch (err: any) {
      if (err.code === 4902) {
        // Network not added to MetaMask
        setError('Please add Ethereum mainnet to your MetaMask.');
      } else {
        setError('Failed to switch network.');
      }
    }
  }, []);

  // Listen for account and network changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        setWalletAddress(null);
        setError('Wallet disconnected. Please reconnect.');
      } else {
        setWalletAddress(accounts[0]);
        setError(null);
      }
    };

    const handleChainChanged = (newChainId: string) => {
      setChainId(newChainId);
      // Reload the page to avoid stale state
      window.location.reload();
    };

    // Add event listeners
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // Cleanup event listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return { 
    walletAddress, 
    isWalletInstalled, 
    isMetaMask,
    chainId,
    isConnecting,
    error,
    connectWallet, 
    disconnectWallet,
    switchToMainnet
  };
}
