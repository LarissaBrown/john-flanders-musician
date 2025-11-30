'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Calendar } from 'lucide-react';

interface Show {
  id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  description?: string;
  ticketUrl?: string;
  featured?: boolean;
  imageUrl?: string;
}

export default function AdminShows() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shows, setShows] = useState<Show[]>([
    {
      id: '1',
      title: 'Sunset Sessions',
      venue: 'Red Rock Amphitheater',
      location: 'Sedona, AZ',
      date: '2024-12-15',
      time: '7:00 PM',
      description: 'An evening of acoustic melodies under the stars',
      ticketUrl: '#',
      featured: true,
    },
    {
      id: '2',
      title: 'Desert Blues Night',
      venue: 'Canyon View Lounge',
      location: 'Moab, UT',
      date: '2024-12-22',
      time: '8:00 PM',
      description: 'Blues and soul music with special guests',
      ticketUrl: '#',
    },
  ]);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this show?')) {
      setShows(shows.filter(show => show.id !== id));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1C1612]">
      {/* Header */}
      <header className="bg-[#2D241E] border-b border-[#F6B800]/20">
        <div className="mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-black text-[#F6B800] uppercase tracking-wide">
                Manage Shows
              </h1>
            </div>
            <button className="flex items-center space-x-2 bg-[#F6B800] hover:bg-[#FFCA28] text-[#1C1612] px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all">
              <Plus className="w-5 h-5" />
              <span>Add New Show</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto px-8 py-12">
        <div className="space-y-6">
          {shows.map((show) => (
            <div
              key={show.id}
              className="bg-[#2D241E] rounded-xl p-6 border border-[#F6B800]/10 hover:border-[#F6B800]/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-2xl font-bold text-[#F6B800]">{show.title}</h3>
                    {show.featured && (
                      <span className="bg-[#F6B800] text-[#1C1612] px-3 py-1 rounded-full text-xs font-bold uppercase">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-[#F5F0E8]">
                    <p className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#F6B800]" />
                      <span><strong>Venue:</strong> {show.venue}, {show.location}</span>
                    </p>
                    <p><strong>Date:</strong> {show.date} at {show.time}</p>
                    {show.description && (
                      <p className="text-[#B8AFA3]">{show.description}</p>
                    )}
                  </div>

                  {/* Image Placeholder */}
                  <div className="mt-4 w-48 h-32 bg-gradient-to-br from-[#3A2F28] to-[#1C1612] rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-[#F6B800] text-3xl mb-1">🎵</div>
                      <p className="text-[#8A8078] text-xs">Show Image</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="bg-[#F6B800] hover:bg-[#FFCA28] text-[#1C1612] p-3 rounded-lg transition-all">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(show.id)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {shows.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-[#F6B800] mx-auto mb-6 opacity-50" />
            <p className="text-xl text-[#F5F0E8]">No shows yet. Add your first show!</p>
          </div>
        )}
      </div>
    </div>
  );
}

