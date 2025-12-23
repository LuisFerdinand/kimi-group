"use client";

import PageHeader from "@/components/pages/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Users, Award, Sparkles, Globe, Heart, Lightbulb, Handshake } from "lucide-react";
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

  // const divisions = [
  //   {
  //     name: "Kiny Cultura Indonesia",
  //     description: "Mempromosikan pemahaman lintas budaya melalui kompetisi folk dance, sekolah imersi, dan program kepemimpinan.",
  //     icon: <Globe className="h-8 w-8" />,
  //     color: "from-[var(--color-gold-500)] to-[var(--color-gold-400)]"
  //   },
  //   {
  //     name: "Kiny Education & Training",
  //     description: "Menyediakan program pengembangan untuk mahasiswa dan eksekutif dengan sertifikasi internasional.",
  //     icon: <Lightbulb className="h-8 w-8" />,
  //     color: "from-[var(--color-gold-600)] to-[var(--color-gold-500)]"
  //   },
  //   {
  //     name: "Kiny Tours & Travel",
  //     description: "Menawarkan pengalaman tur privat yang dipersonalisasi untuk memperkaya pemahaman wisatawan tentang budaya yang beragam.",
  //     icon: <Target className="h-8 w-8" />,
  //     color: "from-[var(--color-gold-700)] to-[var(--color-gold-600)]"
  //   },
  //   {
  //     name: "Kinergy Project",
  //     description: "Menyediakan layanan perencanaan dan manajemen acara yang merayakan kreativitas dan kolaborasi.",
  //     icon: <Sparkles className="h-8 w-8" />,
  //     color: "from-[var(--color-gold-400)] to-[var(--color-gold-300)]"
  //   },
  //   {
  //     name: "Kiny & Soul",
  //     description: "Menyediakan layanan yang nyaman, fleksibel, dan privat untuk perjalanan Umrah dan spiritual.",
  //     icon: <Heart className="h-8 w-8" />,
  //     color: "from-[var(--color-gold-300)] to-[var(--color-gold-200)]"
  //   },
  //   {
  //     name: "Kiny Xplore",
  //     description: "Divisi yang didedikasikan untuk kemajuan olahraga skala internasional.",
  //     icon: <Award className="h-8 w-8" />,
  //     color: "from-[var(--color-gold-200)] to-[var(--color-gold-100)]"
  //   }
  // ];

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

  // Client logos - replace with actual client logos
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

        {/* Vision & Mission Section */}
        <Card className="border-gold-500/20 bg-card/50 backdrop-blur-sm mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-4">Visi & Misi Kami</CardTitle>
            <div className="gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--color-gold-500)]">Visi</h3>
                <CardDescription className="text-base">
                  To enrich lives through transformative educational programs and cultural initiatives, empowering the next generation of diverse leaders.
                </CardDescription>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3 text-[var(--color-gold-500)]">Misi</h3>
                <CardDescription className="text-base">
                  &quot;Kiny Group is dedicated to enhancing global connections through our multifaceted services&quot;
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Our Divisions Section */}
        {/* <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-(--color-gold-400) via-(--color-gold-500) to-(--color-gold-600) bg-clip-text text-transparent">
              Divisi Kami
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Enam divisi luar biasa, satu komitmen untuk keunggulan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.map((division, index) => (
              <Card key={index} className="border-[var(--color-gold-500)]/20 bg-[var(--card)]/50 backdrop-blur-sm hover:border-[var(--color-gold-500)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-gold-500)]/10 hover:-translate-y-1">
                <CardHeader className="text-center pb-3">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-linear-to-r ${division.color} flex items-center justify-center text-white mb-4`}>
                    {division.icon}
                  </div>
                  <CardTitle className="text-xl">{division.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {division.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Enhanced Journey Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-(--color-gold-400) via-(--color-gold-500) to-(--color-gold-600) bg-clip-text text-transparent">
              Perjalanan Kami
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Dari tahun 2012 hingga sekarang, terus berkembang dan berinovasi
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Animated linear line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-[var(--color-gold-400)] via-[var(--color-gold-500)] to-[var(--color-gold-600)] opacity-30">
              <div className="absolute inset-0 bg-linear-to-b from-[var(--color-gold-400)] via-[var(--color-gold-500)] to-transparent animate-pulse"></div>
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
                  {/* Content side */}
                  <div className="w-1/2 px-8">
                    <Card className="border-[var(--color-gold-500)]/20 bg-[var(--card)]/80 backdrop-blur-sm overflow-hidden hover:border-[var(--color-gold-500)]/50 transition-all duration-500 hover:shadow-lg hover:shadow-[var(--color-gold-500)]/20 hover:-translate-y-2">
                      {/* Image with overlay */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-t from-[var(--card)] via-[var(--card)]/50 to-transparent z-10"></div>
                        <Image 
                          src={item.image} 
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700"
                        />
                        {/* Floating year badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className="bg-[var(--color-gold-500)] text-[var(--color-navy-900)] px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                            {item.year}
                          </div>
                        </div>
                      </div>
                      
                      <CardHeader className="space-y-3">
                        <CardTitle className="text-xl group-hover:text-[var(--color-gold-400)] transition-colors duration-300">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Center dot with pulse animation */}
                  <div className="w-0 flex justify-center relative z-20">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-[var(--color-gold-500)] shadow-lg shadow-[var(--color-gold-500)]/50 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-[var(--color-gold-400)] animate-ping opacity-75"></div>
                      <div className="absolute inset-0 w-8 h-8 -m-2 rounded-full border-2 border-[var(--color-gold-400)]/30 group-hover:border-[var(--color-gold-400)]/60 transition-colors duration-500"></div>
                    </div>
                  </div>

                  {/* Empty space for layout */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-[var(--color-gold-400)] via-[var(--color-gold-500)] to-[var(--color-gold-600)] opacity-30"></div>
            
            <div className="space-y-8 pl-12 pr-4">
              {journeyItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative group"
                  style={{
                    animation: `fadeInLeft 0.6s ease-out ${index * 0.15}s both`
                  }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-7.5 top-6">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-[var(--color-gold-500)] shadow-md shadow-[var(--color-gold-500)]/50 group-hover:scale-150 transition-transform duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--color-gold-400)] animate-ping opacity-75"></div>
                    </div>
                  </div>

                  <Card className="border-[var(--color-gold-500)]/20 bg-[var(--card)]/80 backdrop-blur-sm overflow-hidden hover:border-[var(--color-gold-500)]/50 transition-all duration-300 hover:shadow-md hover:shadow-[var(--color-gold-500)]/10">
                    {/* Year badge */}
                    <div className="absolute top-4 right-4 z-10 bg-[var(--color-gold-500)] text-[var(--color-navy-900)] px-3 py-1 rounded-full font-bold text-sm shadow-md">
                      {item.year}
                    </div>

                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-t from-[var(--card)] via-[var(--card)]/30 to-transparent z-10"></div>
                      <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-lg group-hover:text-[var(--color-gold-400)] transition-colors duration-300">
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
            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-(--color-gold-400) via-(--color-gold-500) to-(--color-gold-600) bg-clip-text text-transparent">
              Keunggulan & Prestasi Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg border-[var(--color-gold-500)]/20 bg-[var(--card)]/50 backdrop-blur-sm hover:border-[var(--color-gold-500)]/50 transition-all duration-300">
                <CheckCircle className="h-6 w-6 text-[var(--color-gold-500)] shrink-0 mt-0.5" />
                <p className="text-sm">{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Foundations Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-(--color-gold-400) via-(--color-gold-500) to-(--color-gold-600) bg-clip-text text-transparent">
              Yayasan Kami
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Berkomitmen pada keberlanjutan lingkungan dan pemberdayaan UMKM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {foundations.map((foundation, index) => (
              <Card key={index} className="border-[var(--color-gold-500)]/20 bg-[var(--card)]/50 backdrop-blur-sm hover:border-[var(--color-gold-500)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-gold-500)]/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-[var(--color-gold-500)] to-[var(--color-gold-400)] flex items-center justify-center text-white">
                      <Handshake className="h-6 w-6" />
                    </div>
                    {foundation.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {foundation.description}
                  </CardDescription>
                  <div className="text-sm font-semibold text-[var(--color-gold-500)]">
                    {foundation.stats}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Clients Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[var(--color-gold-400)] via-[var(--color-gold-500)] to-[var(--color-gold-600)] bg-clip-text text-transparent">
              Klien Kami
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Kami bangga telah bermitra dengan organisasi-organisasi terkemuka dari berbagai sektor
            </p>
          </div>

          <Card className="border-[var(--color-gold-500)]/20 bg-[var(--card)]/50 backdrop-blur-sm p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {clientLogos.map((client, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-[var(--color-gold-500)]/5 transition-all duration-300 group">
                  <div className="relative w-24 h-24 mb-4">
                    <Image 
                      src={client.logo} 
                      alt={client.name}
                      fill
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-[var(--color-gold-400)] transition-colors">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-(--color-gold-400) via-(--color-gold-500) to-(--color-gold-600) bg-clip-text text-transparent">
              Hubungi Kami
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              CONNECTING MINDS, FOSTERING IDEAS – LET&apos;S COLLABORATE
            </p>
          </div>

          <Card className="border-[var(--color-gold-500)]/20 bg-[var(--card)]/50 backdrop-blur-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="font-semibold mb-2 text-[var(--color-gold-500)]">Telepon</h3>
                <p className="text-sm">+6221 837877 35 / 36</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-[var(--color-gold-500)]">Email</h3>
                <p className="text-sm">info@kcifoundation.org</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-[var(--color-gold-500)]">Alamat</h3>
                <p className="text-sm">Jl. Tebet Timur Dalam II No.38B, Tebet, Jakarta Selatan 12820</p>
              </div>
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