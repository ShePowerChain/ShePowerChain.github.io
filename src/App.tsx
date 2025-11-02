import React, { useState, Suspense } from 'react';
import { Navigation } from './components/Navigation';
import WalletModal from './components/WalletModal';
import { LoadingPage } from './components/Loading';
import { useWallet } from './blockchain/wallet';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import JobListingsPage from './components/JobListingsPage';
import SkillVerificationPage from './components/SkillVerificationPage';
import MentorshipPage from './components/MentorshipPage';

type Page = 'home' | 'profile' | 'jobs' | 'skills' | 'mentorship';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ShePowerChain Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900/20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <span className="text-2xl text-red-400">⚠</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              We're sorry, but something unexpected happened. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { walletAddress, connectWallet, isConnecting, error, isMetaMask } = useWallet();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'profile':
        return <ProfilePage onShowTransaction={(show: boolean) => setShowWalletModal(show)} />;
      case 'jobs':
        return <JobListingsPage />;
      case 'skills':
        return <SkillVerificationPage />;
      case 'mentorship':
        return <MentorshipPage walletAddress={walletAddress} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900/20">
        <Navigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          walletAddress={walletAddress}
          onConnectWallet={() => setShowWalletModal(true)}
        />
        
        <Suspense fallback={<LoadingPage title="Loading Page..." />}>
          <main className="relative">
            {renderPage()}
          </main>
        </Suspense>

        <WalletModal
          open={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          onConnectMetaMask={connectWallet}
          onConnectWalletConnect={() => alert('WalletConnect coming soon!')}
          isConnecting={isConnecting}
          error={error}
          isMetaMaskInstalled={isMetaMask}
        />

        {/* Global Notifications */}
        <div id="notification-root" className="fixed top-4 right-4 z-50 space-y-4"></div>
      </div>
    </ErrorBoundary>
  );
}

export default App;