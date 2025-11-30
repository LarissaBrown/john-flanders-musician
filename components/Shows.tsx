'use client';

import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

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
}

// Sample data - will be replaced with API calls
const upcomingShows: Show[] = [
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
  {
    id: '3',
    title: 'New Year\'s Eve Celebration',
    venue: 'Grand Canyon Lodge',
    location: 'Grand Canyon, AZ',
    date: '2024-12-31',
    time: '9:00 PM',
    description: 'Ring in the new year with live music',
    ticketUrl: '#',
    featured: true,
  },
];

export default function Shows() {
  return (
    <section id="shows" className="py-32 bg-[#1C1612]">
      <div className="mx-auto px-8 sm:px-16 lg:px-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F6B800] mb-6 uppercase tracking-wide">
            Upcoming Shows
          </h2>
          <p className="text-xl text-[#F5F0E8] mx-auto leading-relaxed">
            Join me for an unforgettable musical experience.
          </p>
        </div>

        {/* Shows Grid - matching Shop layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingShows.map((show) => (
            <div
              key={show.id}
              className="bg-[#2D241E] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#F6B800]/10 hover:border-[#F6B800]/30 transform hover:-translate-y-2"
            >
              {/* Show Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-[#3A2F28] to-[#1C1612] flex items-center justify-center relative">
                {show.featured && (
                  <div className="absolute top-3 right-3 bg-[#F6B800] text-[#1C1612] px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                    Featured
                  </div>
                )}
                <div className="text-center">
                  <div className="text-[#F6B800] text-6xl mb-2">🎵</div>
                  <p className="text-[#B8AFA3] text-xs uppercase tracking-wide">Show Poster</p>
                </div>
              </div>

              {/* Show Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#F5F0E8] mb-3">
                  {show.title}
                </h3>
                
                <div className="space-y-2 mb-4 text-[#B8AFA3] text-sm">
                  <p className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#F6B800]" />
                    <span>{show.venue}</span>
                  </p>
                  <p className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#F6B800]" />
                    <span>{show.location}</span>
                  </p>
                  <p className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#F6B800]" />
                    <span>{format(new Date(show.date), 'MMM dd, yyyy')}</span>
                  </p>
                  <p className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-[#F6B800]" />
                    <span>{show.time}</span>
                  </p>
                </div>

                {show.description && (
                  <p className="text-[#B8AFA3] text-sm mb-4 line-clamp-2">
                    {show.description}
                  </p>
                )}

                {/* Button */}
                <div className="flex flex-col items-center gap-4 mt-6">
                  {show.ticketUrl && (
                    <button className="w-full bg-[#F6B800] hover:bg-[#FFCA28] text-[#1C1612] px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      Get Tickets
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {upcomingShows.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-[#F6B800] mx-auto mb-6 opacity-50" />
            <p className="text-xl text-[#F5F0E8]">
              No upcoming shows scheduled. Check back soon!
            </p>
          </div>
        )}
        
        {/* Bottom text */}
        <div className="text-center mt-16">
          <p className="text-[#B8AFA3] text-sm uppercase tracking-widest">
            Available in selected venues.
          </p>
          <Link 
            href="#contact" 
            className="text-[#F6B800] hover:text-[#FFCA28] text-sm uppercase tracking-widest mt-2 inline-block font-semibold transition-colors"
          >
            Book a private show
          </Link>
        </div>
      </div>
    </section>
  );
}
