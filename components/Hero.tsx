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
        
        {/* Lightening overlay - white with opacity to brighten the image */}
        <div className="absolute inset-0 bg-white/40 z-10"></div>
        
        {/* Subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center space-x-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-[#2C2419] text-sm font-semibold border border-[#C67B5C]/20">
              <Sparkles className="w-4 h-4" />
              <span>Multi-Instrumentalist Musician</span>
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[#2C2419] mb-6 tracking-tight drop-shadow-sm">
            John Flanders
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-[#5A4A3A] mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            Bringing the soulful sounds of the Southwest to life through music
          </p>

          <p className="text-lg sm:text-xl text-[#5A4A3A] mb-12 max-w-2xl mx-auto">
            Experience authentic performances that blend tradition with innovation.
            Available for concerts, private events, and special occasions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#shows"
              className="group bg-[#D97D54] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#C67B5C] transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span>View Upcoming Shows</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#contact"
              className="group bg-transparent border-2 border-[#C67B5C] text-[#2C2419] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#C67B5C] hover:text-white transition-all duration-300 flex items-center space-x-2 shadow-xl"
            >
              <span>Book Now</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-[#C67B5C] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#C67B5C] rounded-full"></div>
        </div>
      </div>
      
      {/* Photo Credit */}
      <div className="absolute bottom-4 right-4 text-xs text-[#5A4A3A] bg-white/60 px-3 py-1 rounded backdrop-blur-sm z-20">
        Photo by{' '}
        <a
          href="https://unsplash.com/@anthony_melone?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#2C2419] transition-colors"
        >
          Anthony Melone
        </a>
        {' '}on{' '}
        <a
          href="https://unsplash.com/photos/brown-rock-formation-under-blue-sky-during-daytime-YdzWGR7tvQk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#2C2419] transition-colors"
        >
          Unsplash
        </a>
      </div>
    </section>
  );
}

