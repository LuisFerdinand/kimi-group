// app/(public)/about/page.tsx
"use client";

import PageHeader from "@/components/pages/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Users, Award, Sparkles, Globe, Heart, Lightbulb, Handshake, Eye, Compass } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const journeyItems = [
    { 
      year: "2012", 
      title: "KINY GROUP Didirikan", 
      description: "KINY GROUP didirikan dengan visi untuk memperkaya kehidupan melalui program pendidikan dan inisiatif budaya yang transformasional.",
      image: "/brandLogo/kinyGroup.png" 
    },
    { 
      year: "2013", 
      title: "Kiny Tours", 
      description: "Meluncurkan Kiny Tours dengan kerjasama eksklusif dengan Conseil International de la Danse.",
      image: "/brandLogo/kinyTours.png" 
    },
    { 
      year: "2014", 
      title: "Kiny Xplore", 
      description: "Mendirikan divisi Kiny Xplore yang didedikasikan untuk kemajuan olahraga skala internasional.",
      image: "/brandLogo/kinyXplore.png" 
    },
    { 
      year: "2015", 
      title: "Kiny Soul", 
      description: "Meluncurkan Kiny & Soul untuk menyediakan layanan perjalanan spiritual yang nyaman dan fleksibel.",
      image: "/brandLogo/kinySoul.png" 
    },
    { 
      year: "2021", 
      title: "Yuk Group", 
      description: "Mendirikan Yuk Group sebagai CSR perusahaan untuk mendukung UMKM.",
      image: "/brandLogo/yukGroup.png" 
    },
    { 
      year: "2022", 
      title: "CSR Sustainability GPB", 
      description: "Meluncurkan inisiatif keberlanjutan GPB sebagai bagian dari program CSR perusahaan.",
      image: "/brandLogo/gpb.png" 
    },
    { 
      year: "2023", 
      title: "Kiny Education", 
      description: "Meluncurkan Kiny Education & Training untuk menyediakan program pengembangan profesional.",
      image: "/brandLogo/kinyEducation.png" 
    },
    { 
      year: "2025", 
      title: "Kinergy Project", 
      description: "Mendirikan Kinergy Project untuk menyediakan layanan perencanaan dan manajemen acara yang mulus.",
      image: "/brandLogo/kinergy.png" 
    },
  ];

  const foundations = [
    {
      name: "Generasi Peduli Bumi",
      description: "Yayasan yang didedikasikan untuk mempromosikan kesadaran lingkungan dan pengelolaan sampah plastik yang efektif.",
      stats: "200+ relawan per acara"
    },
    {
      name: "Yuk Group",
      description: "Yayasan di bawah Kiny Group yang mendukung pertumbuhan UMKM (mikro, kecil, dan menengah).",
      stats: "6000+ UMKM berafiliasi"
    }
  ];

  const achievements = [
    "Sertifikasi Internasional diakui di lebih dari 170 negara",
    "Jaringan dengan sekolah di area JABODETABEK",
    "Bekerja dengan lebih dari 1500 siswa",
    "Program kolaboratif dengan pemerintah & UNESCO",
    "Bekerja sama dengan universitas terkemuka di seluruh dunia",
    "Koneksi yang kuat di sektor internasional",
    "Bekerja dengan passion dan komitmen untuk memuaskan pelanggan"
  ];

  const clientLogos = [
    { name: "UNESCO", logo: "/clientLogos/unesco.png" },
    { name: "Conseil International de la Danse", logo: "/clientLogos/cid.png" },
    { name: "Partner University 1", logo: "/clientLogos/university1.png" },
    { name: "Partner University 2", logo: "/clientLogos/university2.png" },
    { name: "Government Partner", logo: "/clientLogos/gov.png" },
    { name: "Sports Club 1", logo: "/clientLogos/sports1.png" },
    { name: "Sports Club 2", logo: "/clientLogos/sports2.png" },
    { name: "UMKM Partner", logo: "/clientLogos/umkm.png" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <PageHeader 
          title="Tentang KINY GROUP"
          description="Explore, learn, experience - Perjalanan, Visi, dan Komitmen kami dalam memberikan yang terbaik"
          emphasizedWord="Komitmen"
        />

        {/* Enhanced Vision & Mission Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision Card */}
            <Card className="border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10 group">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-primary-foreground shadow-lg">
                    <Eye className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl">Visi Kami</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  To enrich lives through transformative educational programs and cultural initiatives, empowering the next generation of diverse leaders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">
                    Memperkaya kehidupan melalui program pendidikan transformasional dan inisiatif budaya, memberdayakan generasi pemimpin yang beragam.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mission Card */}
            <Card className="border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10 group">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-primary-foreground shadow-lg">
                    <Compass className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl">Misi Kami</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Kiny Group is dedicated to enhancing global connections through our multifaceted services in education, cultural exchange, and community development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">
                    Meningkatkan koneksi global melalui layanan multifaset dalam pendidikan, pertukaran budaya, dan pengembangan komunitas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <Card className="mt-6 border-gold-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Nilai-Nilai Inti Kami</CardTitle>
              <CardDescription>Prinsip yang memandu setiap langkah kami</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border hover:border-gold-500/30 transition-colors">
                  <Globe className="h-8 w-8 text-gold-500 mb-3" />
                  <h4 className="font-semibold mb-2">Global Excellence</h4>
                  <p className="text-sm text-muted-foreground">Standar internasional dalam setiap layanan</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border hover:border-gold-500/30 transition-colors">
                  <Heart className="h-8 w-8 text-gold-500 mb-3" />
                  <h4 className="font-semibold mb-2">Passion & Care</h4>
                  <p className="text-sm text-muted-foreground">Dedikasi penuh untuk kepuasan klien</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border hover:border-gold-500/30 transition-colors">
                  <Lightbulb className="h-8 w-8 text-gold-500 mb-3" />
                  <h4 className="font-semibold mb-2">Innovation</h4>
                  <p className="text-sm text-muted-foreground">Terus berinovasi untuk masa depan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Journey Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Perjalanan Kami
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Dari tahun 2012 hingga sekarang, terus berkembang dan berinovasi
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-b from-gold-400 via-gold-500 to-transparent animate-pulse"></div>
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
                  <div className="w-1/2 px-8">
                    <Card className="border-gold-500/20 hover:border-gold-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-gold-500/20 hover:-translate-y-2 overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent z-10"></div>
                        <Image 
                          src={item.image} 
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 z-20">
                          <div className="bg-gold-500 text-primary-foreground px-4 py-2 rounded-full font-bold text-lg shadow-lg">
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

                  <div className="w-0 flex justify-center relative z-20">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-gold-500 shadow-lg shadow-gold-500/50 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-gold-400 animate-ping opacity-75"></div>
                      <div className="absolute inset-0 w-8 h-8 -m-2 rounded-full border-2 border-gold-400/30 group-hover:border-gold-400/60 transition-colors duration-500"></div>
                    </div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 opacity-30"></div>
            
            <div className="space-y-8 pl-12 pr-4">
              {journeyItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative group"
                  style={{
                    animation: `fadeInLeft 0.6s ease-out ${index * 0.15}s both`
                  }}
                >
                  <div className="absolute -left-7.5 top-6">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-gold-500 shadow-md shadow-gold-500/50 group-hover:scale-150 transition-transform duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-gold-400 animate-ping opacity-75"></div>
                    </div>
                  </div>

                  <Card className="border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 hover:shadow-md hover:shadow-gold-500/10 overflow-hidden">
                    <div className="absolute top-4 right-4 z-10 bg-gold-500 text-primary-foreground px-3 py-1 rounded-full font-bold text-sm shadow-md">
                      {item.year}
                    </div>

                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent z-10"></div>
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

        {/* Key Strengths & Achievements Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Keunggulan & Prestasi Kami
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Pencapaian yang membanggakan dalam perjalanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 hover:shadow-md hover:shadow-gold-500/10">
                <CheckCircle className="h-6 w-6 text-gold-500 shrink-0 mt-0.5" />
                <p className="text-sm">{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Clients Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Klien & Mitra Kami
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Kami bangga telah bermitra dengan organisasi-organisasi terkemuka dari berbagai sektor
            </p>
          </div>

          <Card className="border-gold-500/20 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {clientLogos.map((client, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-accent/50 transition-all duration-300 group">
                  <div className="relative w-24 h-24 mb-4">
                    <Image 
                      src={client.logo} 
                      alt={client.name}
                      fill
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-gold-400 transition-colors">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
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