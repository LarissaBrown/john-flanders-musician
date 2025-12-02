'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';

interface MediaItem {
  _id: string;
  title: string;
  type: 'audio' | 'video';
  url: string;
  thumbnailUrl?: string;
  description?: string;
  duration?: string;
}

export default function Media() {
  const [activeTab, setActiveTab] = useState<'all' | 'audio' | 'video'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      // Load from localStorage (managed by admin)
      const stored = localStorage.getItem('admin_media');
      
      if (stored) {
        const mediaArray = JSON.parse(stored);
        setMediaItems(mediaArray);
      } else {
        // Load from API as fallback
        const response = await fetch('/api/media');
        const data = await response.json();
        const mediaArray = Array.isArray(data) ? data : (data?.data || []);
        setMediaItems(mediaArray);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = mediaItems.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const handlePlayPause = (item: MediaItem) => {
    if (playingId === item._id) {
      // Pause current audio
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      // Play new audio
      if (audioRef.current) {
        audioRef.current.src = item.url;
        audioRef.current.play();
      }
      setPlayingId(item._id);
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
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F6B800]"></div>
            <p className="mt-4 text-[#F5F0E8]">Loading media...</p>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-20 px-6">
            <Music className="w-16 h-16 text-[#F6B800] mx-auto mb-6 opacity-50" />
            <p className="text-lg sm:text-xl text-[#F5F0E8]">
              No {activeTab !== 'all' ? activeTab : ''} media available yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredMedia.map((item) => (
              <div
                key={item._id}
                className="bg-[#1C1612] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#F6B800]/10 hover:border-[#F6B800]/30 transform hover:-translate-y-2"
              >
                {/* Thumbnail/Player */}
                <div className="relative bg-gradient-to-br from-[#3A2F28] to-[#1C1612] aspect-video flex items-center justify-center group cursor-pointer">
                  <button
                    className="relative z-10 bg-[#F6B800] hover:bg-[#FFCA28] rounded-full p-5 transition-all group-hover:scale-110 shadow-lg"
                    onClick={() => handlePlayPause(item)}
                  >
                    {playingId === item._id ? (
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
