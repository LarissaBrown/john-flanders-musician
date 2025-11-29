'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1C1612]"
    >
      {/* Sedona Background - Subtle */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/red-rocks-background.jpg"
          alt="Sedona Red Rock Formation"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-[#1C1612]/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-32">
        <div className="animate-fade-in-up space-y-12">
          {/* JOFLA Logo/Brand */}
          <div className="flex justify-center">
            <div className="inline-flex flex-col items-center">
              {/* Geometric Logo inspired by MUBI */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex space-x-1.5">
                  <div className="w-7 h-7 rounded-full bg-[#F6B800]"></div>
                  <div className="w-7 h-7 rounded-full bg-[#F6B800] opacity-80"></div>
                  <div className="w-7 h-7 rounded-full bg-[#F6B800] opacity-60"></div>
                </div>
              </div>
              
              {/* Brand Name */}
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight text-[#F6B800] mb-2" style={{letterSpacing: '0.02em'}}>
                JOFLA
              </h1>
              <p className="text-xl sm:text-2xl font-light tracking-widest text-[#F6B800] uppercase opacity-90" style={{letterSpacing: '0.25em'}}>
                John Flanders
              </p>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F6B800] uppercase tracking-wide leading-tight">
              Live music from the heart of the Southwest.
            </h2>
            
            <p className="text-xl sm:text-2xl text-[#F5F0E8] font-light leading-relaxed">
              Multi-instrumentalist. Performer. Available for concerts, private events, and special occasions.
            </p>
          </div>

          {/* CTA Button - MUBI Style */}
          <div className="pt-8">
            <Link
              href="#shows"
              className="inline-block bg-[#F6B800] text-[#1C1612] px-16 py-6 rounded-lg font-black text-xl uppercase tracking-wide hover:bg-[#FFCA28] transition-all duration-300 shadow-2xl hover:shadow-[0_12px_40px_rgba(246,184,0,0.4)] transform hover:-translate-y-1"
            >
              Let's Go
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-[#B8AFA3] text-sm uppercase tracking-widest pt-8">
            Available for bookings
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-7 h-12 border-2 border-[#F6B800] rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-4 bg-[#F6B800] rounded-full"></div>
        </div>
      </div>
      
      {/* Photo Credit */}
      <div className="absolute bottom-4 right-4 text-xs text-[#8A8078] bg-[#2D241E]/80 px-3 py-2 rounded-lg backdrop-blur-md z-20">
        Photo by{' '}
        <a
          href="https://unsplash.com/@anthony_melone?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#F6B800] transition-colors"
        >
          Anthony Melone
        </a>
        {' '}on{' '}
        <a
          href="https://unsplash.com/photos/brown-rock-formation-under-blue-sky-during-daytime-YdzWGR7tvQk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#F6B800] transition-colors"
        >
          Unsplash
        </a>
      </div>
    </section>
  );
}
