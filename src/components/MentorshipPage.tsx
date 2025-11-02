import React, { useState } from 'react';
import { Users, MapPin, Star } from 'lucide-react';
import { requestMentorship } from '../blockchain/contract';
import TransactionModal from './TransactionModal';

interface MentorshipPageProps {
  walletAddress?: string | null;
}

interface MentorProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  reviews: number;
  location: string;
  availability: 'Available' | 'Busy' | 'Full';
  hourlyRate: number;
  bio: string;
  avatar: string;
}

interface MentorshipRequest {
  mentorId: string;
  goals: string;
  duration: '1 month' | '3 months' | '6 months' | '1 year';
  sessionFrequency: 'Weekly' | 'Bi-weekly' | 'Monthly';
  preferredTime: string;
  budget: number;
  message: string;
}

interface RequestStatus {
  isLoading: boolean;
  txHash?: string;
  error?: string;
  isSuccess: boolean;
}

const MentorshipPage: React.FC<MentorshipPageProps> = ({ walletAddress }) => {
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  
  const [requestData, setRequestData] = useState<MentorshipRequest>({
    mentorId: '',
    goals: '',
    duration: '3 months',
    sessionFrequency: 'Weekly',
    preferredTime: '',
    budget: 0,
    message: ''
  });

  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    isLoading: false,
    isSuccess: false
  });

  // Mock mentor data
  const mentors: MentorProfile[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Senior Blockchain Developer',
      company: 'ConsenSys',
      expertise: ['Solidity', 'DeFi', 'Smart Contracts', 'Web3'],
      rating: 4.9,
      reviews: 127,
      location: 'San Francisco, CA',
      availability: 'Available',
      hourlyRate: 150,
      bio: 'Experienced blockchain developer with 6+ years in DeFi protocols and smart contract security.',
      avatar: '👩‍💻'
    },
    {
      id: '2', 
      name: 'Priya Sharma',
      title: 'Frontend Architect',
      company: 'Meta',
      expertise: ['React', 'TypeScript', 'System Design', 'Leadership'],
      rating: 4.8,
      reviews: 203,
      location: 'London, UK',
      availability: 'Available',
      hourlyRate: 120,
      bio: 'Frontend architect passionate about building scalable React applications and mentoring women in tech.',
      avatar: '👩‍🎨'
    },
    {
      id: '3',
      name: 'Dr. Aisha Patel',
      title: 'Data Science Director',
      company: 'Google',
      expertise: ['Machine Learning', 'Python', 'Data Analysis', 'AI Ethics'],
      rating: 4.9,
      reviews: 89,
      location: 'Mumbai, India',
      availability: 'Busy',
      hourlyRate: 180,
      bio: 'Data science leader focused on responsible AI development and diversity in machine learning.',
      avatar: '👩‍🔬'
    },
    {
      id: '4',
      name: 'Maria Rodriguez',
      title: 'Product Manager',
      company: 'Stripe',
      expertise: ['Product Strategy', 'User Research', 'Agile', 'Fintech'],
      rating: 4.7,
      reviews: 156,
      location: 'Austin, TX',
      availability: 'Available',
      hourlyRate: 140,
      bio: 'Product leader with expertise in fintech and payments, committed to supporting women in product roles.',
      avatar: '👩‍💼'
    }
  ];

  const handleRequestMentorship = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }

    if (!requestData.goals || !requestData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setRequestStatus({
      isLoading: true,
      isSuccess: false,
      error: undefined,
      txHash: undefined
    });
    setShowTransactionModal(true);

    try {
      // Create request hash for blockchain
      const requestDataString = JSON.stringify({
        mentorId: selectedMentor?.id,
        goals: requestData.goals,
        duration: requestData.duration,
        frequency: requestData.sessionFrequency,
        budget: requestData.budget,
        message: requestData.message,
        timestamp: Date.now()
      });

      const requestHash = btoa(requestDataString);
      
      // In production, this would be the mentor's wallet address
      const mentorAddress = '0x1234567890123456789012345678901234567890';
      
      const tx = await requestMentorship(mentorAddress, requestHash);
      const txHash = tx.hash;

      setRequestStatus({
        isLoading: false,
        isSuccess: true,
        txHash,
        error: undefined
      });

      // Reset form after successful request
      setTimeout(() => {
        setShowRequestModal(false);
        setShowTransactionModal(false);
        setRequestData({
          mentorId: '',
          goals: '',
          duration: '3 months',
          sessionFrequency: 'Weekly',
          preferredTime: '',
          budget: 0,
          message: ''
        });
      }, 3000);

    } catch (error: any) {
      setRequestStatus({
        isLoading: false,
        isSuccess: false,
        error: error.message || 'Failed to submit mentorship request',
        txHash: undefined
      });
    }
  };

  const openRequestModal = (mentor: MentorProfile) => {
    setSelectedMentor(mentor);
    setRequestData(prev => ({ ...prev, mentorId: mentor.id, budget: mentor.hourlyRate }));
    setShowRequestModal(true);
  };

  if (!walletAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <Users className="w-16 h-16 text-pink-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
              Find Your Mentor
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Please connect your wallet to browse mentors and request blockchain-verified mentorship agreements.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Users className="w-16 h-16 text-pink-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            Find Your Mentor
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Connect with experienced women professionals for blockchain-verified mentorship programs.
          </p>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-gray-800/50 backdrop-blur-lg border border-pink-500/20 rounded-2xl p-6 hover:border-pink-500/40 transition-all duration-300"
            >
              {/* Mentor Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{mentor.avatar}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{mentor.name}</h3>
                  <p className="text-pink-400 font-medium">{mentor.title}</p>
                  <p className="text-gray-400 text-sm">{mentor.company}</p>
                </div>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-white font-medium">{mentor.rating}</span>
                <span className="text-gray-400">({mentor.reviews} reviews)</span>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertise.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.expertise.length > 3 && (
                  <span className="px-3 py-1 bg-gray-600/50 rounded-full text-gray-300 text-xs">
                    +{mentor.expertise.length - 3} more
                  </span>
                )}
              </div>

              {/* Location & Availability */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{mentor.location}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  mentor.availability === 'Available' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : mentor.availability === 'Busy'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {mentor.availability}
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{mentor.bio}</p>

              {/* Rate & Action */}
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold">
                  ${mentor.hourlyRate}/hr
                </div>
                <button
                  onClick={() => openRequestModal(mentor)}
                  disabled={mentor.availability === 'Full'}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                >
                  Request Mentorship
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Request Modal */}
        {showRequestModal && selectedMentor && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Request Mentorship</h2>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Selected Mentor Info */}
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-800/50 rounded-lg">
                <div className="text-3xl">{selectedMentor.avatar}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedMentor.name}</h3>
                  <p className="text-pink-400">{selectedMentor.title}</p>
                  <p className="text-gray-400">${selectedMentor.hourlyRate}/hr</p>
                </div>
              </div>

              {/* Request Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Mentorship Goals *
                  </label>
                  <textarea
                    value={requestData.goals}
                    onChange={(e) => setRequestData(prev => ({ ...prev, goals: e.target.value }))}
                    placeholder="What do you hope to achieve through this mentorship?"
                    rows={3}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Duration
                    </label>
                    <select
                      value={requestData.duration}
                      onChange={(e) => setRequestData(prev => ({ ...prev, duration: e.target.value as any }))}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    >
                      <option value="1 month">1 Month</option>
                      <option value="3 months">3 Months</option>
                      <option value="6 months">6 Months</option>
                      <option value="1 year">1 Year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Session Frequency
                    </label>
                    <select
                      value={requestData.sessionFrequency}
                      onChange={(e) => setRequestData(prev => ({ ...prev, sessionFrequency: e.target.value as any }))}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Personal Message *
                  </label>
                  <textarea
                    value={requestData.message}
                    onChange={(e) => setRequestData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell your potential mentor about yourself and why you'd like their guidance..."
                    rows={4}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestMentorship}
                    disabled={!requestData.goals || !requestData.message}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Modal */}
        {showTransactionModal && (
          <TransactionModal
            onClose={() => setShowTransactionModal(false)}
            txHash={requestStatus.txHash}
            txStatus={requestStatus.isLoading ? 'pending' : requestStatus.isSuccess ? 'success' : 'error'}
            txError={requestStatus.error}
            modalType="mentorship"
          />
        )}
      </div>
    </div>
  );
};

export default MentorshipPage;
