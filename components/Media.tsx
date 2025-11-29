'use client';

import { useState } from 'react';
import { Play, Pause, Volume2, Music, Video } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  type: 'audio' | 'video';
  url: string;
  thumbnailUrl?: string;
  description?: string;
  duration?: string;
}

// Sample data - will be replaced with API calls
const mediaItems: MediaItem[] = [
  {
    id: '1',
    title: 'Desert Wind',
    type: 'audio',
    url: '#',
    description: 'An instrumental journey through the canyons',
    duration: '4:32',
  },
  {
    id: '2',
    title: 'Red Rock Blues',
    type: 'video',
    url: '#',
    description: 'Live performance at Red Rock',
    duration: '5:15',
  },
  {
    id: '3',
    title: 'Sunset Serenade',
    type: 'audio',
    url: '#',
    description: 'Acoustic guitar composition',
    duration: '3:48',
  },
  {
    id: '4',
    title: 'Canyon Echo',
    type: 'video',
    url: '#',
    description: 'Music video shot in Utah canyons',
    duration: '6:20',
  },
];

export default function Media() {
  const [activeTab, setActiveTab] = useState<'all' | 'audio' | 'video'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredMedia = mediaItems.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <section id="media" className="py-20 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#2C1810] mb-4">Media Gallery</h2>
          <div className="w-24 h-1 bg-[#E67E22] mx-auto mb-6"></div>
          <p className="text-xl text-[#9B4819] max-w-3xl mx-auto">
            Listen to recordings and watch performances
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg inline-flex space-x-2">
            {['all', 'audio', 'video'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-6 py-3 rounded-full font-semibold transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-[#C1440E] text-white'
                    : 'text-[#9B4819] hover:bg-[#F4E4C1]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Thumbnail/Player */}
              <div className="relative bg-gradient-to-br from-[#E67E22] to-[#C1440E] aspect-video flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-black/20"></div>
                <button
                  className="relative z-10 bg-white/90 hover:bg-white rounded-full p-4 transition-all group-hover:scale-110"
                  onClick={() =>
                    setPlayingId(playingId === item.id ? null : item.id)
                  }
                >
                  {playingId === item.id ? (
                    <Pause className="w-8 h-8 text-[#C1440E]" />
                  ) : (
                    <Play className="w-8 h-8 text-[#C1440E] ml-1" />
                  )}
                </button>

                {/* Type indicator */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-2">
                  {item.type === 'audio' ? (
                    <Volume2 className="w-4 h-4 text-[#C1440E]" />
                  ) : (
                    <Video className="w-4 h-4 text-[#C1440E]" />
                  )}
                  <span className="text-sm font-semibold text-[#2C1810] capitalize">
                    {item.type}
                  </span>
                </div>

                {/* Duration */}
                {item.duration && (
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-white">
                      {item.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2C1810] mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-[#9B4819]">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-[#C1440E] mx-auto mb-4" />
            <p className="text-xl text-[#9B4819]">
              No {activeTab !== 'all' ? activeTab : ''} media available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

