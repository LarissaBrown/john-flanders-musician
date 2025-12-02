import { NextResponse } from 'next/server';

// MongoDB Integration (uncomment when ready):
// import connectDB from '@/lib/mongodb';
// import Contact from '@/models/Contact';

// Configuration
const USE_MONGODB = false; // Set to true when MongoDB is configured

export async function GET() {
  try {
    if (USE_MONGODB) {
      // MongoDB version (uncomment when ready):
      // await connectDB();
      // const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
      // return NextResponse.json({ success: true, data: contacts });
    }
    
    // localStorage version - messages are loaded client-side
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ success: false, data: [] }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create the message object (same structure for localStorage and MongoDB)
    const messageData = {
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      eventType: body.eventType || '',
      eventDate: body.eventDate || '',
      message: body.message,
      read: false,
    };

    let savedMessage;

    if (USE_MONGODB) {
      // MongoDB version (uncomment when ready):
      // await connectDB();
      // savedMessage = await Contact.create(messageData);
      
      // TODO: Send email notification to admin
      // await sendEmailNotification(savedMessage);
    } else {
      // localStorage version - generate ID client-side compatible
      savedMessage = {
        _id: `msg-${Date.now()}`,
        ...messageData,
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({ success: true, data: savedMessage }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      );
    }

    if (USE_MONGODB) {
      // MongoDB version (uncomment when ready):
      // await connectDB();
      // await Contact.findByIdAndDelete(id);
    }
    
    // For localStorage, deletion is handled client-side
    return NextResponse.json({ success: true, data: { id } }, { status: 200 });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
