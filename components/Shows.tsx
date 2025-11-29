'use client';

import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

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
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F6B800] mb-6 uppercase tracking-wide">
            Upcoming Shows
          </h2>
          <p className="text-xl text-[#F5F0E8] max-w-2xl mx-auto leading-relaxed">
            Join me for an unforgettable musical experience.
          </p>
        </div>

        <div className="space-y-8 max-w-3xl mx-auto">
          {upcomingShows.map((show) => (
            <div
              key={show.id}
              className={`${
                show.featured 
                  ? 'bg-[#F6B800] text-[#1C1612]' 
                  : 'bg-[#2D241E] text-[#F5F0E8]'
              } rounded-2xl shadow-2xl hover:shadow-[0_12px_40px_rgba(246,184,0,0.3)] transition-all duration-300 overflow-hidden transform hover:-translate-y-2`}
            >
              {show.featured && (
                <div className="bg-[#1C1612] text-[#F6B800] text-center py-3 px-6 text-xs font-bold uppercase tracking-widest">
                  Featured Event
                </div>
              )}

              <div className="p-10">
                <div className="mb-8">
                  <p className={`text-sm font-bold uppercase tracking-widest mb-3 ${
                    show.featured ? 'text-[#1C1612]/60' : 'text-[#F6B800]'
                  }`}>
                    Show
                  </p>
                  <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">
                    {show.title}
                  </h3>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                      show.featured ? 'text-[#1C1612]/60' : 'text-[#F6B800]'
                    }`}>
                      Theater
                    </p>
                    <p className="text-xl font-bold">{show.venue}</p>
                    <p className="text-base opacity-80">{show.location}</p>
                  </div>

                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                      show.featured ? 'text-[#1C1612]/60' : 'text-[#F6B800]'
                    }`}>
                      Time
                    </p>
                    <p className="text-xl font-bold">{show.time}</p>
                  </div>

                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                      show.featured ? 'text-[#1C1612]/60' : 'text-[#F6B800]'
                    }`}>
                      Date
                    </p>
                    <p className="text-xl font-bold uppercase">
                      {format(new Date(show.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                {show.ticketUrl && (
                  <button
                    className={`w-full ${
                      show.featured
                        ? 'bg-[#1C1612] text-[#F6B800]'
                        : 'bg-[#F6B800] text-[#1C1612]'
                    } py-5 rounded-xl font-black text-base uppercase tracking-wide hover:opacity-90 transition-all duration-300 shadow-lg`}
                  >
                    Let's Go
                  </button>
                )}
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
            See all participating venues
          </Link>
        </div>
      </div>
    </section>
  );
}
