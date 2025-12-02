import { NextResponse } from 'next/server';

// Default seed data for shows
const defaultShows = [
  {
    _id: 'seed-1',
    title: 'Sunset Sessions',
    venue: 'Red Rock Amphitheater',
    location: 'Sedona, AZ',
    date: '2025-06-15',
    time: '7:00 PM',
    description: 'An evening of acoustic melodies under the stars',
    imageUrl: '',
    ticketUrl: '',
    featured: true,
  },
  {
    _id: 'seed-2',
    title: 'Desert Blues Night',
    venue: 'Canyon View Lounge',
    location: 'Moab, UT',
    date: '2025-06-22',
    time: '8:00 PM',
    description: 'Blues and soul music with special guests',
    imageUrl: '',
    ticketUrl: '',
    featured: false,
  },
  {
    _id: 'seed-3',
    title: 'Summer Jazz Festival',
    venue: 'Grand Canyon Lodge',
    location: 'Grand Canyon, AZ',
    date: '2025-07-04',
    time: '9:00 PM',
    description: 'Celebrate summer with live jazz performances',
    imageUrl: '',
    ticketUrl: '',
    featured: true,
  },
];

// Public endpoint for fetching shows (no auth required)
export async function GET() {
  try {
    // Return default shows as seed data
    // In production, this would fetch from a database
    return NextResponse.json(defaultShows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    return NextResponse.json([], { status: 200 });
  }
}

