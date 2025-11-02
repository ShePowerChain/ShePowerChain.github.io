import React, { useState, useEffect } from 'react';
import { Shield, Users, Briefcase, ArrowRight, CheckCircle, Mail, Wallet } from 'lucide-react';
import { useWallet } from '../blockchain/wallet';
import { UserData } from './HomePage';

interface OnboardingFlowProps {
  onComplete: (userData: UserData) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [authMethod, setAuthMethod] = useState<'email' | 'wallet'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { walletAddress, connectWallet, isConnecting } = useWallet();

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    bio: '',
    skills: [] as string[],
    portfolioUrl: '',
    linkedinUrl: '',
  });

  const handleAuthMethodSelection = (method: 'email' | 'wallet') => {
    setAuthMethod(method);
    if (method === 'wallet') {
      connectWallet();
    }
    setCurrentStep(2);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setCurrentStep(3);
    }
  };

    useEffect(() => {
    // Auto-advance to profile creation if wallet is connected
    if (authMethod === 'wallet' && walletAddress && currentStep === 2) {
      setCurrentStep(3);
    }
  }, [walletAddress, authMethod, currentStep]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData: UserData = {
      profile: {
        ...profileData,
        email: authMethod === 'email' ? email : '',
      },
      walletAddress: authMethod === 'wallet' ? walletAddress || undefined : undefined,
      isOnboarded: true,
    };

    onComplete(userData);
  };

  const addSkill = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Step 1: Welcome & User Type Selection
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900/20 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
              Welcome to ShePowerChain
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Empowering women professionals through blockchain-verified credentials, 
              transparent job opportunities, and meaningful mentorship connections.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Join as a Professional
            </h2>
            
            <div className="bg-gray-700/30 rounded-2xl p-8 border border-pink-500/20">
              <div className="flex items-center mb-6">
                <Briefcase className="w-8 h-8 text-pink-400 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Professional</h3>
                  <p className="text-gray-400">Build your verified professional profile</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Blockchain-verified skills</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Mentorship opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Transparent job marketplace</span>
                </div>
              </div>
              
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Authentication Method Selection
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900/20 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Sign-Up Method</h2>
            <p className="text-gray-300">Select how you'd like to create your account</p>
          </div>

          <div className="space-y-4 mb-8">
            {/* Email/Password Option */}
            <div className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
              authMethod === 'email' 
                ? 'border-pink-500 bg-pink-500/10' 
                : 'border-gray-600 hover:border-gray-500 bg-gray-700/30'
            }`} onClick={() => handleAuthMethodSelection('email')}>
              <div className="flex items-center space-x-4">
                <Mail className="w-8 h-8 text-pink-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Email & Password</h3>
                  <p className="text-gray-400">Traditional signup with email verification</p>
                </div>
                {authMethod === 'email' && <CheckCircle className="w-6 h-6 text-pink-400 ml-auto" />}
              </div>
            </div>

            {/* Wallet Option */}
            <div className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
              authMethod === 'wallet' 
                ? 'border-pink-500 bg-pink-500/10' 
                : 'border-gray-600 hover:border-gray-500 bg-gray-700/30'
            }`} onClick={() => handleAuthMethodSelection('wallet')}>
              <div className="flex items-center space-x-4">
                <Wallet className="w-8 h-8 text-pink-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Blockchain Wallet</h3>
                  <p className="text-gray-400">Connect with MetaMask or WalletConnect</p>
                </div>
                {authMethod === 'wallet' && <CheckCircle className="w-6 h-6 text-pink-400 ml-auto" />}
              </div>
            </div>
          </div>

          {/* Email Form */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  placeholder="Create a strong password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                Continue with Email
              </button>
            </form>
          )}

          {/* Wallet Connection */}
          {authMethod === 'wallet' && (
            <div className="text-center">
              {!walletAddress ? (
                <div>
                  <button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                  <p className="text-gray-400 text-sm mt-2">
                    Make sure you have MetaMask installed
                  </p>
                </div>
              ) : (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-medium">Wallet Connected!</p>
                  <p className="text-gray-300 text-sm">{walletAddress}</p>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Step 3: Profile Creation
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900/20 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Create Your Professional Profile</h2>
          <p className="text-gray-300">Tell us about yourself to get started</p>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-700/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData(prev => ({...prev, firstName: e.target.value}))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData(prev => ({...prev, lastName: e.target.value}))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Professional Title</label>
              <input
                type="text"
                value={profileData.title}
                onChange={(e) => setProfileData(prev => ({...prev, title: e.target.value}))}
                placeholder="e.g., Senior Software Engineer, Data Scientist, Product Manager"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div className="bg-gray-700/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">About You</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Professional Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({...prev, bio: e.target.value}))}
                placeholder="Tell us about your experience, goals, and what makes you unique..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 h-32 resize-none"
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div className="bg-gray-700/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
            <div className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Add a skill (e.g., React, Python, Leadership)"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    addSkill(input.value);
                    input.value = '';
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors duration-200"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm border border-pink-500/30 flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-pink-400 hover:text-pink-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="bg-gray-700/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Professional Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio URL</label>
                <input
                  type="url"
                  value={profileData.portfolioUrl}
                  onChange={(e) => setProfileData(prev => ({...prev, portfolioUrl: e.target.value}))}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={profileData.linkedinUrl}
                  onChange={(e) => setProfileData(prev => ({...prev, linkedinUrl: e.target.value}))}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 text-lg"
          >
            Complete Profile & Enter ShePowerChain
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingFlow;