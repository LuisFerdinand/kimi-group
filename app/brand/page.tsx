"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BrandPage() {
  const sliderRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  const brands = [
    {
      id: "1",
      name: "Tech Innovations",
      tagline: "Future-Ready Technology",
      description: "Cutting-edge AI and software solutions transforming digital experiences.",
      backgroundImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=2070&q=80",
      logo: "/brandLogo/brandLogo1.png",
      color: "var(--color-gold-500)",
      stats: { label1: 'Products', value1: '50+', label2: 'Countries', value2: '25+', label3: 'Users', value3: '2M+', label4: 'Revenue', value4: '$800M' }
    },
    {
      id: "2",
      name: "Green Earth Logistics",
      tagline: "Sustainable Supply Chain",
      description: "Eco-friendly logistics solutions with carbon-neutral delivery systems.",
      backgroundImage: "https://images.unsplash.com/photo-1448630360428-a6516a377dcd?w=2070&q=80",
      logo: "/brandLogo/brandLogo2.png",
      color: "var(--color-gold-600)",
      stats: { label1: 'Vehicles', value1: '5K+', label2: 'Countries', value2: '40+', label3: 'Deliveries', value3: '10M+', label4: 'Revenue', value4: '$1.2B' }
    },
    {
      id: "3",
      name: "Royal Finance Group",
      tagline: "Wealth Management Excellence",
      description: "Premium financial services for sophisticated investors and enterprises.",
      backgroundImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=2070&q=80",
      logo: "/brandLogo/brandLogo3.png",
      color: "var(--color-gold-700)",
      stats: { label1: 'Assets', value1: '$50B', label2: 'Countries', value2: '30+', label3: 'Clients', value3: '100K+', label4: 'Revenue', value4: '$2.5B' }
    },
    {
      id: "4",
      name: "Vitality Healthcare",
      tagline: "Caring for Life",
      description: "Comprehensive healthcare services with advanced medical technology.",
      backgroundImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=2070&q=80",
      logo: "/brandLogo/brandLogo4.png",
      color: "var(--color-gold-400)",
      stats: { label1: 'Hospitals', value1: '200+', label2: 'Countries', value2: '15+', label3: 'Patients', value3: '5M+', label4: 'Revenue', value4: '$3.2B' }
    },
    {
      id: "5",
      name: "Luxe Properties",
      tagline: "Defining Premium Living",
      description: "High-end real estate development and property management services.",
      backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2070&q=80",
      logo: "/brandLogo/brandLogo5.png",
      color: "var(--color-gold-300)",
      stats: { label1: 'Properties', value1: '1K+', label2: 'Countries', value2: '20+', label3: 'Tenants', value3: '50K+', label4: 'Revenue', value4: '$1.8B' }
    },
    {
      id: "6",
      name: "Edu Excellence",
      tagline: "Learning Without Limits",
      description: "Innovative education technology and learning management platforms.",
      backgroundImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2070&q=80",
      logo: "/brandLogo/brandLogo6.png",
      color: "var(--color-gold-200)",
      stats: { label1: 'Courses', value1: '10K+', label2: 'Countries', value2: '60+', label3: 'Students', value3: '8M+', label4: 'Revenue', value4: '$900M' }
    },
    {
      id: "7",
      name: "Gourmet Ventures",
      tagline: "Culinary Excellence",
      description: "Premium food services, restaurants, and hospitality management.",
      backgroundImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2070&q=80",
      logo: "/brandLogo/brandLogo7.png",
      color: "var(--color-gold-100)",
      stats: { label1: 'Locations', value1: '500+', label2: 'Countries', value2: '35+', label3: 'Guests', value3: '20M+', label4: 'Revenue', value4: '$1.5B' }
    },
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-linear-to-r from-(--color-gold-200) via-[var(--color-gold-400)] to-[var(--color-gold-200)] bg-clip-text text-transparent animate-linear">
              Our Brands
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seven exceptional brands, one commitment to <span className="font-semibold" style={{ color: 'var(--color-gold-400)' }}>excellence</span>
            </p>
          </div>

          {/* Brand Slider */}
          <div className="relative mx-auto max-w-7xl h-125 sm:h-150 lg:h-175 mb-16">
            <div ref={sliderRef} className="relative w-full h-full perspective-1000">
              {brands.map((brand, index) => {
                const isActive = index === activeIndex;
                const styles = getPositionStyles(index);
                
                return (
                  <Link 
                    key={brand.id}
                    href={`/brand/${brand.id}`}
                    className="absolute w-[260px] h-[380px] sm:w-[320px] sm:h-[460px] lg:w-[400px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer hover:scale-105"
                    style={styles}
                    onClick={(e) => {
                      if (!isAnimating) {
                        setActiveIndex(index);
                      } else {
                        e.preventDefault();
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
                        <div className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-linear-to-r from-[var(--primary)] to-[var(--color-gold-400)] font-bold transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base" style={{ color: 'var(--primary-foreground)' }}>
                          Explore Brand
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
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
                  </Link>
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