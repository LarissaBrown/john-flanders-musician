'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Music, ShoppingBag, Mail, Image, LogOut, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: 'Upcoming Shows', value: '3', icon: Calendar, color: 'text-[#F6B800]' },
    { label: 'Total Products', value: '4', icon: ShoppingBag, color: 'text-[#F6B800]' },
    { label: 'Media Items', value: '4', icon: Music, color: 'text-[#F6B800]' },
    { label: 'Messages', value: '0', icon: Mail, color: 'text-[#F6B800]' },
  ];

  const adminSections = [
    { 
      title: 'Manage Shows', 
      description: 'Add, edit, or delete upcoming shows',
      href: '/admin/shows',
      icon: Calendar,
      color: 'bg-[#F6B800]'
    },
    { 
      title: 'Manage Products', 
      description: 'Manage music singles and albums',
      href: '/admin/products',
      icon: ShoppingBag,
      color: 'bg-[#F6B800]'
    },
    { 
      title: 'Manage Media', 
      description: 'Upload and organize audio/video',
      href: '/admin/media',
      icon: Music,
      color: 'bg-[#F6B800]'
    },
    { 
      title: 'Image Gallery', 
      description: 'Manage all site images',
      href: '/admin/gallery',
      icon: Image,
      color: 'bg-[#F6B800]'
    },
    { 
      title: 'Contact Messages', 
      description: 'View and respond to inquiries',
      href: '/admin/contacts',
      icon: Mail,
      color: 'bg-[#F6B800]'
    },
    { 
      title: 'Analytics', 
      description: 'View site statistics',
      href: '/admin/analytics',
      icon: BarChart3,
      color: 'bg-[#F6B800]'
    },
  ];

  return (
    <div className="min-h-screen bg-[#1C1612]">
      {/* Header */}
      <header className="bg-[#2D241E] border-b border-[#F6B800]/20">
        <div className="mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-[#F6B800]"></div>
                <div className="w-3 h-3 rounded-full bg-[#F6B800] opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-[#F6B800] opacity-60"></div>
              </div>
              <h1 className="text-2xl font-black text-[#F6B800] uppercase tracking-wide">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors text-sm uppercase tracking-wide"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-[#F6B800] hover:bg-[#FFCA28] text-[#1C1612] px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#2D241E] rounded-xl p-6 border border-[#F6B800]/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-3xl font-black text-[#F6B800]">{stat.value}</span>
                </div>
                <p className="text-[#B8AFA3] text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Admin Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Link
                key={index}
                href={section.href}
                className="bg-[#2D241E] rounded-xl p-8 border border-[#F6B800]/10 hover:border-[#F6B800]/30 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-[#1C1612]" />
                </div>
                <h3 className="text-xl font-bold text-[#F6B800] mb-2 uppercase tracking-wide">
                  {section.title}
                </h3>
                <p className="text-[#B8AFA3]">{section.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

