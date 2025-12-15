"use client";

// Path: components/layout/header.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

// Navigation links object
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/brand", label: "Brands" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/80">
      {/* Subtle linear overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-gold-500/5 via-transparent to-gold-500/5 pointer-events-none" />
      
      {/* Container with max-width */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
          {/* Desktop Navigation */}
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-8 flex items-center space-x-3 group">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.ico"
                  alt="KINY GROUP Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-bold text-lg leading-tight bg-linear-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent group-hover:from-gold-300 group-hover:to-gold-500 transition-all">
                KINY <br /> GROUP
              </span>
            </Link>
            <nav className="flex items-center space-x-8 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition-colors hover:text-primary hover:scale-105 transform duration-200 ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-gold-500/10 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-primary" />
            ) : (
              <Menu className="h-5 w-5 text-primary" />
            )}
            <span className="sr-only">Toggle Menu</span>
          </Button>
          
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            {/* Mobile Logo */}
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Link href="/" className="flex items-center space-x-2 md:hidden group">
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo.ico"
                    alt="KINY GROUP Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="font-bold bg-linear-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent leading-tight">
                  KINY <br />GROUP
                </span>
              </Link>
            </div>
            
            {/* Theme Toggle & Contact Button */}
            <nav className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 px-0 hover:bg-primary/10"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button 
                asChild 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Now Absolute */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden border-t bg-background/95 backdrop-blur-xl shadow-lg">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-all ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    {link.label}
                    {pathname === link.href && (
                      <span className="ml-2 w-2 h-2 rounded-full bg-primary"></span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}