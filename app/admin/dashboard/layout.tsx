'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  Music,
  ShoppingBag,
  Package,
  Mail,
  Image,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Shows', href: '/admin/dashboard/shows', icon: Calendar },
  { name: 'Media', href: '/admin/dashboard/media', icon: Music },
  { name: 'Products', href: '/admin/dashboard/products', icon: ShoppingBag },
  { name: 'Orders', href: '/admin/dashboard/orders', icon: Package },
  { name: 'Messages', href: '/admin/dashboard/messages', icon: Mail },
  { name: 'Images', href: '/admin/dashboard/images', icon: Image },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-rich-brown flex items-center justify-center">
        <div className="text-warm-cream text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - slides in from right */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-gray-900 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-canyon-red to-canyon-terracotta">
            <Link href="/admin/dashboard" className="flex items-center space-x-2" onClick={() => setSidebarOpen(false)}>
              <Music className="w-8 h-8 text-white" />
              <span className="text-white font-bold text-lg">Admin Panel</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-canyon-red text-white font-semibold shadow-md'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3 px-4 py-2 mb-2">
              <div className="w-8 h-8 bg-canyon-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {session.user?.email?.[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {session.user?.email}
                </p>
                <p className="text-gray-400 text-xs">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content - full width */}
      <div className="min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-20 flex items-center px-6 sm:px-8 lg:px-12 sticky top-0 z-20">
          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-rich-brown">
              {navigation.find((item) => item.href === pathname)?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="text-canyon-red hover:text-canyon-terracotta transition-colors font-medium flex items-center space-x-2"
              >
                <span>View Site</span>
                <span>→</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 sm:p-8 lg:p-12 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

