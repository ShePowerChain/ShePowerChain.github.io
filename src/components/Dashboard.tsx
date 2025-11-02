import React, { useState } from 'react';
import { Shield, Award, Briefcase, Users, ExternalLink, CheckCircle, Clock, AlertCircle, TrendingUp, Calendar } from 'lucide-react';

interface DashboardProps {
  userData?: {
    profile?: {
      firstName: string;
      lastName: string;
      title: string;
      skills: string[];
    };
    walletAddress?: string;
  };
}

interface VerifiedSkill {
  id: string;
  name: string;
  level: string;
  verificationDate: string;
  txHash: string;
  status: 'verified' | 'pending' | 'rejected';
}

interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'applied' | 'reviewed' | 'interviewing' | 'offered' | 'rejected';
  txHash: string;
}

interface MentorshipRequest {
  id: string;
  mentorName: string;
  topic: string;
  requestDate: string;
  status: 'pending' | 'accepted' | 'scheduled' | 'completed' | 'declined';
  txHash: string;
  scheduledDate?: string;
}

interface Transaction {
  id: string;
  type: 'skill_verification' | 'job_application' | 'mentorship_request';
  description: string;
  date: string;
  txHash: string;
  network: string;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - in real app, this would come from API/blockchain
  const [verifiedSkills] = useState<VerifiedSkill[]>([
    {
      id: '1',
      name: 'React Development',
      level: 'Advanced',
      verificationDate: '2024-11-15',
      txHash: '0x1234...5678',
      status: 'verified'
    },
    {
      id: '2',
      name: 'Blockchain Development',
      level: 'Intermediate',
      verificationDate: '2024-11-20',
      txHash: '0x2345...6789',
      status: 'verified'
    },
    {
      id: '3',
      name: 'UI/UX Design',
      level: 'Beginner',
      verificationDate: '2024-12-01',
      txHash: '0x3456...7890',
      status: 'pending'
    }
  ]);

  const [jobApplications] = useState<JobApplication[]>([
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechFlow Inc.',
      appliedDate: '2024-11-25',
      status: 'interviewing',
      txHash: '0x4567...8901'
    },
    {
      id: '2',
      jobTitle: 'Blockchain Developer',
      company: 'CryptoSolutions',
      appliedDate: '2024-11-20',
      status: 'reviewed',
      txHash: '0x5678...9012'
    },
    {
      id: '3',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      appliedDate: '2024-11-18',
      status: 'applied',
      txHash: '0x6789...0123'
    }
  ]);

  const [mentorshipRequests] = useState<MentorshipRequest[]>([
    {
      id: '1',
      mentorName: 'Sarah Chen',
      topic: 'Career Growth in Tech',
      requestDate: '2024-11-22',
      status: 'scheduled',
      txHash: '0x7890...1234',
      scheduledDate: '2024-12-05'
    },
    {
      id: '2',
      mentorName: 'Dr. Aisha Patel',
      topic: 'Machine Learning Fundamentals',
      requestDate: '2024-11-28',
      status: 'pending',
      txHash: '0x8901...2345'
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'skill_verification',
      description: 'UI/UX Design Skill Verification',
      date: '2024-12-01',
      txHash: '0x3456...7890',
      network: 'Ethereum Mainnet',
      status: 'pending'
    },
    {
      id: '2',
      type: 'job_application',
      description: 'Applied to Senior Frontend Developer at TechFlow Inc.',
      date: '2024-11-25',
      txHash: '0x4567...8901',
      network: 'Ethereum Mainnet',
      status: 'confirmed',
      gasUsed: '0.0012 ETH'
    },
    {
      id: '3',
      type: 'mentorship_request',
      description: 'Mentorship request to Sarah Chen',
      date: '2024-11-22',
      txHash: '0x7890...1234',
      network: 'Ethereum Mainnet',
      status: 'confirmed',
      gasUsed: '0.0008 ETH'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'confirmed':
      case 'scheduled':
      case 'offered':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
      case 'applied':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'rejected':
      case 'failed':
      case 'declined':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'confirmed':
      case 'scheduled':
      case 'offered':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'pending':
      case 'applied':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'rejected':
      case 'failed':
      case 'declined':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border border-pink-500/20 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Welcome back, {userData?.profile?.firstName || 'Professional'}! 👋
        </h2>
        <p className="text-gray-300 text-lg mb-6">
          Here's your blockchain-verified professional journey overview
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{verifiedSkills.filter(s => s.status === 'verified').length}</div>
            <div className="text-gray-400 text-sm">Verified Skills</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <Briefcase className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{jobApplications.length}</div>
            <div className="text-gray-400 text-sm">Job Applications</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{mentorshipRequests.length}</div>
            <div className="text-gray-400 text-sm">Mentorship Requests</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <TrendingUp className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{transactions.filter(t => t.status === 'confirmed').length}</div>
            <div className="text-gray-400 text-sm">Confirmed Transactions</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-white flex items-center">
            <Award className="w-6 h-6 text-purple-400 mr-2" />
            Recent Skills
          </h3>
          <div className="space-y-3">
            {verifiedSkills.slice(0, 3).map((skill) => (
              <div key={skill.id} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                <div>
                  <div className="font-medium text-white">{skill.name}</div>
                  <div className="text-sm text-gray-400">{skill.level} • {skill.verificationDate}</div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(skill.status)}
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(skill.status)}`}>
                    {skill.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-white flex items-center">
            <Briefcase className="w-6 h-6 text-blue-400 mr-2" />
            Recent Applications
          </h3>
          <div className="space-y-3">
            {jobApplications.slice(0, 3).map((application) => (
              <div key={application.id} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                <div>
                  <div className="font-medium text-white">{application.jobTitle}</div>
                  <div className="text-sm text-gray-400">{application.company} • {application.appliedDate}</div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(application.status)}
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Verified Skills</h2>
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
          Add New Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedSkills.map((skill) => (
          <div key={skill.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-purple-400" />
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(skill.status)}`}>
                  {skill.status}
                </span>
              </div>
              {skill.status === 'verified' && (
                <Shield className="w-6 h-6 text-green-400" />
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
            <p className="text-gray-400 mb-4">Level: {skill.level}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Verified:</span>
                <span className="text-white">{skill.verificationDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Transaction:</span>
                <a
                  href={`https://etherscan.io/tx/${skill.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <span>{skill.txHash.slice(0, 8)}...</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Job Applications</h2>
      
      <div className="bg-gray-800/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Position</th>
                <th className="text-left p-4 text-gray-300 font-medium">Company</th>
                <th className="text-left p-4 text-gray-300 font-medium">Applied</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {jobApplications.map((application) => (
                <tr key={application.id} className="border-t border-gray-700/50">
                  <td className="p-4 text-white font-medium">{application.jobTitle}</td>
                  <td className="p-4 text-gray-300">{application.company}</td>
                  <td className="p-4 text-gray-300">{application.appliedDate}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(application.status)}
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <a
                      href={`https://etherscan.io/tx/${application.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      <span>{application.txHash.slice(0, 10)}...</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMentorship = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Mentorship Requests</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mentorshipRequests.map((request) => (
          <div key={request.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-green-400" />
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              {request.status === 'scheduled' && (
                <Calendar className="w-6 h-6 text-blue-400" />
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{request.mentorName}</h3>
            <p className="text-gray-400 mb-4">{request.topic}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Requested:</span>
                <span className="text-white">{request.requestDate}</span>
              </div>
              {request.scheduledDate && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Scheduled:</span>
                  <span className="text-green-400">{request.scheduledDate}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Transaction:</span>
                <a
                  href={`https://etherscan.io/tx/${request.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <span>{request.txHash.slice(0, 8)}...</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Transaction History</h2>
      
      <div className="bg-gray-800/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Type</th>
                <th className="text-left p-4 text-gray-300 font-medium">Description</th>
                <th className="text-left p-4 text-gray-300 font-medium">Date</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Gas Used</th>
                <th className="text-left p-4 text-gray-300 font-medium">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-gray-700/50">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {transaction.type === 'skill_verification' && <Award className="w-4 h-4 text-purple-400" />}
                      {transaction.type === 'job_application' && <Briefcase className="w-4 h-4 text-blue-400" />}
                      {transaction.type === 'mentorship_request' && <Users className="w-4 h-4 text-green-400" />}
                      <span className="text-white capitalize">{transaction.type.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{transaction.description}</td>
                  <td className="p-4 text-gray-300">{transaction.date}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{transaction.gasUsed || 'N/A'}</td>
                  <td className="p-4">
                    <a
                      href={`https://etherscan.io/tx/${transaction.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      <span>{transaction.txHash.slice(0, 10)}...</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'applications', label: 'Applications', icon: Briefcase },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: ExternalLink }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900/20 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            Professional Dashboard
          </h1>
          <p className="text-gray-400">
            Manage your blockchain-verified professional profile
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-gray-800/50 rounded-xl p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'skills' && renderSkills()}
          {activeTab === 'applications' && renderApplications()}
          {activeTab === 'mentorship' && renderMentorship()}
          {activeTab === 'transactions' && renderTransactions()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
