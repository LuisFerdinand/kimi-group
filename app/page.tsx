// Path: app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Sparkles, Users, TrendingUp, Award, Globe, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Gradient Overlay */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-linear-to-br from-navy-900 via-navy-800 to-navy-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(184,134,11,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(184,134,11,0.08),transparent_50%)]" />
        </div>
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(184,134,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" />
        
        <div className="container relative mx-auto px-4 md:px-6 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm mb-8">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-300">Premium Business Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Welcome to</span>
              <br />
              <span className="bg-linear-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                KINY GROUP
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Transforming industries through innovation, excellence, and unwavering commitment to quality across our diverse portfolio of brands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="group bg-gold-600 hover:bg-gold-700 text-navy-900 font-semibold px-8 h-14 shadow-lg shadow-gold-600/20">
                <Link href="/brand">
                  Explore Our Brands 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="h-14 px-8 border-gold-500/30 hover:bg-gold-500/10 hover:border-gold-500/50">
                <Link href="/about">Discover More</Link>
              </Button>
            </div>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center border-x border-gold-500/20">
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Brands</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Modern Cards */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-linear-to-b from-background via-navy-900/20 to-background" />
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
              <Award className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-300">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Excellence in Every
              <span className="text-gold-400"> Aspect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine innovation, expertise, and dedication to deliver unparalleled value to our clients and partners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="group relative overflow-hidden border-navy-700 bg-linear-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm hover:border-gold-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/10">
              <div className="absolute inset-0 bg-linear-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-7 w-7 text-gold-400" />
                </div>
                <CardTitle className="text-2xl mb-3">Premium Quality</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Uncompromising standards in every service we deliver, ensuring excellence and satisfaction at every touchpoint.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 2 */}
            <Card className="group relative overflow-hidden border-navy-700 bg-linear-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm hover:border-gold-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/10">
              <div className="absolute inset-0 bg-linear-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-7 w-7 text-gold-400" />
                </div>
                <CardTitle className="text-2xl mb-3">Innovation First</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Pioneering solutions that push boundaries and set new industry standards through continuous innovation.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 3 */}
            <Card className="group relative overflow-hidden border-navy-700 bg-linear-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm hover:border-gold-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/10">
              <div className="absolute inset-0 bg-linear-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-gold-400" />
                </div>
                <CardTitle className="text-2xl mb-3">Expert Team</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Industry veterans with decades of combined experience, dedicated to your success and growth.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 4 */}
            <Card className="group relative overflow-hidden border-navy-700 bg-linear-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm hover:border-gold-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/10">
              <div className="absolute inset-0 bg-linear-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="h-7 w-7 text-gold-400" />
                </div>
                <CardTitle className="text-2xl mb-3">Global Reach</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  International presence with local expertise, serving clients across multiple continents and markets.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 5 */}
            <Card className="group relative overflow-hidden border-navy-700 bg-linear-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm hover:border-gold-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/10">
              <div className="absolute inset-0 bg-linear-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-gold-400" />
                </div>
                <CardTitle className="text-2xl mb-3">Trust & Security</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Robust security measures and transparent practices that build lasting trust with every partnership.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 6 */}
            <Card className="group relative overflow-hidden border-navy-700 bg-linear-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm hover:border-gold-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/10">
              <div className="absolute inset-0 bg-linear-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-7 w-7 text-gold-400" />
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
        {/* Background with Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-gold-900/20 via-gold-800/10 to-navy-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.15),transparent_70%)]" />
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden border-gold-500/30 bg-linear-to-br from-navy-800/80 to-navy-900/80 backdrop-blur-xl shadow-2xl shadow-gold-500/10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <CardHeader className="relative text-center p-12 md:p-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-8 mx-auto">
                  <ArrowRight className="h-4 w-4 text-gold-400" />
                  <span className="text-sm font-medium text-gold-300">Get Started Today</span>
                </div>
                
                <CardTitle className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your
                  <span className="text-gold-400"> Business?</span>
                </CardTitle>
                
                <CardDescription className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join hundreds of successful clients who trust KINY GROUP to deliver exceptional results. Let&apos;s create something extraordinary together.
                </CardDescription>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="group bg-gold-600 hover:bg-gold-700 text-navy-900 font-semibold px-8 h-14 shadow-lg shadow-gold-600/20">
                    <Link href="/contact">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="h-14 px-8 border-gold-500/30 hover:bg-gold-500/10 hover:border-gold-500/50">
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