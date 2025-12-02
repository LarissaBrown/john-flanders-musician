'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  type: 'audio' | 'video';
  url: string;
  thumbnailUrl?: string;
  description?: string;
  duration?: string;
}

// Media samples from John Flanders' various projects
const mediaItems: MediaItem[] = [
  // Album Tracks
  {
    id: 'latin-blues',
    title: 'Latin Blues',
    type: 'audio',
    url: '/audio/LatinBlues.mp3',
    description: 'From "The Go Between" - John Flanders & Double Helix',
  },
  {
    id: 'the-go-between',
    title: 'The Go Between',
    type: 'audio',
    url: '/audio/TheGoBetween.mp3',
    description: 'Title track from the latest album',
  },
  {
    id: 'architeuthis',
    title: 'Architeuthis',
    type: 'audio',
    url: '/audio/Architeuthis.mp3',
    description: 'From "In The Sky Tonight"',
  },
  // Band Samples
  {
    id: 'double-helix',
    title: 'Double Helix',
    type: 'audio',
    url: '/audio/double-helix-sample.mp3',
    description: 'High energy original jazz funk, swing, latin',
  },
  {
    id: 'trio-corcovado',
    title: 'Corcovado (Bossa Nova)',
    type: 'audio',
    url: '/audio/trio-corcovado.mp3',
    description: 'John Flanders Trio - Classy acoustic jazz',
  },
  {
    id: 'quartet-sample',
    title: 'John Flanders Quartet',
    type: 'audio',
    url: '/audio/quartet-sample.mp3',
    description: 'Jazz standards with sax, bass, guitar, and drums',
  },
  {
    id: 'jazz-vocals',
    title: 'Jazz with Male Vocals',
    type: 'audio',
    url: '/audio/jazz-vocals-sample.mp3',
    description: 'From Sinatra to Elvis - Perfect for weddings',
  },
  {
    id: 'latin-jazz-factory',
    title: 'Latin Jazz Factory',
    type: 'audio',
    url: '/audio/latin-jazz-factory.mp3',
    description: 'Hip latin jazz with horns - Mambo, bossa, afro-cuban',
  },
  {
    id: 'sin-city-soul',
    title: 'Sin City Soul',
    type: 'audio',
    url: '/audio/sin-city-soul.mp3',
    description: 'Blues, funk, New Orleans grooves with female vocals',
  },
  {
    id: 'raydius',
    title: 'Raydius',
    type: 'audio',
    url: '/audio/raydius.mp3',
    description: 'Semi-acoustic quintet with killer female vocals',
  },
  {
    id: 'atf-band',
    title: 'ATF Band',
    type: 'audio',
    url: '/audio/atf-band.mp3',
    description: 'Lounge jazz rock - Joni Mitchell to Herbie Hancock',
  },
];

export default function Media() {
  const [activeTab, setActiveTab] = useState<'all' | 'audio' | 'video'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredMedia = mediaItems.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const handlePlayPause = (item: MediaItem) => {
    if (playingId === item.id) {
      // Pause current audio
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      // Play new audio
      if (audioRef.current) {
        audioRef.current.src = item.url;
        audioRef.current.play();
      }
      setPlayingId(item.id);
    }
  };

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <section id="media" className="py-20 sm:py-24 lg:py-32 bg-[#2D241E] px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F6B800] mb-6 uppercase tracking-wide">
            Media Gallery
          </h2>
          <p className="text-lg sm:text-xl text-[#F5F0E8] max-w-3xl mx-auto leading-relaxed">
            Listen to recordings and watch performances
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12 sm:mb-16 px-4">
          <div className="bg-[#1C1612] rounded-full p-1.5 inline-flex gap-2 border border-[#F6B800]/20 shadow-lg">
            {['all', 'audio', 'video'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-6 sm:px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all ${
                  activeTab === tab
                    ? 'bg-[#F6B800] text-[#1C1612] shadow-md'
                    : 'text-[#F5F0E8] hover:text-[#F6B800]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-[#1C1612] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#F6B800]/10 hover:border-[#F6B800]/30 transform hover:-translate-y-2"
            >
              {/* Thumbnail/Player */}
              <div className="relative bg-gradient-to-br from-[#3A2F28] to-[#1C1612] aspect-video flex items-center justify-center group cursor-pointer">
                <button
                  className="relative z-10 bg-[#F6B800] hover:bg-[#FFCA28] rounded-full p-5 transition-all group-hover:scale-110 shadow-lg"
                  onClick={() => handlePlayPause(item)}
                >
                  {playingId === item.id ? (
                    <Pause className="w-8 h-8 text-[#1C1612]" />
                  ) : (
                    <Play className="w-8 h-8 text-[#1C1612] ml-1" />
                  )}
                </button>

                {/* Duration */}
                {item.duration && (
                  <div className="absolute bottom-4 right-4 bg-[#1C1612]/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-sm font-bold text-[#F6B800]">
                      {item.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 sm:p-8 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#F6B800] mb-3">
                  {item.type}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F0E8] mb-3">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-[#B8AFA3] text-sm px-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-20 px-6">
            <Music className="w-16 h-16 text-[#F6B800] mx-auto mb-6 opacity-50" />
            <p className="text-lg sm:text-xl text-[#F5F0E8]">
              No {activeTab !== 'all' ? activeTab : ''} media available yet.
            </p>
          </div>
        )}

        {/* Hidden audio element for playback */}
        <audio
          ref={audioRef}
          onEnded={() => setPlayingId(null)}
          className="hidden"
        />
      </div>
    </section>
  );
}
