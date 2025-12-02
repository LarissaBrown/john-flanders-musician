import { NextResponse, NextRequest } from 'next/server';

// Note: Since we're not using MongoDB, this API uses localStorage on the client side
// The admin pages handle the actual data persistence via localStorage

export async function GET() {
  try {
    // This endpoint is called by the admin dashboard
    // The admin page will use localStorage to persist data
    // We just return an empty array and let the client handle storage
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Return the data with an ID
    // The client-side admin will handle localStorage persistence
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Return success - client handles localStorage update
    return NextResponse.json({ success: true, data: body }, { status: 200 });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Return success - client handles localStorage deletion
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

