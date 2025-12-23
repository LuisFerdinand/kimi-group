import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t bg-card overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-linear-to-br from-gold-500/5 via-transparent to-primary/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl" />
      
      {/* Container with max-width */}
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center group">
              <div className="relative w-32 h-12">
                <Image
                  src="/kiny-logo/gold.png"
                  alt="KINY GROUP Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Mentransformasikan industri melalui inovasi, keunggulan, dan komitmen tak kenal lelah terhadap kualitas di seluruh portofolio kami yang beragam.
            </p>
            <div className="flex space-x-3">
              <Link 
                href="#" 
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 border border-border hover:border-primary/40 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 border border-border hover:border-primary/40 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 border border-border hover:border-primary/40 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Tautan Cepat</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 group-hover:bg-primary transition-colors" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 group-hover:bg-primary transition-colors" />
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/brand" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 group-hover:bg-primary transition-colors" />
                  Merek Kami
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 group-hover:bg-primary transition-colors" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 group-hover:bg-primary transition-colors" />
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Brands */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Merek Kami</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 group-hover:bg-primary transition-colors" />
                  Solusi Premium
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 group-hover:bg-primary transition-colors" />
                  Layanan Elite
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 group-hover:bg-primary transition-colors" />
                  Ventur Global
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 group-hover:bg-primary transition-colors" />
                  Pusat Inovasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Kontak Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 group">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground pt-1.5">Jl. Tebet Timur Dalam II No.38B, Tebet, Jakarta Selatan 12820</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground pt-1.5">+6221 837877 35 / 36</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground pt-1.5">info@kcifoundation.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} KINY GROUP. Hak cipta dilindungi undang-undang.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Syarat dan Ketentuan
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Kebijakan Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}