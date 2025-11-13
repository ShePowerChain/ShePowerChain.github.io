import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MapPin, Briefcase, Award, Calendar, Edit, IndianRupee } from "lucide-react";

const Profile = () => {
  const skills = [
    { name: "Ladies Suit Stitching", level: "Expert", verified: true },
    { name: "Blouse Design", level: "Advanced", verified: true },
    { name: "Customer Handling", level: "Intermediate", verified: true },
    { name: "Embroidery Work", level: "Beginner", verified: false },
  ];

  const achievements = [
    { title: "Stitched 150+ Suits", date: "March 2025", icon: Award },
    { name: "Best Tailor Award", date: "Diwali Mela 2024", icon: Award },
    { title: "Trained 3 Apprentices", date: "Jan 2025", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 font-sans">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Header */}
        <Card className="p-8 md:p-10 mb-10 rounded-3xl shadow-lg border-2 border-pink-100">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <Avatar className="w-32 h-32 md:w-36 md:h-36 border-4 border-pink-200 shadow-xl">
              <AvatarImage 
                src="/assets/Default_profile.jpeg" 
                alt="Sunita Verma" 
              />
              <AvatarFallback className="bg-gradient-to-br from-pink-100 to-purple-100 text-pink-800 text-3xl font-bold">
                SV
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-5">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-pink-800">
                    Sunita Verma
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground font-medium">
                    Expert Tailor & Boutique Owner
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="gap-2 h-12 px-6 rounded-2xl border-2 border-pink-300 hover:bg-pink-50"
                >
                  <Edit className="w-5 h-5 text-pink-600" />
                  <span className="font-semibold text-pink-700">Edit Profile</span>
                </Button>
              </div>

              <div className="flex flex-wrap gap-5 text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-pink-600" />
                  sunita.verma@gmail.com
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-pink-600" />
                  Malviya Nagar, Jaipur
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-pink-600" />
                  Joined April 2024
                </div>
              </div>

              <div className="flex gap-6 md:gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-pink-700 flex items-center gap-1">
                    <IndianRupee className="w-7 h-7" />
                    28,000
                  </div>
                  <div className="text-base text-muted-foreground">Monthly Earnings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-700">3</div>
                  <div className="text-base text-muted-foreground">Verified Skills</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-700">6</div>
                  <div className="text-base text-muted-foreground">Mentorship Sessions</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="skills" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto h-14 rounded-2xl bg-pink-50 p-1">
            <TabsTrigger 
              value="skills" 
              className="text-base rounded-xl data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm"
            >
              My Skills
            </TabsTrigger>
            <TabsTrigger 
              value="achievements" 
              className="text-base rounded-xl data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm"
            >
              Achievements
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="text-base rounded-xl data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm"
            >
              Activity
            </TabsTrigger>
          </TabsList>

          {/* === SKILLS TAB === */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card 
                  key={index} 
                  className="p-6 md:p-8 rounded-3xl hover:shadow-lg transition-all border border-pink-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-pink-800">
                        {skill.name}
                      </h3>
                      <p className="text-base text-muted-foreground mt-1">{skill.level}</p>
                    </div>
                    {skill.verified ? (
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 text-sm font-semibold">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-pink-300 text-pink-700 px-4 py-2 text-sm">
                        Not Yet
                      </Badge>
                    )}
                  </div>
                  {!skill.verified && (
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full mt-4 h-12 rounded-2xl border-2 border-pink-300 text-pink-700 hover:bg-pink-50 font-semibold"
                    >
                      Get Verified Now
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* === ACHIEVEMENTS TAB === */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="space-y-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-6 md:p-8 rounded-3xl hover:shadow-lg transition-all border border-pink-100"
                  >
                    <div className="flex items-center gap-5 md:gap-6">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-pink-800">
                          {achievement.title}
                        </h3>
                        <p className="text-base text-muted-foreground mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* === ACTIVITY TAB === */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="p-12 md:p-16 text-center rounded-3xl border-2 border-pink-100">
              <Briefcase className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 text-pink-300" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-pink-800">
                No Recent Activity
              </h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
                Your recent jobs, sessions, and progress will appear here
              </p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Motivational Footer */}
        <div className="mt-12 text-center">
          <p className="text-lg font-medium text-pink-700">
            <strong>हर सिलाई, एक कहानी है।</strong> Keep stitching your success!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;