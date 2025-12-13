// Path: app/brand/[id]/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Truck, Building, CheckCircle, Globe, Users } from "lucide-react";
import Link from "next/link";

export default function BrandDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the brand based on the ID
  const brand = {
    id: params.id,
    name: "Tech Solutions",
    description: "Leading technology solutions provider for businesses of all sizes. We specialize in creating custom software solutions, providing IT consulting services, and implementing cloud infrastructure to help businesses thrive in the digital age.",
    coverage: "Nationwide",
    delivery: "Online & In-person",
    services: [
      { name: "Software Development", description: "Custom software solutions tailored to your business needs" },
      { name: "IT Consulting", description: "Expert advice on technology strategy and implementation" },
      { name: "Cloud Solutions", description: "Scalable cloud infrastructure and migration services" },
      { name: "Cybersecurity", description: "Comprehensive security solutions to protect your business" },
    ],
    achievements: [
      "Served over 500 clients nationwide",
      "95% client satisfaction rate",
      "Award-winning technology solutions",
      "24/7 customer support",
    ],
    team: [
      { name: "Alex Johnson", position: "CEO & Founder" },
      { name: "Sarah Williams", position: "CTO" },
      { name: "Michael Chen", position: "Lead Developer" },
      { name: "Emily Rodriguez", position: "Head of Consulting" },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/brand">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Brands
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-gold-900/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl">{brand.name}</CardTitle>
                    <CardDescription className="mt-4 text-base">{brand.description}</CardDescription>
                  </div>
                  <div className="w-20 h-20 rounded-lg bg-gold-900/20 flex items-center justify-center">
                    <Building className="h-10 w-10 text-gold-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gold-900/20 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-gold-400" />
                    </div>
                    <div>
                      <p className="font-medium">Coverage</p>
                      <p className="text-muted-foreground">{brand.coverage}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gold-900/20 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-gold-400" />
                    </div>
                    <div>
                      <p className="font-medium">Delivery Method</p>
                      <p className="text-muted-foreground">{brand.delivery}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Our Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {brand.services.map((service, index) => (
                    <Card key={index} className="border-gold-900/20 bg-card/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{service.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-4">Our Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {brand.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-gold-400" />
                      <p>{achievement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-gold-900/20 bg-card/50 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-gold-400" />
                  Our Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {brand.team.map((member, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gold-900/20 flex items-center justify-center">
                        <span className="text-gold-400 font-bold">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-900/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-gold-400" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p className="text-muted-foreground">contact@techsolutions.com</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Address</p>
                    <p className="text-muted-foreground">123 Tech Street, Silicon Valley, CA</p>
                  </div>
                  <Button className="w-full mt-4 bg-gold-600 hover:bg-gold-700">
                    Get in Touch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}