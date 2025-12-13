"use client";

// Path: components/layout/header.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-500/20 bg-navy-900/95 backdrop-blur-xl supports-backdrop-filter:bg-navy-900/80">
      {/* Subtle linear overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-gold-500/5 via-transparent to-gold-500/5 pointer-events-none" />
      
      <div className="container relative flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-gold-500/20 ring-2 ring-gold-500/20 group-hover:ring-gold-500/40 transition-all">
              <Image
                src="/logo.ico"
                alt="KINY GROUP Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-bold text-lg bg-linear-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent group-hover:from-gold-200 group-hover:to-gold-400 transition-all">
              KINY GROUP
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-gold-400 text-foreground/80 hover:scale-105 transform duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-gold-400 text-foreground/80 hover:scale-105 transform duration-200"
            >
              About
            </Link>
            <Link
              href="/brand"
              className="transition-colors hover:text-gold-400 text-foreground/80 hover:scale-105 transform duration-200"
            >
              Brands
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-gold-400 text-foreground/80 hover:scale-105 transform duration-200"
            >
              Blog
            </Link>
          </nav>
        </div>
        
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-gold-500/10 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-gold-400" />
          ) : (
            <Menu className="h-5 w-5 text-gold-400" />
          )}
          <span className="sr-only">Toggle Menu</span>
        </Button>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-lg shadow-gold-500/20 ring-2 ring-gold-500/20">
                <Image
                  src="/logo.ico"
                  alt="KINY GROUP Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-bold bg-linear-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                KINY GROUP
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-2">
            <Button 
              asChild 
              size="sm" 
              className="bg-gold-600 hover:bg-gold-700 text-navy-900 font-semibold shadow-lg shadow-gold-600/20"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden border-t border-gold-500/20 bg-navy-900/98 backdrop-blur-xl">
          <div className="space-y-1 px-4 py-4">
            <Link
              href="/"
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground/80 hover:bg-gold-500/10 hover:text-gold-400 transition-all"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground/80 hover:bg-gold-500/10 hover:text-gold-400 transition-all"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/brand"
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground/80 hover:bg-gold-500/10 hover:text-gold-400 transition-all"
              onClick={toggleMenu}
            >
              Brands
            </Link>
            <Link
              href="/blog"
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground/80 hover:bg-gold-500/10 hover:text-gold-400 transition-all"
              onClick={toggleMenu}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}