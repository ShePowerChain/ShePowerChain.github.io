import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Calendar, Shield, Award, BookOpen, Settings, FileText, MessageSquare, Star, CheckCircle2, Clock } from 'lucide-react';
import { verifiedSkills, applications, mentorshipRequests } from '../blockchain/mock';

interface ProfilePageProps {
  onShowTransaction: (show: boolean) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onShowTransaction }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderApplications = () => (
    <div className="space-y-4">
      {applications.map((app) => (
        <div key={app.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white mb-1">{app.jobTitle}</h3>
              <p className="text-gray-400">{app.company}</p>
              <p className="text-sm text-gray-500 mt-1">Applied: {app.appliedDate}</p>
            </div>
            <div className="flex flex-col md:items-end">
              <span className={`font-medium ${app.statusColor} mb-2`}>{app.status}</span>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMentorship = () => (
    <div className="space-y-4">
      {mentorshipRequests.map((request) => (
        <div key={request.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white mb-1">{request.mentorName}</h3>
              <p className="text-gray-400">{request.expertise}</p>
              <p className="text-sm text-gray-500 mt-1">Requested: {request.requestDate}</p>
            </div>
            <div className="flex flex-col md:items-end">
              <span className={`font-medium mb-2 ${request.status === 'Accepted' ? 'text-green-400' : 'text-yellow-400'}`}>
                {request.status}
              </span>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                {request.status === 'Accepted' ? 'Start Session' : 'View Request'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Notifications</label>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-600 text-pink-500 focus:ring-pink-500" defaultChecked />
              <span className="text-gray-400">Receive job alerts and updates</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Privacy</label>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-600 text-pink-500 focus:ring-pink-500" defaultChecked />
              <span className="text-gray-400">Make profile visible to employers</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Blockchain Settings</h3>
        <div className="space-y-4">
          <button
            onClick={() => onShowTransaction(true)}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Verify New Skill
          </button>
          <button className="w-full bg-transparent border border-gray-600 text-gray-300 hover:border-pink-400 hover:text-pink-400 px-4 py-3 rounded-lg font-medium transition-all duration-200">
            Export Verification Records
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">Alexandra Thompson</h1>
              <p className="text-xl text-gray-400 mb-4">Senior Frontend Developer & Blockchain Enthusiast</p>
              
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6 text-gray-400 mb-6">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>alexandra@example.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined January 2024</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 bg-pink-500/20 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-pink-400" />
                  <span className="text-pink-400 font-medium">Verified Profile</span>
                </div>
                <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">Premium Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Blockchain-Verified Skills</h2>
            <button
              onClick={() => onShowTransaction(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Add Skill
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifiedSkills.map((skill, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{skill.name}</h3>
                  {skill.verified ? (
                    <div className="flex items-center space-x-1 text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium">Pending</span>
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Proficiency</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-pink-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-400">Issued by: {skill.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4">Loading Profile Data...</p>
          </div>
        ) : (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab('applications')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 ${
                  activeTab === 'applications'
                    ? 'text-pink-400 border-b-2 border-pink-400'
                    : 'text-gray-400 hover:text-pink-400'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>My Applications</span>
              </button>
              <button
                onClick={() => setActiveTab('mentorship')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 ${
                  activeTab === 'mentorship'
                    ? 'text-pink-400 border-b-2 border-pink-400'
                    : 'text-gray-400 hover:text-pink-400'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Mentorship Requests</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 ${
                  activeTab === 'settings'
                    ? 'text-pink-400 border-b-2 border-pink-400'
                    : 'text-gray-400 hover:text-pink-400'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>

            {activeTab === 'applications' && renderApplications()}
            {activeTab === 'mentorship' && renderMentorship()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;