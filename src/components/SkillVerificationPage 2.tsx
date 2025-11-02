import React, { useState } from 'react';
import { Award, Shield, CheckCircle, FileText, Loader } from 'lucide-react';
import { verifySkill } from '../blockchain/contract';
import TransactionModal from './TransactionModal';

interface SkillVerificationPageProps {
  walletAddress?: string | null;
}

interface SkillData {
  skillName: string;
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  certificationUrl: string;
  description: string;
}

interface VerificationStatus {
  isLoading: boolean;
  txHash?: string;
  error?: string;
  isSuccess: boolean;
}

const SkillVerificationPage: React.FC<SkillVerificationPageProps> = ({ walletAddress }) => {
  const [skillData, setSkillData] = useState<SkillData>({
    skillName: '',
    proficiencyLevel: 'Beginner',
    certificationUrl: '',
    description: ''
  });
  
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    isLoading: false,
    isSuccess: false
  });

  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const skillCategories = [
    'Frontend Development',
    'Backend Development',
    'Blockchain Development',
    'Data Science',
    'Machine Learning',
    'UI/UX Design',
    'Project Management',
    'Digital Marketing',
    'Content Writing',
    'Graphic Design',
    'Mobile Development',
    'DevOps',
    'Cybersecurity',
    'Quality Assurance',
    'Business Analysis'
  ];

  const handleInputChange = (field: keyof SkillData, value: string) => {
    setSkillData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVerifySkill = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }

    if (!skillData.skillName || !skillData.description) {
      alert('Please fill in all required fields');
      return;
    }

    setVerificationStatus({
      isLoading: true,
      isSuccess: false,
      error: undefined,
      txHash: undefined
    });
    setShowTransactionModal(true);

    try {
      // Create a hash of the skill data for blockchain storage
      const skillDataString = JSON.stringify({
        skill: skillData.skillName,
        level: skillData.proficiencyLevel,
        certification: skillData.certificationUrl || 'Self-verified',
        description: skillData.description
      });
      
      // For now, use a simple hash (in production, use crypto-js)
      const skillHash = btoa(skillDataString);
      
      const tx = await verifySkill(skillHash);
      const txHash = tx.hash;

      setVerificationStatus({
        isLoading: false,
        isSuccess: true,
        txHash,
        error: undefined
      });

      // Reset form after successful verification
      setTimeout(() => {
        setSkillData({
          skillName: '',
          proficiencyLevel: 'Beginner',
          certificationUrl: '',
          description: ''
        });
        setShowTransactionModal(false);
      }, 3000);

    } catch (error: any) {
      setVerificationStatus({
        isLoading: false,
        isSuccess: false,
        error: error.message || 'Failed to verify skill',
        txHash: undefined
      });
    }
  };

  if (!walletAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <Shield className="w-16 h-16 text-pink-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
              Skill Verification
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Please connect your wallet to verify your skills on the blockchain and build trust with potential employers.
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
          <Award className="w-16 h-16 text-pink-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            Verify Your Skills
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Add your skills to the blockchain for permanent, tamper-proof verification. Build trust with employers and showcase your expertise.
          </p>
        </div>

        {/* Verification Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-lg border border-pink-500/20 rounded-2xl p-8 shadow-2xl">
            <div className="space-y-6">
              {/* Skill Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Skill Name *
                </label>
                <div className="relative">
                  <select
                    value={skillData.skillName}
                    onChange={(e) => handleInputChange('skillName', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50"
                  >
                    <option value="">Select a skill...</option>
                    {skillCategories.map((skill) => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Proficiency Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Proficiency Level *
                </label>
                <select
                  value={skillData.proficiencyLevel}
                  onChange={(e) => handleInputChange('proficiencyLevel', e.target.value as any)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50"
                >
                  <option value="Beginner">Beginner (0-1 years)</option>
                  <option value="Intermediate">Intermediate (1-3 years)</option>
                  <option value="Advanced">Advanced (3-5 years)</option>
                  <option value="Expert">Expert (5+ years)</option>
                </select>
              </div>

              {/* Certification URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Certification URL
                  <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={skillData.certificationUrl}
                    onChange={(e) => handleInputChange('certificationUrl', e.target.value)}
                    placeholder="https://certification-provider.com/cert/123"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Skill Description *
                </label>
                <textarea
                  value={skillData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your experience, projects, and expertise in this skill..."
                  rows={4}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleVerifySkill}
                disabled={verificationStatus.isLoading || !skillData.skillName || !skillData.description}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
              >
                {verificationStatus.isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Verifying Skill...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Verify Skill On-Chain</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Permanent Record</h3>
              <p className="text-gray-400 text-sm">Your skills are stored permanently on the blockchain</p>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Tamper-Proof</h3>
              <p className="text-gray-400 text-sm">Cannot be altered or faked once verified</p>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
              <Award className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Build Trust</h3>
              <p className="text-gray-400 text-sm">Employers can verify your skills instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      {showTransactionModal && (
        <TransactionModal
          onClose={() => setShowTransactionModal(false)}
          txHash={verificationStatus.txHash}
          txStatus={verificationStatus.isLoading ? 'pending' : verificationStatus.isSuccess ? 'success' : 'error'}
          txError={verificationStatus.error}
          modalType="verify"
        />
      )}
    </div>
  );
};

export default SkillVerificationPage;
