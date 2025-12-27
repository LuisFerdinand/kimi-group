// app/(public)/contact/page.tsx
"use client";

import PageHeader from "@/components/pages/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Replace these with your EmailJS credentials
      const serviceId = 'service_d6ttodn';
      const templateId = 'template_pdvbihx';
      const publicKey = '1Hzn3cIba12k3xxg_';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_name: 'KINY GROUP Team',
        to_email: 'ferdinandluis88@gmail.com',
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setSubmitStatus({
        type: 'success',
        message: 'Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.'
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi kami melalui email/telepon.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Alamat Kantor",
      content: "Jl. Example Street No. 123, Jakarta Selatan, DKI Jakarta 12345",
      link: null
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telepon",
      content: "+62 21 1234 5678",
      link: "tel:+622112345678"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "info@kinygroup.com",
      link: "mailto:info@kinygroup.com"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Jam Operasional",
      content: "Senin - Jumat: 09:00 - 17:00 WIB",
      link: null
    }
  ];

  const socialMedia = [
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, link: "https://instagram.com/kinygroup" },
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, link: "https://facebook.com/kinygroup" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, link: "https://linkedin.com/company/kinygroup" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, link: "https://twitter.com/kinygroup" }
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <PageHeader 
          title="Hubungi Kami"
          description="Mari terhubung dengan kami - Kami siap membantu mewujudkan visi Anda"
          emphasizedWord="terhubung"
        />

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card 
              key={index} 
              className="border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10 group"
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {info.link ? (
                  <a 
                    href={info.link} 
                    className="text-muted-foreground hover:text-gold-500 transition-colors duration-200"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{info.content}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <Card className="border-gold-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-primary-foreground">
                  <MessageSquare className="h-5 w-5" />
                </div>
                Kirim Pesan
              </CardTitle>
              <CardDescription>
                Isi formulir di bawah ini dan kami akan segera menghubungi Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda"
                    required
                    className="border-gold-500/20 focus:border-gold-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    required
                    className="border-gold-500/20 focus:border-gold-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+62 812 3456 7890"
                    className="border-gold-500/20 focus:border-gold-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek *</Label>
                  <Input 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Topik pesan Anda"
                    required
                    className="border-gold-500/20 focus:border-gold-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan *</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan pesan Anda di sini..."
                    required
                    rows={5}
                    className="border-gold-500/20 focus:border-gold-500 resize-none"
                  />
                </div>

                {submitStatus.type && (
                  <div 
                    className={`flex items-center gap-3 p-4 rounded-lg border ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400' 
                        : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                    }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0" />
                    )}
                    <p className="text-sm">{submitStatus.message}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Map & Social Media */}
          <div className="space-y-8">
            {/* Map Section */}
            <Card className="border-gold-500/20 overflow-hidden">
              <CardHeader>
                <CardTitle>Lokasi Kami</CardTitle>
                <CardDescription>
                  Kunjungi kantor kami atau temukan lokasi kami di peta
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full h-[300px] lg:h-[400px] bg-muted">
                  <Image 
                    src="/images/office-map.png" 
                    alt="KINY GROUP Office Location Map"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to a sample map image if custom image fails
                      e.currentTarget.src = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop";
                    }}
                  />
                  {/* Optional: Add a link overlay to open in Google Maps */}
                  <a 
                    href="https://maps.google.com/?q=Your+Company+Address"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center group"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gold-500 text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg">
                      Buka di Google Maps
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-gold-500/20">
              <CardHeader>
                <CardTitle>Ikuti Kami</CardTitle>
                <CardDescription>
                  Tetap terhubung dengan kami di media sosial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg border border-gold-500/20 hover:border-gold-500/50 hover:bg-accent/50 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </div>
                      <span className="font-medium text-sm group-hover:text-gold-500 transition-colors">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-gold-600/5">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Siap Memulai Perjalanan Bersama Kami?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tim kami siap membantu Anda mewujudkan visi melalui program pendidikan, pertukaran budaya, dan layanan berkualitas tinggi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-primary-foreground"
                onClick={() => document.getElementById('name')?.focus()}
              >
                Hubungi Kami Sekarang
              </Button>
              <Button 
                variant="outline"
                className="border-gold-500/30 hover:bg-gold-500/10"
                onClick={() => window.location.href = '/about'}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}