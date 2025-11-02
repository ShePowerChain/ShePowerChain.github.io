import React from 'react';
import { Wallet, LogIn, ExternalLink, AlertCircle } from 'lucide-react';

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
  onConnectMetaMask: () => void;
  onConnectWalletConnect: () => void;
  isConnecting?: boolean;
  error?: string | null;
  isMetaMaskInstalled?: boolean;
}

const WalletModal: React.FC<WalletModalProps> = ({ 
  open, 
  onClose, 
  onConnectMetaMask, 
  onConnectWalletConnect,
  isConnecting = false,
  error,
  isMetaMaskInstalled = false
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-pink-500/30 rounded-2xl p-8 w-full max-w-sm relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Connect Your Wallet</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm">{error}</span>
          </div>
        )}
        
        <div className="space-y-4">
          {/* MetaMask Button */}
          <button
            onClick={onConnectMetaMask}
            disabled={isConnecting}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isMetaMaskInstalled 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <Wallet className="w-5 h-5" />
              <div className="text-left">
                <div>MetaMask</div>
                <div className="text-xs opacity-80">
                  {isMetaMaskInstalled ? 'Detected' : 'Not installed'}
                </div>
              </div>
            </div>
            {isMetaMaskInstalled && (
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            )}
          </button>

          {/* Install MetaMask Button */}
          {!isMetaMaskInstalled && (
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Install MetaMask</span>
            </a>
          )}
          
          {/* WalletConnect Button */}
          <button
            onClick={onConnectWalletConnect}
            disabled={isConnecting}
            className={`w-full flex items-center space-x-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors duration-200 ${
              isConnecting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <LogIn className="w-5 h-5" />
            <span>WalletConnect</span>
            <span className="text-xs bg-yellow-600 px-2 py-1 rounded">Soon</span>
          </button>
        </div>

        {isConnecting && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 text-pink-400">
              <div className="w-4 h-4 border-2 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Connecting...</span>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-400">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
