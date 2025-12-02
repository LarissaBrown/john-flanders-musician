'use client';

import { useEffect, useState } from 'react';
import { Calendar, Music, ShoppingBag, Mail, TrendingUp, DollarSign, Image } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  totalShows: number;
  upcomingShows: number;
  totalMedia: number;
  totalImages: number;
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
    totalImages: 0,
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
      // Default seed data (same as admin pages use when localStorage is empty)
      const defaultShows = [
        { _id: 'seed-show-1', title: 'Sunset Sessions', date: '2025-06-15', featured: true },
        { _id: 'seed-show-2', title: 'Desert Blues Night', date: '2025-06-22', featured: false },
        { _id: 'seed-show-3', title: 'Summer Jazz Festival', date: '2025-07-04', featured: true },
      ];

      const defaultMedia = [
        { _id: 'seed-media-1', title: 'Latin Blues', type: 'audio' },
        { _id: 'seed-media-2', title: 'The Go Between', type: 'audio' },
        { _id: 'seed-media-3', title: 'Architeuthis', type: 'audio' },
        { _id: 'seed-media-4', title: 'Hunkered Down', type: 'audio' },
        { _id: 'seed-media-5', title: 'Double Helix', type: 'audio' },
        { _id: 'seed-media-6', title: 'Corcovado', type: 'audio' },
        { _id: 'seed-media-7', title: 'John Flanders Quartet', type: 'audio' },
        { _id: 'seed-media-8', title: 'Jazz with Male Vocals', type: 'audio' },
        { _id: 'seed-media-9', title: 'Latin Jazz Factory', type: 'audio' },
        { _id: 'seed-media-10', title: 'Sin City Soul', type: 'audio' },
        { _id: 'seed-media-11', title: 'Raydius', type: 'audio' },
        { _id: 'seed-media-12', title: 'ATF Band', type: 'audio' },
      ];

      const defaultProducts = [
        { _id: 'seed-product-1', name: 'The Go Between', type: 'album' },
        { _id: 'seed-product-2', name: 'Natural Selection', type: 'album' },
        { _id: 'seed-product-3', name: 'In The Sky Tonight', type: 'album' },
        { _id: 'seed-product-4', name: 'A Prehensile Tale', type: 'album' },
        { _id: 'seed-product-5', name: 'Stranded in Time', type: 'album' },
      ];

      // Load from localStorage, or use defaults if empty
      const showsData = localStorage.getItem('admin_shows');
      const mediaData = localStorage.getItem('admin_media');
      const productsData = localStorage.getItem('admin_products');
      const ordersData = localStorage.getItem('admin_orders');
      const messagesData = localStorage.getItem('admin_messages');

      // Use stored data or seed with defaults
      const shows = showsData ? JSON.parse(showsData) : defaultShows;
      const media = mediaData ? JSON.parse(mediaData) : defaultMedia;
      const products = productsData ? JSON.parse(productsData) : defaultProducts;
      const orders = ordersData ? JSON.parse(ordersData) : [];
      const messages = messagesData ? JSON.parse(messagesData) : [];

      // Seed localStorage if empty (so other pages have data too)
      if (!showsData) localStorage.setItem('admin_shows', JSON.stringify(defaultShows));
      if (!mediaData) localStorage.setItem('admin_media', JSON.stringify(defaultMedia));
      if (!productsData) localStorage.setItem('admin_products', JSON.stringify(defaultProducts));

      // Fetch images count from API
      let imagesCount = 0;
      try {
        const imagesRes = await fetch('/api/images/list');
        const imagesData = await imagesRes.json();
        imagesCount = Array.isArray(imagesData) ? imagesData.length : 0;
      } catch {
        imagesCount = 0;
      }

      const now = new Date();
      const upcomingShows = shows.filter((e: { date: string }) => new Date(e.date) >= now).length;
      const pendingOrders = orders.filter((o: { status: string }) => o.status === 'pending').length;
      const unreadMessages = messages.filter((m: { read?: boolean }) => !m.read).length;

      setStats({
        totalShows: shows.length,
        upcomingShows,
        totalMedia: media.length,
        totalImages: imagesCount,
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders,
        totalMessages: messages.length,
        unreadMessages: unreadMessages || messages.length, // Show total if no read status
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
      name: 'Images',
      value: stats.totalImages,
      icon: Image,
      color: 'from-pink-500 to-pink-600',
      href: '/admin/dashboard/images',
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
    <div className="space-y-10 sm:space-y-12">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-canyon-red to-canyon-terracotta rounded-2xl p-8 sm:p-10 lg:p-12 text-warm-cream shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Welcome back, Admin!</h2>
        <p className="text-lg sm:text-xl text-warm-cream/90">
          Here's what's happening with your website today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
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
      <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10 lg:p-12 border border-gray-200">
        <h3 className="text-2xl sm:text-3xl font-bold text-rich-brown mb-8">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
            href="/admin/dashboard/images"
            className="flex items-center space-x-3 p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg hover:from-pink-100 hover:to-pink-200 transition-colors"
          >
            <Image className="w-8 h-8 text-pink-600" />
            <div>
              <p className="font-semibold text-pink-900">Upload Images</p>
              <p className="text-sm text-pink-700">Add photos</p>
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

      {/* Getting Started */}
      <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10 lg:p-12 border border-gray-200">
        <h3 className="text-2xl sm:text-3xl font-bold text-rich-brown mb-8">Getting Started</h3>
        <div className="space-y-5 sm:space-y-6">
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
