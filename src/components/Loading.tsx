import React from 'react';
import { LoadingSpinner } from './ui';

interface LoadingPageProps {
  title?: string;
  subtitle?: string;
  showProgress?: boolean;
  progress?: number;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({
  title = "Loading...",
  subtitle = "Please wait while we prepare your content",
  showProgress = false,
  progress = 0,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900/20 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center animate-pulse">
              <span className="text-2xl font-bold text-white">S</span>
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-pink-500/30 animate-spin border-t-pink-500"></div>
          </div>
        </div>

        {/* Loading Spinner */}
        <LoadingSpinner size="lg" className="mx-auto mb-6" />

        {/* Title and Subtitle */}
        <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">{title}</h2>
        <p className="text-gray-400 mb-6">{subtitle}</p>

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full max-w-xs mx-auto">
            <div className="bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">{progress}% complete</p>
          </div>
        )}

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-pink-500/30 rounded-full animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface PageTransitionProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  isLoading,
  children,
  loadingComponent,
}) => {
  if (isLoading) {
    return loadingComponent || <LoadingPage />;
  }

  return (
    <div className="animate-in fade-in duration-500">
      {children}
    </div>
  );
};

export default { LoadingPage, PageTransition };
