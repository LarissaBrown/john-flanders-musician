import { NextResponse } from 'next/server';

// Default seed data for media (using uploaded audio files)
const defaultMedia = [
  // Album Tracks (actual files uploaded)
  {
    _id: 'media-1',
    title: 'Latin Blues',
    type: 'audio',
    url: '/audio/LatinBlues.mp3',
    description: 'From "The Go Between" - John Flanders & Double Helix',
    duration: '',
  },
  {
    _id: 'media-2',
    title: 'The Go Between',
    type: 'audio',
    url: '/audio/TheGoBetween.mp3',
    description: 'Title track from the latest album',
    duration: '',
  },
  {
    _id: 'media-3',
    title: 'Architeuthis',
    type: 'audio',
    url: '/audio/Architeuthis.mp3',
    description: 'From "In The Sky Tonight"',
    duration: '',
  },
  {
    _id: 'media-4',
    title: 'Hunkered Down',
    type: 'audio',
    url: '/audio/06HunkeredDown.mp3',
    description: 'Track 06 - Hunkered Down',
    duration: '',
  },
  // Placeholder for future band samples
  {
    _id: 'media-5',
    title: 'Double Helix',
    type: 'audio',
    url: '/audio/double-helix-sample.mp3',
    description: 'High energy original jazz funk, swing, latin',
    duration: '',
  },
  {
    _id: 'media-6',
    title: 'Corcovado (Bossa Nova)',
    type: 'audio',
    url: '/audio/trio-corcovado.mp3',
    description: 'John Flanders Trio - Classy acoustic jazz',
    duration: '',
  },
  {
    _id: 'media-7',
    title: 'John Flanders Quartet',
    type: 'audio',
    url: '/audio/quartet-sample.mp3',
    description: 'Jazz standards with sax, bass, guitar, and drums',
    duration: '',
  },
  {
    _id: 'media-8',
    title: 'Jazz with Male Vocals',
    type: 'audio',
    url: '/audio/jazz-vocals-sample.mp3',
    description: 'From Sinatra to Elvis - Perfect for weddings',
    duration: '',
  },
  {
    _id: 'media-9',
    title: 'Latin Jazz Factory',
    type: 'audio',
    url: '/audio/latin-jazz-factory.mp3',
    description: 'Hip latin jazz with horns - Mambo, bossa, afro-cuban',
    duration: '',
  },
  {
    _id: 'media-10',
    title: 'Sin City Soul',
    type: 'audio',
    url: '/audio/sin-city-soul.mp3',
    description: 'Blues, funk, New Orleans grooves with female vocals',
    duration: '',
  },
  {
    _id: 'media-11',
    title: 'Raydius',
    type: 'audio',
    url: '/audio/raydius.mp3',
    description: 'Semi-acoustic quintet with killer female vocals',
    duration: '',
  },
  {
    _id: 'media-12',
    title: 'ATF Band',
    type: 'audio',
    url: '/audio/atf-band.mp3',
    description: 'Lounge jazz rock - Joni Mitchell to Herbie Hancock',
    duration: '',
  },
];

export async function GET() {
  try {
    // Return seed data for now
    // In production with MongoDB, this would query the database
    return NextResponse.json(defaultMedia);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // For now, just return success with the data
    // In production with MongoDB, this would save to database
    const newMedia = {
      _id: `media-${Date.now()}`,
      ...body,
    };
    
    return NextResponse.json({ success: true, data: newMedia }, { status: 201 });
  } catch (error) {
    console.error('Error creating media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create media' },
      { status: 500 }
    );
  }
}
