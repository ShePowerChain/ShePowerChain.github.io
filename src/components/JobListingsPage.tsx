import React, { useState, useEffect } from 'react';
import { applyToJob } from '../blockchain/contract';
import CryptoJS from 'crypto-js';
import TransactionModal from './TransactionModal';
import { LoadingPage } from './Loading';
import { Button, Card, Input, Select, Badge, SkillTag } from './ui';
import { Search, Filter, MapPin, Clock, DollarSign, Shield, Briefcase, Users, Star, ChevronDown, Heart, BookmarkPlus, TrendingUp } from 'lucide-react';
import { jobs } from '../blockchain/mock';

interface JobListingsPageProps {}

const JobListingsPage: React.FC<JobListingsPageProps> = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const [showTxModal, setShowTxModal] = useState(false);
  const [modalType, setModalType] = useState<'apply' | null>(null);
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txError, setTxError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data with realistic loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveJob = (jobId: number) => {
    const newSavedJobs = new Set(savedJobs);
    if (savedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = !selectedLocation || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesType = !selectedType || job.type.toLowerCase() === selectedType.toLowerCase();
      
      return matchesSearch && matchesLocation && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'salary':
          return parseInt(b.salary.replace(/[^\d]/g, '')) - parseInt(a.salary.replace(/[^\d]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        case 'applicants':
          return a.applicants - b.applicants;
        default:
          return 0;
      }
    });

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'remote', label: 'Remote' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'seattle', label: 'Seattle, WA' },
  ];

  const salaryOptions = [
    { value: '', label: 'All Salaries' },
    { value: '60-80', label: '$60,000 - $80,000' },
    { value: '80-100', label: '$80,000 - $100,000' },
    { value: '100-120', label: '$100,000 - $120,000' },
    { value: '120+', label: '$120,000+' },
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'salary', label: 'Highest Salary' },
    { value: 'rating', label: 'Best Rating' },
    { value: 'applicants', label: 'Fewest Applicants' },
  ];

  if (loading) {
    return (
      <LoadingPage 
        title="Finding Amazing Jobs..." 
        subtitle="Searching through blockchain-verified opportunities"
        showProgress={true}
        progress={75}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Discover opportunities with blockchain-verified employers
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card variant="default" className="text-center py-4">
              <div className="text-2xl font-bold text-pink-400">{jobs.length}</div>
              <div className="text-gray-400 text-sm">Active Jobs</div>
            </Card>
            <Card variant="default" className="text-center py-4">
              <div className="text-2xl font-bold text-purple-400">50+</div>
              <div className="text-gray-400 text-sm">Companies</div>
            </Card>
            <Card variant="default" className="text-center py-4">
              <div className="text-2xl font-bold text-green-400">95%</div>
              <div className="text-gray-400 text-sm">Verified</div>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <Card variant="elevated" className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                variant="search"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-5 h-5" />}
              />
            </div>
            
            <div className="flex gap-4">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              />
              
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                icon={<Filter className="w-5 h-5" />}
              >
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-700/50">
              <Select
                label="Location"
                options={locationOptions}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              />
              
              <Select
                label="Salary Range"
                options={salaryOptions}
                value={selectedSalary}
                onChange={(e) => setSelectedSalary(e.target.value)}
              />
              
              <Select
                label="Job Type"
                options={typeOptions}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              />
            </div>
          )}
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-400">
            <span className="text-white font-semibold">{filteredJobs.length}</span> jobs found
            {searchTerm && <span> for "{searchTerm}"</span>}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span>Updated {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                variant="interactive"
                className="hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Job Info */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white hover:text-pink-400 transition-colors duration-200">
                            {job.title}
                          </h3>
                          {job.verified && (
                            <Badge variant="success">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-lg text-gray-300 font-medium">{job.company}</p>
                      </div>
                      
                      <button
                        onClick={() => handleSaveJob(job.id)}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          savedJobs.has(job.id)
                            ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                            : 'bg-gray-800/50 text-gray-400 hover:text-pink-400 hover:bg-pink-400/10 border border-gray-700'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{job.type} • {job.posted}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">{job.description}</p>

                    {/* Skills and Stats */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <SkillTag key={index} skill={skill} />
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{job.applicants} applicants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{job.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col space-y-3 lg:ml-6 min-w-[200px]">
                    <Button
                      variant="primary"
                      onClick={async () => {
                        setShowTxModal(true);
                        setModalType('apply');
                        setTxStatus('pending');
                        setTxError(null);
                        setTxHash(null);
                        try {
                          const resumeHash = CryptoJS.SHA256(job.description).toString();
                          const tx = await applyToJob(job.id, resumeHash);
                          setTxHash(tx.hash);
                          await tx.wait();
                          setTxStatus('success');
                        } catch (err: any) {
                          setTxStatus('error');
                          setTxError(err?.message || 'Transaction failed');
                        }
                      }}
                      className="w-full"
                    >
                      Apply Now
                    </Button>
                    
                    <Button
                      variant="secondary"
                      className="w-full"
                      icon={<BookmarkPlus className="w-4 h-4" />}
                    >
                      Save for Later
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card variant="elevated" className="text-center py-12">
            <div className="text-gray-400 space-y-4">
              <Briefcase className="w-16 h-16 mx-auto text-gray-600" />
              <h3 className="text-xl font-semibold text-white">No jobs found</h3>
              <p>Try adjusting your search criteria or filters</p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('');
                  setSelectedSalary('');
                  setSelectedType('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        )}

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">
              Load More Jobs
            </Button>
          </div>
        )}

        {/* Transaction Modal */}
        {showTxModal && (
          <TransactionModal
            onClose={() => {
              setShowTxModal(false);
              setTxStatus('idle');
              setTxHash(null);
              setTxError(null);
              setModalType(null);
            }}
            txStatus={txStatus}
            txHash={txHash}
            txError={txError}
            modalType={modalType}
          />
        )}
      </div>
    </div>
  );
};

export default JobListingsPage;
