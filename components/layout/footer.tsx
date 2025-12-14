// Path: components/layout/footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-gold-500/20 bg-navy-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-linear-to-br from-gold-900/10 via-transparent to-navy-900" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl" />
      
      {/* Container with max-width */}
      <div className="container relative mx-auto max-w-300 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.ico"
                  alt="KINY GROUP Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                KINY <br />GROUP
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Transforming industries through innovation, excellence, and unwavering commitment to quality across our diverse portfolio.
            </p>
            <div className="flex space-x-3">
              <Link 
                href="#" 
                className="w-10 h-10 rounded-lg bg-navy-800 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-500/40 flex items-center justify-center text-muted-foreground hover:text-gold-400 transition-all"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 rounded-lg bg-navy-800 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-500/40 flex items-center justify-center text-muted-foreground hover:text-gold-400 transition-all"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 rounded-lg bg-navy-800 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-500/40 flex items-center justify-center text-muted-foreground hover:text-gold-400 transition-all"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-gold-400 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-gold-400 transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 mr-3 group-hover:bg-gold-400 transition-colors" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-gold-400 transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 mr-3 group-hover:bg-gold-400 transition-colors" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/brand" className="text-muted-foreground hover:text-gold-400 transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 mr-3 group-hover:bg-gold-400 transition-colors" />
                  Our Brands
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-gold-400 transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 mr-3 group-hover:bg-gold-400 transition-colors" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-gold-400 transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 mr-3 group-hover:bg-gold-400 transition-colors" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Brands */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-gold-400 uppercase tracking-wider">Our Brands</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-gold-400 transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 mr-3 group-hover:bg-gold-400 transition-colors" />
                  Premium Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-gold-400 transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 mr-3 group-hover:bg-gold-400 transition-colors" />
                  Elite Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-gold-400 transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 mr-3 group-hover:bg-gold-400 transition-colors" />
                  Global Ventures
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-gold-400 transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 mr-3 group-hover:bg-gold-400 transition-colors" />
                  Innovation Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-gold-400 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 group">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <MapPin className="h-4 w-4 text-gold-400" />
                </div>
                <span className="text-muted-foreground pt-1.5">123 Business Street, City, Country</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <Phone className="h-4 w-4 text-gold-400" />
                </div>
                <span className="text-muted-foreground pt-1.5">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <Mail className="h-4 w-4 text-gold-400" />
                </div>
                <span className="text-muted-foreground pt-1.5">info@kinygroup.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gold-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} KINY GROUP. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-gold-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-gold-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-gold-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}