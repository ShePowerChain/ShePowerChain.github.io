import React from 'react';

type Page = 'home' | 'profile' | 'jobs' | 'skills' | 'mentorship';

interface NavigationProps {
	currentPage: Page;
	onNavigate: (page: Page) => void;
	walletAddress: string | null;
	onConnectWallet: () => void;
}

const pages: { key: Page; label: string }[] = [
	{ key: 'home', label: 'Home' },
	{ key: 'jobs', label: 'Find Jobs' },
	{ key: 'skills', label: 'Skills' },
	{ key: 'mentorship', label: 'Mentorship' },
	{ key: 'profile', label: 'Profile' },
];

const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const Navigation: React.FC<NavigationProps> = ({
	currentPage,
	onNavigate,
	walletAddress,
	onConnectWallet,
}) => {
	return (
		<header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				{/* Brand */}
				<div className="flex items-center space-x-3">
					<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600" />
					<span className="text-white font-bold text-lg">ShePowerChain</span>
				</div>

				{/* Nav links */}
				<nav className="hidden md:flex items-center space-x-2">
					{pages.map((p) => (
						<button
							key={p.key}
							onClick={() => onNavigate(p.key)}
							className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
								currentPage === p.key
									? 'text-pink-400 bg-pink-500/10'
									: 'text-gray-300 hover:text-white hover:bg-white/5'
							}`}
						>
							{p.label}
						</button>
					))}
				</nav>

				{/* Wallet */}
				<div className="flex items-center">
					{walletAddress ? (
						<div className="px-3 py-2 rounded-xl text-sm font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
							{truncateAddress(walletAddress)}
						</div>
					) : (
						<button
							onClick={onConnectWallet}
							className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-colors duration-200"
						>
							Connect Wallet
						</button>
					)}
				</div>
			</div>

			{/* Mobile nav */}
			<div className="md:hidden border-t border-gray-800 px-4 py-2 flex gap-2 overflow-x-auto">
				{pages.map((p) => (
					<button
						key={p.key}
						onClick={() => onNavigate(p.key)}
						className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
							currentPage === p.key
								? 'text-pink-400 bg-pink-500/10'
								: 'text-gray-300 hover:text-white hover:bg-white/5'
						}`}
					>
						{p.label}
					</button>
				))}
			</div>
		</header>
	);
};

export default Navigation;
