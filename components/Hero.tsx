'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/red-rocks-background.jpg"
          alt="Sedona Red Rock Formation"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        
        {/* Lightening overlay - less opacity for more image visibility */}
        <div className="absolute inset-0 bg-white/25 z-10"></div>
        
        {/* Gradient overlay for text contrast - darker at center */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="animate-fade-in-up space-y-8">
          <div className="flex justify-center">
            <span className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-[#C67B5C] text-sm font-bold border-2 border-[#C67B5C]/30 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Sparkles className="w-4 h-4" />
              <span>Multi-Instrumentalist Musician</span>
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-white mb-6 tracking-tight leading-none" 
              style={{
                textShadow: '0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3), 0 8px 24px rgba(198,123,92,0.3)'
              }}>
            John Flanders
          </h1>

          <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-6 max-w-4xl mx-auto leading-tight"
             style={{
               textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)'
             }}>
            Bringing the soulful sounds of the Southwest to life through music
          </p>

          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 max-w-2xl mx-auto font-medium"
             style={{
               textShadow: '0 2px 6px rgba(0,0,0,0.5)'
             }}>
            Experience authentic performances that blend tradition with innovation.
            Available for concerts, private events, and special occasions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              href="#shows"
              className="group relative bg-gradient-to-r from-[#D97D54] to-[#E67E22] text-white px-10 py-5 rounded-full font-bold text-xl hover:from-[#E67E22] hover:to-[#D97D54] transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-[0_10px_40px_rgba(217,125,84,0.5)] transform hover:-translate-y-2 hover:scale-105"
            >
              <span>View Upcoming Shows</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="#contact"
              className="group bg-white/95 backdrop-blur-md border-3 border-white text-[#C67B5C] px-10 py-5 rounded-full font-bold text-xl hover:bg-[#C67B5C] hover:text-white transition-all duration-300 flex items-center space-x-2 shadow-2xl hover:shadow-[0_10px_40px_rgba(198,123,92,0.5)] transform hover:-translate-y-2 hover:scale-105"
            >
              <span>Book Now</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-7 h-12 border-3 border-white rounded-full flex items-start justify-center p-2 shadow-lg bg-white/10 backdrop-blur-sm">
          <div className="w-1.5 h-4 bg-white rounded-full shadow-sm"></div>
        </div>
      </div>
      
      {/* Photo Credit */}
      <div className="absolute bottom-4 right-4 text-xs text-white bg-black/40 px-3 py-2 rounded-lg backdrop-blur-md z-20 shadow-lg">
        Photo by{' '}
        <a
          href="https://unsplash.com/@anthony_melone?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#D97D54] transition-colors font-medium"
        >
          Anthony Melone
        </a>
        {' '}on{' '}
        <a
          href="https://unsplash.com/photos/brown-rock-formation-under-blue-sky-during-daytime-YdzWGR7tvQk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#D97D54] transition-colors font-medium"
        >
          Unsplash
        </a>
      </div>
    </section>
  );
}

