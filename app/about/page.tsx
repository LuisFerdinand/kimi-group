// app/about/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Users, Award, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const journeyItems = [
    { 
      year: "2010", 
      title: "Company Founded", 
      description: "KINY GROUP was established with a vision to provide exceptional services.",
      image: "/brandLogo/brandLogo1.png" 
    },
    { 
      year: "2015", 
      title: "First Brand Launch", 
      description: "Successfully launched our first brand in the technology sector.",
      image: "/brandLogo/brandLogo2.png" 
    },
    { 
      year: "2018", 
      title: "Expansion", 
      description: "Expanded our operations to three new countries with multiple brands.",
      image: "/brandLogo/brandLogo3.png" 
    },
    { 
      year: "2023", 
      title: "Innovation Hub", 
      description: "Established an innovation center to drive future growth and development.",
      image: "/brandLogo/brandLogo4.png" 
    },
    { 
      year: "2015", 
      title: "First Brand Launch", 
      description: "Successfully launched our first brand in the technology sector.",
      image: "/brandLogo/brandLogo5.png" 
    },
    { 
      year: "2018", 
      title: "Expansion", 
      description: "Expanded our operations to three new countries with multiple brands.",
      image: "/brandLogo/brandLogo6.png" 
    },
    { 
      year: "2023", 
      title: "Innovation Hub", 
      description: "Established an innovation center to drive future growth and development.",
      image: "/brandLogo/brandLogo7.png" 
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold-400">About KINY GROUP</h1>
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

        {/* Enhanced Journey Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
              Building Excellence Together
            </h2>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Animated gradient line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-gold-400 via-gold-500 to-gold-600 opacity-30">
              <div className="absolute inset-0 bg-linear-to-b from-gold-400 via-gold-500 to-transparent animate-pulse"></div>
            </div>
            
            <div className="space-y-16">
              {journeyItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center group`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                  }}
                >
                  {/* Content side */}
                  <div className="w-1/2 px-8">
                    <Card className="border-gold-900/20 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-gold-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-gold-900/20 hover:-translate-y-2">
                      {/* Image with overlay */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent z-10"></div>
                        <Image 
                          src={item.image} 
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700"
                        />
                        {/* Floating year badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className="bg-gold-500 text-navy-900 px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                            {item.year}
                          </div>
                        </div>
                      </div>
                      
                      <CardHeader className="space-y-3">
                        <CardTitle className="text-xl group-hover:text-gold-400 transition-colors duration-300">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Center dot with pulse animation */}
                  <div className="w-0 flex justify-center relative z-20">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-gold-500 shadow-lg shadow-gold-500/50 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-gold-400 animate-ping opacity-75"></div>
                      <div className="absolute inset-0 w-8 h-8 -m-2 rounded-full border-2 border-gold-400/30 group-hover:border-gold-400/60 transition-colors duration-500"></div>
                    </div>
                  </div>

                  {/* Empty space for layout */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-gold-400 via-gold-500 to-gold-600 opacity-30"></div>
            
            <div className="space-y-8 pl-12 pr-4">
              {journeyItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative group"
                  style={{
                    animation: `fadeInLeft 0.6s ease-out ${index * 0.15}s both`
                  }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-7.5 top-6">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-gold-500 shadow-md shadow-gold-500/50 group-hover:scale-150 transition-transform duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-gold-400 animate-ping opacity-75"></div>
                    </div>
                  </div>

                  <Card className="border-gold-900/20 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-gold-500/50 transition-all duration-300 hover:shadow-md hover:shadow-gold-900/10">
                    {/* Year badge */}
                    <div className="absolute top-4 right-4 z-10 bg-gold-500 text-navy-900 px-3 py-1 rounded-full font-bold text-sm shadow-md">
                      {item.year}
                    </div>

                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-t from-card via-card/30 to-transparent z-10"></div>
                      <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-lg group-hover:text-gold-400 transition-colors duration-300">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
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

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}