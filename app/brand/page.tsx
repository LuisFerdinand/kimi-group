"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/pages/PageHeader";

export default function BrandPage() {
  const sliderRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const brands = [
    {
      id: "kiny-cultura",
      name: "Kiny Cultura Indonesia",
      tagline: "Cross-Cultural Understanding",
      description: "Promoting cross-cultural understanding through folk dance competitions, immersion schools, and leadership programs for children from elementary to junior high school.",
      backgroundImage: "https://images.unsplash.com/photo-1515184689810-b8b7187c6975?w=2070&q=80",
      logo: "/brandLogo/kinyCultura.png",
      color: "var(--color-gold-500)",
      stats: { 
        label1: 'Countries', 
        value1: '150+', 
        label2: 'Schools', 
        value2: '50+', 
        label3: 'Students', 
        value3: '1500+', 
        label4: 'Festivals', 
        value4: '100+' 
      }
    },
    {
      id: "kiny-education",
      name: "Kiny Education & Training",
      tagline: "Professional Development",
      description: "Providing development programs for university students and executives in collaboration with leading universities, offering internationally recognized certifications.",
      backgroundImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=2070&q=80",
      logo: "/brandLogo/kinyEducation.png",
      color: "var(--color-gold-600)",
      stats: { 
        label1: 'Programs', 
        value1: '50+', 
        label2: 'Universities', 
        value2: '30+', 
        label3: 'Certifications', 
        value3: '25+', 
        label4: 'Participants', 
        value4: '2000+' 
      }
    },
    {
      id: "kiny-tours",
      name: "Kiny Tours & Travel",
      tagline: "Personalized Travel Experiences",
      description: "Offering personalized private tour experiences that enrich travelers' understanding of diverse cultures across 7 continents.",
      backgroundImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2070&q=80",
      logo: "/brandLogo/kinyTours.png",
      color: "var(--color-gold-700)",
      stats: { 
        label1: 'Countries', 
        value1: '167', 
        label2: 'Drivers', 
        value2: '150+', 
        label3: 'Guides', 
        value3: '80+', 
        label4: 'Partners', 
        value4: '30+' 
      }
    },
    {
      id: "kinergy-project",
      name: "Kinergy Project",
      tagline: "Dream Beyond Limit",
      description: "Delivering seamless event planning and management services that celebrate creativity and collaboration with bold execution and cultural resonance.",
      backgroundImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=2070&q=80",
      logo: "/brandLogo/kinergy.png",
      color: "var(--color-gold-400)",
      stats: { 
        label1: 'Events', 
        value1: '200+', 
        label2: 'Countries', 
        value2: '25+', 
        label3: 'Clients', 
        value3: '100+', 
        label4: 'Volunteers', 
        value4: '200+' 
      }
    },
    {
      id: "kiny-soul",
      name: "Kiny & Soul",
      tagline: "Spiritual Journeys",
      description: "Providing comfortable, flexible, and private services for Umrah and spiritual journeys with personalized itineraries that honor your spiritual path.",
      backgroundImage: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=2070&q=80",
      logo: "/brandLogo/kinySoul.png",
      color: "var(--color-gold-300)",
      stats: { 
        label1: 'Journeys', 
        value1: '500+', 
        label2: 'Destinations', 
        value2: '15+', 
        label3: 'Pilgrims', 
        value3: '2000+', 
        label4: 'Guides', 
        value4: '50+' 
      }
    },
    {
      id: "kiny-xplore",
      name: "Kiny Xplore",
      tagline: "International Sports Development",
      description: "A division dedicated to the advancement of sports on an international scale, addressing both international competitions and skill development training programs.",
      backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=2070&q=80",
      logo: "/brandLogo/kinyXplore.png",
      color: "var(--color-gold-200)",
      stats: { 
        label1: 'Competitions', 
        value1: '50+', 
        label2: 'Clubs', 
        value2: '50+', 
        label3: 'Athletes', 
        value3: '1000+', 
        label4: 'Countries', 
        value4: '30+' 
      }
    }
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % brands.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + brands.length) % brands.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const getPositionStyles = (index: number) => {
    const diff = (index - activeIndex + brands.length) % brands.length;
    
    if (diff === 0) {
      return {
        transform: 'translateX(-50%) scale(1) translateY(-50%)',
        left: '50%',
        top: '50%',
        zIndex: 50,
        opacity: 1,
        filter: 'brightness(1.1)',
      };
    } else if (diff === 1) {
      return {
        transform: 'translateX(0%) scale(0.8) translateY(-50%)',
        left: '70%',
        top: '50%',
        zIndex: 40,
        opacity: 0.6,
      };
    } else if (diff === brands.length - 1) {
      return {
        transform: 'translateX(-100%) scale(0.8) translateY(-50%)',
        left: '30%',
        top: '50%',
        zIndex: 40,
        opacity: 0.6,
      };
    } else if (diff === 2) {
      return {
        transform: 'translateX(0%) scale(0.65) translateY(-50%)',
        left: '85%',
        top: '50%',
        zIndex: 30,
        opacity: 0.3,
      };
    } else if (diff === brands.length - 2) {
      return {
        transform: 'translateX(-100%) scale(0.65) translateY(-50%)',
        left: '15%',
        top: '50%',
        zIndex: 30,
        opacity: 0.3,
      };
    } else {
      return {
        transform: 'translateX(-50%) scale(0.5) translateY(-50%)',
        left: diff > brands.length / 2 ? '-20%' : '120%',
        top: '50%',
        zIndex: 10,
        opacity: 0,
      };
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Static background linear */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-background" />
      
      {/* Static decorative elements */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'var(--color-gold-500)', opacity: 0.05 }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'var(--color-navy-500)', opacity: 0.05 }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full blur-3xl"
        style={{ backgroundColor: 'var(--color-gold-400)', opacity: 0.03 }}
      />

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <PageHeader 
            title="KINY GROUP DIVISIONS"
            description="Six exceptional divisions, one commitment to excellence"
            emphasizedWord="excellence"
          />

          {/* Brand Slider */}
          <div className="relative mx-auto max-w-5xl h-125 sm:h-150 lg:h-175 mb-16">
            <div ref={sliderRef} className="relative w-full h-full perspective-1000">
              {brands.map((brand, index) => {
                const isActive = index === activeIndex;
                const styles = getPositionStyles(index);
                
                return (
                  <div 
                    key={brand.id}
                    className="absolute w-[260px] h-[380px] sm:w-[320px] sm:h-[460px] lg:w-[400px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer hover:scale-105"
                    style={styles}
                    onClick={() => {
                      if (!isAnimating) {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    {/* Background image with parallax effect */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${brand.backgroundImage})`,
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                      }}
                    />
                    
                    {/* Colored overlay */}
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-40"
                      style={{ backgroundColor: brand.color }}
                    />
                    
                    {/* Linear overlays */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-black/60" />
                    
                    {/* Animated border */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-3xl animate-border-pulse"
                        style={{
                          boxShadow: `0 0 30px ${brand.color}80, inset 0 0 30px ${brand.color}30`,
                        }}
                      />
                    )}

                    {/* Content */}
                    <div className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-end transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-[var(--card)]/10 backdrop-blur-md border border-[var(--border)]/20">
                          <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--foreground)' }}>
                            {brand.tagline}
                          </p>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight" style={{ color: 'var(--foreground)' }}>
                          {brand.name}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed line-clamp-3" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                          {brand.description}
                        </p>
                        <Link
                          href={`/brand/${brand.id}`}
                          className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-linear-to-r from-[var(--primary)] to-[var(--color-gold-400)] font-bold transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base"
                          style={{ color: 'var(--primary-foreground)' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Explore Division
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Brand logo */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[var(--card)]/90 backdrop-blur-md border border-[var(--border)]/20 p-2 overflow-hidden shadow-lg">
                      <Image 
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-4 z-50">
              <button
                onClick={handlePrev}
                disabled={isAnimating}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--card)]/40 backdrop-blur-md border border-[var(--primary)]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group hover:scale-110 hover:shadow-lg"
                style={{ color: 'var(--primary)' }}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-1" />
              </button>
              
              {/* Dot indicators */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 rounded-full bg-[var(--card)]/40 backdrop-blur-md border border-[var(--border)]/10">
                {brands.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => !isAnimating && setActiveIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === activeIndex
                        ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-linear-to-r from-[var(--primary)] to-[var(--color-gold-400)]'
                        : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[var(--muted-foreground)]/30 hover:bg-[var(--muted-foreground)]/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-(--card)/40 backdrop-blur-md border border-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group hover:scale-110 hover:shadow-lg"
                style={{ color: 'var(--primary)' }}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Brand stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="p-4 sm:p-6 rounded-2xl bg-linear-to-br from-(--card)/5 to-(--card)/2 backdrop-blur-sm border border-[var(--border)]/10 hover:border-[var(--primary)]/30 transition-all duration-500 hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-linear-to-r from-primary to-(--color-gold-200) bg-clip-text text-transparent mb-2 transition-all duration-500">
                {brands[activeIndex].stats.value1}
              </div>
              <div className="text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-500" style={{ color: 'var(--muted-foreground)' }}>
                {brands[activeIndex].stats.label1}
              </div>
            </div>
            
            <div className="p-4 sm:p-6 rounded-2xl bg-linear-to-br from-[var(--card)]/5 to-[var(--card)]/[0.02] backdrop-blur-sm border border-[var(--border)]/10 hover:border-[var(--primary)]/30 transition-all duration-500 hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-linear-to-r from-[var(--primary)] to-[var(--color-gold-200)] bg-clip-text text-transparent mb-2 transition-all duration-500">
                {brands[activeIndex].stats.value2}
              </div>
              <div className="text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-500" style={{ color: 'var(--muted-foreground)' }}>
                {brands[activeIndex].stats.label2}
              </div>
            </div>
            
            <div className="p-4 sm:p-6 rounded-2xl bg-linear-to-br from-[var(--card)]/5 to-[var(--card)]/[0.02] backdrop-blur-sm border border-[var(--border)]/10 hover:border-[var(--primary)]/30 transition-all duration-500 hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-linear-to-r from-[var(--primary)] to-[var(--color-gold-200)] bg-clip-text text-transparent mb-2 transition-all duration-500">
                {brands[activeIndex].stats.value3}
              </div>
              <div className="text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-500" style={{ color: 'var(--muted-foreground)' }}>
                {brands[activeIndex].stats.label3}
              </div>
            </div>
            
            <div className="p-4 sm:p-6 rounded-2xl bg-linear-to-br from-[var(--card)]/5 to-[var(--card)]/[0.02] backdrop-blur-sm border border-[var(--border)]/10 hover:border-[var(--primary)]/30 transition-all duration-500 hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-linear-to-r from-[var(--primary)] to-[var(--color-gold-200)] bg-clip-text text-transparent mb-2 transition-all duration-500">
                {brands[activeIndex].stats.value4}
              </div>
              <div className="text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-500" style={{ color: 'var(--muted-foreground)' }}>
                {brands[activeIndex].stats.label4}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes linear {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes border-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-linear {
          background-size: 200% auto;
          animation: linear 3s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-border-pulse {
          animation: border-pulse 2s ease-in-out infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @media (max-width: 640px) {
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
}