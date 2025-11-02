import React, { useState } from 'react';
import { Upload, CheckCircle, Clock, AlertCircle, Shield, Award, ExternalLink, FileText, X } from 'lucide-react';

interface SkillVerificationProps {
  userData?: {
    profile?: {
      firstName: string;
      lastName: string;
      skills: string[];
    };
    walletAddress?: string;
  };
}

interface SkillVerificationRequest {
  id: string;
  skillName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  proofFiles: File[];
  description: string;
  status: 'draft' | 'pending' | 'verified' | 'rejected';
  submittedDate?: string;
  txHash?: string;
}

const SkillVerificationPage: React.FC<SkillVerificationProps> = () => {
  const [activeTab, setActiveTab] = useState('verify');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for existing verification requests
  const [verificationRequests] = useState<SkillVerificationRequest[]>([
    {
      id: '1',
      skillName: 'React Development',
      level: 'Advanced',
      proofFiles: [],
      description: 'Completed multiple React projects including e-commerce platform',
      status: 'verified',
      submittedDate: '2024-11-15',
      txHash: '0x1234...5678'
    },
    {
      id: '2',
      skillName: 'UI/UX Design',
      level: 'Intermediate',
      proofFiles: [],
      description: 'Portfolio includes mobile app designs and user research projects',
      status: 'pending',
      submittedDate: '2024-12-01',
      txHash: '0x3456...7890'
    },
    {
      id: '3',
      skillName: 'Machine Learning',
      level: 'Beginner',
      proofFiles: [],
      description: 'Completed online courses and implemented basic ML algorithms',
      status: 'rejected',
      submittedDate: '2024-11-28'
    }
  ]);

  const popularSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'Data Science',
    'UI/UX Design', 'Project Management', 'Digital Marketing', 'Blockchain Development',
    'Cloud Computing', 'DevOps', 'Cybersecurity', 'Mobile Development'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, this would:
      // 1. Upload files to IPFS
      // 2. Create skill verification transaction
      // 3. Store metadata on blockchain
      
      alert('Skill verification submitted successfully! Transaction hash: 0x' + Math.random().toString(16).substr(2, 8));
      
      // Reset form
      setSelectedSkill('');
      setCustomSkill('');
      setDescription('');
      setUploadedFiles([]);
      setSkillLevel('Intermediate');
      
    } catch (error) {
      alert('Error submitting verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'rejected':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const renderVerificationForm = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-8">
        <div className="flex items-center mb-6">
          <Shield className="w-8 h-8 text-purple-400 mr-4" />
          <div>
            <h2 className="text-2xl font-bold text-white">Verify Your Skills</h2>
            <p className="text-gray-300">Upload proof and get blockchain-verified credentials</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-sm text-gray-300">Upload Evidence</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-gray-300">Peer Review</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-sm text-gray-300">Blockchain Certificate</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitVerification} className="space-y-6">
        {/* Skill Selection */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Select Skill</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Choose from popular skills</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {popularSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedSkill === skill
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="h-px bg-gray-600 flex-1"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="h-px bg-gray-600 flex-1"></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Add custom skill</label>
            <input
              type="text"
              value={customSkill}
              onChange={(e) => {
                setCustomSkill(e.target.value);
                if (e.target.value) setSelectedSkill('');
              }}
              placeholder="Enter skill name"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Skill Level */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Skill Level</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSkillLevel(level)}
                className={`p-4 rounded-lg font-medium transition-all duration-200 ${
                  skillLevel === level
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Evidence Upload */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Upload Evidence</h3>
          <p className="text-gray-400 mb-4">
            Upload certificates, portfolios, code samples, or any relevant proof of your skill
          </p>
          
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png,.zip,.doc,.docx"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-2">Click to upload files</p>
              <p className="text-gray-500 text-sm">PDF, Images, ZIP, DOC files (max 10MB each)</p>
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span className="text-white">{file.name}</span>
                    <span className="text-gray-400 text-sm">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your experience with this skill, projects you've worked on, and why you deserve this verification..."
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 h-32 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!selectedSkill && !customSkill || isSubmitting}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 text-lg"
        >
          {isSubmitting ? 'Submitting to Blockchain...' : 'Submit for Verification'}
        </button>
      </form>
    </div>
  );

  const renderVerificationHistory = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Verification History</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {verificationRequests.map((request) => (
          <div key={request.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{request.skillName}</h3>
                  <p className="text-gray-400 text-sm">Level: {request.level}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(request.status)}
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4">{request.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">
                  Submitted: {request.submittedDate}
                </span>
                {request.status === 'verified' && (
                  <div className="flex items-center space-x-1 text-green-400">
                    <Shield className="w-4 h-4" />
                    <span>Blockchain Verified</span>
                  </div>
                )}
              </div>
              {request.txHash && (
                <a
                  href={`https://etherscan.io/tx/${request.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <span>View Transaction</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/20 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Skill Verification
          </h1>
          <p className="text-gray-400">
            Get your skills verified on the blockchain for transparent credibility
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800/50 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('verify')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'verify'
                  ? 'bg-pink-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Verify New Skill
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'history'
                  ? 'bg-pink-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Verification History
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'verify' && renderVerificationForm()}
          {activeTab === 'history' && renderVerificationHistory()}
        </div>
      </div>
    </div>
  );
};

export default SkillVerificationPage;
