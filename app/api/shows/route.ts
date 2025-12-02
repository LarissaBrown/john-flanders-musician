import { NextResponse } from 'next/server';

// Public endpoint for fetching shows (no auth required)
export async function GET() {
  try {
    // In a real app, this would fetch from a database
    // For now, we'll use localStorage-style storage through the events API
    
    // Load shows from localStorage (via server-side simulation)
    const shows = getShows();
    
    // Return only future/current shows, sorted by date
    const now = new Date();
    const upcomingShows = shows
      .filter(show => new Date(show.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return NextResponse.json(upcomingShows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array on error
  }
}

// Helper function to get shows from storage
function getShows() {
  // This is a placeholder - in production, this would query a database
  // For now, we return an empty array and rely on localStorage in the client
  return [];
}

