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
        
        {/* Subtle lightening overlay */}
        <div className="absolute inset-0 bg-white/15 z-10"></div>
        
        {/* Gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="animate-fade-in-up space-y-8">
          {/* Content Container with Backdrop */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 sm:p-16 shadow-2xl border border-white/50">
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center space-x-2 bg-[#C67B5C]/10 px-8 py-4 rounded-full text-[#C67B5C] text-sm font-bold border border-[#C67B5C]/20">
                <Sparkles className="w-4 h-4" />
                <span>Multi-Instrumentalist Musician</span>
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#2C2419] mb-8 tracking-tight leading-none">
              John Flanders
            </h1>

            <p className="text-2xl sm:text-3xl lg:text-4xl text-[#C67B5C] font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Bringing the soulful sounds of the Southwest to life through music
            </p>

            <p className="text-lg sm:text-xl lg:text-2xl text-[#5A4A3A] max-w-2xl mx-auto font-medium mb-10">
              Experience authentic performances that blend tradition with innovation.
              Available for concerts, private events, and special occasions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="#shows"
                className="group relative bg-gradient-to-r from-[#D97D54] to-[#E67E22] text-white px-10 py-5 rounded-full font-bold text-xl hover:from-[#E67E22] hover:to-[#D97D54] transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
              >
                <span>View Upcoming Shows</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>

              <Link
                href="#contact"
                className="group bg-[#C67B5C] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#A85F44] transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
              >
                <span>Book Now</span>
              </Link>
            </div>
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

