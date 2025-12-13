"use client";

// Path: app/brand/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Truck, Building } from "lucide-react";
import Link from "next/link";

export default function BrandPage() {
  const brands = [
    {
      id: 1,
      name: "Tech Solutions",
      description: "Leading technology solutions provider for businesses of all sizes.",
      coverage: "Nationwide",
      delivery: "Online & In-person",
      services: ["Software Development", "IT Consulting", "Cloud Solutions"],
    },
    {
      id: 2,
      name: "Global Logistics",
      description: "Efficient logistics and supply chain management services.",
      coverage: "International",
      delivery: "Door-to-door",
      services: ["Freight Forwarding", "Warehousing", "Customs Clearance"],
    },
    {
      id: 3,
      name: "Financial Services",
      description: "Comprehensive financial solutions for individuals and businesses.",
      coverage: "Major Cities",
      delivery: "In-person & Digital",
      services: ["Investment Planning", "Insurance", "Loans & Mortgages"],
    },
    {
      id: 4,
      name: "Healthcare Plus",
      description: "Quality healthcare services with a focus on patient well-being.",
      coverage: "Regional",
      delivery: "Clinics & Home",
      services: ["General Practice", "Specialist Consultations", "Home Care"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold-400">Our Brands</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the diverse portfolio of brands under KIMI GROUP
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brands.map((brand) => (
            <Card key={brand.id} className="border-gold-900/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{brand.name}</CardTitle>
                    <CardDescription className="mt-2">{brand.description}</CardDescription>
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-gold-900/20 flex items-center justify-center">
                    <Building className="h-8 w-8 text-gold-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-900/20 text-gold-400"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gold-400" />
                      <div>
                        <p className="text-sm font-medium">Coverage</p>
                        <p className="text-sm text-muted-foreground">{brand.coverage}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-gold-400" />
                      <div>
                        <p className="text-sm font-medium">Delivery</p>
                        <p className="text-sm text-muted-foreground">{brand.delivery}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full mt-4 bg-gold-600 hover:bg-gold-700">
                    <Link href={`/brand/${brand.id}`}>Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}