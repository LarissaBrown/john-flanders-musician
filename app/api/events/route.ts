import { NextResponse } from 'next/server';

// Default seed data for shows/events
const defaultShows = [
  {
    _id: 'seed-show-1',
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
    _id: 'seed-show-2',
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
    _id: 'seed-show-3',
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

export async function GET() {
  try {
    // Return seed data for now
    // In production with MongoDB, this would query the database
    return NextResponse.json(defaultShows);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // For now, just return success with the data
    // In production with MongoDB, this would save to database
    const newEvent = {
      _id: `event-${Date.now()}`,
      ...body,
    };
    
    return NextResponse.json({ success: true, data: newEvent }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

