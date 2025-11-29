import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const query = type && type !== 'all' ? { type } : {};
    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .limit(50);
    
    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const media = await Media.create(body);
    
    return NextResponse.json({ success: true, data: media }, { status: 201 });
  } catch (error) {
    console.error('Error creating media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create media' },
      { status: 500 }
    );
  }
}

