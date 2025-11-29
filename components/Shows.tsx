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
    <section id="shows" className="py-20 bg-gradient-to-b from-[#FAF8F5] to-[#E6B8A5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#2C2419] mb-4">Upcoming Shows</h2>
          <div className="w-24 h-1 bg-[#D97D54] mx-auto mb-6"></div>
          <p className="text-xl text-[#5A4A3A] max-w-3xl mx-auto">
            Join me for an unforgettable musical experience. Check out where I'll be performing next!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingShows.map((show) => (
            <div
              key={show.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                show.featured ? 'border-[#D97D54]' : 'border-transparent'
              }`}
            >
              {show.featured && (
                <div className="bg-[#D97D54] text-white text-center py-2 px-4 text-sm font-semibold">
                  Featured Event
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#2C2419] mb-4">
                  {show.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3 text-[#5A4A3A]">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#C67B5C]" />
                    <div>
                      <p className="font-semibold">{show.venue}</p>
                      <p className="text-sm">{show.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-[#5A4A3A]">
                    <Calendar className="w-5 h-5 flex-shrink-0 text-[#C67B5C]" />
                    <span className="font-medium">
                      {format(new Date(show.date), 'MMMM dd, yyyy')}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-[#5A4A3A]">
                    <Clock className="w-5 h-5 flex-shrink-0 text-[#C67B5C]" />
                    <span className="font-medium">{show.time}</span>
                  </div>
                </div>

                {show.description && (
                  <p className="text-[#5A4A3A] mb-6">{show.description}</p>
                )}

                {show.ticketUrl && (
                  <a
                    href={show.ticketUrl}
                    className="inline-flex items-center space-x-2 bg-[#C67B5C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#D97D54] transition-colors"
                  >
                    <span>Get Tickets</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {upcomingShows.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-[#C67B5C] mx-auto mb-4" />
            <p className="text-xl text-[#5A4A3A]">
              No upcoming shows scheduled at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

