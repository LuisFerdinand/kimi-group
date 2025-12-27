/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(public)/brand/[id]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Truck, CheckCircle, ArrowLeft, Star, Award, TrendingUp, Mail, Phone, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { brandsAPI } from "@/lib/api/client/brands";
import { BrandDivision } from "@/lib/db/schema";
import { useState, useEffect } from "react";

export default function DivisionDetailPage() {
  const params = useParams();
  const [division, setDivision] = useState<BrandDivision & { images: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDivision = async () => {
      try {
        setError(null);
        const idParam = params.id as string;
        
        // Try to get by ID first, then by slug if that fails
        let data;
        try {
          // Check if the ID is a number
          const idNum = parseInt(idParam);
          if (!isNaN(idNum)) {
            data = await brandsAPI.getById(idNum);
          } else {
            throw new Error("Not a number");
          }
        } catch (error) {
          // If ID lookup fails, try slug lookup
          data = await brandsAPI.getBySlug(idParam);
        }
        setDivision(data);
      } catch (error) {
        console.error("Error fetching division:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch division");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDivision();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-lg">Loading division details...</p>
        </div>
      </div>
    );
  }

  if (error || !division) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Division Not Found</h1>
          <p className="text-lg mb-8">{error || "The division you're looking for doesn't exist."}</p>
          <Button asChild>
            <Link href="/brand">Back to All Divisions</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Rest of the component remains the same...
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[85vh] min-h-150">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${division.backgroundImage})` }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-50"
          style={{ backgroundColor: division.color || "#3b82f6" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col container mx-auto px-6 lg:px-12">
          <div className="pt-8">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 backdrop-blur-sm">
              <Link href="/brand" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Divisions
              </Link>
            </Button>
          </div>

          <div className="flex-1 flex items-end pb-20">
            <div className="max-w-5xl">
              <p className={`text-sm font-bold tracking-[0.3em] uppercase mb-6 ${division.theme?.text || 'text-blue-700'}`}>
                {division.tagline}
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-white">
                {division.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-6 max-w-3xl font-light">
                {division.description}
              </p>
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
                {division.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { label: division.stats?.label1 || "", value: division.stats?.value1 || "" },
              { label: division.stats?.label2 || "", value: division.stats?.value2 || "" },
              { label: division.stats?.label3 || "", value: division.stats?.value3 || "" },
              { label: division.stats?.label4 || "", value: division.stats?.value4 || "" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r ${division.theme?.primary || 'from-blue-500 to-blue-600'} bg-clip-text text-transparent mb-3`}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage & Delivery */}
      <section className="py-20 border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-full bg-linear-to-br ${division.theme?.primary || 'from-blue-500 to-blue-600'} flex items-center justify-center`}>
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Geographic Coverage
                    </p>
                    <p className="text-2xl md:text-3xl font-bold">{division.coverage}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our extensive network spans across continents, ensuring we can deliver exceptional service wherever you need us.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-full bg-linear-to-br ${division.theme?.primary || 'from-blue-500 to-blue-600'} flex items-center justify-center`}>
                    <Truck className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Service Delivery
                    </p>
                    <p className="text-2xl md:text-3xl font-bold">{division.delivery}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We offer flexible delivery options tailored to your preferences, combining modern technology with personal touch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className={`text-sm font-bold tracking-[0.3em] uppercase mb-4 ${division.theme?.text || 'text-blue-700'}`}>
                What We Offer
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Comprehensive solutions designed to meet your unique needs with excellence and precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {division.services?.map((service, index) => (
                <div key={index} className="group">
                  <div className="flex items-start gap-6 py-8 border-t border-border/50">
                    <div className={`w-12 h-12 rounded-full ${division.theme?.bg || 'bg-blue-100'} flex items-center justify-center shrink-0 mt-1`}>
                      <div className={`w-3 h-3 rounded-full ${division.theme?.accent || 'bg-blue-500'}`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-3">{service.name}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className={`text-sm font-bold tracking-[0.3em] uppercase mb-4 ${division.theme?.text || 'text-blue-700'}`}>
                  Our Impact
                </p>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Key Achievements</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Milestones that demonstrate our commitment to excellence and innovation in everything we do.
                </p>
              </div>

              <div className="space-y-6">
                {division.achievements?.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className={`w-8 h-8 rounded-full ${division.theme?.bg || 'bg-blue-100'} flex items-center justify-center shrink-0 mt-1`}>
                      <CheckCircle className={`h-4 w-4 ${division.theme?.text || 'text-blue-700'}`} />
                    </div>
                    <p className="text-base md:text-lg leading-relaxed pt-1">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <p className={`text-sm font-bold tracking-[0.3em] uppercase mb-4 ${division.theme?.text || 'text-blue-700'}`}>
                Meet Our Team
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Leadership</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experienced professionals dedicated to driving our mission forward with vision and expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {division.team?.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-32 h-32 rounded-full bg-linear-to-br ${division.theme?.primary || 'from-blue-500 to-blue-600'} flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                    <span className="text-white font-bold text-3xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-20 border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex items-center justify-between py-6 border-b-2 border-border/50">
                <div className="flex items-center gap-3">
                  <Star className={`h-6 w-6 ${division.theme?.text || 'text-blue-700'}`} />
                  <span className="font-semibold text-lg">Industry Rating</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${division.theme?.text || 'text-blue-700'} fill-current`} />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-6 border-b-2 border-border/50">
                <div className="flex items-center gap-3">
                  <TrendingUp className={`h-6 w-6 ${division.theme?.text || 'text-blue-700'}`} />
                  <span className="font-semibold text-lg">Response Time</span>
                </div>
                <span className={`font-bold text-2xl ${division.theme?.text || 'text-blue-700'}`}>24hrs</span>
              </div>

              <div className="flex items-center justify-between py-6 border-b-2 border-border/50">
                <div className="flex items-center gap-3">
                  <Award className={`h-6 w-6 ${division.theme?.text || 'text-blue-700'}`} />
                  <span className="font-semibold text-lg">Client Retention</span>
                </div>
                <span className={`font-bold text-2xl ${division.theme?.text || 'text-blue-700'}`}>95%+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className={`text-sm font-bold tracking-[0.3em] uppercase mb-4 ${division.theme?.text || 'text-blue-700'}`}>
                  Let&apos;s Connect
                </p>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                  Ready to start your journey with us? Our team is here to answer your questions and help you get started.
                </p>

                <Button 
                  className={`bg-linear-to-r ${division.theme?.primary || 'from-blue-500 to-blue-600'} text-white px-8 py-6 text-lg border-0 hover:opacity-90 shadow-xl`}
                >
                  Schedule Consultation
                </Button>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4 py-6 border-b border-border/50">
                  <Mail className={`h-6 w-6 ${division.theme?.text || 'text-blue-700'} mt-1 shrink-0`} />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Email
                    </p>
                    <p className="text-lg font-medium">
                      info@{division.name.toLowerCase().replace(/\s+/g, '')}.kinygroup.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-6 border-b border-border/50">
                  <Phone className={`h-6 w-6 ${division.theme?.text || 'text-blue-700'} mt-1 shrink-0`} />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Phone
                    </p>
                    <p className="text-lg font-medium">+62 21 83787735</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-6 border-b border-border/50">
                  <MapPinIcon className={`h-6 w-6 ${division.theme?.text || 'text-blue-700'} mt-1 shrink-0`} />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Address
                    </p>
                    <p className="text-lg font-medium leading-relaxed">
                      Jl. Tebet Timur Dalam II No.38B, Tebet,<br />
                      Jakarta Selatan 12820
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}