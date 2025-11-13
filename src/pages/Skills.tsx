import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, CheckCircle, Clock, Shield, TrendingUp } from "lucide-react";

const Skills = () => {
  const categories = [
    {
      name: "Tailoring & Sewing",
      skills: [
        { name: "Shirts", verified: true, level: 95 },
        { name: "Pants", verified: true, level: 85 },
        { name: "Lehenga", verified: false, level: 70 },
        { name: "Custom", verified: false, level: 60 },
      ],
    },
    {
      name: "Designing",
      skills: [
        { name: "Shirts", verified: true, level: 90 },
        { name: "Sarees", verified: true, level: 88 },
      ],
    },
    {
      name: "Cooking",
      skills: [
        { name: "Staple North-Indian", verified: false, level: 80 },
        { name: "Staple South-Indian", verified: false, level: 70 },
      ],
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified & Trusted",
      description: "Your skills are officially verified and secure",
    },
    {
      icon: TrendingUp,
      title: "Get Better Jobs",
      description: "Stand out to employers with verified credentials",
    },
    {
      icon: CheckCircle,
      title: "Quick Process",
      description: "Get verified in just a few simple steps",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Show What You Know</h1>
          <p className="text-xl text-muted-foreground">
            Get verified credentials that prove your skills to employers
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6 bg-gradient-to-br from-card to-muted/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Skill Categories */}
        <div className="space-y-8">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <Card key={skillIndex} className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-3">
                        <Award className={`w-6 h-6 mt-1 ${skill.verified ? 'text-accent' : 'text-muted-foreground'}`} />
                        <div>
                          <h3 className="text-lg font-semibold">{skill.name}</h3>
                          {skill.verified ? (
                            <Badge className="bg-accent hover:bg-accent mt-1">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              Not Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Proficiency</span>
                        <span className="font-medium">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>

                    {!skill.verified && (
                      <Button variant="outline" className="w-full">
                        Start Verification
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-16 p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-accent/30 rounded-3xl shadow-xl">
          <Shield className="w-20 h-20 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Verified?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Show employers what you can do with official skill verification
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 h-16 px-10 text-lg rounded-2xl font-semibold shadow-lg">
            Start Verification
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Skills;
