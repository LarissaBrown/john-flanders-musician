'use client';

import { useEffect, useState } from 'react';
import { Calendar, Music, ShoppingBag, Mail, TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  totalShows: number;
  upcomingShows: number;
  totalMedia: number;
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalMessages: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalShows: 0,
    upcomingShows: 0,
    totalMedia: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all stats in parallel
      const [events, media, products, orders, contacts] = await Promise.all([
        fetch('/api/events').then(res => res.json()),
        fetch('/api/media').then(res => res.json()),
        fetch('/api/products').then(res => res.json()),
        fetch('/api/orders').then(res => res.json()),
        fetch('/api/contact').then(res => res.json()),
      ]);

      const now = new Date();
      const upcomingShows = events.filter((e: any) => new Date(e.date) >= now).length;
      const pendingOrders = orders.filter((o: any) => o.status === 'pending').length;

      setStats({
        totalShows: events.length,
        upcomingShows,
        totalMedia: media.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders,
        totalMessages: contacts.length,
        unreadMessages: contacts.length, // For now, treat all as unread
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Upcoming Shows',
      value: stats.upcomingShows,
      total: stats.totalShows,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/dashboard/shows',
    },
    {
      name: 'Media Items',
      value: stats.totalMedia,
      icon: Music,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/dashboard/media',
    },
    {
      name: 'Products',
      value: stats.totalProducts,
      icon: ShoppingBag,
      color: 'from-green-500 to-green-600',
      href: '/admin/dashboard/products',
    },
    {
      name: 'Pending Orders',
      value: stats.pendingOrders,
      total: stats.totalOrders,
      icon: DollarSign,
      color: 'from-yellow-500 to-yellow-600',
      href: '/admin/dashboard/orders',
    },
    {
      name: 'Messages',
      value: stats.unreadMessages,
      total: stats.totalMessages,
      icon: Mail,
      color: 'from-red-500 to-red-600',
      href: '/admin/dashboard/messages',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-canyon-red to-canyon-terracotta rounded-xl p-8 sm:p-10 text-warm-cream shadow-lg">
        <h2 className="text-3xl font-bold mb-3">Welcome back, Admin!</h2>
        <p className="text-lg text-warm-cream/90">
          Here's what's happening with your website today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {statCards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-8 border border-gray-200 hover:border-canyon-red/30 transform hover:-translate-y-1 duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
              {card.name === 'Upcoming Shows' || card.name === 'Pending Orders' || card.name === 'Messages' ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : null}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.name}</h3>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-rich-brown">{card.value}</p>
              {card.total !== undefined && (
                <p className="text-gray-500 text-sm">/ {card.total} total</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-8 sm:p-10 border border-gray-200">
        <h3 className="text-2xl font-bold text-rich-brown mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/dashboard/shows"
            className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-colors"
          >
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-900">Add Show</p>
              <p className="text-sm text-blue-700">Create new event</p>
            </div>
          </Link>

          <Link
            href="/admin/dashboard/media"
            className="flex items-center space-x-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-colors"
          >
            <Music className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-semibold text-purple-900">Upload Media</p>
              <p className="text-sm text-purple-700">Add audio/video</p>
            </div>
          </Link>

          <Link
            href="/admin/dashboard/products"
            className="flex items-center space-x-3 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-colors"
          >
            <ShoppingBag className="w-8 h-8 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">Add Product</p>
              <p className="text-sm text-green-700">New album/single</p>
            </div>
          </Link>

          <Link
            href="/admin/dashboard/messages"
            className="flex items-center space-x-3 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg hover:from-red-100 hover:to-red-200 transition-colors"
          >
            <Mail className="w-8 h-8 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">View Messages</p>
              <p className="text-sm text-red-700">Check inquiries</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-8 sm:p-10 border border-gray-200">
        <h3 className="text-2xl font-bold text-rich-brown mb-6">Getting Started</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-gray-900">Add your shows and events</p>
              <p className="text-sm text-gray-600">
                Keep fans updated with your performance schedule
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-gray-900">Upload your music and videos</p>
              <p className="text-sm text-gray-600">
                Showcase your talents with audio and video content
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-gray-900">List your albums and singles</p>
              <p className="text-sm text-gray-600">
                Start selling your music through the online shop
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
