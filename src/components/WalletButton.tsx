import React from 'react';
import { useWallet } from '../blockchain/wallet';

const WalletButton: React.FC = () => {
  const { walletAddress, isWalletInstalled, connectWallet, error } = useWallet();

  if (!isWalletInstalled) {
    return (
      <button className="bg-pink-500 text-white px-4 py-2 rounded" disabled>
        No Wallet Detected
      </button>
    );
  }

  if (walletAddress) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-green-400 font-mono text-xs">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <button
        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
      {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default WalletButton;
