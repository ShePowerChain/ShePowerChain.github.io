import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ExternalLink, Copy, Clock, Shield } from 'lucide-react';
import { getProvider } from '../blockchain/contract';

interface TransactionModalProps {
  onClose: () => void;
  txStatus?: 'idle' | 'pending' | 'success' | 'error';
  txHash?: string | null;
  txError?: string | null;
  modalType?: 'apply' | 'post' | 'verify' | 'mentorship' | null;
}


const TransactionModal: React.FC<TransactionModalProps> = ({ onClose, txStatus = 'pending', txHash, txError, modalType }) => {
  const [copied, setCopied] = useState(false);
  const [networkName, setNetworkName] = useState('Unknown Network');
  const timestamp = new Date().toLocaleString();
  const blockExplorerUrl = txHash ? `https://etherscan.io/tx/${txHash}` : '#';

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const provider = getProvider();
        const network = await provider.getNetwork();
        setNetworkName(network.name);
      } catch (error) {
        console.error('Failed to get network:', error);
      }
    };
    fetchNetwork();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>

  {txStatus === 'pending' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-10 h-10 text-pink-400 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Processing Transaction</h2>
              <p className="text-gray-400">
                {modalType === 'apply' && 'Your job application is being processed on the blockchain...'}
                {modalType === 'post' && 'Your job posting is being recorded on the blockchain...'}
                {modalType === 'verify' && 'Your skill verification is being processed on the blockchain...'}
                {modalType === 'mentorship' && 'Your mentorship request is being processed on the blockchain...'}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Validating credentials</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Creating blockchain record</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <span>Finalizing transaction</span>
              </div>
            </div>
          </div>
        )}

  {txStatus === 'success' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-400 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {modalType === 'apply' && 'Application Submitted!'}
                {modalType === 'post' && 'Job Posted!'}
                {modalType === 'verify' && 'Skill Verified!'}
                {modalType === 'mentorship' && 'Mentorship Requested!'}
              </h2>
              <p className="text-gray-400">
                {modalType === 'apply' && 'Your job application has been successfully recorded on the blockchain.'}
                {modalType === 'post' && 'Your job posting is now live and recorded on the blockchain.'}
                {modalType === 'verify' && 'Your skill has been successfully verified and recorded on the blockchain.'}
                {modalType === 'mentorship' && 'Your mentorship request has been submitted on the blockchain.'}
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Transaction Hash:</span>
                  <div className="flex items-center space-x-2">
                    {txHash && (
                      <>
                        <code className="text-pink-400 text-xs font-mono bg-pink-500/10 px-2 py-1 rounded">
                          {txHash.slice(0, 10)}...{txHash.slice(-8)}
                        </code>
                        <button
                          onClick={async () => {
                            if (txHash) {
                              await navigator.clipboard.writeText(txHash);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }
                          }}
                          className="p-1 text-gray-400 hover:text-pink-400 transition-colors duration-200"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Timestamp:</span>
                  <span className="text-white text-sm">{timestamp}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Network:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm">{networkName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status:</span>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {copied && (
              <div className="mb-4 text-green-400 text-sm">
                Transaction hash copied to clipboard!
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <a
                href={blockExplorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View on Blockchain Explorer</span>
              </a>
              
              <button
                onClick={onClose}
                className="bg-gray-800 border border-gray-700 text-gray-300 hover:border-pink-400 hover:text-pink-400 px-6 py-3 rounded-xl font-medium transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {txStatus === 'error' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <X className="w-12 h-12 text-red-400 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">Transaction Failed</h2>
              <p className="text-gray-400">{txError || 'An error occurred while processing your transaction.'}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-gray-800 border border-gray-700 text-gray-300 hover:border-pink-400 hover:text-pink-400 px-6 py-3 rounded-xl font-medium transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionModal;