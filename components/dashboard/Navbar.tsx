// components/dashboard/navbar.tsx
"use client";

import React from 'react';
import { Menu, Bell, Search, Moon, Sun } from 'lucide-react';
import { User } from '@/lib/db/schema';
import { useTheme } from 'next-themes';

interface NavbarProps {
  user: User;
  onMenuClick: () => void;
}

export function Navbar({ user, onMenuClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-accent lg:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-muted border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gold-500" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>

          {/* User menu - desktop only */}
          <div className="hidden sm:block ml-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-xs">
                  {getInitials(user.name, user.email)}
                </span>
              </div>
              <span className="text-sm font-medium hidden md:block">
                {user.name ? user.name.split(' ')[0] : user.email.split('@')[0]}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}