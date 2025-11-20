import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, Briefcase, Award, Calendar, Edit } from "lucide-react";

const Profile = () => {
  const { t } = useLanguage();
  const skills = [
    { name: "Tailoring", level: "Expert", verified: true },
    { name: "Cooking", level: "Advanced", verified: true },
    { name: "Mehendi Art", level: "Intermediate", verified: false },
    { name: "Beauty Services", level: "Beginner", verified: false },
  ];

  const achievements = [
    { title: "Completed 10 Projects", date: "Jan 2024", icon: Award },
    { title: "Top Performer", date: "Dec 2023", icon: Briefcase },
    { title: "Helped 5 People", date: "Nov 2023", icon: Award },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Header */}
        <Card className="p-10 mb-10 rounded-3xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="w-36 h-36 border-4 border-primary/20 shadow-lg">
              <AvatarImage src="src\Images\Default_profile.jpeg" />
              <AvatarFallback className="text-3xl">PS</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold mb-3">Priya Sharma</h1>
                  <p className="text-xl text-muted-foreground mb-5">
                    Expert Tailor & Cooking Specialist
                  </p>
                </div>
                <Button variant="outline" className="gap-2 h-12 px-6 rounded-2xl border-2">
                  <Edit className="w-5 h-5" />
                  Edit Profile
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  priya.sharma@gmail.com
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Mumbai, Maharashtra
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Joined March 2023
                </div>
              </div>

              <div className="flex gap-8 pt-6">
                <div>
                  <div className="text-3xl font-bold text-primary">24</div>
                  <div className="text-base text-muted-foreground">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">8</div>
                  <div className="text-base text-muted-foreground">Verified Skills</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">12</div>
                  <div className="text-base text-muted-foreground">Mentor Sessions</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="skills" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md h-14 rounded-2xl">
            <TabsTrigger value="skills" className="text-base rounded-xl">My Skills</TabsTrigger>
            <TabsTrigger value="achievements" className="text-base rounded-xl">Achievements</TabsTrigger>
            <TabsTrigger value="activity" className="text-base rounded-xl">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card key={index} className="p-8 rounded-3xl hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{skill.name}</h3>
                      <p className="text-base text-muted-foreground mt-1">{skill.level}</p>
                    </div>
                    {skill.verified ? (
                      <Badge className="bg-accent hover:bg-accent px-4 py-2 text-sm">Verified ✓</Badge>
                    ) : (
                      <Badge variant="outline" className="px-4 py-2 text-sm">Not Yet</Badge>
                    )}
                  </div>
                  {!skill.verified && (
                    <Button variant="outline" size="lg" className="w-full mt-4 h-12 rounded-2xl">
                      Get Verified
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="space-y-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="p-8 rounded-3xl hover:shadow-lg transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{achievement.title}</h3>
                        <p className="text-base text-muted-foreground mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="p-16 text-center rounded-3xl">
              <Briefcase className="w-20 h-20 mx-auto mb-6 text-muted-foreground" />
              <h3 className="text-2xl font-semibold mb-3">No Recent Activity</h3>
              <p className="text-lg text-muted-foreground">
                Your recent activities will appear here
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
