'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';

interface Show {
  _id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  description?: string;
  imageUrl?: string;
  ticketUrl?: string;
  featured?: boolean;
}

export default function Shows() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      // Load from localStorage (managed by admin)
      const stored = localStorage.getItem('admin_shows');
      
      if (stored) {
        const showsArray = JSON.parse(stored);
        // Filter for future shows only
        const now = new Date();
        const upcomingShows = showsArray.filter((show: Show) => new Date(show.date) >= now);
        setShows(upcomingShows);
      } else {
        // Load from API as fallback
        const response = await fetch('/api/shows');
        const data = await response.json();
        const showsArray = Array.isArray(data) ? data : [];
        setShows(showsArray);
      }
    } catch (error) {
      console.error('Error fetching shows:', error);
      setShows([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="shows" className="py-20 sm:py-24 lg:py-32 bg-[#1C1612] px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F6B800] mb-6 uppercase tracking-wide">
            Upcoming Shows
          </h2>
          <p className="text-lg sm:text-xl text-[#F5F0E8] max-w-3xl mx-auto leading-relaxed">
            Join me for an unforgettable musical experience.
          </p>
        </div>

        {/* Shows Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F6B800]"></div>
            <p className="mt-4 text-[#F5F0E8]">Loading shows...</p>
          </div>
        ) : shows.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-[#F6B800]/50 mx-auto mb-4" />
            <p className="text-lg text-[#F5F0E8]">No upcoming shows at this time.</p>
            <p className="text-sm text-[#B8AFA3] mt-2">Check back soon for new performances!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {shows.map((show) => (
              <div
                key={show._id}
                className="bg-[#2D241E] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#F6B800]/10 hover:border-[#F6B800]/30 transform hover:-translate-y-2"
              >
                {/* Show Image */}
                <div className="aspect-video bg-gradient-to-br from-[#3A2F28] to-[#1C1612] flex items-center justify-center relative overflow-hidden">
                  {show.imageUrl ? (
                    <Image
                      src={show.imageUrl}
                      alt={show.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <Calendar className="w-16 h-16 text-[#F6B800]/30" />
                  )}
                  {show.featured && (
                    <div className="absolute top-3 right-3 bg-[#F6B800] text-[#1C1612] px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider z-10">
                      Featured
                    </div>
                  )}
                </div>

                {/* Show Info */}
                <div className="p-6 sm:p-8 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F5F0E8] mb-4">
                    {show.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6 text-[#B8AFA3] text-sm">
                    <p className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F6B800] flex-shrink-0" />
                      <span>{show.venue}</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F6B800] flex-shrink-0" />
                      <span>{show.location}</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4 text-[#F6B800] flex-shrink-0" />
                      <span>{format(new Date(show.date), 'MMM dd, yyyy')}</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-[#F6B800] flex-shrink-0" />
                      <span>{show.time}</span>
                    </p>
                  </div>

                  {show.description && (
                    <p className="text-[#B8AFA3] text-sm mb-6 line-clamp-2 px-2">
                      {show.description}
                    </p>
                  )}

                  {/* Button */}
                  {show.ticketUrl && (
                    <button className="w-full bg-[#F6B800] hover:bg-[#FFCA28] text-[#1C1612] px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 mt-4">
                      Get Tickets
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Bottom text */}
        <div className="text-center mt-16 sm:mt-20 px-6">
          <p className="text-[#B8AFA3] text-sm uppercase tracking-widest mb-3">
            Available in selected venues.
          </p>
          <Link 
            href="#contact" 
            className="text-[#F6B800] hover:text-[#FFCA28] text-sm uppercase tracking-widest inline-block font-semibold transition-colors"
          >
            Book a private show
          </Link>
        </div>
      </div>
    </section>
  );
}
