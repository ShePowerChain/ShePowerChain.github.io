import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, MapPin, Clock, DollarSign, Briefcase } from "lucide-react";

const Listings = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const jobs = [
    {
      id: 1,
      title: "Experienced Tailor (Ladies Suits & Blouses)",
      company: "Shree Boutique",
      location: "Borivali, Mumbai",
      type: "Full-time",
      salary: "₹18,000 - ₹25,000 per month",
      posted: "Posted 1 day ago",
      skills: ["Stitching", "Measurement", "Blouse Design"],
    },
    {
      id: 2,
      title: "Home-based Stitching Work",
      company: "StitchEasy Co.",
      location: "Work from Home",
      type: "Part-time",
      salary: "₹10,000 - ₹18,000 per month",
      posted: "Posted 2 days ago",
      skills: ["Sewing Machine", "Finishing", "Home-based"],
    },
    {
      id: 3,
      title: "Boutique Sales & Stitching Assistant",
      company: "Anjali Fashion Studio",
      location: "Indiranagar, Bangalore",
      type: "Full-time",
      salary: "₹15,000 - ₹20,000 per month",
      posted: "Posted 3 days ago",
      skills: ["Customer Handling", "Basic Stitching", "Fabric Knowledge"],
    },
    {
      id: 4,
      title: "Cook for Small Catering Business",
      company: "Ghar Ka Khana",
      location: "Sector 17, Chandigarh",
      type: "Full-time",
      salary: "₹14,000 - ₹18,000 per month",
      posted: "Posted 4 days ago",
      skills: ["North Indian Cooking", "Hygiene", "Team Work"],
    },
    {
      id: 5,
      title: "Beauty Parlor Assistant",
      company: "Glow & Grace Salon",
      location: "Vastrapur, Ahmedabad",
      type: "Full-time",
      salary: "₹12,000 - ₹16,000 per month + Tips",
      posted: "Posted 1 week ago",
      skills: ["Threading", "Waxing", "Customer Service"],
    },
    {
      id: 6,
      title: "Embroidery & Handwork Specialist",
      company: "Kalaakar Crafts",
      location: "Work from Home",
      type: "Contract",
      salary: "₹8,000 - ₹15,000 per month",
      posted: "Posted 1 week ago",
      skills: ["Aari Work", "Zardosi", "Attention to Detail"],
    },
    {
      id: 7,
      title: "Domestic Helper (Cooking + Cleaning)",
      company: "Trusted Home Care",
      location: "Koregaon Park, Pune",
      type: "Full-time",
      salary: "₹15,000 - ₹18,000 per month",
      posted: "Posted 2 weeks ago",
      skills: ["Cooking", "Cleaning", "Trustworthy"],
    },
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = searchQuery === "" || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = jobTypeFilter === "all" || 
        job.type.toLowerCase() === jobTypeFilter.toLowerCase();

      const matchesLocation = locationFilter === "all" || 
        (locationFilter === "remote" && job.location.toLowerCase().includes("work from home")) ||
        (locationFilter === "onsite" && !job.location.toLowerCase().includes("work from home"));

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchQuery, jobTypeFilter, locationFilter]);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('listings.title')}</h1>
          <p className="text-xl text-muted-foreground">
            {t('listings.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <Card className="p-8 mb-10 rounded-3xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">{t('listings.search')}</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder={t('listings.searchPlaceholder')}
                  className="pl-12 h-14 text-base rounded-2xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t('listings.jobType')}</label>
              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger className="h-14 rounded-2xl">
                  <SelectValue placeholder={t('listings.anyType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('listings.allTypes')}</SelectItem>
                  <SelectItem value="full-time">{t('listings.fulltime')}</SelectItem>
                  <SelectItem value="part-time">{t('listings.parttime')}</SelectItem>
                  <SelectItem value="contract">{t('listings.contract')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t('listings.location')}</label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="h-14 rounded-2xl">
                  <SelectValue placeholder={t('listings.anywhere')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('listings.allLocations')}</SelectItem>
                  <SelectItem value="remote">{t('listings.remote')}</SelectItem>
                  <SelectItem value="onsite">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-lg text-muted-foreground">No jobs found matching your criteria.</p>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50 rounded-3xl">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Briefcase className="w-10 h-10 text-primary-foreground" />
                  </div>

                  <div className="flex-1 space-y-5">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                          <p className="text-lg text-muted-foreground">{job.company}</p>
                        </div>
                        <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 h-14 rounded-2xl text-lg font-semibold shadow-lg">
                          {t('listings.apply')}
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-6 text-base text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5" />
                          {job.salary}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="px-4 py-2 text-sm rounded-xl">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {job.posted}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
