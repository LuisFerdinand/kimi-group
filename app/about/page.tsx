// Path: app/about/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold-400">About KIMI GROUP</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our journey, vision, and commitment to excellence
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-gold-900/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-gold-900/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-gold-400" />
              </div>
              <CardTitle>Our Vision</CardTitle>
              <CardDescription>
                To be the leading conglomerate known for innovation, quality, and exceptional service across all our brands.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-gold-900/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-gold-900/20 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-gold-400" />
              </div>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>
                To deliver exceptional value to our customers through innovative solutions, quality products, and outstanding service.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Roadmap */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold-900/20"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {[
                { year: "2010", title: "Company Founded", description: "KIMI GROUP was established with a vision to provide exceptional services." },
                { year: "2015", title: "First Brand Launch", description: "Successfully launched our first brand in the technology sector." },
                { year: "2018", title: "Expansion", description: "Expanded our operations to three new countries with multiple brands." },
                { year: "2023", title: "Innovation Hub", description: "Established an innovation center to drive future growth and development." },
              ].map((item, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                  <div className="w-1/2 px-8">
                    <Card className="border-gold-900/20 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center">
                          <span className="text-gold-400 font-bold mr-2">{item.year}</span>
                          <CardTitle>{item.title}</CardTitle>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-gold-500 z-10"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team & Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-gold-900/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-gold-900/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-gold-400" />
              </div>
              <CardTitle>Our Team</CardTitle>
              <CardDescription>
                A diverse group of professionals committed to excellence and innovation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gold-900/20 flex items-center justify-center">
                      <span className="text-gold-400 font-bold">T{item}</span>
                    </div>
                    <div>
                      <p className="font-medium">Team Member {item}</p>
                      <p className="text-sm text-muted-foreground">Position</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-gold-900/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-gold-900/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-gold-400" />
              </div>
              <CardTitle>Our Partners</CardTitle>
              <CardDescription>
                We collaborate with industry leaders to deliver the best solutions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gold-900/20 flex items-center justify-center">
                      <span className="text-gold-400 font-bold">P{item}</span>
                    </div>
                    <div>
                      <p className="font-medium">Partner {item}</p>
                      <p className="text-sm text-muted-foreground">Industry</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}