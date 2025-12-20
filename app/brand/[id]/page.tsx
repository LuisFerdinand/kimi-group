// app/brand/[id]/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Truck, CheckCircle, Globe, Users, ArrowLeft, Star, Award, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const brandsData = {
  "1": {
    name: "Tech Innovations",
    tagline: "Future-Ready Technology",
    description: "Tech Innovations is at the forefront of digital transformation, leveraging cutting-edge AI, machine learning, and cloud technologies to revolutionize how businesses operate. Our team of expert engineers and data scientists work tirelessly to create solutions that not only meet today's challenges but anticipate tomorrow's opportunities.",
    fullDescription: "Founded on the principle that technology should empower, not complicate, we've built a reputation for delivering elegant solutions to complex problems. From Fortune 500 companies to innovative startups, our clients trust us to turn their digital vision into reality.",
    coverage: "Global",
    delivery: "Cloud-Based & On-Site",
    services: [
      { name: "AI & Machine Learning", description: "Advanced AI models and predictive analytics tailored to your business needs" },
      { name: "Cloud Infrastructure", description: "Scalable, secure cloud architecture and migration services" },
      { name: "Custom Software Development", description: "Bespoke applications built with cutting-edge technology stacks" },
      { name: "Cybersecurity Solutions", description: "Comprehensive security frameworks to protect your digital assets" },
    ],
    achievements: [
      "Deployed AI solutions for 300+ global enterprises",
      "99.99% uptime across all cloud infrastructure",
      "ISO 27001 certified security standards",
      "Winner of Tech Innovation Award 2023",
    ],
    stats: [
      { label: "Active Clients", value: "500+" },
      { label: "Projects Delivered", value: "1,200+" },
      { label: "Team Members", value: "150+" },
      { label: "Countries Served", value: "45+" },
    ],
    team: [
      { name: "Dr. Sarah Chen", position: "Chief Technology Officer" },
      { name: "Marcus Rodriguez", position: "Head of AI Research" },
      { name: "Aisha Patel", position: "VP of Cloud Solutions" },
      { name: "James Kim", position: "Lead Security Architect" },
    ],
    theme: {
      primary: "from-[var(--color-gold-500)] to-[var(--color-gold-400)]",
      bg: "bg-[var(--color-navy-900)]/30",
      bgSolid: "bg-[var(--color-navy-800)]/50",
      border: "border-[var(--color-gold-500)]/30",
      text: "text-[var(--color-gold-400)]",
      accent: "bg-[var(--color-gold-500)]",
      hover: "hover:bg-[var(--color-gold-500)]/10",
      gradient: "bg-gradient-to-br from-[var(--color-gold-500)]/20 to-[var(--color-gold-400)]/20"
    }
  },
  "2": {
    name: "Green Earth Logistics",
    tagline: "Sustainable Supply Chain",
    description: "Green Earth Logistics is pioneering the future of sustainable transportation and supply chain management. We've reimagined logistics from the ground up, creating systems that deliver exceptional service while dramatically reducing environmental impact through our carbon-neutral fleet and innovative packaging solutions.",
    fullDescription: "Every package we deliver is a statement about the future we're building. Our electric and hybrid fleet, coupled with AI-optimized routing, ensures your goods arrive on time while protecting the planet for future generations.",
    coverage: "International",
    delivery: "Eco-Fleet & Smart Routing",
    services: [
      { name: "Carbon-Neutral Shipping", description: "100% offset emissions with renewable energy credits" },
      { name: "Sustainable Packaging", description: "Biodegradable and recycled materials for all shipments" },
      { name: "Smart Logistics Platform", description: "AI-powered route optimization reducing fuel consumption" },
      { name: "Green Warehousing", description: "Solar-powered facilities with zero-waste operations" },
    ],
    achievements: [
      "Reduced carbon emissions by 85% since 2020",
      "Delivered 5 million packages with zero carbon footprint",
      "First logistics company with B Corp certification",
      "Environmental Excellence Award 2023",
    ],
    stats: [
      { label: "Packages Delivered", value: "5M+" },
      { label: "Carbon Offset (tons)", value: "50K+" },
      { label: "Electric Vehicles", value: "500+" },
      { label: "Countries", value: "30+" },
    ],
    team: [
      { name: "Emma Greenfield", position: "CEO & Founder" },
      { name: "Lars Bergström", position: "VP of Operations" },
      { name: "Kenji Tanaka", position: "Head of Sustainability" },
      { name: "Sofia Martinez", position: "Chief Logistics Officer" },
    ],
    theme: {
      primary: "from-[var(--color-gold-600)] to-[var(--color-gold-500)]",
      bg: "bg-[var(--color-navy-900)]/30",
      bgSolid: "bg-[var(--color-navy-800)]/50",
      border: "border-[var(--color-gold-600)]/30",
      text: "text-[var(--color-gold-500)]",
      accent: "bg-[var(--color-gold-600)]",
      hover: "hover:bg-[var(--color-gold-600)]/10",
      gradient: "bg-gradient-to-br from-[var(--color-gold-600)]/20 to-[var(--color-gold-500)]/20"
    }
  },
  "3": {
    name: "Royal Finance Group",
    tagline: "Wealth Management Excellence",
    description: "Royal Finance Group offers sophisticated financial services for high-net-worth individuals and institutions. Our heritage of excellence spans decades, combining time-tested wealth preservation strategies with cutting-edge fintech solutions to grow and protect your assets across generations.",
    fullDescription: "With a client-centric approach and deep market expertise, we provide personalized financial strategies that align with your unique goals, risk tolerance, and legacy aspirations. Our exclusive private banking services ensure discretion, expertise, and unparalleled service.",
    coverage: "Major Financial Hubs",
    delivery: "Private Banking & Digital",
    services: [
      { name: "Private Wealth Management", description: "Bespoke investment strategies for ultra-high-net-worth clients" },
      { name: "Investment Banking", description: "Corporate finance, M&A advisory, and capital markets expertise" },
      { name: "Trust & Estate Planning", description: "Multi-generational wealth transfer and tax optimization" },
      { name: "Alternative Investments", description: "Exclusive access to private equity, hedge funds, and real assets" },
    ],
    achievements: [
      "$50 billion in assets under management",
      "Serving 2,000+ high-net-worth families",
      "25+ years of wealth management excellence",
      "Top-rated private banking services",
    ],
    stats: [
      { label: "Assets Under Management", value: "$50B+" },
      { label: "Client Families", value: "2,000+" },
      { label: "Years of Excellence", value: "25+" },
      { label: "Global Offices", value: "15" },
    ],
    team: [
      { name: "Victoria Sterling", position: "Managing Partner" },
      { name: "Alexander Rothschild", position: "Chief Investment Officer" },
      { name: "Priya Sharma", position: "Head of Private Banking" },
      { name: "Thomas Ashford", position: "Director of Estate Planning" },
    ],
    theme: {
      primary: "from-[var(--color-gold-700)] to-[var(--color-gold-600)]",
      bg: "bg-[var(--color-navy-900)]/30",
      bgSolid: "bg-[var(--color-navy-800)]/50",
      border: "border-[var(--color-gold-700)]/30",
      text: "text-[var(--color-gold-600)]",
      accent: "bg-[var(--color-gold-700)]",
      hover: "hover:bg-[var(--color-gold-700)]/10",
      gradient: "bg-gradient-to-br from-[var(--color-gold-700)]/20 to-[var(--color-gold-600)]/20"
    }
  },
  "4": {
    name: "Vitality Healthcare",
    tagline: "Caring for Life",
    description: "Vitality Healthcare is redefining modern medicine by combining compassionate care with advanced medical technology. Our integrated network of specialists, state-of-the-art facilities, and innovative telemedicine platform ensures that quality healthcare is accessible, personalized, and effective.",
    fullDescription: "From preventive care to specialized treatments, we take a holistic approach to health and wellness. Our patient-first philosophy means every decision is made with your wellbeing at the center, supported by the latest medical research and technology.",
    coverage: "Regional Network",
    delivery: "Multi-Channel Care",
    services: [
      { name: "Telemedicine Platform", description: "24/7 virtual consultations with board-certified physicians" },
      { name: "Specialized Medical Care", description: "Centers of excellence in cardiology, oncology, and orthopedics" },
      { name: "Wellness Programs", description: "Preventive care, nutrition counseling, and fitness programs" },
      { name: "Emergency Services", description: "Rapid response emergency care with advanced trauma facilities" },
    ],
    achievements: [
      "Treated over 1 million patients annually",
      "98% patient satisfaction rating",
      "JCI-accredited facilities",
      "Healthcare Innovation Award 2023",
    ],
    stats: [
      { label: "Patients Served", value: "1M+" },
      { label: "Medical Specialists", value: "500+" },
      { label: "Healthcare Facilities", value: "25" },
      { label: "Telemedicine Consultations", value: "100K+" },
    ],
    team: [
      { name: "Dr. Michael Chen", position: "Chief Medical Officer" },
      { name: "Dr. Rachel Adams", position: "Head of Telemedicine" },
      { name: "Nurse Director Lisa Wong", position: "VP of Patient Services" },
      { name: "Dr. Omar Hassan", position: "Director of Specialized Care" },
    ],
    theme: {
      primary: "from-[var(--color-gold-400)] to-[var(--color-gold-300)]",
      bg: "bg-[var(--color-navy-900)]/30",
      bgSolid: "bg-[var(--color-navy-800)]/50",
      border: "border-[var(--color-gold-400)]/30",
      text: "text-[var(--color-gold-300)]",
      accent: "bg-[var(--color-gold-400)]",
      hover: "hover:bg-[var(--color-gold-400)]/10",
      gradient: "bg-gradient-to-br from-[var(--color-gold-400)]/20 to-[var(--color-gold-300)]/20"
    }
  },
  "5": {
    name: "Luxe Properties",
    tagline: "Defining Premium Living",
    description: "Luxe Properties represents the pinnacle of luxury real estate development and property management. We create architectural masterpieces in the world's most prestigious locations, offering discerning clients properties that are not just homes, but legacies crafted with impeccable attention to detail and uncompromising quality.",
    fullDescription: "Each Luxe property is a testament to exquisite design, innovative engineering, and sustainable luxury. From penthouses with panoramic city views to oceanfront estates, we curate living experiences that exceed the highest expectations.",
    coverage: "Metropolitan Areas",
    delivery: "Full-Service Concierge",
    services: [
      { name: "Luxury Development", description: "Exclusive residential and commercial properties in prime locations" },
      { name: "Property Management", description: "White-glove service for property owners and residents" },
      { name: "Investment Advisory", description: "Real estate investment strategies for high-return portfolios" },
      { name: "Interior Design", description: "Bespoke interior design services from world-renowned designers" },
    ],
    achievements: [
      "$5 billion in luxury properties developed",
      "50+ award-winning developments",
      "Managed 200+ premium properties",
      "Best Luxury Developer 2023",
    ],
    stats: [
      { label: "Properties Developed", value: "100+" },
      { label: "Total Value", value: "$5B+" },
      { label: "Premium Units", value: "200+" },
      { label: "Cities", value: "12" },
    ],
    team: [
      { name: "Isabella Romano", position: "CEO & Master Developer" },
      { name: "David Thornton", position: "Chief Architect" },
      { name: "Yasmin Al-Farsi", position: "VP of Property Management" },
      { name: "Laurent Dubois", position: "Head of Design" },
    ],
    theme: {
      primary: "from-[var(--color-gold-300)] to-[var(--color-gold-200)]",
      bg: "bg-[var(--color-navy-900)]/30",
      bgSolid: "bg-[var(--color-navy-800)]/50",
      border: "border-[var(--color-gold-300)]/30",
      text: "text-[var(--color-gold-200)]",
      accent: "bg-[var(--color-gold-300)]",
      hover: "hover:bg-[var(--color-gold-300)]/10",
      gradient: "bg-gradient-to-br from-[var(--color-gold-300)]/20 to-[var(--color-gold-200)]/20"
    }
  },
  "6": {
    name: "Edu Excellence",
    tagline: "Learning Without Limits",
    description: "Edu Excellence is transforming education through innovative learning technology and personalized educational experiences. Our comprehensive platform combines AI-driven adaptive learning, expert instructors, and engaging content to make world-class education accessible to learners of all ages and backgrounds.",
    fullDescription: "We believe education is the key to unlocking human potential. Our mission is to democratize learning, providing tools and resources that empower individuals to achieve their goals, whether advancing their careers, learning new skills, or pursuing lifelong passions.",
    coverage: "Worldwide Online",
    delivery: "Digital Learning Platform",
    services: [
      { name: "E-Learning Platform", description: "AI-powered personalized learning paths across 1000+ courses" },
      { name: "Corporate Training", description: "Custom enterprise learning solutions and skill development" },
      { name: "Certification Programs", description: "Industry-recognized certifications in technology, business, and more" },
      { name: "Live Virtual Classrooms", description: "Interactive sessions with expert instructors worldwide" },
    ],
    achievements: [
      "5 million+ active learners globally",
      "95% course completion rate",
      "Partnerships with 500+ universities",
      "EdTech Innovation Award 2023",
    ],
    stats: [
      { label: "Active Learners", value: "5M+" },
      { label: "Courses Available", value: "1,000+" },
      { label: "University Partners", value: "500+" },
      { label: "Countries Reached", value: "150+" },
    ],
    team: [
      { name: "Prof. David Kumar", position: "Chief Academic Officer" },
      { name: "Elena Petrova", position: "VP of Product Innovation" },
      { name: "Marcus Thompson", position: "Head of Corporate Training" },
      { name: "Yuki Nakamura", position: "Director of Content" },
    ],
    theme: {
      primary: "from-[var(--color-gold-200)] to-[var(--color-gold-100)]",
      bg: "bg-[var(--color-navy-900)]/30",
      bgSolid: "bg-[var(--color-navy-800)]/50",
      border: "border-[var(--color-gold-200)]/30",
      text: "text-[var(--color-gold-100)]",
      accent: "bg-[var(--color-gold-200)]",
      hover: "hover:bg-[var(--color-gold-200)]/10",
      gradient: "bg-gradient-to-br from-[var(--color-gold-200)]/20 to-[var(--color-gold-100)]/20"
    }
  },
  "7": {
    name: "Gourmet Ventures",
    tagline: "Culinary Excellence",
    description: "Gourmet Ventures brings together the finest culinary experiences under one distinguished brand. From Michelin-starred restaurants to innovative catering services, we celebrate the art of gastronomy with exceptional ingredients, masterful preparation, and unforgettable dining experiences that delight all the senses.",
    fullDescription: "Our portfolio of restaurants and hospitality services represents a passion for perfection. Each venue tells a unique story through food, ambiance, and service, creating memories that linger long after the last course is served.",
    coverage: "Major Cities",
    delivery: "Dine-In & Premium Catering",
    services: [
      { name: "Fine Dining Restaurants", description: "Award-winning establishments featuring world-renowned chefs" },
      { name: "Corporate Catering", description: "Bespoke culinary experiences for events and functions" },
      { name: "Hospitality Management", description: "Full-service management for hotels and venues" },
      { name: "Culinary Experiences", description: "Private chef services and cooking classes with master chefs" },
    ],
    achievements: [
      "5 Michelin stars across our restaurants",
      "Served 2 million+ guests annually",
      "Winner of Best Restaurant Group 2023",
      "30+ years of culinary excellence",
    ],
    stats: [
      { label: "Restaurant Locations", value: "25" },
      { label: "Michelin Stars", value: "5" },
      { label: "Annual Guests", value: "2M+" },
      { label: "Master Chefs", value: "50+" },
    ],
    team: [
      { name: "Chef Pierre Laurent", position: "Executive Culinary Director" },
      { name: "Maria Gonzalez", position: "VP of Operations" },
      { name: "Hiroshi Tanaka", position: "Head of Catering Services" },
      { name: "Sophie Beaumont", position: "Director of Hospitality" },
    ],
    theme: {
      primary: "from-[var(--color-gold-100)] to-[var(--color-gold-50)]",
      bg: "bg-[var(--color-navy-900)]/30",
      bgSolid: "bg-[var(--color-navy-800)]/50",
      border: "border-[var(--color-gold-100)]/30",
      text: "text-[var(--color-gold-50)]",
      accent: "bg-[var(--color-gold-100)]",
      hover: "hover:bg-[var(--color-gold-100)]/10",
      gradient: "bg-gradient-to-br from-[var(--color-gold-100)]/20 to-[var(--color-gold-50)]/20"
    }
  }
};

export default function BrandDetailPage() {
  const params = useParams();
  const brand = brandsData[params.id as keyof typeof brandsData];

  if (!brand) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Brand Not Found</h1>
          <p className="text-lg mb-8">The brand you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/brand">Back to All Brands</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${brand.theme.bg}`}>
      {/* Hero Section with Brand Colors */}
      <div className={`relative overflow-hidden ${brand.theme.gradient} border-b ${brand.theme.border}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <Button variant="ghost" asChild className={`mb-8 ${brand.theme.hover}`}>
            <Link href="/brand" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Brands
            </Link>
          </Button>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Logo & Info */}
              <div>
                <div className={`relative w-48 h-48 mx-auto lg:mx-0 rounded-2xl ${brand.theme.bgSolid} backdrop-blur-sm p-8 mb-8`}>
                  <Image 
                    src={`/brandLogo/brandLogo${params.id}.png`}
                    alt={brand.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>

              {/* Right: Brand Info */}
              <div>
                <p className={`text-sm font-semibold ${brand.theme.text} mb-2`}>{brand.tagline}</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{brand.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {brand.description}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {brand.fullDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-20 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brand.stats.map((stat, index) => (
              <Card key={index} className={`${brand.theme.border} ${brand.theme.bgSolid} backdrop-blur-sm text-center`}>
                <CardContent className="pt-6">
                  <div className={`text-3xl font-bold ${brand.theme.text} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Coverage & Delivery */}
              <Card className={`${brand.theme.border} ${brand.theme.bgSolid} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className={brand.theme.text} />
                    Service Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`${brand.theme.hover} rounded-lg p-4 border ${brand.theme.border}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full ${brand.theme.bg} flex items-center justify-center`}>
                          <MapPin className={`h-5 w-5 ${brand.theme.text}`} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Geographic Coverage</p>
                          <p className="font-semibold">{brand.coverage}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`${brand.theme.hover} rounded-lg p-4 border ${brand.theme.border}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full ${brand.theme.bg} flex items-center justify-center`}>
                          <Truck className={`h-5 w-5 ${brand.theme.text}`} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Service Delivery</p>
                          <p className="font-semibold">{brand.delivery}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className={`${brand.theme.border} ${brand.theme.bgSolid} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className={brand.theme.text} />
                    Our Services
                  </CardTitle>
                  <CardDescription>Comprehensive solutions tailored to your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {brand.services.map((service, index) => (
                      <div 
                        key={index} 
                        className={`${brand.theme.hover} rounded-lg p-4 border ${brand.theme.border} transition-all duration-300`}
                      >
                        <h4 className={`font-semibold mb-2 ${brand.theme.text}`}>{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className={`${brand.theme.border} ${brand.theme.bgSolid} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className={brand.theme.text} />
                    Key Achievements
                  </CardTitle>
                  <CardDescription>Milestones that define our excellence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {brand.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className={`h-5 w-5 mt-0.5 ${brand.theme.text} shrink-0`} />
                        <p className="text-sm">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-8">
              {/* Leadership Team */}
              <Card className={`${brand.theme.border} ${brand.theme.bgSolid} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className={brand.theme.text} />
                    Leadership Team
                  </CardTitle>
                  <CardDescription>Meet the minds behind our success</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {brand.team.map((member, index) => (
                      <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${brand.theme.hover} border ${brand.theme.border}`}>
                        <div className={`w-12 h-12 rounded-full ${brand.theme.bg} flex items-center justify-center shrink-0`}>
                          <span className={`${brand.theme.text} font-bold text-lg`}>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{member.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{member.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className={`${brand.theme.border} ${brand.theme.gradient} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className={brand.theme.text} />
                    Get in Touch
                  </CardTitle>
                  <CardDescription>Let&apos;s discuss how we can help you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium mb-1 text-sm">Email</p>
                    <p className="text-sm text-muted-foreground">
                      contact@{brand.name.toLowerCase().replace(/\s+/g, '')}.com
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-sm">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) {1000 + parseInt(params.id as string) * 111}-{String(parseInt(params.id as string) * 1234).slice(0, 4)}</p>
                  </div>
                  <Button className={`w-full bg-linear-to-r ${brand.theme.primary} text-white border-0 hover:opacity-90`}>
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className={`${brand.theme.border} ${brand.theme.bgSolid} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className={brand.theme.text} />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={`flex justify-between items-center p-3 rounded-lg ${brand.theme.hover}`}>
                    <span className="text-sm">Industry Rating</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${brand.theme.text} fill-current`} />
                      ))}
                    </div>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg ${brand.theme.hover}`}>
                    <span className="text-sm">Response Time</span>
                    <span className={`font-semibold ${brand.theme.text}`}>24hrs</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg ${brand.theme.hover}`}>
                    <span className="text-sm">Client Retention</span>
                    <span className={`font-semibold ${brand.theme.text}`}>95%+</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}