'use client';

import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from 'date-fns';
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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const showRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    fetchShows();
  }, []);

  // Get shows for a specific date
  const getShowsForDate = (date: Date) => {
    return shows.filter(show => isSameDay(new Date(show.date), date));
  };

  // Check if a date has shows
  const hasShowOnDate = (date: Date) => {
    return shows.some(show => isSameDay(new Date(show.date), date));
  };

  // Scroll to show card when date is clicked
  const scrollToShow = (showId: string) => {
    const element = showRefs.current[showId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a highlight animation
      element.classList.add('ring-4', 'ring-primary', 'ring-opacity-75');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-primary', 'ring-opacity-75');
      }, 2000);
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    
    // Add padding for days before the first of the month
    const startDayOfWeek = getDay(start);
    const paddingDays = Array(startDayOfWeek).fill(null);
    
    return [...paddingDays, ...days];
  };

  const fetchShows = async () => {
    try {
      // Default seed data
      const defaultShows: Show[] = [
        {
          _id: 'seed-show-1',
          title: 'Sunset Sessions',
          venue: 'Red Rock Amphitheater',
          location: 'Sedona, AZ',
          date: '2025-06-14',
          time: '7:00 PM',
          description: 'An evening of acoustic melodies under the stars',
          imageUrl: '',
          ticketUrl: '',
          featured: true,
        },
        {
          _id: 'seed-show-2',
          title: 'Desert Blues Night',
          venue: 'Canyon View Lounge',
          location: 'Moab, UT',
          date: '2025-06-21',
          time: '8:00 PM',
          description: 'Blues and soul music with special guests',
          imageUrl: '',
          ticketUrl: '',
          featured: false,
        },
        {
          _id: 'seed-show-3',
          title: 'Summer Jazz Festival',
          venue: 'Grand Canyon Lodge',
          location: 'Grand Canyon, AZ',
          date: '2025-07-03',
          time: '9:00 PM',
          description: 'Celebrate summer with live jazz performances',
          imageUrl: '',
          ticketUrl: '',
          featured: true,
        },
      ];

      // Load from localStorage (managed by admin)
      const stored = localStorage.getItem('admin_shows');
      
      let showsArray: Show[];
      if (stored) {
        showsArray = JSON.parse(stored);
      } else {
        // Seed localStorage with defaults
        showsArray = defaultShows;
        localStorage.setItem('admin_shows', JSON.stringify(defaultShows));
      }
      
      // Show all shows (not filtering by date for now since seed dates are in the future)
      setShows(showsArray);
    } catch (error) {
      console.error('Error fetching shows:', error);
      setShows([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="shows" className="py-20 sm:py-24 lg:py-32 bg-rich-brown px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 uppercase tracking-wide">
            Upcoming Shows
          </h2>
          <p className="text-lg sm:text-xl text-cream max-w-3xl mx-auto leading-relaxed">
            Join me for an unforgettable musical experience.
          </p>
        </div>

        {/* Calendar View */}
        {!loading && shows.length > 0 && (
          <div className="mb-16 sm:mb-20">
            <div className="bg-surface-dark rounded-2xl shadow-xl border border-primary/20 p-6 sm:p-8 max-w-3xl mx-auto">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-cream hover:text-primary"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h3 className="text-xl sm:text-2xl font-bold text-cream uppercase tracking-wide">
                  {format(currentMonth, 'MMMM yyyy')}
                </h3>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-cream hover:text-primary"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }
                  
                  const showsOnDay = getShowsForDate(day);
                  const hasShow = showsOnDay.length > 0;
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <div
                      key={day.toISOString()}
                      className={`aspect-square flex flex-col items-center justify-center rounded-lg relative transition-all ${
                        !isCurrentMonth ? 'opacity-30' : ''
                      } ${isToday ? 'ring-2 ring-gold' : ''}`}
                    >
                      {/* Only show the plain date when there's no show */}
                      {!hasShow && (
                        <span className="text-sm sm:text-base text-text-muted-light">
                          {format(day, 'd')}
                        </span>
                      )}
                      
                      {hasShow && (
                        <button
                          onClick={() => scrollToShow(showsOnDay[0]._id)}
                          className="w-full h-full rounded-lg bg-primary/20 hover:bg-primary/40 border-2 border-primary hover:border-accent transition-all cursor-pointer group flex flex-col items-center justify-center"
                          title={showsOnDay.map(s => s.title).join(', ')}
                        >
                          <span className="text-sm sm:text-base text-cream font-bold group-hover:text-accent transition-colors">
                            {format(day, 'd')}
                          </span>
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-accent rounded-full mt-0.5 group-hover:scale-125 transition-transform" />
                          {showsOnDay.length > 1 && (
                            <span className="absolute -top-1 -right-1 bg-gold text-background-dark text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                              {showsOnDay.length}
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-primary/20">
                <div className="flex items-center gap-2 text-sm text-text-muted-light">
                  <span className="w-3 h-3 bg-primary/20 border-2 border-primary rounded" />
                  <span>Show Date</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted-light">
                  <span className="w-3 h-3 ring-2 ring-gold rounded" />
                  <span>Today</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shows Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-cream">Loading shows...</p>
          </div>
        ) : shows.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <p className="text-lg text-cream">No upcoming shows at this time.</p>
            <p className="text-sm text-text-muted-light mt-2">Check back soon for new performances!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {shows.map((show) => (
              <div
                key={show._id}
                id={`show-${show._id}`}
                ref={(el) => { showRefs.current[show._id] = el; }}
                className="bg-surface-dark rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-primary/20 hover:border-primary/40 transform hover:-translate-y-2"
              >
                {/* Show Image */}
                <div className="aspect-video bg-gradient-to-br from-surface-dark to-background-dark flex items-center justify-center relative overflow-hidden">
                  {show.imageUrl ? (
                    <Image
                      src={show.imageUrl}
                      alt={show.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <Calendar className="w-16 h-16 text-primary/30" />
                  )}
                  {show.featured && (
                    <div className="absolute top-3 right-3 bg-gold text-background-dark px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider z-10">
                      Featured
                    </div>
                  )}
                </div>

                {/* Show Info */}
                <div className="p-6 sm:p-8 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-cream mb-4">
                    {show.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6 text-text-muted-light text-sm">
                    <p className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{show.venue}</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{show.location}</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{format(new Date(show.date), 'MMM dd, yyyy')}</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{show.time}</span>
                    </p>
                  </div>

                  {show.description && (
                    <p className="text-text-muted-light text-sm mb-6 line-clamp-2 px-2">
                      {show.description}
                    </p>
                  )}

                  {/* Button */}
                  {show.ticketUrl && (
                    <button className="w-full bg-accent hover:bg-accent-hover text-background-dark px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 mt-4">
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
          <p className="text-text-muted-light text-sm uppercase tracking-widest mb-3">
            Available in selected venues.
          </p>
          <Link 
            href="#contact" 
            className="text-primary hover:text-accent text-sm uppercase tracking-widest inline-block font-semibold transition-colors"
          >
            Book a private show
          </Link>
        </div>
      </div>
    </section>
  );
}
