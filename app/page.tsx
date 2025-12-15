// Path: app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Sparkles, Users, TrendingUp, Award, Globe, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Linear Overlay */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-linear-to-br from-navy-900 via-navy-800 to-navy-900 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900 light:from-gray-50 light:via-white light:to-gray-100">
          {/* Radial gradient overlays for both themes */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(184,134,11,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(184,134,11,0.15),transparent_50%)] light:bg-[radial-gradient(circle_at_30%_50%,rgba(184,134,11,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(184,134,11,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(184,134,11,0.12),transparent_50%)] light:bg-[radial-gradient(circle_at_70%_80%,rgba(184,134,11,0.06),transparent_50%)]" />
        </div>
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(184,134,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.03)_1px,transparent_1px)] bg-size-[64px_64px] dark:bg-[linear-gradient(rgba(184,134,11,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.04)_1px,transparent_1px)] light:bg-[linear-gradient(rgba(184,134,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.02)_1px,transparent_1px)]" />
        
        <div className="container relative mx-auto px-4 md:px-6 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Premium Business Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground/70">Welcome to</span>
              <br />
              <span className="bg-linear-to-r from-gold-400 via-gold-500 to-gold-600 dark:from-gold-300 dark:via-gold-400 dark:to-gold-500 bg-clip-text text-transparent">
                KINY GROUP
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Transforming industries through innovation, excellence, and unwavering commitment to quality across our diverse portfolio of brands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14 shadow-lg shadow-primary/20">
                <Link href="/brand">
                  Explore Our Brands 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="h-14 px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                <Link href="/about">Discover More</Link>
              </Button>
            </div>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center border-x border-primary/20">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Brands</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Modern Cards */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background" />
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Excellence in Every
              <span className="text-primary"> Aspect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine innovation, expertise, and dedication to deliver unparalleled value to our clients and partners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="group relative overflow-hidden border bg-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-3">Premium Quality</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Uncompromising standards in every service we deliver, ensuring excellence and satisfaction at every touchpoint.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 2 */}
            <Card className="group relative overflow-hidden border bg-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-3">Innovation First</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Pioneering solutions that push boundaries and set new industry standards through continuous innovation.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 3 */}
            <Card className="group relative overflow-hidden border bg-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-3">Expert Team</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Industry veterans with decades of combined experience, dedicated to your success and growth.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 4 */}
            <Card className="group relative overflow-hidden border bg-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-3">Global Reach</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  International presence with local expertise, serving clients across multiple continents and markets.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 5 */}
            <Card className="group relative overflow-hidden border bg-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-3">Trust & Security</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Robust security measures and transparent practices that build lasting trust with every partnership.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 6 */}
            <Card className="group relative overflow-hidden border bg-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-3">Premium Support</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  24/7 dedicated support team ready to assist you with personalized solutions and expert guidance.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Design */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background with Linear */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.2),transparent_70%)] light:bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.08),transparent_70%)]" />
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden border-primary/30 bg-card backdrop-blur-xl shadow-2xl shadow-primary/10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <CardHeader className="relative text-center p-12 md:p-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 mx-auto">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Get Started Today</span>
                </div>
                
                <CardTitle className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Ready to Transform Your
                  <span className="text-primary"> Business?</span>
                </CardTitle>
                
                <CardDescription className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join hundreds of successful clients who trust KINY GROUP to deliver exceptional results. Let&apos;s create something extraordinary together.
                </CardDescription>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14 shadow-lg shadow-primary/20">
                    <Link href="/contact">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="h-14 px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                    <Link href="/brand">View Our Portfolio</Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}