import React, { useState } from 'react';
import OnboardingFlow from './OnboardingFlow';
import Dashboard from './Dashboard';

export interface UserData {
  profile?: {
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    bio: string;
    skills: string[];
    portfolioUrl: string;
    linkedinUrl: string;
  };
  walletAddress?: string;
  isOnboarded: boolean;
}

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = (data: UserData) => {
    const completeUserData = { ...data, isOnboarded: true };
    setUserData(completeUserData);
    setShowOnboarding(false);
    // Save to localStorage
    localStorage.setItem('shepower_user_data', JSON.stringify(completeUserData));
  };

  // Check if user is returning (in real app, check localStorage/API)
  React.useEffect(() => {
    const savedUserData = localStorage.getItem('shepower_user_data');
    if (savedUserData) {
      try {
        const parsed = JSON.parse(savedUserData);
        if (parsed.isOnboarded) {
          setUserData(parsed);
          setShowOnboarding(false);
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
      }
    }
  }, []);

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <Dashboard userData={userData || undefined} />;
};

export default HomePage;