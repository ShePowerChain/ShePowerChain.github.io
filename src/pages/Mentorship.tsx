import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, Calendar, Video, MessageSquare, TrendingUp } from "lucide-react";
const Mentorship = () => {
  const mentors = [
    {
      id: 1,
      name: "Radha Sharma",
      title: "Master Tailor (20+ Years Experience)",
      expertise: ["Stitching", "Blouse Design", "Suit Tailoring"],
      rating: 4.9,
      students: 68,
      sessions: 242,
      rate: "₹399/hour",
      avatar: "/assets/mentor1.jpeg",
      location: "Jaipur",
    },
    {
      id: 2,
      name: "Priya Mehta",
      title: "Beauty Expert & Trainer",
      expertise: ["Threading", "Makeup", "Hairstyling"],
      rating: 4.8,
      students: 55,
      sessions: 198,
      rate: "₹349/hour",
      avatar:"/assets/mentor2.jpeg",
      location: "Ahmedabad",
    },
    {
      id: 3,
      name: "Kavita Patel",
      title: "Home Bakery & Cooking Mentor",
      expertise: ["Home Cooking", "Snacks", "Cake Baking"],
      rating: 5.0,
      students: 72,
      sessions: 310,
      rate: "₹299/hour",
      avatar: "/assets/mentor3.jpeg",
      location: "Pune",
    },
    {
      id: 4,
      name: "Seema Gupta",
      title: "Embroidery & Handcraft Specialist",
      expertise: ["Aari Work", "Zardozi", "Patch Work"],
      rating: 4.7,
      students: 44,
      sessions: 156,
      rate: "₹350/hour",
      avatar: "/assets/mentor4.jpeg",
      location: "Lucknow",
    },
    {
      id: 5,
      name: "Anita Singh",
      title: "Boutique Management Mentor",
      expertise: ["Customer Handling", "Design Ideas", "Sales"],
      rating: 4.8,
      students: 39,
      sessions: 134,
      rate: "₹449/hour",
      avatar: "/assets/mentor5.jpeg",
      location: "Delhi",
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Learn from Real Experts",
      description: "Women who built their skills through hard work",
    },
    {
      icon: Calendar,
      title: "Your Time, Your Schedule",
      description: "Morning, afternoon, or evening — you choose",
    },
    {
      icon: Video,
      title: "One-on-One Guidance",
      description: "Personal help for your unique journey",
    },
    {
      icon: TrendingUp,
      title: "Grow Faster",
      description: "Reach your goals with expert support",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find a Mentor</h1>
          <p className="text-xl text-muted-foreground">
            Connect with experienced professionals who want to help you grow
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="browse">Browse Mentors</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <div className="flex gap-4 mb-4">
                    <Avatar className="w-20 h-20 border-2 border-primary/20">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-muted-foreground">
                          ({mentor.sessions} sessions)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {mentor.students} students
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      {mentor.rate}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Session
                    </Button>
                    <Button variant="outline" size="icon">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <Card className="p-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Upcoming Sessions</h3>
              <p className="text-muted-foreground mb-6">
                Book your first mentorship session to get started
              </p>
              <Button>Browse Mentors</Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-16 p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-accent/30 rounded-3xl shadow-xl">
          <Users className="w-20 h-20 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Help Others?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Share your knowledge and earn money as a mentor on your own schedule
          </p>
          <Button size="lg" variant="outline" className="border-2 h-16 px-10 text-lg rounded-2xl font-semibold">
            Become a Mentor
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Mentorship;
