// app/(public)/brand/[id]/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Truck, CheckCircle, Globe, Users, ArrowLeft, Star, Award, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const divisionsData = {
  "kiny-cultura": {
    name: "Kiny Cultura Indonesia",
    tagline: "Cross-Cultural Understanding",
    description: "Promoting cross-cultural understanding through folk dance competitions, immersion schools, and leadership programs for children from elementary to junior high school.",
    fullDescription: "Kiny Cultura Indonesia is dedicated to fostering global citizenship through cultural exchange and education. Our programs provide children with unique opportunities to experience diverse cultures, develop leadership skills, and gain international perspectives that will shape their future.",
    coverage: "150+ Countries",
    delivery: "In-Person & Virtual Programs",
    services: [
      { name: "School Immersion Program", description: "Cultural exchange programs for students to experience different educational systems" },
      { name: "Cross Culture Program", description: "Interactive workshops celebrating diversity and global citizenship" },
      { name: "International Dance Competition", description: "Showcasing traditional and contemporary dance forms from around the world" },
      { name: "Leadership Program", description: "Developing young leaders with global perspectives and cultural awareness" },
    ],
    achievements: [
      "Certificates recognized in 150 countries from CID UNESCO",
      "Partnerships with 50+ schools across Indonesia",
      "Successfully engaged 1500+ students in cultural programs",
      "Collaborative programs with government and UNESCO",
    ],
    stats: [
      { label: "Countries Recognition", value: "150+" },
      { label: "Partner Schools", value: "50+" },
      { label: "Students Engaged", value: "1500+" },
      { label: "Festivals Worldwide", value: "100+" },
    ],
    team: [
      { name: "Dr. Anisa Rahman", position: "Director of Cultural Programs" },
      { name: "Budi Santoso", position: "Head of Educational Partnerships" },
      { name: "Sarah Wijaya", position: "International Relations Coordinator" },
      { name: "Ahmad Fadli", position: "Program Development Manager" },
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
  "kiny-education": {
    name: "Kiny Education & Training",
    tagline: "Professional Development",
    description: "Providing development programs for university students and executives in collaboration with leading universities, offering internationally recognized certifications.",
    fullDescription: "Kiny Education & Training bridges the gap between academic knowledge and industry requirements. Our comprehensive programs are designed in collaboration with top universities worldwide, ensuring that participants gain both theoretical understanding and practical skills that are immediately applicable in their professional careers.",
    coverage: "Global Network",
    delivery: "In-Person, Online & Blended Learning",
    services: [
      { name: "Professional Development Courses", description: "Specialized courses in administration, finance, policy, and more" },
      { name: "Workshops and Seminars", description: "Interactive sessions on governance issues and technological advancements" },
      { name: "Certifications and Diplomas", description: "Accredited programs providing recognized credentials" },
      { name: "Executive Training", description: "Tailored programs for organizational leadership and management" },
    ],
    achievements: [
      "Partnerships with 30+ leading universities globally",
      "5000+ professionals trained and certified",
      "Custom programs for 100+ corporate clients",
      "98% satisfaction rate from program participants",
    ],
    stats: [
      { label: "University Partners", value: "30+" },
      { label: "Programs Offered", value: "50+" },
      { label: "Professionals Trained", value: "5000+" },
      { label: "Certifications", value: "25+" },
    ],
    team: [
      { name: "Prof. Dr. Siti Nurhaliza", position: "Academic Director" },
      { name: "Michael Chen", position: "Head of Corporate Training" },
      { name: "Dr. Rizki Ahmad", position: "Program Development Lead" },
      { name: "Lisa Permata", position: "International Partnerships Manager" },
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
  "kiny-tours": {
    name: "Kiny Tours & Travel",
    tagline: "Personalized Travel Experiences",
    description: "Offering personalized private tour experiences that enrich travelers' understanding of diverse cultures across 7 continents.",
    fullDescription: "Kiny Tours & Travel transforms ordinary trips into extraordinary journeys of discovery. Our personalized approach ensures that each travel experience is tailored to the individual's interests, providing not just sightseeing but deep cultural immersion and meaningful connections with local communities.",
    coverage: "167 Countries",
    delivery: "Private Tours & Custom Itineraries",
    services: [
      { name: "MICE Services", description: "Meetings, Incentives, Conferences, and Exhibitions planning" },
      { name: "Tailormade Private Tours", description: "Personalized itineraries designed around your interests" },
      { name: "Hotel & Flight Bookings", description: "Premium accommodation and transportation arrangements" },
      { name: "Cultural Immersion Experiences", description: "Authentic local experiences guided by certified experts" },
    ],
    achievements: [
      "150+ English-speaking drivers across 167 countries",
      "Network spanning 7 continents with restaurants, hotels, and venues",
      "Partnerships with 30+ schools and establishments in Jakarta",
      "Exclusive cooperation with Conseil International de la Danse",
    ],
    stats: [
      { label: "Countries Covered", value: "167" },
      { label: "English-Speaking Guides", value: "150+" },
      { label: "Partner Establishments", value: "30+" },
      { label: "Continents Served", value: "7" },
    ],
    team: [
      { name: "Andi Pratama", position: "CEO & Founder" },
      { name: "Diana Kusuma", position: "Head of International Operations" },
      { name: "Raj Patel", position: "Director of Custom Tours" },
      { name: "Maria Santos", position: "Client Relations Manager" },
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
  "kinergy-project": {
    name: "Kinergy Project",
    tagline: "Dream Beyond Limit",
    description: "Delivering seamless event planning and management services that celebrate creativity and collaboration with bold execution and cultural resonance.",
    fullDescription: "Kinergy Project is the creative powerhouse that transforms imagination into action. We specialize in creating high-impact experiences that connect communities, brands, and ideas through bold execution and cultural resonance. From international events to global branding campaigns, we make dreams a reality.",
    coverage: "Nationwide & International",
    delivery: "Full-Service Event Management",
    services: [
      { name: "MICE Events", description: "Comprehensive management of Meetings, Incentives, Conferences, and Exhibitions" },
      { name: "International Events", description: "Cross-cultural events that celebrate diversity and global connections" },
      { name: "Global Branding", description: "Creative campaigns that elevate brand presence across markets" },
      { name: "Creative Collaborations", description: "Partnerships that bring innovative ideas to life" },
    ],
    achievements: [
      "200+ events organized with environmental sustainability practices",
      "Successfully managed events with 200+ volunteers per event",
      "Synergized with 6000+ UMKM (micro, small, and medium enterprises)",
      "Implemented eco-friendly practices and waste management at all events",
    ],
    stats: [
      { label: "Events Organized", value: "200+" },
      { label: "Volunteers per Event", value: "200+" },
      { label: "UMKM Partners", value: "6000+" },
      { label: "Countries Reached", value: "25+" },
    ],
    team: [
      { name: "Rizky Hakim", position: "Creative Director" },
      { name: "Nina Widodo", position: "Head of Event Operations" },
      { name: "David Tanaka", position: "Brand Strategy Lead" },
      { name: "Siti Aminah", position: "Sustainability Coordinator" },
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
  "kiny-soul": {
    name: "Kiny & Soul",
    tagline: "Spiritual Journeys",
    description: "Providing comfortable, flexible, and private services for Umrah and spiritual journeys with personalized itineraries that honor your spiritual path.",
    fullDescription: "Kiny & Soul understands that spiritual journeys are deeply personal and should not be constrained by rigid schedules. Our private Umrah services are designed around your spiritual readiness, not fixed tour dates. We believe that 'JADWALNYA ALLAH, BUKAN TRAVEL AGENT' - your journey begins when your heart is called.",
    coverage: "Sacred Destinations",
    delivery: "Private Spiritual Journeys",
    services: [
      { name: "Private Umrah Trips", description: "Individually tailored journeys not bound by fixed group departures" },
      { name: "Flexible Departure Dates", description: "Travel when you're spiritually ready, not on a rigid schedule" },
      { name: "Personalized Itineraries", description: "Custom spiritual journeys that honor your unique path" },
      { name: "Premium Assistance", description: "Comprehensive support from pre-departure to destination" },
    ],
    achievements: [
      "500+ personalized spiritual journeys completed",
      "98% client satisfaction rate",
      "Recognized for exceptional spiritual guidance services",
      "Pioneered flexible departure model for spiritual travel",
    ],
    stats: [
      { label: "Journeys Completed", value: "500+" },
      { label: "Sacred Destinations", value: "15+" },
      { label: "Spiritual Guides", value: "50+" },
      { label: "Client Satisfaction", value: "98%" },
    ],
    team: [
      { name: "Ustadz Ahmad Yani", position: "Spiritual Director" },
      { name: "Fatimah Abdullah", position: "Head of Pilgrim Services" },
      { name: "Ibrahim Hassan", position: "Destination Specialist" },
      { name: "Aisha Rahman", position: "Client Care Coordinator" },
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
  "kiny-xplore": {
    name: "Kiny Xplore",
    tagline: "International Sports Development",
    description: "A division dedicated to the advancement of sports on an international scale, addressing both international competitions and skill development training programs.",
    fullDescription: "Kiny Xplore is committed to elevating sports performance and creating opportunities for athletes to compete on the global stage. We facilitate international competitions, provide world-class training programs, and create networking opportunities that connect athletes with coaches, teams, and sports organizations worldwide.",
    coverage: "International",
    delivery: "Training & Competition Management",
    services: [
      { name: "International Competitions", description: "Facilitating participation in global sports events" },
      { name: "Skill Enhancement Training", description: "Specialized programs to improve athletic performance" },
      { name: "Sports Workshops", description: "Interactive sessions with expert coaches and athletes" },
      { name: "Cross-Cultural Sports Exchange", description: "Programs that connect athletes across borders" },
    ],
    achievements: [
      "Facilitated 50+ international competitions",
      "Partnerships with 50+ sports clubs worldwide",
      "Trained 1000+ athletes for international events",
      "Organized workshops with world-class coaches",
    ],
    stats: [
      { label: "Competitions", value: "50+" },
      { label: "Partner Clubs", value: "50+" },
      { label: "Athletes Trained", value: "1000+" },
      { label: "Countries Reached", value: "30+" },
    ],
    team: [
      { name: "Ricky Subagja", position: "Director of Sports Development" },
      { name: "Maria Sharapova", position: "Head of International Relations" },
      { name: "John Smith", position: "Training Program Coordinator" },
      { name: "Siti Nurjanah", position: "Athlete Development Manager" },
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
  }
};

export default function DivisionDetailPage() {
  const params = useParams();
  const division = divisionsData[params.id as keyof typeof divisionsData];

  if (!division) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Division Not Found</h1>
          <p className="text-lg mb-8">The division you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/brand">Back to All Divisions</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${division.theme.bg}`}>
      {/* Hero Section with Division Colors */}
      <div className={`relative overflow-hidden ${division.theme.gradient} border-b ${division.theme.border}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <Button variant="ghost" asChild className={`mb-8 ${division.theme.hover}`}>
            <Link href="/brand" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Divisions
            </Link>
          </Button>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Logo & Info */}
              <div>
                <div className={`relative w-48 h-48 mx-auto lg:mx-0 rounded-2xl ${division.theme.bgSolid} backdrop-blur-sm p-8 mb-8`}>
                  <Image 
                    src={`/brandLogo/${params.id}.png`}
                    alt={division.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>

              {/* Right: Division Info */}
              <div>
                <p className={`text-sm font-semibold ${division.theme.text} mb-2`}>{division.tagline}</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{division.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {division.description}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {division.fullDescription}
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
            {division.stats.map((stat, index) => (
              <Card key={index} className={`${division.theme.border} ${division.theme.bgSolid} backdrop-blur-sm text-center`}>
                <CardContent className="pt-6">
                  <div className={`text-3xl font-bold ${division.theme.text} mb-1`}>{stat.value}</div>
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
              <Card className={`${division.theme.border} ${division.theme.bgSolid} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className={division.theme.text} />
                    Service Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`${division.theme.hover} rounded-lg p-4 border ${division.theme.border}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full ${division.theme.bg} flex items-center justify-center`}>
                          <MapPin className={`h-5 w-5 ${division.theme.text}`} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Geographic Coverage</p>
                          <p className="font-semibold">{division.coverage}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`${division.theme.hover} rounded-lg p-4 border ${division.theme.border}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full ${division.theme.bg} flex items-center justify-center`}>
                          <Truck className={`h-5 w-5 ${division.theme.text}`} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Service Delivery</p>
                          <p className="font-semibold">{division.delivery}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className={`${division.theme.border} ${division.theme.bgSolid} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className={division.theme.text} />
                    Our Services
                  </CardTitle>
                  <CardDescription>Comprehensive solutions tailored to your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {division.services.map((service, index) => (
                      <div 
                        key={index} 
                        className={`${division.theme.hover} rounded-lg p-4 border ${division.theme.border} transition-all duration-300`}
                      >
                        <h4 className={`font-semibold mb-2 ${division.theme.text}`}>{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className={`${division.theme.border} ${division.theme.bgSolid} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className={division.theme.text} />
                    Key Achievements
                  </CardTitle>
                  <CardDescription>Milestones that define our excellence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {division.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className={`h-5 w-5 mt-0.5 ${division.theme.text} shrink-0`} />
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
              <Card className={`${division.theme.border} ${division.theme.bgSolid} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className={division.theme.text} />
                    Leadership Team
                  </CardTitle>
                  <CardDescription>Meet the minds behind our success</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {division.team.map((member, index) => (
                      <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${division.theme.hover} border ${division.theme.border}`}>
                        <div className={`w-12 h-12 rounded-full ${division.theme.bg} flex items-center justify-center shrink-0`}>
                          <span className={`${division.theme.text} font-bold text-lg`}>
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
              <Card className={`${division.theme.border} ${division.theme.gradient} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className={division.theme.text} />
                    Get in Touch
                  </CardTitle>
                  <CardDescription>Let&apos;s discuss how we can help you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium mb-1 text-sm">Email</p>
                    <p className="text-sm text-muted-foreground">
                      info@{division.name.toLowerCase().replace(/\s+/g, '')}.kinygroup.org
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-sm">Phone</p>
                    <p className="text-sm text-muted-foreground">+62 21 83787735</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-sm">Address</p>
                    <p className="text-sm text-muted-foreground">Jl. Tebet Timur Dalam II No.38B, Tebet, Jakarta Selatan 12820</p>
                  </div>
                  <Button className={`w-full bg-linear-to-r ${division.theme.primary} text-white border-0 hover:opacity-90`}>
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className={`${division.theme.border} ${division.theme.bgSolid} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className={division.theme.text} />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={`flex justify-between items-center p-3 rounded-lg ${division.theme.hover}`}>
                    <span className="text-sm">Industry Rating</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${division.theme.text} fill-current`} />
                      ))}
                    </div>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg ${division.theme.hover}`}>
                    <span className="text-sm">Response Time</span>
                    <span className={`font-semibold ${division.theme.text}`}>24hrs</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg ${division.theme.hover}`}>
                    <span className="text-sm">Client Retention</span>
                    <span className={`font-semibold ${division.theme.text}`}>95%+</span>
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