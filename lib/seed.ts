// Sample data seeding script for John Flanders website
// Run this after setting up MongoDB to populate initial data

import connectDB from './lib/mongodb';
import Event from './models/Event';
import Media from './models/Media';

const sampleEvents = [
  {
    title: 'Sunset Sessions',
    venue: 'Red Rock Amphitheater',
    location: 'Sedona, AZ',
    date: new Date('2024-12-15'),
    time: '7:00 PM',
    description: 'An evening of acoustic melodies under the stars',
    featured: true,
  },
  {
    title: 'Desert Blues Night',
    venue: 'Canyon View Lounge',
    location: 'Moab, UT',
    date: new Date('2024-12-22'),
    time: '8:00 PM',
    description: 'Blues and soul music with special guests',
  },
  {
    title: 'New Year\'s Eve Celebration',
    venue: 'Grand Canyon Lodge',
    location: 'Grand Canyon, AZ',
    date: new Date('2024-12-31'),
    time: '9:00 PM',
    description: 'Ring in the new year with live music',
    featured: true,
  },
];

const sampleMedia = [
  {
    title: 'Desert Wind',
    type: 'audio',
    url: '/audio/desert-wind.mp3',
    description: 'An instrumental journey through the canyons',
    duration: '4:32',
    featured: true,
  },
  {
    title: 'Red Rock Blues',
    type: 'video',
    url: '/video/red-rock-blues.mp4',
    description: 'Live performance at Red Rock',
    duration: '5:15',
    featured: true,
  },
  {
    title: 'Sunset Serenade',
    type: 'audio',
    url: '/audio/sunset-serenade.mp3',
    description: 'Acoustic guitar composition',
    duration: '3:48',
  },
  {
    title: 'Canyon Echo',
    type: 'video',
    url: '/video/canyon-echo.mp4',
    description: 'Music video shot in Utah canyons',
    duration: '6:20',
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    console.log('Clearing existing data...');
    await Event.deleteMany({});
    await Media.deleteMany({});
    
    console.log('Seeding events...');
    await Event.insertMany(sampleEvents);
    console.log(`✓ Added ${sampleEvents.length} events`);
    
    console.log('Seeding media...');
    await Media.insertMany(sampleMedia);
    console.log(`✓ Added ${sampleMedia.length} media items`);
    
    console.log('\n✅ Database seeded successfully!');
    console.log('Visit http://localhost:3000 to see the data.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;

