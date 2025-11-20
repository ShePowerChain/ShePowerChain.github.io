import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Briefcase, Award, Users, TrendingUp, Shield, Zap } from "lucide-react";

const Home = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Briefcase,
      title: "Find Jobs You'll Love",
      description: "Browse opportunities that match what you're good at",
    },
    {
      icon: Award,
      title: "Prove Your Skills",
      description: "Get verified credentials that show employers what you can do",
    },
    {
      icon: Users,
      title: "Connect with Mentors",
      description: "Learn from experienced professionals who want to help you succeed",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your information is protected with advanced security",
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description: "See how far you've come and celebrate your achievements",
    },
    {
      icon: Zap,
      title: "Quick & Easy",
      description: "Get started in minutes, no complicated steps",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t('home.title')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('home.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Link to="/listings" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg px-10 h-16 shadow-lg hover:shadow-xl transition-all rounded-2xl font-semibold"
                >
                  {t('home.cta')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've made it simple to grow your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50 bg-card rounded-3xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto p-16 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-accent/30 rounded-3xl shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of women building amazing careers. It's completely free to get started!
            </p>
            <Link to="/profile">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-xl px-12 h-16 rounded-2xl shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                Create My Profile
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
