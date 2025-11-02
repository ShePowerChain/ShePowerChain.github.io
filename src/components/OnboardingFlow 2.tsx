import React, { useState } from 'react';
import { Shield, Users, Briefcase, ArrowRight, CheckCircle, Mail, Lock, Wallet } from 'lucide-react';
import { useWallet } from '../blockchain/wallet';
import { UserData } from './HomePage';

interface OnboardingFlowProps {
  onComplete: (userData: UserData) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<Partial<UserData>>({
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      title: '',
      bio: '',
      skills: [],
      portfolioUrl: '',
      linkedinUrl: '',
    },
    isOnboarded: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const { connectWallet, walletAddress } = useWallet();

  const handleAuthMethodSelection = (method: 'email' | 'wallet') => {
    if (method === 'wallet') {
      connectWallet();
    }
    setCurrentStep(2);
  };

  const handleEmailAuth = (email: string, password: string) => {
    setUserData(prev => ({
      ...prev,
      profile: {
        ...prev.profile!,
        email
      }
    }));
    setCurrentStep(3);
  };

  const handleWalletConnection = () => {
    if (account) {
      setUserData(prev => ({
        ...prev,
        walletAddress: account
      }));
      setCurrentStep(3);
    }
  };

  const handleProfileCreation = (profileData: {
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    bio: string;
    skills: string[];
    portfolioUrl: string;
    linkedinUrl: string;
  }) => {
    const finalUserData: UserData = {
      ...userData,
      profile: profileData,
      isOnboarded: true
    };
    onComplete(finalUserData);
  };

  const renderWelcomeStep = () => (
    <div className="text-center max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <Shield className="w-24 h-24 text-pink-400" />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
        Welcome to ShePowerChain
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
        The first blockchain-powered platform empowering women in the workforce.
        Build trust, verify skills, and unlock opportunities like never before.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800/50 rounded-xl p-6">
          <Shield className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Blockchain Verified</h3>
          <p className="text-gray-400">Your skills and achievements are permanently recorded on the blockchain</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6">
          <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Global Network</h3>
          <p className="text-gray-400">Connect with professionals and opportunities worldwide</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6">
          <Briefcase className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Transparent Hiring</h3>
          <p className="text-gray-400">Fair, transparent recruitment process with verifiable credentials</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-white">What best describes you?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => {
            setUserData(prev => ({ ...prev, userType: 'professional' }));
            setStep(2);
          }}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-6 px-8 rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          <Users className="w-8 h-8 mx-auto mb-3" />
          <div className="text-lg font-bold">I'm a Professional</div>
          <div className="text-sm opacity-90">Looking for opportunities</div>
        </button>
        
        <button
          onClick={() => {
            setUserData(prev => ({ ...prev, userType: 'employer' }));
            setStep(2);
          }}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-6 px-8 rounded-xl transition-all duration-200"
        >
          <Briefcase className="w-8 h-8 mx-auto mb-3" />
          <div className="text-lg font-bold">I'm an Employer</div>
          <div className="text-sm opacity-90">Hiring talent</div>
        </button>
        
        <button
          onClick={() => {
            setUserData(prev => ({ ...prev, userType: 'mentor' }));
            setStep(2);
          }}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-6 px-8 rounded-xl transition-all duration-200"
        >
          <Shield className="w-8 h-8 mx-auto mb-3" />
          <div className="text-lg font-bold">I'm a Mentor</div>
          <div className="text-sm opacity-90">Guiding others</div>
        </button>
      </div>
    </div>
  );

  const renderAuthStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-white">Create Your Account</h2>
        <p className="text-gray-400">Choose how you'd like to sign up</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email/Password Signup */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="text-center mb-6">
            <Mail className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold">Email & Password</h3>
            <p className="text-gray-400 text-sm">Traditional signup method</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleEmailSignup(
              formData.get('email') as string,
              formData.get('password') as string
            );
          }}>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <Lock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Sign Up with Email
              </button>
            </div>
          </form>
        </div>

        {/* Wallet Connection */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="text-center mb-6">
            <Wallet className="w-12 h-12 text-pink-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold">Blockchain Wallet</h3>
            <p className="text-gray-400 text-sm">Connect with MetaMask or WalletConnect</p>
          </div>

          <div className="space-y-4">
            {walletAddress ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-300 font-medium">Wallet Connected!</p>
                <p className="text-gray-400 text-sm font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                <button
                  onClick={handleWalletConnect}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 mt-4"
                >
                  Continue with Wallet
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleAuthMethodSelect('wallet')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Connect MetaMask</span>
                </button>
                <button
                  onClick={() => alert('WalletConnect coming soon!')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                  Connect WalletConnect
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setStep(1)}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          ← Back to welcome
        </button>
      </div>
    </div>
  );

  const renderProfileStep = () => {
    const [profileData, setProfileData] = useState({
      firstName: '',
      lastName: '',
      title: '',
      bio: '',
      skills: [] as string[],
      portfolioLinks: [] as string[],
      experience: '',
      location: ''
    });

    const [newSkill, setNewSkill] = useState('');
    const [newLink, setNewLink] = useState('');

    const addSkill = () => {
      if (newSkill && !profileData.skills.includes(newSkill)) {
        setProfileData(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
        setNewSkill('');
      }
    };

    const removeSkill = (skillToRemove: string) => {
      setProfileData(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill !== skillToRemove)
      }));
    };

    const addPortfolioLink = () => {
      if (newLink && !profileData.portfolioLinks.includes(newLink)) {
        setProfileData(prev => ({
          ...prev,
          portfolioLinks: [...prev.portfolioLinks, newLink]
        }));
        setNewLink('');
      }
    };

    const removeLink = (linkToRemove: string) => {
      setProfileData(prev => ({
        ...prev,
        portfolioLinks: prev.portfolioLinks.filter(link => link !== linkToRemove)
      }));
    };

    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-white">Create Your Profile</h2>
          <p className="text-gray-400">Tell us about yourself to get started</p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          handleProfileCreation(profileData);
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-white">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                    className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                    className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Professional Title"
                  value={profileData.title}
                  onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={profileData.location}
                  onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
                <textarea
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 resize-none"
                />
              </div>
            </div>

            {/* Skills and Portfolio */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-white">Skills & Portfolio</h3>
              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-pink-500/20 border border-pink-500/30 text-pink-300 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-pink-400 hover:text-pink-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Portfolio Links */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio Links</label>
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPortfolioLink())}
                      className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    />
                    <button
                      type="button"
                      onClick={addPortfolioLink}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {profileData.portfolioLinks.map((link, index) => (
                      <div
                        key={index}
                        className="bg-gray-700/30 border border-gray-600 rounded-lg px-3 py-2 flex items-center justify-between"
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 truncate"
                        >
                          {link}
                        </a>
                        <button
                          type="button"
                          onClick={() => removeLink(link)}
                          className="text-gray-400 hover:text-gray-200 ml-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                  <select
                    value={profileData.experience}
                    onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  >
                    <option value="">Select experience level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (2-5 years)</option>
                    <option value="senior">Senior Level (5-10 years)</option>
                    <option value="executive">Executive Level (10+ years)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              ← Back to signup
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <span>Complete Profile</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900/20 text-white">
      <div className="container mx-auto px-4 py-20">
        {step === 1 && renderWelcomeStep()}
        {step === 2 && renderAuthStep()}
        {step === 3 && renderProfileStep()}
      </div>
    </div>
  );
};

export default OnboardingFlow;
