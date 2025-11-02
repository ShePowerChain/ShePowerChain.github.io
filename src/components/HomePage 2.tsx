import React from 'react';
import { Shield, Briefcase, Award, Users, ArrowRight, CheckCircle, Globe, Lock, Zap } from 'lucide-react';

type Page = 'home' | 'profile' | 'jobs' | 'skills' | 'mentorship';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onShowTransaction: () => void;
  walletAddress?: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, walletAddress }) => {
  const features = [
    {
      icon: Briefcase,
      title: 'Find Blockchain Jobs',
      description: 'Browse verified job opportunities with transparent, on-chain application records.',
      action: 'Browse Jobs',
      page: 'jobs' as const,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Verify Skills',
      description: 'Add your skills to the blockchain for permanent, tamper-proof verification.',
      action: 'Verify Skills',
      page: 'skills' as const,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Find Mentors',
      description: 'Connect with experienced professionals through blockchain-verified mentorship.',
      action: 'Find Mentors',
      page: 'mentorship' as const,
      color: 'from-green-500 to-green-600'
    }
  ];

  const benefits = [
    {
      icon: Lock,
      title: 'Tamper-Proof Records',
      description: 'All achievements and applications are permanently stored on the blockchain.'
    },
    {
      icon: Globe,
      title: 'Global Transparency',
      description: 'Employers worldwide can instantly verify your credentials and work history.'
    },
    {
      icon: Zap,
      title: 'Instant Verification',
      description: 'No more waiting for background checks or credential verification processes.'
    },
    {
      icon: CheckCircle,
      title: 'Build Trust',
      description: 'Establish credibility with verifiable proof of your skills and experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900/20 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Shield className="w-20 h-20 text-pink-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
            ShePowerChain
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Empowering women in the workforce through blockchain technology.
            Build trust, verify skills, and connect with opportunities like never before.
          </p>

          {!walletAddress ? (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-8">
              <p className="text-yellow-300 text-lg">
                👆 Connect your wallet above to start building your verified professional profile
              </p>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-8">
              <p className="text-green-300 text-lg flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Wallet connected! Ready to explore blockchain-verified features</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            Blockchain-Powered Features
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Take control of your professional journey with these revolutionary blockchain features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg border border-pink-500/20 rounded-2xl p-8 hover:border-pink-500/40 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                
                <button
                  onClick={() => onNavigate(feature.page)}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group-hover:scale-105"
                >
                  <span>{feature.action}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            Why Blockchain Matters
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover how blockchain technology revolutionizes professional verification and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border border-pink-500/20 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            Ready to Transform Your Career?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of women already using blockchain technology to advance their careers.
            Start building your verified professional profile today.
          </p>
          
          {!walletAddress ? (
            <p className="text-pink-300 text-lg font-medium">
              Connect your wallet above to get started! 🚀
            </p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('skills')}
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Award className="w-5 h-5" />
                <span>Verify Your First Skill</span>
              </button>
              <button
                onClick={() => onNavigate('jobs')}
                className="bg-transparent border-2 border-pink-500 hover:bg-pink-500/10 text-pink-400 hover:text-pink-300 font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Briefcase className="w-5 h-5" />
                <span>Browse Jobs</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Empowering Women
              <span className="block bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
                Through Blockchain
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the future of work where your skills are blockchain-verified, 
              your achievements are permanent, and your potential is unlimited.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => onNavigate('jobs')}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
              >
                <Briefcase className="inline-block w-5 h-5 mr-2" />
                Find Jobs
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
              
              {!walletAddress && (
                <button
                  onClick={onShowTransaction}
                  className="group relative px-8 py-4 bg-transparent border-2 border-pink-400 text-pink-400 font-semibold rounded-full hover:bg-pink-400 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <UserCheck className="inline-block w-5 h-5 mr-2" />
                  Get Started
                </button>
              )}
              
              <button
                onClick={() => onNavigate('profile')}
                className="group relative px-8 py-4 bg-transparent border-2 border-gray-600 text-gray-300 font-semibold rounded-full hover:border-pink-400 hover:text-pink-400 transition-all duration-300 transform hover:scale-105"
              >
                <Users className="inline-block w-5 h-5 mr-2" />
                Find a Mentor
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-pink-500/10 blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-pink-400/5 blur-2xl" />
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">10,000+</h3>
              <p className="text-gray-400">Women Empowered</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-full mb-4">
                <Shield className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">5,000+</h3>
              <p className="text-gray-400">Verified Skills</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">2,500+</h3>
              <p className="text-gray-400">Job Opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Opportunities</h2>
            <p className="text-xl text-gray-400">Discover blockchain-verified job postings from trusted employers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-pink-400 transition-colors duration-200">
                      {job.title}
                    </h3>
                    <p className="text-gray-400">{job.company}</p>
                  </div>
                  {job.verified && (
                    <div className="flex items-center space-x-1 bg-pink-500/20 px-2 py-1 rounded-full">
                      <Shield className="w-4 h-4 text-pink-400" />
                      <span className="text-xs text-pink-400 font-medium">Verified</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.posted}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-pink-400 font-semibold">{job.salary}</span>
                  <button
                    onClick={() => onNavigate('jobs')}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('jobs')}
              className="bg-transparent border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
            >
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-pink-500/10 to-pink-600/10 border border-pink-500/20 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of women who have already revolutionized their professional journey with blockchain-verified credentials.
            </p>
            <button
              onClick={() => onNavigate('profile')}
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;