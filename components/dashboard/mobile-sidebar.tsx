// components/dashboard/mobile-sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Building2, 
  FolderOpen, 
  Users, 
  Settings,
  X,
  LogOut,
  LucideIcon
} from 'lucide-react';
import { User } from '@/lib/db/schema';
import LogoutButton from '@/components/auth/logout-button';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  roles: string[];
}

interface MobileSidebarProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    href: '/dashboard', 
    roles: ['admin', 'editor', 'contributor', 'reader'] 
  },
  { 
    icon: FileText, 
    label: 'Blog Posts', 
    href: '/dashboard/posts', 
    roles: ['admin', 'editor', 'contributor'] 
  },
  { 
    icon: MessageSquare, 
    label: 'Comments', 
    href: '/dashboard/comments', 
    roles: ['admin', 'editor'] 
  },
  { 
    icon: Building2, 
    label: 'Brand Divisions', 
    href: '/dashboard/divisions', 
    roles: ['admin', 'editor'] 
  },
  { 
    icon: FolderOpen, 
    label: 'Categories', 
    href: '/dashboard/categories', 
    roles: ['admin', 'editor'] 
  },
  { 
    icon: Users, 
    label: 'Users', 
    href: '/dashboard/users', 
    roles: ['admin'] 
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    href: '/dashboard/settings', 
    roles: ['admin', 'editor', 'contributor', 'reader'] 
  },
];

export function MobileSidebar({ user, isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user.role)
  );

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link href="/dashboard" className="flex items-center gap-3" onClick={onClose}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="font-semibold text-foreground text-lg">Company</span>
            </Link>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {filteredMenuItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors group ${
                    isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-gold-500' : 'group-hover:text-gold-500'
                  }`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">
                  {getInitials(user.name, user.email)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.name || user.email}
                </p>
                <p className="text-xs text-muted-foreground truncate capitalize">
                  {user.role}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <LogoutButton />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}